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

        $scope.userData = authService.getCurrentUser();

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
           userService.EditUserProfile($scope.userData,
               function(serverData) {
                   notifyService.showInfo("Successful Profile Edit!");
                   ClearData();
                   
                   $location.path('/');
               },
               function(serverError) {
                   notifyService.showError("Unsuccessful Profile Edit!", serverError);
               });
       };

       $scope.addImage = function(inputID, thumbnailSelector) {
          var PROFILE_IMG_LIMIT = 128;
          var COVER_IMG_LIMIT = 1024;

          // Reads the selected file and returns the data as a base64 encoded string
          var input = document.getElementById(inputID);
          var file = input.files[0],
              fileSize = file.size / 1000,
              reader;

          if (file.type.match(/image\/(jpg|jpeg)/)) {
              reader = new FileReader();
              if (inputID == 'addAvatarImage') {
                  if (fileSize <= PROFILE_IMG_LIMIT) {
                      reader.onload = function(e) {
                          $(thumbnailSelector).attr('src', e.target.result);
                          $scope.userData.profileImageData = e.target.result;
                      };
                  } else {
                      notifyService.showError("Image should be less than " + PROFILE_IMG_LIMIT + "kb");
                  }
              } else {
                  if (fileSize <= COVER_IMG_LIMIT) {
                      reader.onload = function(e) {
                          $(thumbnailSelector).attr('src', e.target.result);
                          $scope.userData.coverImageData = e.target.result;
                      };
                  } else {
                      notifyService.showError("Image should be less than " + COVER_IMG_LIMIT + "kb");
                  }
              }
              reader.readAsDataURL(file);
          } else {
              notifyService.showError("Wrong file format");
          }
      };

    }
);
