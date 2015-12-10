(function() {
	var accessToken = getCookie("accessToken");

	// Is the user logged in?
	if (!accessToken) {
		alert("no access token");
		clearCookies();
		window.location = "/login";
		return;
	}

	function loadArtistsFromSpotify() {
		$.ajax({
			url: "https://api.spotify.com/v1/me/following?type=artist",
			type: "GET",
			beforeSend: function(xhr) {
				xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
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
				xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
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

	function searchForArtists(artistName) {
		$.getJSON(
				"https://api.spotify.com/v1/search", {
					type: "artist",
					query: artistName
				},
				function(data) {
					setArtistsSearchResult(data.artists.items);
				}
		);
	}

	function setArtistsSearchResult(artists) {
		var resultEl = $('#search-artists-results');
		resultEl.html("");
		artists.forEach(function(artist) {
			var artEl = $(
					'<li>' +
					'<a href="/search#' + artist.id + '">' +
					'<img src="' + artist.images[0].url + '" />' +
					'<div class="artist">' + artist.name + '</div>'+
					'</a>' +
					'</li>'
			);
			resultEl.append(artEl);
		});
	}

	/**
	 * This is the method that's called once the favorite (followed) artists and people are fetched.
	 * @param artists
	 */
	function userAuthorFetchCallback(artists) {
		var favs = $('#favorites');
		artists.items.forEach(function(artist) {
			var artEl = $(
					'<li>' +
					'<a href="/search#' + artist.id + '">' +
					'<img src="' + artist.images[0].url + '" />' +
					'<div class="artist">' + artist.name + '</div>'+
					'</a>' +
					'</li>'
			);
			favs.append(artEl);
		});
	}

	// On page ready
	$(function() {
		loadArtistsFromSpotify();

		// Set up artist searching
		$('#search-artists-form').submit(function(e) {
			e.preventDefault();
			searchForArtists($('#search-artists-input').val())
		});
	})
} ());
