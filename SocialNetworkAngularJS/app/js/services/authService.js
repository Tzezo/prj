'use strict';

app.factory('authService',
    function ($http, baseServiceUrl) {
        return {
            login: function(userData, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/users/login',
                    data: userData
                };

                var authServiceThis = this;

                $http(request).success(function(data) {

                    data.username = userData.username;
                    sessionStorage['currentUser'] = JSON.stringify(data);

                    $http.get(baseServiceUrl + '/api/me', {
                            headers: authServiceThis.getAuthHeaders()
                        })
                        .success(function(currentUserData, status, headers, config) {
                            currentUserData.loginData = data;

                            if(!currentUserData.profileImageData)
                            {
                                currentUserData.profileImageData = 'img/default_avatar.jpg';
                            }
                            sessionStorage['currentUserData'] = JSON.stringify(currentUserData);
                            success(data);

                        }).error(error);

                }).error(error);
            },

            register: function(userData, success, error) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + '/api/users/register',
                    data: userData
                };
                $http(request).success(function(data) {
                    sessionStorage['currentUser'] = JSON.stringify(data);
                    success(data);
                }).error(error);
            },

            logout: function() {
                delete sessionStorage['currentUser'];
            },

            getCurrentUser : function() {
                var userObject = sessionStorage['currentUserData'];
                if (userObject) {
                    var obj = JSON.parse(sessionStorage['currentUserData']);
                    obj.loginData = JSON.parse(sessionStorage['currentUser']);

                    return obj;
                }
            },

            isAnonymous : function() {
                return sessionStorage['currentUser'] == undefined;
            },

            isLoggedIn : function() {
                return sessionStorage['currentUser'] != undefined;
            },

            isNormalUser : function() {
                var currentUser = this.getCurrentUser();
                return (currentUser != undefined) && (!currentUser.isAdmin);
            },

            isAdmin : function() {
                var currentUser = this.getCurrentUser();
                return (currentUser != undefined) && (currentUser.isAdmin);
            },

            getAuthHeaders : function() {
                var headers = {};
                var currentUser = this.getCurrentUser();

                if (currentUser.loginData) {
                    headers['Authorization'] = 'Bearer ' + currentUser.loginData.access_token;
                }
                return headers;
            }
        }
    }
);
