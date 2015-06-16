blocItOff = angular.module('BlocItOff', ['ui.router', 'firebase']);

// var ref = new Firebase('https://crackling-heat-1971.firebaseio.com/tasks');

blocItOff.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
   $locationProvider.html5Mode(true);
   //  Main view
   $stateProvider.state('main', {
      url: '/',
      controller: 'MainController',
      templateUrl: '/templates/home.html'
   });
}]);

// Format date into something readable
blocItOff.filter("formatDate", function () {
   return function (input) {
      var date = new Date(input);
      return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
   }
});


blocItOff.controller('MainController', ['$scope', '$firebaseArray', function($scope,$firebaseArray) {
   var ref = new Firebase('https://crackling-heat-1971.firebaseio.com/tasks');

   // create synced array
   //this.tasks = $firebaseArray(ref);

   var tasks = $firebaseArray(ref);
   this.expiredTasks = [];
   this.activeTasks = [];

   // loop over tasks
   // fill expiredTasks and activeTasks

   this.tasks = activeTasks;

   this.viewExpired = function () {
      this.tasks = expiredTasks;
   };

   this.viewActive = function () {};

   this.updateTasks = function() {
      // iterate over active
      // if expired, put into expired

      var newActiveTasks = [];

      for (var i = 0; i < this.activeTasks.length; i++) {
         if (this.activeTasks[i].age < 1000){
            this.expiredTasks.push(this.activeTasks[i]);
         } else {
            newActiveTasks.push(this.activeTasks[i]);
         }
      }

      this.activeTasks = newActiveTasks;
      this.tasks = newActiveTasks;

      // if it doesn't update
      // this.$apply();
   };

   // if you want to check in the background
   // var checkAge = setInterval(updateTasks.bind(this), 10000);

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
   // $scope.addTask = function() {
   //    var currentTime = (new Date()).getTime();
   //    for (var i = 0; i < $scope.tasks.length; i++) {
   //       console.log($scope.tasks[i].age);
   //       if ((currentTime - $scope.tasks[i].age) > 20000) {
   //          $scope.tasks[i].status = 'expired';
   //       }
   //    }

   //    $scope.tasks.$add({
   //       text: $scope.newTaskText,
   //       age:  (new Date()).getTime()
   //    });
   // };

}]);

blocItOff.directive('newTaskInput', function() {
   return {
      restrict: 'E',
      templateUrl: '/templates/new-task-input.html',
      link: function(scope) {
         scope.addTask = function() {
            var currentTime = (new Date()).getTime();
            var task = {
               text: scope.newTaskText,
               age:  (new Date()).getTime()
            };

            scope.tasks.$add(task);

            scope.activeTasks.push(task);
            scope.updateTasks();
         };
      }//,
      //controllerAs: 'newTask'
   };
});

