'use strict';

// The AppController holds the presentation logic for the entire app (common all screens)
app.controller('UserController',
    function ($scope, $location, authService, notifyService, userService) {

        var ClearData = function() {
            $scope.loginData = "";
            $scope.registerData = "";
            $scope.userData = "";
            $scope.passwordData = "";
        };

        $scope.changePassword = function() {
          userService.ChangePassword($scope.userData,
              function(serverData) {
                  notifyService.showInfo("Successful Password Change!");
                  ClearData();
                  $location.path('/home');
              },
              function(serverError) {
                  notifyService.showError("Unsuccessful Password Change!", serverError);
              });
        }

        $scope.editUser = function() {
           profileService.EditUserProfile($scope.userData,
               function(serverData) {
                   notifyService.showInfo("Successful Profile Edit!");
                   ClearData();
                   $location.path('/');
               },
               function(serverError) {
                   notifyService.showError("Unsuccessful Profile Edit!", serverError);
               });
       };

    }
);
