angular.module('issueTracker', [
        'ngRoute',
        'issueTracker.home',
        'issueTracker.dashboard',
        'issueTracker.project'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
