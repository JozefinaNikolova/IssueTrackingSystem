angular.module('issueTracker', [
        'ngRoute',
        'ui.bootstrap.pagination',
        'issueTracker.home',
        'issueTracker.dashboard',
        'issueTracker.addProject',
        'issueTracker.allProjects',
        'issueTracker.addIssue',
        'issueTracker.logout',
        'issueTracker.viewProject',
        'issueTracker.editProject',
        'issueTracker.viewIssue',
        'issueTracker.editIssue',
        'issueTracker.addIssueToProject'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');


$rootScope.$on('$locationChangeStart', function (event) {
        if (!sessionStorage.currentUser) {
                // Authorization check: anonymous site visitors cannot access user routes
                $location.path("/");
        }
});