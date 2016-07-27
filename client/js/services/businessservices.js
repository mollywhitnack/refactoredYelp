'use strict';

var app = angular.module('myApp');

app.service('Business', function($http, $q){

  this.getMap = (cords) =>{
    return $http.get(`/api/businesses/map`, cords)
    .then(res => {
        return $q.resolve(res.data);
    })
    .catch(err => {   
        console.log('err:', err);
    })
  }

  this.searchYelp = (search) =>{
    return $http.get(`/api/businesses/yelp/${search}`)
     .then(res => {
        return $q.resolve(res.data);
      })
      .catch(err => {   
        console.log('err:', err);
      })
  }

  this.searchCatagories = (inputs) =>{
    return $http.post(`/api/businesses/yelp/yelpCatagories`, inputs)
     .then(res => {
        return $q.resolve(res.data);
      })
      .catch(err => {   
        console.log('err:', err);
      })
  }

  this.addFavorite = (businessObj, userId) =>{
    return $http.post(`/api/businesses/${userId}`, businessObj)
    .then(res => {
        return $q.resolve(res);
      })
      .catch(err => {   
        console.log('err:', err);
      })
    };
});

