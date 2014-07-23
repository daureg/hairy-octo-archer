var NAMES = {'wallstreet': 'Wall Street, New-York',
    'soho': 'Soho, London',
    'mission': 'Mission, San Francisco'};
var GOLD = new L.FeatureGroup();
var world_bbox = [[60.242, -122.531], [60.242, 37.848], [29.577, 37.848], [29.577, -122.531]];
var map = create_map('map', world_bbox, {zoomAnimation: false});
var left = map;
function geojson_to_polygon(geo) {
	var style = {color: '#b22222', opacity: 0.6};
	if (geo.type === 'Polygon') {
		var coords = geo.coordinates[0], latlngs = [];
		for (var i = 0, l = coords.length; i < l-1; i++) {
			latlngs.push([coords[i][1], coords[i][0]]);
		}
		return L.polygon(latlngs, style);
	}
	return L.circle([geo.center[1], geo.center[0]], geo.radius, style);
}
function plot_gold(name) {
	var poly = null,
        features = WRES[name];
    document.title = "“" + NAMES[name] + "” elsewhere in the world";
	GOLD.clearLayers();
	for (var i = 0, l = features.length; i < l; i++) {
		var center = barycenter(features[i].geo.coordinates[0]),
			msg = (i+1).toString() +': ' + features[i].dst.toPrecision(3);
        var dot = L.marker(center, {clickable: false, opacity: 0.1, riseOnHover: true, icon: smallIcon})
            .bindLabel(msg, {noHide: true, direction: (Math.random() > 0.5) ? 'left': 'right' });
        GOLD.addLayer(dot);
        dot.showLabel();
		poly = geojson_to_polygon(features[i].geo);
		GOLD.addLayer(poly);
	}
}
var AREAS = null;
$(function() {
	map.addLayer(GOLD);
	plot_gold("mission");
	document.addEventListener('keydown', function(event) {
		var infos = {
			87: 'wallstreet', // W all Street
			77: 'mission', // M ission
			83: 'soho', // S oho
		};
		var district = infos[event.keyCode];
		if (district) {plot_gold(district);}
	});
});
