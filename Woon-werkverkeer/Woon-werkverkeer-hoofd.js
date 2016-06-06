// create color function
var color = d3.scale.threshold()
    .domain([0.1, 0.2, 0.5, 1, 2,5,10,300])
    .range(["#f7fcfd",
		"#e0ecf4",
		"#bfd3e6",
		"#9ebcda",
		"#8c96c6",
		"#8c6bb1",
		"#88419d",
		"#6e016b",
		"#fed976"]);

var div = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);

var tooltip = d3.select("body")
			.append("div")
			.style("position", "absolute")
			.style("z-index", "10")

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Frequency:</strong> <span style='color:red'>" + d.Plaats.plaatsnaam + "</span>";
  })
  
d3.json("kleinedataset.json", function(error, data) {
	if (error) {
		console.log("error")
		throw new Error("Something went badly wrong!");
	}
	console.log(data.plaatsen)
	svg = d3.select('svg')
	svg.call(tip)
	path = svg.selectAll('#Amsterdam')
		.data(data.plaatsen)
			.on('mouseover', tip.show)
			.on('mouseout', tip.hide)
			
	// fill dataset in appropriate format
	data.plaatsen[2].Plaats.jaar[0].plaatsen_van.forEach(function(item){ 
		var iso = item.plaats;
        var value = item.aantal_mensen;
		colour= color(value)
		svg.select('#'+iso).style('fill', colour)
    });
	
	
});


