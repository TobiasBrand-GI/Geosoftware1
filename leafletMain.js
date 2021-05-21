
    var mymap = L.map('mapid').setView([51.505, -0.09], 13);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);
    var geojsonLayer = 
        $.ajax({
            url:"src/Route_Uebung4.geojson",
            dataType: "json",
            success: console.log("Data successfully loaded!"),
            error: function (xhr) {
               alert(xhr.statusText)
            }
           })
           console.log(geojsonLayer);
    var myLayer = L.geoJSON().addTo(mymap);
    myLayer.addData(geojsonLayer);