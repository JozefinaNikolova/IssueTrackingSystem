angular.module('issueTracker.services.authentication', [])
    .factory('authentication', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL) {

            function registerUser(user) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/Account/Register', user)
                    .then(function(response) {
                        deferred.resolve(response.data);
                    }, function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function loginUser(user) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/Token', "username=" + encodeURIComponent(user.username) +
                    "&password=" + encodeURIComponent(user.password) +
                    "&grant_type=password")
                    .then(function(response) {
                        deferred.resolve(response.data);
                    }, function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function logout() {
                var deferred = $q.defer();
                $http.post(BASE_URL + 'api/Account/Logout', null)
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (error) {
                        deferred.reject(error)
                    });

                return deferred.promise;
            }

            function changePassword(user){
                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/Account/ChangePassword', user)
                    .then(function success() {
                        deferred.resolve()
                    }, function error(err) {
                        deferred.reject(err);
                    });

                return deferred.promise;
            }

            function setCredentials(data) {
                sessionStorage.currentUser = JSON.stringify(data);
                sessionStorage.username = data.userName;
                $http.defaults.headers.common.Authorization =
                    'Bearer ' + data.access_token;
            }

            function clearCredentials() {
                delete sessionStorage.currentUser;
                delete $http.defaults.headers.common.Authorization;
            }

            function isLogged(){
                return sessionStorage['currentUser'] != undefined;
            }

            return {
                registerUser: registerUser,
                loginUser: loginUser,
                logout: logout,
                changePassword: changePassword,
                setCredentials: setCredentials,
                clearCredentials: clearCredentials,
                isLogged: isLogged
            }
        }]);