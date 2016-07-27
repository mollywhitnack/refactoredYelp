'use strict';

var app = angular.module('myApp');

app.controller('usersCtrl', function($scope, $$state, $state, User) {

  var userPromise = User.getAll();
  userPromise.then(
    function(result) {
       $scope.userFeed = result.data;
    });
});