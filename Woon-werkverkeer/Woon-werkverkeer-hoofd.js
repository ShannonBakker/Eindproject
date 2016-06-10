var data_overall;
var place;
var year=2014; 

d3.select('#slider6').call(d3.slider().axis(true).min(2006).max(2014).step(1).on("slide", function(evt, value) {
		year = Number(value)
		colour_map(place,data,true,(value-2006))
		colour_map(place,data,false,(value-2006))
}));



// create color function
var colour_scales = d3.scale.threshold()
    .domain([0.1, 0.2, 0.3, 0.4, 0.5,1.0,2.0,5.0])
    .range(['#ffffd9',
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

// color the map
function colour_map(i, data, van_of_naar,jaar){
	
	place = i
	console.log(jaar)
	// check if the map 'van' or the map 'naar' has to be coloured
	alle_plaatsen = [];
	if (van_of_naar == true){
		svg = d3.select('#svg_van');
		alle_plaatsen = data.plaatsen[i].plaats.jaar[jaar].plaatsen_van;
		message = "Van "+ data.plaatsen[i].plaats.plaatsnaam 
		tooltip_message = "naar "			
	}
	else {
		svg = d3.select('#svg_naar');
		alle_plaatsen = data.plaatsen[i].plaats.jaar[jaar].plaatsen_naar;
		message = "Naar "+ data.plaatsen[i].plaats.plaatsnaam 
		tooltip_message = "van "
	};
	svg.select("text").remove()
	var text = svg.append("text");
	var textLabels = text
        .attr("x", 20)
        .attr("y", 20)
        .text(message)
        .attr("font-size", "17px")

	// make a loop trought all places with data about the amount of people travelling to or from a place attached to it
	// p is places and m is the amount of people, the variable names are this short to decrease the size of the dataset
	alle_plaatsen.forEach(function(item){ 
		var plaatsnaam = item.p;
        var aantal_mensen = item.m;
		
		// check if the data is missing
		if (aantal_mensen == "-"){
			colour = '#cdc3cc';
		}
		else{
			colour= colour_scales(aantal_mensen);
		};
		
		// remove the spaces from the placename
		plaatsnaam = plaatsnaam.replace(/\s/g,'');
		// select all the municipalities in the svg and give them a color and mouse-functions
		svg.select('#'+plaatsnaam).style('fill', colour)
			.on("mouseover", function(d){return tooltip.text(tooltip_message + plaatsnaam + " reizen "+ aantal_mensen*1000 + " mensen")
				.style("visibility", "visible");})
			.on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px")
				.style("left",(event.pageX+10)+"px");})
			.on("mouseout", function(){return tooltip.style("visibility", "hidden");})
			.on("click", function(d){ 
				
				// make use of recursion to recolor the map when one clicks on a municipality
				for (i = 0; i < data.plaatsen.length; i++){
					if(data.plaatsen[i].plaats.plaatsnaam.replace(/\s/g,'') == plaatsnaam){
						make_linegraph(i,data)
						colour_map(i, data, true,jaar);
						colour_map(i, data, false,jaar);
					};
				};
			});
		});
};





var parseDate = d3.time.format("%Y-%m-%d").parse




// load the map and default-color the map

d3.json("data_hoofdvisualisatie_met_totaal.json", function(error, data_json) {
	if (error) {
		console.log("error")
		throw new Error("Something went badly wrong!");
	}
	
	d3.select("#select").append("select")
	var select = d3.select("select")
	
	
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
		select.append("option")
			.text(d.plaats.plaatsnaam)
			.attr("value",i)
		i+=1
	});
	select.attr("class","selectpicker")
	.attr("id","choose_city")
	.attr("data-live-search","true")
	.style("display", "none")
	.style("width", "350px")
	
     $('.selectpicker').selectpicker({
	style: 'btn-info',
	position: 'absolute',
	left: '-30px',
	top: '50px',
	size: 4
});

	
	data = data_json
	
	make_linegraph(2,data)
	colour_map(2,data,true,year-2006);
	colour_map(2,data,false,year-2006);

	
});
	


function myFunction(){
	var x = document.getElementById("choose_city");
	var strUser = x.options[x.selectedIndex].value
	make_linegraph(2,data)
	colour_map(strUser,data,false,2014-2006);
	colour_map(strUser,data,true,2014-2006);
}


