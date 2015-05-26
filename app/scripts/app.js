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
         text: $scope.newTaskText,
         age:  new Date()
      });
   };
}]);