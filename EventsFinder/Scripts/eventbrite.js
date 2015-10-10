
$(document).ready(function () {

    var token = 'GGAQ2BUKIRGJMZMU55YZ';
    var $events = $("#events");

    $.get('https://www.eventbriteapi.com/v3/events/search/?token=' + token + '', function (res) {
        if (res.events.length) {
            var s = "<ul class='eventList'>";
            for (var i = 0; i < res.events.length; i++) {
                var event = res.events[i];
                console.dir(event);
                s += "<li><a href='" + event.url + "'>" + event.name.text + "</a> - " + event.description.text + "</li>";
            }
            s += "</ul>";
            $events.html(s);
        } else {
            $events.html("<p>Sorry, there are no upcoming events.</p>");
        }
    });


});