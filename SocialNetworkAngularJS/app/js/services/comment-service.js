'use strict';

SocialNetwork.factory('commentService', function($http, baseServiceUrl, headersService) {
    var commentService = {};

    var commentServiceUrl = baseServiceUrl + '/post';

    // postData = {postContent: , username: }
    commentService.GetPostComments = function(postId, success, error) {
        $http.get(commentServiceUrl + '/' + postId + '/comments', {
                headers: headersService.GetHeaders()
            })
            .success(function(data, status, headers, config) {
                success(data);
            }).error(error);
    };

    // { postContent: }
    commentService.GetPostComments = function(postId, postData, success, error) {
        $http.post(commentServiceUrl + '/' + postId + '/comments', {
                headers: headersService.GetHeaders()
            })
            .success(function(data, status, headers, config) {
                success(data);
            }).error(error);
    };

    // { postContent: }
    commentService.EditPostComment = function(postId, commentId, postData, success, error) {
        $http.put(commentServiceUrl + '/' + postId + '/comments/' + commentId, {
                headers: headersService.GetHeaders()
            })
            .success(function(data, status, headers, config) {
                success(data);
            }).error(error);
    };

    commentService.DeletePostComment = function(postId, commentId, postData, success, error) {
        $http.delete(commentServiceUrl + '/' + postId + '/comments/' + commentId, {
                headers: headersService.GetHeaders()
            })
            .success(function(data, status, headers, config) {
                success(data);
            }).error(error);
    };

    commentService.getCommentDetailedLikes = function(postId, commentId, postData, success, error) {
        $http.get(commentServiceUrl + '/' + postId + '/comments/' + commentId + '/likes', {
                headers: headersService.GetHeaders()
            })
            .success(function(data, status, headers, config) {
                success(data);
            }).error(error);
    };

    commentService.getCommentPreviewLikes = function(postId, commentId, postData, success, error) {
        $http.get(commentServiceUrl + '/' + postId + '/comments/' + commentId + '/likes/preview', {
                headers: headersService.GetHeaders()
            })
            .success(function(data, status, headers, config) {
                success(data);
            }).error(error);
    };

    commentService.LikeComment = function(postId, commentId, success, error) {
        $http.post(commentServiceUrl + '/' + postId + '/likes', {
                headers: headersService.GetHeaders()
            })
            .success(function(data, status, headers, config) {
                success(data);
            }).error(error);
    };

    commentService.UnlikeComment = function(postId, commentId, success, error) {
        $http.delete(commentServiceUrl + '/' + postId + '/comments/' + commentId + '/likes', {
                headers: headersService.GetHeaders()
            })
            .success(function(data, status, headers, config) {
                success(data);
            }).error(error);
    };

    return commentService;
});