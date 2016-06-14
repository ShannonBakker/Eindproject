var data;
var place;
var year; 
var previous_van
var previous_naar

// make the slider working
d3.select('#slider').call(d3.slider().axis(true).value(2014).min(2006).max(2014).step(1).on("slide", function(evt, value) {
		year=value
		colour_map(place,1)
		colour_map(place,2)
}));

// set the color scale
var colour_scales = d3.scale.threshold()
    .domain([0.1, 0.2, 0.3, 0.4, 0.5,1.0,2.0,5.0])
    .range(['#cdc3cc',
		'#edf8b1',
		'#c7e9b4',
		'#7fcdbb',
		'#41b6c4',
		'#1d91c0',
		'#225ea8',
		'#253494',
		'#081d58']);

// set the tooltip
var tooltip = d3.select("body")
	.append("div")
	.style("position", "absolute")
	.style("z-index", "10");

// add the legend
var svg_legend = d3.select("#svg_van")
var legendy = 200;
svg_legend.append("g")
    .attr("class", "legend")
    .attr("transform", "translate(-150," + legendy + ")");

var legend = d3.legend.color()
    .labels(["0 of missend","100-200","200-300","300-400","400-500","500-1000", "1000-2000","2000-5000", ">5000"])
    .scale(colour_scales)
    .shapeWidth(25)
    .orient("vertical");

svg_legend.select(".legend")
   .call(legend);

// function off the dropdown menu
// inspiration http://stackoverflow.com/questions/1085801/get-selected-value-in-dropdown-list-using-javascript
function select_municipality(){
	var x = document.getElementById("choose_city");
	var strUser = x.options[x.selectedIndex].value
	make_linegraph(strUser)
	colour_map(strUser,2);
	colour_map(strUser,1);
	
}

// add the event listeners for the map  
function add_mousefunctions(svg, message, plaatsnaam,place_name2, aantal_mensen){
	var selected_place = svg.select('#'+plaatsnaam).style('fill', colour).attr("class","selected_place")
		.on("mouseover", function(d){
			 tooltip.text(message + place_name2+ " reizen "+ aantal_mensen*1000 + " mensen")
				.style("visibility", "visible");
			})
		.on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px")
			.style("left",(event.pageX+10)+"px");})
		.on("mouseout", function(){
				tooltip.style("visibility", "hidden");
			})
		.on("click", function(d){ 	
			// make use of recursion to recolor the map when one clicks on a municipality
			for (i = 0; i < data.plaatsen.length; i++){
				if(data.plaatsen[i].plaats.plaatsnaam.replace(/\s/g,'') == plaatsnaam){
					make_linegraph(i)
					colour_map(i, 1);
					colour_map(i, 2);
				};
			};
		});
	}
	

// color the map
function colour_map(i, van_of_naar){
	tooltip.text("Je hebt voor "+ data.plaatsen[i].plaats.plaatsnaam+ " gekozen")

	place = i
	console.log(i)
	// check if the map 'van' or the map 'naar' has to be coloured
	alle_plaatsen = [];
	if (van_of_naar == 1){
		 
		svg = d3.select('#svg_van');
		alle_plaatsen = data.plaatsen[i].plaats.jaar[year-2006].plaatsen_van;
		message = "Van "+ data.plaatsen[i].plaats.plaatsnaam 
		tooltip_message = "naar "
		
		// change the border of the selected place
		var selected_place = svg.select('#'+data.plaatsen[i].plaats.plaatsnaam.replace(/\s/g,''))
			.style("stroke", "black")
			.style("stroke-width", "3")
		if (previous_van != null){
				previous_van.style("stroke", "grey")
				.style("stroke-width", "1")
			}
			previous_van= selected_place
	}
	else if (van_of_naar == 2) {
		
		svg = d3.select('#svg_naar');
		alle_plaatsen = data.plaatsen[i].plaats.jaar[year-2006].plaatsen_naar;
		message = "Naar "+ data.plaatsen[i].plaats.plaatsnaam 
		tooltip_message = "van "
		
		// change the border of the selected place 
		var selected_place= svg.select('#'+data.plaatsen[i].plaats.plaatsnaam.replace(/\s/g,''))
			.style("stroke", "black")
			.style("stroke-width", "3")
		if (previous_naar != null){
				previous_naar.style("stroke", "grey")
				.style("stroke-width", "1")
			}
			previous_naar= selected_place
	}
	else if (van_of_naar == 3) {
		svg = d3.select('#svg_afstand');
		alle_plaatsen = data.plaatsen[i].plaats.jaar[year-2006].plaatsen_van;
		message = "Van "+ data.plaatsen[i].plaats.plaatsnaam 
		tooltip_message = "Naar "
	};
	
	// add a title to the map
	svg.select("#place_title").remove()
	var text = svg.append("text");
	var textLabels = text
        .attr("x", 20)
        .attr("y", 20)
		.attr('id', 'place_title')
        .text(message)
        .attr("font-size", "17px")

	// make a loop trough all places with data about the amount of people travelling to or from a place attached to it
	// p is places and m is the amount of people, the variable names are this short to decrease the size of the dataset
	alle_plaatsen.forEach(function(item){ 
		var place_name = item.p;
        var aantal_mensen = item.m;
		
		// check if the data is missing
		if (aantal_mensen == "-"){
			colour = '#cdc3cc';
		}
		else{
			colour= colour_scales(aantal_mensen);
		};
		place_name2= place_name
				
		// remove the spaces from the placename
		place_name = place_name.replace(/\s/g,'');
		
		// select all the municipalities in the svg and give them a color and mouse-functions
		if (van_of_naar == 2){
			add_mousefunctions(svg, 'van ',place_name, place_name2, aantal_mensen)
		
		}
		else{
			add_mousefunctions(svg, 'naar ', place_name,place_name2, aantal_mensen)
		}
		});
	
};




// parsedate function, to get the year ready for the linegraph
var parseDate = d3.time.format("%Y-%m-%d").parse


// load the data and default-color the map
d3.json("data_hoofdvisualisatie_met_totaal_klein.json", function(error, data_json) {
	if (error) {
		console.log("error")
		throw new Error("Something went badly wrong!");
	}
	// make a select element for the municipalities search box http://thematicmapping.org/playground/d3/d3.slider/
	d3.select("#select").append("select")
	var select = d3.select("select")
	select.attr("class","selectpicker")
		.attr("id","choose_city")
		.attr("data-live-search","true")
		.style("display", "none")
		.style("width", "350px")
	i=0
	data_json.plaatsen.forEach(function(d) {
		d.plaats.totalen.totalen_van.forEach(function(j) {
			j.totaal_jaar = j.totaal_jaar*1000
			j.jaartal = j.jaartal+"-01-01"
			j.jaartal = parseDate(j.jaartal)
		});
			d.plaats.totalen.totalen_naar.forEach(function(j) {
			j.totaal_jaar = j.totaal_jaar*1000
			j.jaartal = j.jaartal+"-01-01"
			j.jaartal = parseDate(j.jaartal)
		});
		
		// add the municipalities to the select element
		select.append("option")
			.text(d.plaats.plaatsnaam)
			.attr("value",i)
		i+=1
	});
	
	// inspiration from https://silviomoreto.github.io/bootstrap-select/
    $('.selectpicker').selectpicker({
	position: 'absolute',
	left: '-30px',
	top: '50px',
	size: 4
});

	
	data = data_json
	year = 2014
	make_linegraph(0)
	colour_map(0,1);
	colour_map(0,2);

	
});
	




