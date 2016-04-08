angular.module('issueTracker.home', ['issueTracker.users.authentication'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'home/guestHome.html',
            controller: 'HomeController'
        })
    }])
    .controller('HomeController', [
        '$scope',
        '$location',
        'authentication',
        function($scope, $location, authentication) {
            $scope.loginUser = function (user) {
                authentication.loginUser(user)
                    .then(function(loggedInUser){
                        console.log(loggedInUser);
                        $location.path('/dashboard');
                    })
            };

            $scope.registerUser = function (user) {
                authentication.registerUser(user)
                    .then(function(registeredUser) {
                        console.log(registeredUser);
                    });
            };
        }]);