// function for the slider van http://bl.ocks.org/darrenjaworski/5397202
onload = function() {
  var $ = function(id) { return document.getElementById(id); };
  $('slider').oninput = function() { $('range').innerHTML = this.value; };
  $('slider').oninput();
};

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
	

	
	// make use of recursion to change the map when the slider changes
	var value;
	d3.selectAll("input").on("change", function change() {
		var value = this.value;
		make_linegraph(i,data)
		colour_map(i,data,true,(value-2006))
		colour_map(i,data,false,(value-2006))
	});
	
	// check if the map 'van' or the map 'naar' has to be coloured
	alle_plaatsen = [];
	if (van_of_naar == true){
		svg = d3.select('#svg_van');
		alle_plaatsen = data.plaatsen[i].plaats.jaar[jaar].plaatsen_van;
		message = "Van "+ data.plaatsen[i].plaats.plaatsnaam 
				
	}
	else {
		svg = d3.select('#svg_naar');
		alle_plaatsen = data.plaatsen[i].plaats.jaar[jaar].plaatsen_naar;
		message = "Naar "+ data.plaatsen[i].plaats.plaatsnaam 
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
			.on("mouseover", function(d){return tooltip.text(plaatsnaam + ": "+ aantal_mensen)
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


// set the linegraph
// set the margins of the graph
	var margin = {top: 20, right: 20, bottom: 30, left: 50},
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	var x = d3.scale.ordinal()
		.domain(["2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014"])
		.rangeRoundBands([0, width], -1);
		

	var y = d3.scale.linear()
		.range([height, 0]);

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");

function make_linegraph(place_number, data){
	// remove the old graph
	d3.select('#linegraph').remove()
	
	// initialize the graph
	var lineChart = d3.select("body").append("svg")
		.attr("id", "linegraph")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	//determine the domain
	var max =10;
	var max_van = d3.max(data.plaatsen[place_number].plaats.totalen.totalen_van, function(d) { return d.totaal_jaar; })
	var max_naar = d3.max(data.plaatsen[place_number].plaats.totalen.totalen_naar, function(d) { return d.totaal_jaar; })
	console.log(max_van)
	console.log(max_naar)
	if (Number(max_van)>Number(max_naar)) {
		max = max_van;
	}
	else{
		max = max_naar;
	}
	console.log("max: " + max)
	
	y.domain([0,max])
	
	// make the x axis
	lineChart.append("g")
      .attr("class", "x axis")
	  .attr("transform", "translate(0," + height + ")", "rotate(-50)")
		.call(xAxis)
	
	//make the y axis
	lineChart.append("g")
      .attr("class", "axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", ".75em")
      .style("text-anchor", "end")
	  .style("font-size", "11px") 
      .text("Temperature (degrees Celsius)");
	
	// make the lines
    lineChart.append("path")
      .datum(data.plaatsen[place_number].plaats.totalen.totalen_van)
      .attr("class", "line")
	  .attr("y", 100)
	  .attr("dy", ".75em")
      .attr("d", d3.svg.line()
			.x(function(d) { return x(d.jaartal)+110; })
			.y(function(d) { return y(d.totaal_jaar); }))
	
	lineChart.append("path")
      .datum(data.plaatsen[place_number].plaats.totalen.totalen_naar)
      .attr("class", "line_max")
	  .attr("y", 100)
	  .attr("dy", ".75em")
      .attr("d", d3.svg.line()
			.x(function(d) { return x(d.jaartal)+110; })
			.y(function(d) { return y(d.totaal_jaar); }))
	  
	 // append the title
	lineChart.append("text")
        .attr("x", (width))             
        .attr("y", 0)
        .attr("text-anchor", "end")  
        .style("font-size", "17px")  
        .text("Totaal van en naar "+data.plaatsen[place_number].plaats.plaatsnaam);
	
	// append the dot
	var dot = lineChart.append("g")
      .attr("class", "dot")
      .style("display", "none")
	dot.append("circle")
      .attr("r", 3);
	dot.append("text")
      .attr("x", 9)
      .attr("dy", ".35em");

 }



// load the map and default-color the map
d3.json("data_hoofdvisualisatie_met_totaal.json", function(error, data) {
	if (error) {
		console.log("error")
		throw new Error("Something went badly wrong!");
	}
	data.plaatsen.forEach(function(d) {
		d.plaats.totalen.totalen_van.forEach(function(j) {
		j.totaal_jaar = j.totaal_jaar*1000
		});
		d.plaats.totalen.totalen_naar.forEach(function(j) {
		j.totaal_jaar = j.totaal_jaar*1000
		});
	});
	make_linegraph(2,data)
	colour_map(2,data,true,2014-2006);
	colour_map(2,data,false,2014-2006);

});





