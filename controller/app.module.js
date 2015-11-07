

(function() {
    'use strict';

    angular
        .module('EventApp', [
            'ngRoute'

        ]
    )
        .config(function($routeProvider){
            $routeProvider
                .when('/',{
                    templateUrl:'../partials/main.html'


                })
                .otherwise({ redirectTo: '/'});
        })

}());