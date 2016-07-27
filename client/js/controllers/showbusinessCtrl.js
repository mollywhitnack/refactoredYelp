'use strict';

let app = angular.module('myApp');


app.controller('showbusinessCtrl', function($scope, $stateParams, Business, Profile, User) {
  console.log('showbusinessCtrl!');

  $scope.showButton = false;
  $scope.singletoggleFave = false;
  var favorites = Profile.favorites;
  //console.log("faves: ", favorites);

  let businessId = $stateParams;
  console.log("businessId", businessId.businessId);

  Business.searchYelp(businessId.businessId)
  .then(res =>{
    console.log("res:" , res);
    $scope.business = res;
    console.log("redID:", res.id);
    console.log("faves" , favorites);
    $scope.showButton = true;
    for(var i =0; i< favorites.length; i++){
      console.log(favorites[i], " vs ", res.id);
      if(favorites[i] === res.id){
        $scope.singletoggleFave = true;
      }
    }
  })   
  .catch(err =>{
    console.log("err in businessCtrl: ", err);
  })

  $scope.favorite = ()=>{
      $scope.singletoggleFave = !$scope.singletoggleFave;
      console.log("$scope.business.id", $scope.business.id)
      User.addFavoriteToUser( Profile._id, $scope.business.id)
      .then(Business.addFavorite($scope.business, Profile._id))
      .then(res =>{
        console.log("res:" , res);
      })
      .catch(err =>{
        console.log("err in businessCtrl: ", err);
      })    
      console.log("$scope.business:", $scope.business.id);
    }


    $scope.unFavorite = ()=>{
      $scope.singletoggleFave = !$scope.singletoggleFave;
      console.log("$scope.businesses[index].id", $scope.business.id)
      User.removeFavoritefromUser( Profile._id, $scope.business.id)
      //.then(Business.removeFavorite($scope.businesses[index], Profile._id))
      .then(res =>{
        console.log("res:" , res);
      })
      .catch(err =>{
        console.log("err in businessCtrl: ", err);
      })    
      console.log("$scope.businesses[index]:", $scope.business.id);
    }

});
