angular.module('issueTracker.home', ['issueTracker.services.authentication'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'home/guest-home/guest-home.html',
            controller: 'HomeController'
        })
    }])
    .controller('HomeController', [
        '$scope',
        '$location',
        'authentication',
        'notifyService',
        function($scope, $location, authentication, notifyService) {
            $scope.loginUser = function (user) {
                authentication.loginUser(user)
                    .then(function (data){
                        authentication.setCredentials(data);
                        $location.path('/dashboard');
                        notifyService.showSuccess('User logged in successfully!');
                    },
                        function (error){
                            notifyService.showError('Unsuccessful log in.', error);
                    })
            };

            $scope.registerUser = function (user) {
                authentication.registerUser(user)
                    .then(function (success) {
                        notifyService.showSuccess('User registered successfully!');
                        $scope.loginUser({
                            username: user.email,
                            password: user.password
                        });
                    },
                        function (error){
                            notifyService.showError('Unsuccessful registration.', error);
                        });
            };
        }]);