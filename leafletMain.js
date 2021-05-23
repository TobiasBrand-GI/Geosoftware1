'use strict'

var mymap = L.map('mapid').setView([52, 9],6);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);
let leafletRoute=[];
var myLayer = L.geoJSON(geoJsonFeature, {
    onEachFeature: function (feature, layer) {
       leafletRoute.push(feature.geometry.coordinates);
    }
}).addTo(mymap);
console.log(leafletRoute);
var drawnItems = L.featureGroup().addTo(mymap)
mymap.addControl(new L.Control.Draw( {
    edit: {
        featureGroup: drawnItems,
        poly: {
            allowIntersection: false
        }
    },
    draw: {
        polyline: false,
        polygon: false,
        marker: false,
        circle:false,
        rectangle: true
    }
}))

mymap.on(L.Draw.Event.CREATED, function (event) {
    var layer = event.layer;
    drawnItems.addLayer(layer);
})

function lineSplit(polygon, polyline){

}