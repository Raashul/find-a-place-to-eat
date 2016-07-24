(function(window, google, mapster){

	mapster.MAP_OPTIONS = {
		center:{
		lat: 40.836422,
		lng: -74.269141
		},
		zoom: 16,
		disableDefaultUI: false,
		//scrollwheel: false,
		minZoom:13,
		//maxzoom
		//mapTypeId: google.map.MapTypeId.ROADMAP
		zoomControlOptions :{
			position: google.maps.ControlPosition.LEFT_BOTTOM,
		},
		panControlOptions:{
			position: google.maps.ControlPosition.LEFT_BOTTOM
		}
	};

}(window, google, window.Mapster || (window.Mapster= {})))