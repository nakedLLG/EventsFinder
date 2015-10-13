var app = app || {};

(function () {
    "use strict";
    function Map() {
        var map = null;
        var markerBounds = new google.maps.LatLngBounds();
        // Create a map object centered with latitude and longitude and specify the DOM element for display.
        function initMap() {
            map = new google.maps.Map(document.getElementById("map"), {
                scrollwheel: true
            });
        }; //End of initMap()

        // Create a marker with a name and set its position.
        function createMarker(latitude, longitude, name) {
            var latlng = new google.maps.LatLng(latitude, longitude);
            var marker = new google.maps.Marker({
                map: map,
                position: latlng,
                title: name
            });
            markerBounds.extend(latlng);
            return marker;
        };

        function createInfoWindow(text) {
            var infowindow = new google.maps.InfoWindow({ content: text });
            return infowindow;
        };

        function attachInfoWindow(marker, infowindow) {
            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });
        };

        function fitTheMap() {
            map.fitBounds(markerBounds);
            map.setCenter(markerBounds.getCenter());
        };

        //Revealing module of the class Map
        return {
            initMap: initMap,
            createMarker: createMarker,
            createInfoWindow: createInfoWindow,
            attachInfoWindow: attachInfoWindow,
            fitTheMap: fitTheMap
        };

    }// End of class Map()

    app.Map = Map;
}());