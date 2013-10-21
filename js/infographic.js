width = $('#map').width();
var xy = d3.geo.mercator()
.center([-83.393,28.076])
.scale(3000)
.translate([width/2, 500/2]);
var path = d3.geo.path().projection(xy);

var svg = d3.select("#map")
.append("svg")
.attr("class", "shapes");

d3.json("data/regions.json", function(json) {
svg.selectAll("path")
.data(json.features)
.enter().append("path")
.attr("d", path)
.on("mouseover", mouseover)
});

d3.select('#circuits').on('click', changeGeo);
d3.select('#regions').on('click', changeGeo);
d3.select('#agencies').on('click', changeGeo);

function changeGeo() {
	$(this).parent().addClass('active');
	$(this).parent().siblings().removeClass('active');
	geoType = d3.select(this).attr('id').substring(0);
	d3.selectAll("path").remove();
		d3.json("data/"+geoType+".json", function(json) {
		svg.selectAll("path")
		.data(json.features)
		.enter().append("path")
		.attr("d", path)
		.on("mouseover", mouseover);
	});
}

function mouseover(d) {
	d3.select('#name').text('ID - '+d.properties.ID);
	// console.log(d);
}

