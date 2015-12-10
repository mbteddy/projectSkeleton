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
		window.location = "/login";
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
