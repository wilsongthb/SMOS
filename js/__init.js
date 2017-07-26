var app = angular.module('smos', [
    'ngRoute', 
    // 'uiGmapgoogle-maps'
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
})