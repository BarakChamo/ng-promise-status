/*!
 * ng-promise-status
 * 
 * Version: 0.0.1 - 2015-04-21T16:40:47.639Z
 * License: MIT
 */


'use strict';

angular.module('ngPromiseStatus', [])
.directive('statusButton', ['$timeout', '$q', function ( $timeout, $q ) {
  var value = 0;

  return {
    restrict: 'AE',
    templateUrl: 'directive.html',
    replace: true,
    transclude: true,
    scope: {
      promise: '=',
      options: '='
    },
    link: function (scope, element, attrs, controller, transclude) {
      // Set directive configuration defaults
      scope.$config = {
        // Status classes
        success_class: scope.options  && scope.options.success_class  || 'success',
        error_class:   scope.options  && scope.options.error_class    || 'error',
        progress_class: scope.options && scope.options.progress_class || 'inprogress',

        // Disable on progress
        progress_disable: scope.options && scope.options.progress_disable || true
      };

      // Initialize exposed scope properties
      scope.$status = 'prestine';
      scope.$class  = '';

      function setPromise(promise){
        console.log('SET PROMISE');
        var p;

        // Reset exposed scope values
        scope.$status  = 'inprogress';
        scope.$class   = scope.$config.progress_class;
        scope.$success = false;
        scope.$done    = false;
        scope.$value   = undefined;

        // Check for supported types
        p = promise.propertyIsEnumerable('promise') ? promise.promise : promise;
        p = p instanceof Array ? p : [p];

        $q.all(p)
          .then(success, error, progress);
      }

      // Handle sucessful promises
      function success(value){
        scope.$status  = 'success';
        scope.$class   = scope.$config.success_class;
        scope.$success = true;
        scope.$done    = true;
        scope.$value   = scope.promise instanceof Array ? value : value[0];

        console.log(value);
      }

      // Handle promise errors
      function error(err){
        scope.$status  = 'error';
        scope.$class   = scope.$config.error_class;
        scope.$success = false;
        scope.$done    = true;
        scope.$value   = err;

        console.log(err);
      }

      function progress(value){
        scope.$value = value;
      }

      // Status Button ng-click handler
      scope.statusButtonClick = function($event){
        $timeout(function(){
          setPromise(scope.promise);
        });
      };

      // Transclude the button's content
      //- Transclusion is done here and not with ngTransclude 
      //- because we want to expose some scope goodies back to
      //- the original template from the directive's isolate scope.
      transclude(scope, function(clone){
        element.append(clone);
      });
    }
  };
}]);
angular.module("ngPromiseStatus").run(["$templateCache", function($templateCache) {$templateCache.put("directive.html","<button class=\"status-button\" ng-click=\"; statusButtonClick($event)\" ng-class=\"$class\" ng-disabled=\"$config.progress_disable && $status === \'inprogress\'\"><span class=\"status\">status</span></button>");}]);