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

var data ={}

d3.json("data_hoofdvisualisatie.json", function(error, data) {
	if (error) {
		console.log("error")
		throw new Error("Something went badly wrong!");
	}
	
	data=data
	svg = d3.select('svg')	
	// fill dataset in appropriate format
	data.plaatsen[15].Plaats.jaar[0].plaatsen_van.forEach(function(item){ 
		var iso = item.plaats;
        var value = item.aantal_mensen;
		colour= color(value)
		svg.select('#'+iso).style('fill', colour)

    });
});
console.log("hallo")
console.log(data)
