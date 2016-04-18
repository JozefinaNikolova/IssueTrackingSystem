angular.module('issueTracker.viewIssue', ['issueTracker.services.issues'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/issues/:id', {
            templateUrl: 'issues/view-issue/view-issue.html',
            controller: 'ViewIssueController'
        })
    }])
    .controller('ViewIssueController', [
        '$scope',
        '$routeParams',
        '$route',
        'issues',
        'notifyService',
        function($scope, $routeParams, $route, issues, notifyService){
            var currentId = $routeParams.id;
            issues.getIssuesById(currentId)
                .then(function (data) {
                    var labels = [], priorities = [];

                    for (var i = 0; i < data.Labels.length; i++) {
                        labels.push(data.Labels[i].Name);
                    }

                    data.Labels = labels.join(', ');

                    $scope.issue = data;
                });

            $scope.changeStatus = function (id) {
                issues.editIssueStatus(currentId, id)
                    .then(function (success) {
                        $route.reload();
                        notifyService.showSuccess('Status changed successfully!');
                    },
                        function (error) {
                            notifyService.showError('Unable to change status.', data);
                        })
            };
        }
    ]);