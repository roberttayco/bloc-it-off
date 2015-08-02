(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
blocItOff = angular.module('BlocItOff', ['ui.router', 'firebase']);

var ref = new Firebase('https://crackling-heat-1971.firebaseio.com/tasks');

blocItOff.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
   $locationProvider.html5Mode({
      enabled: true
   });
   // Main view
   $stateProvider.state('active', {
      url: '/',
      controller: 'MainController',
      templateUrl: '/templates/home.html'
   });

/*
   // Completed and Expired tasks
   $stateProvider.state('past', {
      url: '/completed',
      controller: 'PastController',
      templateUrl: '/templates/completed.html'
   });
*/

}]);

blocItOff.controller('MainController', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
   $scope.tasks        = $firebaseArray(ref); // All tasks array
   $scope.visibleTasks = []; // The tasks visible in the current view
   $scope.activeTasks  = []; // Active tasks array
   $scope.expiredTasks = []; // Expired tasks array

   var viewingExpired = $scope.viewingExpired = false;

   $scope.title = 'Active Tasks';

// update the active & past task lists every so often
   var interval = setInterval(function() {
      $scope.updateTasks();
      if (viewingExpired) {
         $scope.viewExpired();
      } else {
         $scope.viewActive();
      }
      $scope.$apply();
   }, 60000);
   $scope.viewExpired = function() {
      $scope.title = "Past Tasks";
      $scope.visibleTasks = $scope.expiredTasks;
      viewingExpired = true;
   };

   $scope.viewActive = function() {
      $scope.title = "Active Tasks";
      $scope.visibleTasks = $scope.activeTasks;
      viewingExpired = false;
   };

   $scope.updateTasks = function() {
      // iterate over active
      // if expired, put into expired
      var newActiveTasks  = [],
          newExpiredTasks = [],
          currentTime     = new Date().getTime();

      for (var i = 0; i < $scope.tasks.length; i++) {
         if ($scope.tasks[i].state ==='inactive') {
            newExpiredTasks.push($scope.tasks[i]);
            // ('$scope.tasks[i] .task-item__details').addClass('completed');
         } else {
            if ((currentTime - $scope.tasks[i].age) > 999999999){
               $scope.tasks[i].state = 'inactive';
               $scope.tasks.$save($scope.tasks[i]);
               newExpiredTasks.push($scope.tasks[i]);
            } else {
               newActiveTasks.push($scope.tasks[i]);
            }
         }
      }

      $scope.activeTasks  = newActiveTasks;
      $scope.expiredTasks = newExpiredTasks;

      console.log($scope.activeTasks);
      console.log($scope.expiredTasks);

      // if it doesn't update
      //$scope.$apply()
   };

   // if you want to check in the background
   // var checkAge = setInterval($scope.updateTasks, 10000);

   // if you want to stop background checking,
   // clearInterval(checkAge);

   $scope.tasks.$loaded(function () {
      $scope.updateTasks();
      $scope.viewActive();
   });

   $scope.completeTask = function(task) {
      task.state = 'inactive';
      // console.log("Completing task", task);
      $scope.tasks.$save(task).then(function () {
         // console.log("task state", task.state);
         $scope.updateTasks();

         if (viewingExpired) {
            $scope.viewExpired();
         } else {
            $scope.viewActive();
         }
      }, function (error) {
         console.log("there was an error", error);
      });
      // $scope.updateTasks();
   }



}]);

// Past Tasks
// ====================
/*
blocItOff.controller('PastController', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
   $scope.tasks        = $firebaseArray(ref); // All tasks array
   $scope.expiredTasks = []; // Expired tasks array

   $scope.title = 'Past Tasks';

   $scope.updateTasks = function() {
      var newExpiredTasks = [],
          currentTime     = new Date().getTime();

      for (var i = 0; i < $scope.tasks.length; i++) {
         if ((currentTime - $scope.tasks[i].age) > 20000){
            newExpiredTasks.push($scope.tasks[i]);
         }
      }

      $scope.expiredTasks = newExpiredTasks;

      console.log($scope.expiredTasks);

      // if it doesn't update
      $scope.$apply();
   };

}]);
*/

blocItOff.directive('newTaskInput', function() {
   return {
      restrict: 'E',
      templateUrl: '/templates/new-task-input.html',
      link: function(scope, element) {
         scope.addTask = function() {
            // init these keys for the task object
            // scope.newTaskPriority = '';
            // scope.newTaskState    = 'active';

            scope.task = {
               text:     scope.newTaskText,
               age:      (new Date()).getTime(),
               state:    'active',
               priority: scope.newTaskPriority
            };

            scope.tasks.$add(scope.task).then(function (ref) {
               scope.task.$id = ref.key();
               scope.updateTasks();

               if (scope.viewingExpired) {
                  scope.viewExpired();
               } else {
                  scope.viewActive();
               }
               scope.newTaskText = null;
               scope.newTaskPriority = '';
            });
         };
      }
   };
});

},{}]},{},[1]);