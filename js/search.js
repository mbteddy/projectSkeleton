(function() {
	// Loop through your data and add the appropriate layers and points
	function renderMap(data) {
		var map = L.map('search-map').setView([35, -94], 4);
		var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
		layer.addTo(map);

		data.forEach(function(performance) {
			var lat = performance.venue.latitude;
			var lng = performance.venue.longitude;
			var circ = L.circleMarker([lat, lng], {
				radius: 5
			});
			circ.bindPopup(getPopupHtml(performance));
			circ.setStyle({color: 'blue', fillColor: 'blue'});
			circ.addTo(map);
		});
	}

	function renderArtistDataFromBandsInTown(artistName) {
		$.getJSON(
				"http://api.bandsintown.com/artists/" + artistName + "/events.json?callback=?&app_id=ramesh",
				function(data) {
					renderMap(data);
				});
	}

	function getPopupHtml(performance) {
		return performance.venue.city + " " + performance.venue.region + " oops did I leave this here?";
	}

	$(function() {
		renderArtistDataFromBandsInTown(window.location.hash.substr(1));
	})
} ());
