width = $('#map').width();
var xy = d3.geo.mercator()
.center([-83.393,28.076])
.scale(3000)
.translate([width/2, 500/2]);
var path = d3.geo.path().projection(xy);

var activeGeo = 'Region';

var svg = d3.select("#map")
.append("svg")
.attr("class", "shapes");

d3.json("data/region.json", function(json) {
svg.selectAll("path")
.data(json.features)
.enter().append("path")
.attr("d", path)
.on("mouseover", mouseover)
.on("mouseout", mouseout);

});

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

