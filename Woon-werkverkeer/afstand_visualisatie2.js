function visualisation_distance(){
// color the map for Terschelling
//colour_map(321,3)

var margin = {top: 50, right: 30, bottom: 120, left: 150},
   width = 600 - margin.left - margin.right,
   height = 600 - margin.top - margin.bottom;

var y = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.1);

var x = d3.scale.linear()
    .range([0, height]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
	

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")

// set size of the chart
var chart = d3.select("#distance").append('svg')
    .attr("width", height + margin.left + margin.right)
    .attr("height", width + margin.top + margin.bottom)

	
d3.json("afstanden.json", function(error, data) {
	if (error) {
		console.log("error")
		throw new Error("Something went badly wrong!");
	}
y.domain(data.data.map(function(d){ return d.plaatsnaam + " ("+ d.provincie+")"}));
x.domain([0, d3.max(data.data, function(d){return  d.afstand})]);


// append the x axis to the chart
	chart.append("g")
		.attr("class", "x axis")
		.attr("transform",  "translate(150," + width + ")", "rotate(-50)")
		.call(xAxis)
		.selectAll("text")
			.attr("y", 10)
			.attr("dy", ".35em")
			
			

	// append the y axis to the chart
	chart.append("g")
		.attr("class", "y axis")
		.attr("transform","translate(150,0)")
		.call(yAxis)

	// append the bars to the text
	chart.selectAll(".bar")
		.data(data.data)
    .enter().append("g")
		.attr("class", "bar1")
		.append("rect")
		.attr("class", "bar")
		.attr("y", function(d) { return y(d.plaatsnaam + " ("+ d.provincie+")"); })
		.attr("height", y.rangeBand())
		.attr("x", function(d) { return 150; })
		.attr("width", function(d) { return x(d.afstand); })
		.on('mouseover', function(d){colour_map(d.gemeentenummer,3)});
	
	d3.selectAll('.bar1')
		.append("text")
		.attr("class","bartext")
		.attr("x", function(d) { return x(d.afstand)+150-50; })
		.attr("y",  function(d) { return y(d.plaatsnaam + " ("+ d.provincie+")")+15; })
		.style('color', 'red')
		.attr("dy", ".35em")
		.text(function(d) { return d.afstand + ' km'; });
	
	
});
}
