'use strict';

app.controller('LoginController',
    function ($scope, $rootScope, $location, authService, notifyService) {
        if(sessionStorage['currentUser'])
        {
            $location.path("/home");
        }

        var ClearData = function() {
            $scope.loginData = "";
            $scope.registerData = "";
            $scope.userData = "";
            $scope.passwordData = "";
        };

        $scope.login = function(userData) {
            authService.login(userData,
                function success() {
                    notifyService.showInfo("Login successful");
                    ClearData();
                    $location.path("/home");
                },
                function error(err) {
                    notifyService.showError("Login failed", err);
                }
            );
        };
    }
);
