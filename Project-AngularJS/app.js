angular.module('issueTracker', [
        'ngRoute',
        'issueTracker.home',
        'issueTracker.dashboard',
        'issueTracker.addProject',
        'issueTracker.allProjects',
        'issueTracker.addIssue',
        'issueTracker.logout',
        'issueTracker.viewProject'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
