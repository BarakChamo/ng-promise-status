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
      /*
        Scope properties
      */ 

      // Set directive configuration defaults
      scope.$config = {
        // Status classes
        success_class:  'success',
        error_class:    'error',
        progress_class: 'inprogress',
        idle_class: 'idle',

        // Disable on progress
        progress_disable: true,

        // Timeout for clearing status (back to idle) - 0 is disabled, keeps the status
        delay: 0
      };

      // Apply custom configuration
      angular.extend(scope.$config, scope.options);

      // Initialize exposed scope properties
      scope.$status = 'idle';
      scope.$class  = scope.$config.idle_class;

      // Status Button ng-click handler
      scope.statusButtonClick = function($event){
        $timeout(function(){
          setPromise(scope.promise);
        });
      };


      /*
        Private Methods
      */ 

      function setPromise(promise){
        var p;

        // Reset exposed scope values
        setProps('inprogress', scope.$config.progress_class, false, undefined);

        // Check for supported types
        p = promise.propertyIsEnumerable('promise') ? promise.promise : promise;
        p = p instanceof Array ? p : [p];

        $q.all(p)
          .then(success, error, progress);
      }

      // Handle sucessful promises
      function success(value){
        setProps('success', scope.$config.success_class, true, scope.promise instanceof Array ? value : value[0]);
      }

      // Handle promise errors
      function error(err){
        setProps('error', scope.$config.error_class, true, err);
      }

      // Handle promise notify (progress)
      function progress(value){
        scope.$value = value;
      }

      // Update exposed scope properties
      function setProps(status, className, done, value){
        scope.$status  = status;
        scope.$class   = className;
        scope.$done    = done;
        scope.$value   = value;

        // If done and delay is set, set a timeout to clear the class
        if (scope.$config.delay > 0 && done) {
          $timeout(function(){
            scope.$status = 'idle';
            scope.$class  = scope.$config.idle_class;            
          }, scope.$config.delay);
        }
      }


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