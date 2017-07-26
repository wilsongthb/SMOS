var app = angular.module('smos', [
    'ngRoute', 
    // 'ui.bootstrap'
])
.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html'
        })
        .when('/map', {
            templateUrl: 'views/map.html',
            controller: 'map'
        })
        .when('/status', {
            templateUrl: 'views/status.html',
            controller: 'status'
        })
})