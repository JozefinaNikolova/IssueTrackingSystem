angular.module('issueTracker', [
        'ngRoute',
        'issueTracker.home'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '#/'});
    }])
    .constant('BASE_URL', 'http://softuni-social-network.azurewebsites.net/api/');