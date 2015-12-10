/**
 * root.js
 *
 * This file contains functions that effect all pages within this website.
 */

(function() {
	// On page ready
	$(function() {
		// Defines all valid paths
		var validPaths = {
			'/login': 'templates/login.html',
			'/home': 'templates/home.html',
			'/auth': 'templates/auth.html',
			'/search': 'templates/search.html'
		};

		// Default path
		var templateLocation = validPaths['/login'];
		if (!!validPaths[window.location.pathname]) {
			templateLocation = validPaths[window.location.pathname];
		}

		// Load into content
		$('#content').load(templateLocation);
	});
} ());
