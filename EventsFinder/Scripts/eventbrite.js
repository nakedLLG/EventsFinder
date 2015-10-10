jQuery(document).ready(function () {
    Eventbrite({ 'app_key': "YPOIM2AUNBOTUEFT7H" }, function (eb) {
        // NEW CODE
        var eb_options = {
            'user': 'email@address.abc',
            'event_statuses': 'live, started'
        };
        eb.user_list_events(eb_options, function (response) {
            // END NEW CODE
            var eventbrite_list = eb.utils.eventList(response, eb.utils.eventListRow);
            jQuery("#eventbrite-list").html(eventbrite_list);
            console.log(response);
        });
    });
});