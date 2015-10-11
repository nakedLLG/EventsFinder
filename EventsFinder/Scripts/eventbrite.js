var app = app || {};

$(document).ready(function () {
    function Events() {

        var token = 'GGAQ2BUKIRGJMZMU55YZ';
        var $events = $("#events");
        var eventsList = [];
        var get = null;
        function getEvents() {
            get = $.get('https://www.eventbriteapi.com/v3/events/search/?token=' + token + '', function (res) {
                if (res.events.length) {
                    res.events.forEach(function (event, i, arr) {
                        eventsList.push(event);
                        console.dir(event);
                    });
                } else {
                    console.log("Sorry, there are no upcoming events.");
                }
            });
        }; // End of getEvents()

        function readyForTheList() {
            get.done(function () {
                return true;
            });
        };

        function getEventsList() {
            return eventsList;
        };
        
        //Revealing module of class Events
        return {
            readyForTheList: readyForTheList,
            getEventsList: getEventsList,
            getEvents: getEvents
        };

    }// End of class Events

    app.Events = Events;
});