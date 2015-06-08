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

// Format date into something readable
blocItOff.filter("formatDate", function () {
   return function (input) {
      var date = new Date(input);
      return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
   }
});

// Trying to access the services created below in the Main controller
blocItOff.controller('Main.controller', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
   var ref = new Firebase('https://crackling-heat-1971.firebaseio.com/tasks');

   // create synced array
   $scope.tasks = $firebaseArray(ref);

   // iterate over every task and see if it's expired?
   // expired property
   // $scope.isExpired = function(currentTime) {
   // console.log($scope.tasks);
   // }


   // add new items to array
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

}]);


blocItOff.factory('firebaseDb', ['$firebaseArray', function($firebaseArray) {
   var ref = new Firebase('https://crackling-heat-1971.firebaseio.com/tasks');
   $scope.tasks = $firebaseArray(ref);
}]);

// Experimenting with making the Firebase DB a service that can be accessed by
// all the app's controllers
// blocItOff.service('Firebase', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
//    var ref = new Firebase('https://crackling-heat-1971.firebaseio.com/tasks');
//    $scope.tasks = $firebaseArray(ref);
// }])

// Making the TaskList and the addTask function a service
// blocItOff.service('TaskList', ['$scope', 'Firebase', function($scope) {

   // creating synced array
   // $rootScope.tasks = $firebaseArray(ref);

   // var taskList = {
   //    tasks: Firebase.tasks, // testing this method

   //    addTask: function(text, age) {
   //       $scope.tasks.$add({
   //          text: $scope.newTaskText,
   //          age:  new Date()
   //       });
   //    }
   // };

   // return taskList;

// }]);
