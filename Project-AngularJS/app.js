angular.module('issueTracker', [
        'ngRoute',
        'ui.bootstrap.pagination',
        'issueTracker.notifyService',
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
        'issueTracker.addIssueToProject',
        'issueTracker.services.authentication',
        'issueTracker.changePassword'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .run(['$rootScope', '$location', 'authentication', function($rootScope, $location, authentication) {
        $rootScope.$on('$locationChangeStart', function(event) {
            if(!authentication.isLogged()) {
                $location.path('/');
            }
        });
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
