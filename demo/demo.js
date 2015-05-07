'use strict';

var app = angular.module('demo', ['ngSanitize', 'ngPromiseStatus']);

app.controller('demoController', ['$scope', '$q', '$timeout', function($scope, $q, $timeout){
  // Demo configuration
  $scope.promiseStatusConfig = {
    success_class:  'custom_success',
    error_class:    'custom_error',
    progress_class: 'custom_progress'
  };

  // Bootstrap buttons configuration
  $scope.bootstrapConfig = {
    success_class:  'btn-success',
    error_class:    'btn-danger',
    progress_class: 'btn-warning',
    idle_class:     'btn-default'
  };

  $scope.bootstrapDelayConfig = {
    success_class:  'btn-success',
    error_class:    'btn-danger',
    progress_class: 'btn-warning',
    idle_class:     'btn-default',
    delay: 2000
  };

  $scope.alertConfig = {
    success_class:  'alert-success',
    progress_class: 'alert-warning',
    error_class:     'alert-danger'
  };

  // Button demo methods

  // Create a new promise that will succeed in 3 seconds
  $scope.setSuccessPromise = function(){
    // Reassign $scope.promise with a new promise
    $scope.successPromise = $q.defer();

    $scope.successPromise.promise.then(function(){
      console.log('Done from controller');
    });

    // Set a timeout for 3 seconds and resolve the promise
    $timeout(function(){
      $scope.successPromise.resolve('Done!');
    }, 3000);
  };

  // Create a new promise that will succeed in 3 seconds
  $scope.setalertValuePromise = function(){
    // Reassign $scope.promise with a new promise
    $scope.valuePromise = {value: 'this ain\'t a promise!'};
  };

  // Create a new promise that will fail within 3 seconds
  $scope.setErrorPromise = function(){
    // Reassign $scope.promise with a new promise
    $scope.errorPromise = $q.defer();

    $scope.errorPromise.promise.then(function(){
      console.log('Error from controller');
    });

    // Set a timeout for 3 seconds and resolve the promise
    $timeout(function(){
      $scope.errorPromise.reject('Error!');
    }, 3000);
  };


  // Alert demo methods
  // Create a new promise that will succeed in 3 seconds
  $scope.setAlertSuccessPromise = function(){
    // Reassign $scope.promise with a new promise
    $scope.alertSuccessPromise = $q.defer();

    $scope.alertSuccessPromise.promise.then(function(){
      console.log('Done from controller');
    });

    // Set a timeout for 3 seconds and resolve the promise
    $timeout(function(){
      $scope.alertSuccessPromise.resolve('Done!');
    }, 3000);
  };

    // Alert demo methods
  // Create a new promise that will succeed in 3 seconds
  $scope.setExamplePromise = function(){
    // Reassign $scope.promise with a new promise
    $scope.examplePromise = $q.defer();

    $scope.examplePromise.promise.then(function(){
      console.log('Done from controller');
    });

    // Set a timeout for 3 seconds and resolve the promise
    $timeout(function(){
      $scope.examplePromise.resolve('Done!');
    }, 3000);
  };

  // Create a new promise that will succeed in 3 seconds
  $scope.setAlertValuePromise = function(){
    // Reassign $scope.promise with a new promise
    $scope.alertValuePromise = {value: 'this ain\'t a promise!'};
  };

  // Create a new promise that will fail within 3 seconds
  $scope.setAlertErrorPromise = function(){
    // Reassign $scope.promise with a new promise
    $scope.alertErrorPromise = $q.defer();

    $scope.alertErrorPromise.promise.then(function(){
      console.log('Error from controller');
    });

    // Set a timeout for 3 seconds and resolve the promise
    $timeout(function(){
      $scope.alertErrorPromise.reject('Error!');
    }, 3000);
  };
}]);