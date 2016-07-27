(function(window, mapster){

		//map options
	var options = mapster.MAP_OPTIONS;

	element = document.getElementById('map-canvas');

	//map
	//	map = new google.maps.Map(element, options);
	map = mapster.create(element, options);
	//map.zoom(18);
	//alert(map.zoom());

	var geocoder = new google.maps.Geocoder();

	//this variable will be the location of the user.
	var input = document.getElementById('input');





// Added reset button to reset google map.
document.getElementById('reset').addEventListener('click', function(e){
	map.clear();
	map = mapster.create(element, options);
});



//Geocoder
button = document.getElementById('button');

	button.addEventListener('click', function(e){
	geocoder.geocode({
		address: input.value
	}, function(results, status){
		if(status === google.maps.GeocoderStatus.OK){
			console.log(results);
			var result = results[0];



				//setting the center of the map to the inputted value.
			map.gMap.setCenter({lat: result.geometry.location.lat(), lng: result.geometry.location.lng()});

			map.addMarker({
				lat: result.geometry.location.lat(),
				lng: result.geometry.location.lng(),
				draggable: false,
				icon: './currentlocation.png',
				content: "Your current location"
			});

		input.value = result.formatted_address;

		find(result);

		}else{
			console.error(status);
		}
	});
}) //end of button event listener


//find = document.getElementById('find');

function find(result){

	var location = {
		lat: result.geometry.location.lat(),
		lng: result.geometry.location.lng()
	};


	var type;

	//calls the on service method from Mapster.js to locate nearby restaurants.
	map._onService({
		location: location,
		radius: 1000,
		type: ['restaurant'],
		origin: input.value,
		name: result.formatted_address
	});
		console.log('find function success');
	}



}(window, window.Mapster));


