'use strict';

let app = angular.module('myApp');

app.controller('imageCtrl', function($scope, Upload, Profile, $rootScope) {
  console.log("image ctrl");


  $rootScope.currentUser = Profile;

  $scope.submit = () =>{
    console.log('submit');
    console.log('$scope.file:', $scope.file);
    
    Upload.upload({
      url: '/api/images',
      data: {photo: $scope.file, user: $rootScope.currentUser._id} //anything else like name will end up in req.body
    })
    .then(res =>{
      console.log('res: ', res);
      $scope.savedImage = res.data;
    })
    .catch(err =>{
      console.log("err:", err)
    })
  };

});


