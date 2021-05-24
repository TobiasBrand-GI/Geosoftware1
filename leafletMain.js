'use strict'
const weatherApi="4e15e7789d8b6aeb5a704566f3b07c48";  // PLEASE ENTER YOUR VALID OPENWEATHERMAP KEY HERE

/**
 * Basemap for Leaflet Application
 * @type Leaflet Map
 */
    let mymap = L.map('mapid').setView([52, 9],6);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

/**
 * Layer containing the given MultilineString
 * @type Leaflet Layer
 */
    let myLayer = L.geoJSON(geoJsonFeature).addTo(mymap);

/**
 * Layer for later addition of markers
 * @type Leaflet Layer
 */
    let markerLayer = new L.layerGroup().addTo(mymap);

/**
 * Layer on which the User can draw a shape
 * @type Leaflet Layer
 */
    let drawnItems = L.featureGroup().addTo(mymap);

// Adding a Leaflet.Draw Toolbar
    mymap.addControl(new L.Control.Draw( {
        edit: {
            featureGroup: drawnItems,
            poly: {
                allowIntersection: false
            }
        },
        draw: {
            // Only rectangle draw function is needed
            polyline: false,
            polygon: false,
            marker: false,
            circle:false,
            rectangle: true
        }
    }))

// Listener to catch when a shape is drawn onto the map
    mymap.on(L.Draw.Event.CREATED, function (event) {
        var layer = event.layer;
        drawnItems.addLayer(layer);
        $(".leaflet-draw-toolbar-top").css("visibility","hidden"); // Disable draw button to prevent multiple shapes
        
        // Starting algorithm for markers and weather data
        let intersectObj = intersect(myLayer, drawnItems);
        createMarkers(intersectObj);
    })

// Listener to catch when a shape is deleted from the map
    mymap.on('draw:deleted', function(e){
        var layers = e.layers;
        layers.eachLayer(function (layer) {
            markerLayer.clearLayers(); // Clearing old markers
            $(".leaflet-draw-toolbar-top").css("visibility","visible"); // Enabling drawing tool
        });
    })

// Listener to catch when the existing shape is edited
    mymap.on('draw:edited', function(e){
        var layers = e.layers;
        layers.eachLayer(function (layer) {
            markerLayer.clearLayers(); // Clearing old markers
            // Starting new Marker calculation
            let intersectObj = intersect(myLayer, drawnItems);
            createMarkers(intersectObj);
        });
    })

/**
 * This method uses the turf.js lineIntersect calculation to calculate the intersection points of the drawn polygon and the given linestring.
 * @param {*} lineLayer Layer Object from Leaflet (the route)
 * @param {*} drawnItems Layer Object from Leaflet.Draw (the rectangle)
 * @returns Array of Coordinates from the intersection points
 */
function intersect(lineLayer,drawnItems ){
    var polygon = drawnItems.toGeoJSON();
    var polyline = lineLayer.toGeoJSON();
    var split = turf.lineIntersect(polyline, polygon);
    return split;
}

/**
 * This method creates markers on specific points on a leaflet map with local weather data as a popup
 * @param {*} coordCollection Array of Coordinates
 */
function createMarkers(coordCollection){
    for (var i = 0; i < coordCollection.features.length; i++) {
        let pointCoord = coordCollection.features[i].geometry.coordinates;
        let reversedCoord = pointCoord.reverse();
        let marker = L.marker(reversedCoord).addTo(markerLayer);
        getWeatherData(reversedCoord, marker);
    }
}

/**
 * The method starts a ajax request to get data from OpenWeatherMap at a given location and appends the result to a given marker as a String popup
 * @param {*} coordinateArray Coordinates of a single point
 * @param {*} marker Leaflet marker object
 */
function getWeatherData(coordinateArray, marker){
    let lat= coordinateArray[0];
    let lng= coordinateArray[1];
    //let tempText="";
    let url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lng + "&exclude=minutely,hourly,daily&appid=" + weatherApi+"&units=metric"
    $.ajax({
        url: url,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(result){
            console.log(result.current.temp);
            let weather = "<b>current Weather:</b><br>" +result.current.weather[0].description + "<br>" + result.current.temp + "°C";
            console.log(weather);
            marker.bindPopup(weather).openPopup();
        }
    }).done(function() {
        $( this ).addClass( "done" );
      });
}