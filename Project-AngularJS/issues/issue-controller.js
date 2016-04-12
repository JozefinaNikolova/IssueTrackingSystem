angular.module('issueTracker.issue', ['issueTracker.services.issues'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add-issue', {
            templateUrl: 'issues/Add-new-issue.html',
            controller: 'IssueController'
        })
    }])
    .controller('IssueController', [
        '$scope',
        'issues',
        function($scope, issues){
            $scope.addNewIssue = function (issue) {
                issues.addIssue(issue);
            }
        }
    ]);