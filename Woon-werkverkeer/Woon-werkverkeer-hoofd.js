// function for the slider van http://bl.ocks.org/darrenjaworski/5397202
onload = function() {
  var $ = function(id) { return document.getElementById(id); };
  $('slider').oninput = function() { $('range').innerHTML = this.value; };
  $('slider').oninput();
};

// create color function
var color_scales = d3.scale.threshold()
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
function color_map(i, data, van_of_naar,jaar){
	
	// make use of recursion to change the map when the slider changes
	var value;
	d3.selectAll("input").on("change", function change() {
		var value = this.value;
		color_map(i,data,true,(value-2006))
		color_map(i,data,false,(value-2006))
	});
	
	// check if the map 'van' or the map 'naar' has to be coloure
	alle_plaatsen = [];
	if (van_of_naar == true){
		svg = d3.select('#svg_van');
		alle_plaatsen = data.plaatsen[i].Plaats.jaar[jaar].plaatsen_van;	
	}
	else {
		svg = d3.select('#svg_naar');
		alle_plaatsen = data.plaatsen[i].Plaats.jaar[jaar].plaatsen_naar;
	};

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
			colour= color_scales(aantal_mensen);
		};
		
		// remove the spaces from the placename
		plaatsnaam = plaatsnaam.replace(/\s/g,'');
		// select all the municipalities in the svg and give them a color and mouse-functions
		svg.select('#'+plaatsnaam).style('fill', colour)
			.on("mouseover", function(d){return tooltip.text(plaatsnaam + ": "+ aantal_mensen).style("visibility", "visible");})
			.on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
			.on("mouseout", function(){return tooltip.style("visibility", "hidden");})
			.on("click", function(d){ 
				// make use of recursion to recolor the map when one clicks on a municipality
				for (i = 0; i < data.plaatsen.length; i++){
					if(data.plaatsen[i].Plaats.plaatsnaam.replace(/\s/g,'') == plaatsnaam){
						color_map(i, data, true,jaar);
						color_map(i, data, false,jaar);
					};
				};
			});
		});
};

// load the map and default-color the map
d3.json("data_hoofdvisualisatie_naar_goed.json", function(error, data) {
	if (error) {
		console.log("error")
		throw new Error("Something went badly wrong!");
	}
	color_map(2,data,true,2014-2006);
	color_map(2,data,false,2014-2006);

});


