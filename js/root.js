/**
 * root.js
 *
 * This file contains functions that effect all pages within this website.
 */

(function() {
	var documentCookies_ = {};

	/**
	 * Stores a cookie in the document.
	 *
	 * @param {!string} key
	 * @param {?string} value
	 */
	function setCookie(key, value) {
		documentCookies_[key] = value;
		storeCookies();
	}

	/**
	 * Fetches a cookie. If the key doesn't exist, returns null.
	 *
	 * @param {!string} key
	 * @return {?string}
	 */
	function getCookie(key) {
		return documentCookies_[key] || null;
	}

	/**
	 * Loads cookies from the document into the cookies array.
	 */
	function loadCookies() {
		var cookies = document.cookie["fm"].split(";");
		console.log(cookies);
		alert(cookies);
		cookies.forEach(function(cookiePair) {
			var kv = cookiePair.split("=");
			if (kv.length == 2) {
				documentCookies_[kv[0]] = kv[1];
			}
		});
	}

	/**
	 * Flushes all cookies from the cache object to the document.
	 */
	function storeCookies() {
		var cookieString = "";
		for (var key in documentCookies_) {
			if (!documentCookies_.hasOwnProperty(key)) {
				continue;
			}
			if (documentCookies_[key] == null) {
				continue;
			}
			cookieString += key + "=" + documentCookies_[key] + ";";
		}
		document.cookie["fm"] = cookieString;
	}

	function clearCookies() {
		document.cookie["fm"] = "";
		documentCookies_ = {};
	}

	// On page ready
	$(function() {
		// Defines all valid paths
		var validPaths = {
			'/login': 'templates/login.html',
			'/home': 'templates/home.html',
			'/auth': 'templates/auth.html'
		};

		// Default path
		var templateLocation = validPaths['/login'];
		if (!!validPaths[window.location.pathname]) {
			templateLocation = validPaths[window.location.pathname];
		}

		// Load into content
		$('#content').load(templateLocation);
	});

	// Load cookies from the document into cache.
	loadCookies();

	// Bind public functions to the window
	window.setCookie = setCookie;
	window.getCookie = getCookie;
	window.clearCookies = clearCookies;
} ());




// Oh god. Ignore this for now
/*
// Configure app
.config() {
    //$stateProvider
        // .state('home', {
        //     url: '/home/',
        //     templateUrl: 'templates/home.html',
        //     controller: 'homeController',
        // })
        //.state('login', {
         //   url: '',
         //   templateUrl: 'templates/login.html',
         //   controller: 'loginController',
        //})
        //.state('home', {
        //    url: 'home/',
        //    templateUrl: 'templates/home.html',
        //    controller: 'homeController',
        //})
	$routeProvider
		.when('/' {
			templateUrl: '/templates/home.html',
			controller: 'homeController'
		});

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
    $scope.add = function(data) {
        console.log(data);
        //favoriteArtist(data);
    };

    (function() {
    	/**
    	 * Obtains parameters from the hash of the URL
    	 * @return Object
    	 * /
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
            //so the way we should do this in html is onclick="favoriteArtist({{track.id}})"
    		$.ajax({
    			url: "https://api.spotify.com/v1/me/following?type=user&ids=" + artistId,
    			type: "PUT",
    			beforeSend: function(xhr) {
    				xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    			},
    			success: function(data) {
    				console.log("it worked");
    				console.log(data);
                    //if successful we should rebuild the favorites list to reflect the additional artist -Ned
                    populateArtists();
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
    	 * /
    	function userAuthorFetchCallback(artists) {
    		var favs = $('#favorites');
    		artists.items.forEach(function(artist) {
    			var domEl = $('<li></li>');
    			var img = $('<img></img>');
    			domEl.html(artist.name);
    			img.attr('src', artist.images[0].url);
    			domEl.append(img);
    			favs.append(domEl);
                domEl.click(function (artist){
                    artistNameForMap = artist.id
                })
    		});
    	}

    } ());
})

.controller ('loginController', function($scope){
    (function() {
        $('#login').click(function() {
            var client_id = '431b90e60b8149be99c537b32ebd269f'; // Your client id
            var redirect_uri = 'http://343-project.local/favorites.html'; // Your redirect uri

            var scope = 'user-follow-modify user-follow-read';
            var url = 'https://accounts.spotify.com/authorize';
            url += '?response_type=token';
            url += '&client_id=' + encodeURIComponent(client_id);
            url += '&scope=' + encodeURIComponent(scope);
            url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
            window.location = url;
        });
    } ());
}) */
