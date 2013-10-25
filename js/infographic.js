// The following line initialize the map
// And also setup how it is displayed.

width = $('#map').width();
var xy = d3.geo.mercator()
.center([-83.393,28.076])
.scale(3000)
.translate([width/2, 500/2]);
var path = d3.geo.path().projection(xy);

// Set the default active geography as the region.
var activeGeo = 'Region';

// Set the default active KPI as KPI 1
var activeKpi = 'kpi1'

var svg = d3.select("#map")
.append("svg")
.attr("class", "shapes Blues");

// In the above line, change Blues to Purples, Reds, Greens or Oranges
// based on what color you want the map to be.

// Load the region map data.

d3.json("data/region.json", function(json) {
svg.selectAll("path")
.data(json.features)
.enter().append("path")
.attr("d", path)
// Uncomment the following line to change the color of the 
// shapes based on the data. You have also update the variable
// names in the function called 'quantize'.
// .attr("class", data ? quantize : null)
.on("mouseover", mouseover)
.on("mouseout", mouseout);

// Uncomment the following line to add click interaction to
// the shapes. You have to uncomment the 'click' function and
// write the required action there.
// .on("click", function(d) {clicked(d, this); });
});

// The following function is used to import JSON data.
// Give the correct path to the file and the data will be available in 'data'.
// d3.json("path to JSON data file", function(json) {
// 	data = json;
// });

// The following function is used to import CSV data.
// Give the correct path to the file and the data will be available in 'csv_data'.
// d3.csv("path to CSV data file", function(csv) {
//     csv_data = csv;
//  });

// Following lines for changing the geo type when the user
// clicks the links in the header. 

d3.select('#circuit').on('click', changeGeo);
d3.select('#region').on('click', changeGeo);
d3.select('#agency').on('click', changeGeo);

function changeGeo() {
	$(this).parent().addClass('active');
	$(this).parent().siblings().removeClass('active');
	geoType = d3.select(this).attr('id').substring(0);
	activeGeo = geoType[0].toUpperCase()+geoType.substring(1);
	d3.selectAll("path").remove();
		d3.json("data/"+geoType+".json", function(json) {
		svg.selectAll("path")
		.data(json.features)
		.enter().append("path")
		.attr("d", path)
		.on("mouseover", mouseover)
		.on("mouseout", mouseout);
	});
}

function mouseover(d) {
	d3.select('#name').classed('hide', false);
	d3.select('#help').classed('hide', true);
	d3.select('#name').text(activeGeo+' - '+d.properties.ID);
}

function mouseout(d) {
	d3.select('#help').classed('hide', false);
	d3.select('#name').classed('hide', true);
}

// function quantize(d) {
// 	shape_data = data[d.properties['code']]; //replace code with the field where the ID is.
//     color = "q" + Math.min(7, ~~(shape_data[0]['variable'] / 20)) + "-9"; //replace variable with the field where the value is.
//     return color;
//   }

// function clicked (argument) {
// 	// body...
// }

// The following lines are for actions when the KPI buttons are clicked.
// The load the required data and redraw the charts in the function below.

d3.selectAll('button').on('click', changeKPI);

function changeKPI() {
	d3.selectAll('button').classed('active', false);
	d3.select(this).classed('active', true);
	kpi = d3.select(this).text().toLowerCase().replace(/\s/g, '');
	// the 'kpi' variable gives the KPI clicked just now.
	// Load data.
	// Redraw chars.
}