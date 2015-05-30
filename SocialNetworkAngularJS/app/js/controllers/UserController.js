'use strict';

// The AppController holds the presentation logic for the entire app (common all screens)
app.controller('UserController',
    function ($scope, $location, authService, notifyService, userService) {
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
    }
);
