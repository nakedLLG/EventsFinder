var app = app || {};

(function () {
    "use strict";
    
    //This class combines google maps API (gmaps.js) with other APIs to get events
    function Combiner() {
        
        var combiner = {
            map: null,
            events: null,
            eventsList: [],
            markers: [],
            infoWindows: [],
            token: 'V3JOI66SWU6O2P3CB4IO',
            getEvents: null,
            country: '',
            city: ''
        };
        
        //DOM elements 
        var message = document.getElementById("message");
        var searchBtn = document.getElementById("search");
        var resetBtn = document.getElementById("reset");
        var searchForm = document.getElementById("searchForm");
        searchBtn.addEventListener("click", setPreferences);
        resetBtn.addEventListener("click", resetBtns);
        
        //Hide ad show the search bar, search button and reset button
        function resetBtns(){
            searchBtn.className = "btn btn-success";
            searchForm.className = "form-inline";
            resetBtn.className = "hidden";
        };
        
        //Get the user input from the search bar and the select element
        function setPreferences(){
            searchBtn.className = "hidden";
            searchForm.className = "hidden";
            resetBtn.className = "btn btn-danger";
            var country = document.getElementById("country");
            var city = document.getElementById("city");
            //country.options[country.selectedIndex].selected = 'selected';
            //city.placeholder = city.value;
            combiner.country = '&venue.country=' + country.options[country.selectedIndex].value;
            if(city.value !== ""){
                combiner.city = '&venue.city=' + city.value;
            }else{
                combiner.city = "";
            }
            
            //After the user select the country and the city it calls all the functions.
            initAll();
        }; 
                
        var initAll = function () {
            getEvents();
            initMap();
            createMarkers();           
        };
        //REMINDER: MAKE ANOTHER FILE FOR THIS.
        //Gets the events from EventBrite and push the events inside the EventsList
        var getEvents = function() {
            combiner.getEvents = $.get('https://www.eventbriteapi.com/v3/events/search/?token=' +combiner.token+ '&expand=venue' + combiner.country + combiner.city, function (res) {
                if (res.events.length) {
                    res.events.forEach(function (event, i, arr) {
                        combiner.eventsList.push(event);
                        console.dir(event);
                    });
                } else {
                    //console.log("Sorry, there are no upcoming events.");
                    message.innerHTML = "Sorry, there are no upcoming events.";   
                }
            });
        }; // End of getEvents()
        
        var initMap = function () {
            combiner.getEvents.done(function () { 
                combiner.map = new app.Map();
                combiner.map.initMap();
                combiner.map.fitTheMap();
            });
        };
        
        var createMarkers = function () {
            combiner.getEvents.done(function () {
                combiner.eventsList.forEach(function (event, i, arr) {
                    if (event.venue) {
                        var shortDescription = event.description.text.substring(0, 200);
                        var date = event.start.local.split("T");
                        var contentString =
                                '<div id="content">' +
                                '<div id="siteNotice">' +
                                '</div>' +
                                '<h2 id="firstHeading" class="firstHeading">'+event.name.text+'</h2>' +
                                '<h3 id="secondHeading" class="secondHEading"> Date: ' + date[0] + ' Time: ' + date[1] + '</h3>' +
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
        
    }
    
    app.Combiner = Combiner;
}());