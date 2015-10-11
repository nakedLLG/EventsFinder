var app = app || {};

(function () {
    "use strict";

    function Combiner() {

        var combiner = {
            map: null,
            theMap: null,
            events: null,
            eventsList: [],
            markers: [],
            token: 'GGAQ2BUKIRGJMZMU55YZ',
            getEvents: null,
            getVenues: null,
            venues: []

        };

        //Gets the events from EventBrite and push the events inside the EventsList
        var getEvents = function() {
            combiner.getEvents = $.get('https://www.eventbriteapi.com/v3/events/search/?token=' + combiner.token + '&expand=venue', function (res) {
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
                    combiner.markers.push(combiner.map.createMarker(parseFloat(event.venue.latitude), parseFloat(event.venue.longitude), event.name.text));
                });
            });
        };

        /*var createMarkers = function () {
            //Waiting for the response
            combiner.getEvents.done(function () {
                //Verifying if there are elements inside the venues
                if (combiner.venues.length) {

                    //Getting the venue location using the ids
                    combiner.venues.forEach(function (myVenue, i, arr) {
                        myVenue.done = $.get('https://www.eventbriteapi.com/v3/venues/:id'+myVenue.venue_id +'/?token=' + combiner.token, function (venue) {
                            if (venue) {
                                myVenue.latitude = venue.latitude;
                                myVenue.longitude = venue.longitude;
                            } else {
                                console.log("Sorry, there are no upcoming events.");
                            }
                        });
                    });
                }else{
                    console.log("combiner.venues is empty");
                }

             
                combiner.eventsList.forEach(function (event, i, arr) {
                    combiner.venues.forEach(function (venue, i, arr) {
                        venue.done(function(){
                           if(venue.event_id == event.event_id){
                               combiner.markers.push(combiner.map.createMarker(venue.latitude, venue.longitude, event.name.text));
                           }
                        });
                    });
                });
            });

        };*/

        initAll();
    }

    app.Combiner = Combiner;
}());