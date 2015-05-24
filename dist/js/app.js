(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ref = new Firebase('https://crackling-heat-1971.firebaseio.com/tasks');

blocItOff = angular.module('BlocItOff', ['ui.router', 'firebase']);

blocItOff.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
   $locationProvider.html5Mode(true);

   //  Main view
   $stateProvider.state('main', {
      url: '/',
      controller: 'Main.controller',
      templateUrl: '/templates/home.html'
   });

}]);

// Trying to access the services created below in the Main controller
blocItOff.controller('Main.controller', ['$scope', 'TaskList', 'Firebase', function($scope, $TaskList, $Firebase) {
   // var ref = new Firebase('https://crackling-heat-1971.firebaseio.com/tasks');

   // $scope.tasks = $firebaseArray(ref);

   // create synced array
   // $scope.tasks = $firebaseArray(ref);

   // add new items to array
   // $scope.addTask = function() {
   //    $scope.newTaskDate = new Date();
   //    console.log($scope.newTaskDate); // This is working
   //    $scope.tasks.$add({
   //       text: $scope.newTaskText,
   //       age:  $scope.newTaskDate    // But this is not being added to each task in Firebase
   //    });
   // };

}]);

// Experimenting with making the Firebase DB a service that can be accessed by
// all the app's controllers
blocItOff.service('Firebase', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
   var ref = new Firebase('https://crackling-heat-1971.firebaseio.com/tasks');
   $scope.tasks = $firebaseArray(ref);
}])

// Making the TaskList and the addTask function a service
blocItOff.service('TaskList', ['$rootScope', 'Firebase', function($rootScope) {

   // creating synced array
   // $rootScope.tasks = $firebaseArray(ref);

   var taskList = {
      tasks: Firebase.tasks, // testing this method

      addTask: function(text, age) {
         $rootScope.newTaskDate = new Date();
         console.log($rootScope.newTaskDate);
         $rootScope.tasks.$add({
            text: $rootScope.newTaskText,
            age:  $rootScope.newTaskDate
         });
      }
   };

   return taskList;

}]);

},{}]},{},[1]);