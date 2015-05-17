(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

blocItOff.controller('Main.controller', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
   var ref = new Firebase('https://crackling-heat-1971.firebaseio.com/tasks');

   // create synced array
   $scope.tasks = $firebaseArray(ref);

   // add new items to array
   $scope.addTask = function() {
      $scope.tasks.$add({
         text: $scope.newTaskText
      });
   };
}]);
},{}]},{},[1]);