// create color function
var color_scales = d3.scale.threshold()
    .domain([0.1, 0.2, 0.5, 1.0, 1.5,2.0,2.5])
    .range(["#f7fcfd",
		"#e0ecf4",
		"#bfd3e6",
		"#9ebcda",
		"#8c96c6",
		"#8c6bb1",
		"#88419d",
		"#6e016b"]);

// set the tooltip
var tooltip = d3.select("body")
			.append("div")
			.style("position", "absolute")
			.style("z-index", "10")

	

function color_map(i, data){
	// fill dataset in appropriate format
	data.plaatsen[i].Plaats.jaar[0].plaatsen_van.forEach(function(item){ 
		var iso = item.plaats;
        var value = item.aantal_mensen;
		colour= color_scales(value)
		iso = iso.replace(/\s/g,'')
		if (value == "-")
			svg.select('#'+iso).style('fill', 'red')
				.on("mouseover", function(d){return tooltip.text(iso + ": "+ value).style("visibility", "visible");})
				.on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
				.on("mouseout", function(){return tooltip.style("visibility", "hidden");})
				.on("click", function(d){ 
					// convert the data to the correct format, missing values get an absurd high value, so they can be coloured separately
					for (i = 0; i < data.plaatsen.length; i++){
						if(data.plaatsen[i].Plaats.plaatsnaam.replace(/\s/g,'') == iso){
							color_map(i, data)
						}
					}
				})
		else 
			svg.select('#'+iso).style('fill', colour)
				.on("mouseover", function(d){return tooltip.text(iso + ": "+ value).style("visibility", "visible");})
				.on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
				.on("mouseout", function(){return tooltip.style("visibility", "hidden");})
				.on("click", function(d){ 
					// convert the data to the correct format, missing values get an absurd high value, so they can be coloured separately
					for (i = 0; i < data.plaatsen.length; i++){
						if(data.plaatsen[i].Plaats.plaatsnaam.replace(/\s/g,'') == iso){
							color_map(i, data)
						}
					}
				})
			})
}
  
d3.json("data_hoofdvisualisatie.json", function(error, data) {
	if (error) {
		console.log("error")
		throw new Error("Something went badly wrong!");
	}
	svg = d3.select('svg')
	path = svg.selectAll('path')

	color_map(2,data)
});


