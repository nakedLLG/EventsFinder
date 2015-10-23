var app = app || {};

(function () {
    "use strict";
    function Songkick() {
        
        var content = {
            eventsList: [],
            token: "O8wdJ6BXCMaTKv1k",
            events: null
        };
        
        var getSongkickEvents = function(){
            content.events = $.get("http://api.songkick.com/api/3.0/events.json?apikey={"+ content.token +"}", function (res) {
                if (res.events.length) {
                    res.events.forEach(function (event, i, arr) {
                        content.eventsList.push(event);
                        console.dir(event);
                    });
                } else {
                    console.log("Sorry, there are no upcoming events.");  
                }
            });
        };
        
        var takeTheEvents = function(){
            
            content.events.done(function(){
                return content.eventsList;
            });
            
        };
        
        return {
            getSongkickEvents: getSongkickEvents,
            takeTheEvents: takeTheEvents
        };
    }

    app.Songkick = Songkick;
}());