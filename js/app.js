// Create app
// var myApp = angular.module('myApp', ['ngRoute'])
var data;
var baseUrl = 'https://api.spotify.com/v1/search?type=artist&query=';

var loc = location.href;
if (!loc.includes('#')){
    location.href += '/#/'
}

var myApp = angular.module('myApp', ['ui.router', ])

// Configure app
.config(function($stateProvider) {
    $stateProvider
        // .state('home', {
        //     url: '/home/',
        //     templateUrl: 'templates/home.html',
        //     controller: 'homeController',
        // })
        .state('login', {
            url: '/',
            templateUrl: 'templates/login.html',
            controller: 'loginController',
        })
        .state('home', {
            url: '/home/',
            templateUrl: 'templates/home.html',
            controller: 'homeController',
        })
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

//Home page controller
// .controller ('homeController', function($scope, $http, $route, $routeParams, $location){
    // $scope.$route = $route;
    // $scope.$location = $location;
    // $scope.$routeParams = $routeParams;
    // $scope.$http = $http;
.controller ('homeController', function($scope, $http){
    $scope.getSongs = function () {
		$http.get(baseUrl + $scope.track).success(function (response) {
			// Preprocess
			data = response.artists.items;
			console.log(data);
			// Pass to angular
			$scope.tracks = data;
		})
	};

    (function() {
    	/**
    	 * Obtains parameters from the hash of the URL
    	 * @return Object
    	 */
    	function getHashParams() {
    		var hashParams = {};
    		var e, r = /([^&;=]+)=?([^&;]*)/g,
    				q = window.location.hash.substring(1);
    		while ( e = r.exec(q)) {
    			hashParams[e[1]] = decodeURIComponent(e[2]);
    		}
    		return hashParams;
    	}

    	var params = getHashParams();
    	var access_token = params.access_token;

    	// validate
    	if (!access_token) {
    		window.location = "./"; //was "/login.html"
    		return;
    	}

    	//favoriteArtist("3dz0NnIZhtKKeXZxLOxCam");
    	populateArtists();

    	function populateArtists() {
    		$.ajax({
    			url: "https://api.spotify.com/v1/me/following?type=artist",
    			type: "GET",
    			beforeSend: function(xhr) {
    				xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    			},
    			success: function(data) {
    				userAuthorFetchCallback(data.artists);
    				console.log(data);

    			}
    		});
    	}

    	function favoriteArtist(artistId) {
    		$.ajax({
    			url: "https://api.spotify.com/v1/me/following?type=user&ids=" + artistId,
    			type: "PUT",
    			beforeSend: function(xhr) {
    				xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    			},
    			success: function(data) {
    				console.log("it worked");
    				console.log(data);
    			},
    			complete: function(xhr, status) {
    				console.log(xhr);
    				console.log("It returned with " + status);
    			}
    		});
    	}

    	/**
    	 * This is the method that's called once the favorite (followed) artists and people are fetched.
    	 * @param artists
    	 */
    	function userAuthorFetchCallback(artists) {
    		var favs = $('#favorites');
    		artists.items.forEach(function(artist) {
    			var domEl = $('<li></li>');
    			var img = $('<img></img>');
    			domEl.html(artist.name);
    			img.attr('src', artist.images[0].url);
    			domEl.append(img);
    			favs.append(domEl);
    		});
    	}

    } ());
})

.controller ('loginController', function($scope){
    (function() {
        $('#login').click(function() {
            var client_id = '431b90e60b8149be99c537b32ebd269f'; // Your client id
            var redirect_uri = 'http://students.washington.edu/jnbobo/info343/projectSkeleton//#/home/'; // Your redirect uri

            var scope = 'user-follow-modify user-follow-read';
            var url = 'https://accounts.spotify.com/authorize';
            url += '?response_type=token';
            url += '&client_id=' + encodeURIComponent(client_id);
            url += '&scope=' + encodeURIComponent(scope);
            url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
            window.location = url;
        });
    } ());
})
