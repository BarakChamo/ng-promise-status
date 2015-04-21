'use strict';

var app = angular.module('demo', ['ngSanitize', 'ngPromiseStatus']);

app.controller('demoController', ['$scope', '$q', '$timeout', function($scope, $q, $timeout){
  // Create a new promise that will succeed in 3 seconds
  $scope.setSuccessPromise = function(){
    // Reassign $scope.promise with a new promise
    $scope.successPromise = $q.defer();

    $scope.successPromise.promise.then(function(){
      console.log('Done from controller');
    });

    // Set a timeout for 3 seconds and resolve the promise
    $timeout(function(){
      $scope.successPromise.resolve('YAY!');
    }, 3000);
  };

  // Create a new promise that will fail within 3 seconds
  $scope.setErrorPromise = function(){
    // Reassign $scope.promise with a new promise
    $scope.errorPromise = $q.defer();

    $scope.errorPromise.promise.then(function(){
      console.log('Done from controller');
    });

    // Set a timeout for 3 seconds and resolve the promise
    $timeout(function(){
      $scope.errorPromise.reject('Some Error');
    }, 3000);
  };
}]);