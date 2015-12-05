// Create app
// var myApp = angular.module('myApp', ['ngRoute'])

var loc = location.href;
if (!loc.includes('#')){
    location.href += '/#/'
}

var myApp = angular.module('myApp', ['ui.router', 'ngAnimate'])

// Configure app
.config(function($stateProvider) {
    $stateProvider
        // .state('home', {
        //     url: '/home/',
        //     templateUrl: 'templates/home.html',
        //     controller: 'homeController',
        // })
})
// // Main controller
// .controller('MainController', function($scope, $route, $routeParams, $location) {
//     $scope.$route = $route;
//     $scope.$location = $location;
//     $scope.$routeParams = $routeParams;
// })
// // Home page controller:
// .controller('homeController', function($scope, homeData){
//     homeData.then(function(data){
//         console.log('homes ',data)
//         $scope.homes = data
//     })
// })
// // home page data
// .factory('homeData', ['$http', '$sce', function($http, $sce){
//     var homeData = $http.get("data/home.csv").then(function(response){
//         arr = CSVToArray(response.data);
//         // Allow HTML rendering
//         arr.map(function(d) {d.description = $sce.trustAsHtml(d.description);})
//         return arr
//     })
//     return homeData
// }])
