
var map = L.map('map', {
    zoom: 5,
    fullscreenControl: true,
    timeDimension: true,
    timeDimensionOptions:{
        timeInterval: "2025-01-01T12:00:00.000Z/2090-01-01T12:00:00.000Z",//PT1S,2030-01-01T12:00:00.000Z/2030-01-01T12:00:00.000Z/PT1S,2035-01-01T12:00:00.000Z/2035-01-01T12:00:00.000Z/PT1S,2040-01-01T12:00:00.000Z/2040-01-01T12:00:00.000Z/PT1S,2045-01-01T12:00:00.000Z/2045-01-01T12:00:00.000Z/PT1S,2050-01-01T12:00:00.000Z/2050-01-01T12:00:00.000Z/PT1S,2055-01-01T12:00:00.000Z/2055-01-01T12:00:00.000Z/PT1S,2060-01-01T12:00:00.000Z/2060-01-01T12:00:00.000Z/PT1S,2065-01-01T12:00:00.000Z/2065-01-01T12:00:00.000Z/PT1S,2070-01-01T12:00:00.000Z/2070-01-01T12:00:00.000Z/PT1S,2075-01-01T12:00:00.000Z/2075-01-01T12:00:00.000Z/PT1S,2080-01-01T12:00:00.000Z/2080-01-01T12:00:00.000Z/PT1S,2085-01-01T12:00:00.000Z/2085-01-01T12:00:00.000Z/PT1S,2090-01-01T12:00:00.000Z/2090-01-01T12:00:00.000Z/PT1S"//,
        period: "P5Y"
    },
    timeDimensionControl: true,
    timeDimensionControlOptions:{
        timeSteps: 1
    },    
    center: [-33, 117]
});

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'    
}).addTo(map);

var proxy = 'server/proxy.php';
var testWMS = "http://aws.kehan.info:8080/geoserver/swcc/wms"
var testLayer = L.tileLayer.wms(testWMS, {
    layers: 'swcc:tasmax_annual',
    format: 'image/png',
    transparent: true,
    styles: 'spectrum',
    attribution: '<a href="https://www.pik-potsdam.de/">PIK</a>'
});
var testTimeLayer = L.timeDimension.layer.wms(testLayer, {proxy: proxy});
testTimeLayer.addTo(map);

var testLegend = L.control({
    position: 'topright'
});
testLegend.onAdd = function(map) {
    var src = testWMS + "?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&LAYER=swcc:tasmax_annual&STYLE=spectrum&format=image/png";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
        '<img src="' + src + '" alt="legend">';
    return div;
};
testLegend.addTo(map);

L.control.coordinates({
    position: "bottomright",
    decimals: 3,
    labelTemplateLat: "Latitude: {y}",
    labelTemplateLng: "Longitude: {x}",
    useDMS: true,
    enableUserInput: false
}).addTo(map);