angular.module('issueTracker.dashboard', ['issueTracker.issues.issues'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardController'
        })
    }])
    .controller('DashboardController', [
        '$scope',
        'issues',
        function($scope, issues){
            issues.getUserIssues(10, 1, 'DueDate desc')
                .then(function (userIssues) {
                    console.log(userIssues);
                })
        }
    ]);