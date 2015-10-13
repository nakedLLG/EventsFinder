var app = app || {};

(function () {
    "use strict";

    //This class combines google maps API (gmaps.js) with other APIs to get events
    function Combiner() {

        var combiner = {
            map: null,
            theMap: null,
            events: null,
            eventsList: [],
            markers: [],
            infoWindows: [],
            token: 'GGAQ2BUKIRGJMZMU55YZ',
            getEvents: null
        };

        //Gets the events from EventBrite and push the events inside the EventsList
        var getEvents = function() {
            combiner.getEvents = $.get('https://www.eventbriteapi.com/v3/events/search/?token=' + combiner.token + '&expand=venue&venue.country='+ value +'&venue.city=aarhus', function (res) {
                if (res.events.length) {
                    res.events.forEach(function (event, i, arr) {
                        combiner.eventsList.push(event);
                        console.dir(event);
                    });
                } else {
                    console.log("Sorry, there are no upcoming events.");
                }
            });
        }; // End of getEvents()
        var initAll = function () {
            initMap();
            getEvents();
            createMarkers();
        };

        var initMap = function () {
            combiner.map = new app.Map();
            combiner.map.initMap(56.157, 10.211);
        };

        var createMarkers = function () {

            combiner.getEvents.done(function () {
                combiner.eventsList.forEach(function (event, i, arr) {
                    if (event.venue) {
                        var shortDescription = event.description.text.substring(0, 200);
                        var contentString =
                        '<div id="content">' +
                            '<div id="siteNotice">' +
                            '</div>' +
                            '<h2 id="firstHeading" class="firstHeading">'+event.name.text+'</h2>' +
                            '<div id="bodyContent">' +
                                '<p>' +
                                    shortDescription + ' ... <a href="' + event.url + '" target="_blank">' +
                                    'Read More</a> ' +
                                '</p>' +
                            '</div>' +
                        '</div>';
                        var infowindow = combiner.map.createInfoWindow(contentString);
                        combiner.infoWindows.push(infowindow);
                        var marker = combiner.map.createMarker(parseFloat(event.venue.latitude), parseFloat(event.venue.longitude), event.name.text);
                        combiner.markers.push(marker);
                        var markerToAttach = combiner.markers[combiner.markers.indexOf(marker)];
                        var infoWindowToAttach = combiner.infoWindows[combiner.infoWindows.indexOf(infowindow)];
                        combiner.map.attachInfoWindow(markerToAttach, infoWindowToAttach);
                    }
                });
            });
        };

        initAll();
    }

    app.Combiner = Combiner;
}());