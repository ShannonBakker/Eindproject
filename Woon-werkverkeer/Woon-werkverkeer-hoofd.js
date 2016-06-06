// create color function
var color_scales = d3.scale.threshold()
    .domain([0.1, 0.2, 0.3, 0.4, 0.5,1.0,1.5,2.0])
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
			.style("z-index", "10")

	

function color_map(i, data, van_of_naar){
	// fill dataset in appropriate format
	alle_plaatsen = []
	if (van_of_naar == true){
		svg = d3.select('#svg_van')
		alle_plaatsen = data.plaatsen[i].Plaats.jaar[0].plaatsen_van
	}
	else 
	{
		svg = d3.select('#svg_naar')
		alle_plaatsen = data.plaatsen[i].Plaats.jaar[0].plaatsen_naar
		
	}
	path = svg.selectAll('path')
	alle_plaatsen.forEach(function(item){ 
		var iso = item.p;
        var value = item.m;
		if (value == "-"){
			colour = 'red'
		}
		else{
			colour= color_scales(value)
		}
		iso = iso.replace(/\s/g,'')
			svg.select('#'+iso).style('fill', colour)
				.on("mouseover", function(d){return tooltip.text(iso + ": "+ value).style("visibility", "visible");})
				.on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
				.on("mouseout", function(){return tooltip.style("visibility", "hidden");})
				.on("click", function(d){ 
					// convert the data to the correct format, missing values get an absurd high value, so they can be coloured separately
					for (i = 0; i < data.plaatsen.length; i++){
						if(data.plaatsen[i].Plaats.plaatsnaam.replace(/\s/g,'') == iso){
							color_map(i, data, true)
							color_map(i, data, false)
						}
					}
				})
			})
}
  
d3.json("data_hoofdvisualisatie_naar_goed.json", function(error, data) {
	if (error) {
		console.log("error")
		throw new Error("Something went badly wrong!");
	}
	color_map(2,data,true)
	color_map(2,data,false)
	

});


