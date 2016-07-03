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

	var input = document.getElementById('input');


	 var autocomplete = new google.maps.places.Autocomplete(input);
	  autocomplete.addListener('place_changed', function(){
	  	var place = autocomplete.getPlace();

	  })



	// var input = document.getElementById('input');
	// input.oninput= function(){
	// 	var autocomplete = new google.maps.places.Autocomplete(input);
	//   google.maps.event.addListener(autocomplete, 'place_changed', function(){
	//   	var places = autocomplete.getplace();
	//   	console.log(places);
	//   })

	// }


	// map._on('click', function(e){
	// 	alert('click');
	// 	console.log(e);
	// 	console.log(this);
	// });

	// map._on('dragend', function(e){
	// 	alert('dragend');
	// 	console.log(e);
	// 	console.log(this);
	// });

	//map.addMarker(40.836422, -74.269141, true);

	// var marker = map.addMarker({
	// 	lat: 40.836422,
	// 	lng: -74.269141,
	// 	draggable: false,
	// 	id: 1,
	// 	icon: 'http://maps.google.com/mapfiles/kml/paddle/5.png',
	// 	content: `
	// 		<h2>Lorem Ipsum is simply dummy text</h2>
	// 		<div id="info">
	// 			<p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>

	// 			<br>
	// 			<a href="www.apple.com" class="infoLink">Elm Road</a>
	// 		</div>
	// 	`
	// });

	// var marker2 = map.addMarker({
	// 	lat: 40.836422,
	// 	lng: -74.269141,
	// 	draggable: true,
	// 	id: 1,
	// 	content: 'hello'
	// });



//Geocoder
button = document.getElementById('button');

	button.addEventListener('click', function(e){
	geocoder.geocode({
		address: input.value
	}, function(results, status){
		if(status === google.maps.GeocoderStatus.OK){
			console.log(results);
			var result = results[0];
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
	console.log(result);

	var location = {
		lat: result.geometry.location.lat(),
		lng: result.geometry.location.lng()
	};
	var service = new google.maps.places.PlacesService(map.gMap);
		service.nearbySearch({
			location: location,
			radius: 1000,
			type: ['restaurant']
		}, function(results, status){
				if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            map.addMarker({
            	lat: results[i].geometry.location.lat(),
					lng: results[i].geometry.location.lng(),
					draggable: false,
					content: "Put individual infobox text here"
            });
          }
        }
	});
			console.log('find function success');
	}





	// var infoWindow = new google.maps.InfoWindow({
	// 	content: "I like food"
	// });

	// infoWindow.open(map.gMap, marker);




	// google.maps.event.addListener(map.gMap, 'dragend',function(){
	// 	alert('dragging');
	// });

	//---> Map Markers
	// var marker = new google.maps.Marker({
	// 	position:{
	// 		lat: 40.836422,
	// 		lng: -74.269141
	// 	},
	// 	map: map.gMap,
	// 	icon: 'http://maps.google.com/mapfiles/kml/paddle/5.png'

	// });




}(window, window.Mapster));


