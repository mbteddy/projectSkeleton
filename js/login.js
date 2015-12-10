/**
 * login.js
 */

$(function() {
	$('#login').click(function() {
		var client_id = '431b90e60b8149be99c537b32ebd269f'; // Your client id
		var redirect_uri = 'http://343-project.fru1t.me/auth'; // Your redirect uri

		var scope = 'user-follow-modify user-follow-read';
		var url = 'https://accounts.spotify.com/authorize';
		url += '?response_type=token';
		url += '&client_id=' + encodeURIComponent(client_id);
		url += '&scope=' + encodeURIComponent(scope);
		url += '&redirect_uri=' + encodeURIComponent(redirect_uri);

		window.location = url;
	});
});

