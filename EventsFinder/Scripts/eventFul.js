(function () {
    "use strict";
    var items = [];
    $.getJSON('http://api.eventful.com/json/events/search?...&where=32.746682,-117.162741&within=25', function (data) {
        $.each(data.events.event, function (key, val) {
            items.push(key + " : " + val);
        });
        $("#output").append("<p>" + items[0] + "</p>");
    });

}());