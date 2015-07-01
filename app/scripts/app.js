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

   // Completed and Expired tasks
   $stateProvider.state('past', {
      url: '/completed',
      controller: 'PastController',
      templateUrl: '/templates/completed.html'
   });

}]);

// Format date into something readable
// blocItOff.filter("formatDate", function () {
//    return function (input) {
//       var date = new Date(input);
//       return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
//    }
// });

blocItOff.controller('MainController', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
   $scope.tasks        = $firebaseArray(ref); // All tasks array
   $scope.activeTasks  = []; // Active tasks array
   $scope.expiredTasks = []; // Expired tasks array

   $scope.title = 'Active Tasks';

   $scope.viewExpired = function() {
      $scope.tasks = $scope.expiredTasks;
   };

   $scope.viewActive = function() {};

   $scope.updateTasks = function() {
      // iterate over active
      // if expired, put into expired
      var newActiveTasks  = [],
          newExpiredTasks = [],
          currentTime     = new Date().getTime();

      for (var i = 0; i < $scope.tasks.length; i++) {
         if ((currentTime - $scope.tasks[i].age) > 20000){
            newExpiredTasks.push($scope.tasks[i]);
         } else {
            newActiveTasks.push($scope.tasks[i]);
         }
      }

      $scope.activeTasks  = newActiveTasks;
      $scope.expiredTasks = newExpiredTasks;

      console.log($scope.activeTasks);
      console.log($scope.expiredTasks);

      // if it doesn't update
      $scope.$apply();
   };
   // if you want to check in the background
   // var checkAge = setInterval($scope.updateTasks, 10000);

   // if you want to stop background checking,
   // clearInterval(checkAge);

/*
   var checkAge = setInterval(function () {
      // loop through tasks and move them as needed
      // from active to expired

      // if you need to access the scope, bind() the function
      // or set var $scope = this right outside of this setInterval.

   }, 10000);
*/

   // iterate over every task and see if it's expired?
   // expired property
   // $scope.isExpired = function(currentTime) {
   // console.log($scope.tasks);
   // }


   // add new items to array
/*
   $scope.addTask = function() {
      var currentTime = (new Date()).getTime();
      for (var i = 0; i < $scope.tasks.length; i++) {
         console.log($scope.tasks[i].age);
         if ((currentTime - $scope.tasks[i].age) > 20000) {
            $scope.tasks[i].status = 'expired';
         }
      }

      $scope.tasks.$add({
         text: $scope.newTaskText,
         age:  (new Date()).getTime()
      });
   };
*/

}]);

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


blocItOff.directive('newTaskInput', function() {
   return {
      restrict: 'E',
      templateUrl: '/templates/new-task-input.html',
      link: function(scope, element) {
         scope.addTask = function() {
            // this doesn't need to be stored when adding a new task
            // save this for finding the expired tasks
            // scope.currentTime = (new Date()).getTime();
            scope.task = {
               text: scope.newTaskText,
               age:  (new Date()).getTime()
            };

            scope.tasks.$add(scope.task);

            // scope.activeTasks.push(scope.task);
            // scope.updateTasks();
         };
      }//,
      //controllerAs: 'newTask'
   };
});

