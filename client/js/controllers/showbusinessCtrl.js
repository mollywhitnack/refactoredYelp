'use strict';

let app = angular.module('myApp');


app.controller('showbusinessCtrl', function($scope, $stateParams, Business, Profile, User) {

  $scope.showButton = false;
  $scope.singletoggleFave = false;
  var favorites = Profile.favorites;

  let businessId = $stateParams;

  Business.searchYelp(businessId.businessId)
  .then(res =>{
    $scope.business = res;
    $scope.showButton = true;
    for(var i =0; i< favorites.length; i++){
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
      User.addFavoriteToUser( Profile._id, $scope.business.id)
      .then(Business.addFavorite($scope.business, Profile._id))
      .then(res =>{
        //console.log("res:" , res);
      })
      .catch(err =>{
        console.log("err in businessCtrl: ", err);
      })    
    }


    $scope.unFavorite = ()=>{
      $scope.singletoggleFave = !$scope.singletoggleFave;
      User.removeFavoritefromUser( Profile._id, $scope.business.id)
      //.then(Business.removeFavorite($scope.businesses[index], Profile._id))
      .then(res =>{
      })
      .catch(err =>{
        console.log("err in businessCtrl: ", err);
      })    
    }

});
