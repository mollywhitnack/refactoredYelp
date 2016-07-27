'use strict';

let app = angular.module('myApp');

app.controller('businessCtrl', function($scope, User, $rootScope, Business, Profile){

  $scope.businesses = [];
  var favorites = Profile.favorites;

  $scope.searchBusiness = () => {
      Business.searchYelp($scope.newItem.searchParams)
      .then(res =>{
        for(var i=0; i< favorites.length; i++){
          if(res.id === favorites[i]){
            $scope.toggleFave = true;
          }
        }
        $scope.businesses.push(res);
      })    
      .catch(err =>{
        console.log("err in businessCtrl: ", err);
      })
    }

  $scope.searchBusiness2 = () => {
      var searchBy = {};
      if($scope.newItem.location){
        searchBy.location = $scope.newItem.location
      }
      if($scope.newItem.term){
        searchBy.term = $scope.newItem.term;
      }

      Business.searchCatagories(searchBy)
      .then(res =>{
        $scope.toggleFave = new Array(res.businesses.length)

        //check for favorites
        for(var k=0; k<res.businesses.length; k++){
          for(var i=0; i< favorites.length; i++){
            console.log()
            if(res.businesses[k].id === favorites[i]){
              $scope.toggleFave[k] = 1;
            }
            else $scope.toggleFave[k] = 0;
          }
          
        }
        $scope.businesses = res.businesses;

      })    
      .catch(err =>{
        console.log("err in businessCtrl: ", err);
      })
    }


    //add to user favorites
    $scope.favorite = (index)=>{
      $scope.toggleFave[index] = !$scope.toggleFave[index];
      User.addFavoriteToUser( Profile._id, $scope.businesses[index].id)
      .then(Business.addFavorite($scope.businesses[index], Profile._id))
      .then(res =>{
        //console.log("res:" , res);
      })
      .catch(err =>{
        console.log("err in businessCtrl: ", err);
      })    
    }

    $scope.unFavorite = (index)=>{
      $scope.toggleFave[index] = !$scope.toggleFave[index];
      User.removeFavoritefromUser( Profile._id, $scope.businesses[index].id)
      //.then(Business.removeFavorite($scope.businesses[index], Profile._id))
      .then(res =>{
        console.log("res:" , res);
      })
      .catch(err =>{
        console.log("err in businessCtrl: ", err);
      })    
    }

});