angular.module('issueTracker.changePassword', ['issueTracker.services.authentication'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/profile/password', {
            templateUrl: 'home/change-password/change-password.html',
            controller: 'ChangePasswordController'
        })
    }])
    .controller('ChangePasswordController', [
        '$scope',
        '$location',
        'authentication',
        'notifyService',
        function($scope, $location, authentication, notifyService){
            $scope.changePassword = function(user) {
                authentication.changePassword(user)
                    .then(function success() {
                        notifyService.showSuccess('Password changed successfully!');
                        $location.path('/');
                    }, function error(err) {
                        notifyService.showError('Password change failed.', err);
                    });
            };
        }
    ]);