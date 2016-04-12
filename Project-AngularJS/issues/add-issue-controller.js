angular.module('issueTracker.addIssue', ['issueTracker.services.issues'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add-issue', {
            templateUrl: 'issues/Add-new-issue.html',
            controller: 'AddIssueController'
        })
    }])
    .controller('AddIssueController', [
        '$scope',
        'issues',
        function($scope, issues){
            $scope.addNewIssue = function (issue) {
                issues.addIssue(issue);
            }
        }
    ]);