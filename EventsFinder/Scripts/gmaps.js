var app = app || {};

(function () {
    "use strict";
    function Map() {
        var map = null;
        // Create a map object centered with latitude and longitude and specify the DOM element for display.
        function initMap(latitude, longitude) {
            map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: latitude, lng: longitude },
                scrollwheel: true,
                zoom: 8
            });
        }; //End of initMap()

        // Create a marker with a name and set its position.
        function createMarker(latitude, longitude, name) {

            var marker = new google.maps.Marker({
                map: map,
                position: { lat: latitude, lng: longitude },
                title: name
            });

            return marker;
        };

        //Revealing module of the class Map
        return {
            initMap: initMap,
            createMarker: createMarker
        };

    }// End of class Map()

    app.Map = Map;
}());