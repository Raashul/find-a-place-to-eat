
//This is a model for script.js

//this file contains the map function which will be implemented by script.js

(function(window, google){

	//this Mapster variable stores a function NOT an object
	var Mapster = (function(){
		function Mapster(element, opts){
			this.gMap = new google.maps.Map(element, opts);
			this.markers = [];
		}

		Mapster.prototype ={
			zoom: function(level){
				if (level){
					this.gMap.setZoom(level);
				}else{
					return this.gMap.getZoom();
				}
			},

			//creating a reusable function in your own class
			_on: function(opts){
				var self = this;

				google.maps.event.addListener(opts.obj, opts.event,function(e){
						opts.callback.call(self, e);
				})
			},

			//this method calls the create marker method
			addMarker: function(opts) {
				var marker;

				opts.position = {
					lat: opts.lat,
					lng: opts.lng
				}

				// if(opts.address){
				// 	console.log(opts.address);
				// 	console.log('Address recieved in mapster');

				// 		lat: opts[0].geometry.location.lat();
				// 		lng: opts[0].geometry.location.lng();

				// 	console.log(opts.position.lat);
				// 	console.log(opts.position.lng);
				// }


				marker = this._createMarker(opts);
				this._addMarker(marker);

				if(opts.event){
					this._on({
						obj: marker,
						event: opts.event.name,
						callback: opts.event.callback
					});
				}

				if(opts.content){
					this._on({
						obj: marker,
						event: 'click',
						callback: function(){
							var infoWindow = new google.maps.InfoWindow({
								content: opts.content
							});
							infoWindow.open(this.gMap, marker);

						}
					})
				}


			return marker;

			}, //addMarker method

			_addMarker: function(marker){
				this.markers.push(marker);
			},


			_createMarker: function(opts){
				opts.map = this.gMap
				//console.log(new google.maps.Marker(opts));
				return new google.maps.Marker(opts);

			}, // end of createMarker function



			//Function for reset button: This function will clear all markers
			clear : function(){
				 //	setMapOnAll(null);
        	for (var i = 0; i < this.markers.length; i++ ) {
				    this.markers[i].setMap(null);
				  }
				  this.markers.length = 0;
				  document.getElementById("result").style.visibility = "hidden";
			},


			photos: function(){

				var restaurantAddress = localStorage.getItem('restaurant');

				var geocoder = new google.maps.Geocoder();
				geocoder.geocode({
							address: document.getElementById('input').value
						}, function(results, status){
							if(status === google.maps.GeocoderStatus.OK){

								restaurant = results[0];

								var restaurantName = localStorage.getItem('restaurantName');

								console.log(restaurant);
								console.log(restaurant.place_id);

								//"ChIJVclpFoMAw4kR_jHiNG7UwcA"
								//"ChIJP9hCFoMAw4kRunv8VAmhXJI"


									var location = {
										lat: restaurant.geometry.location.lat(),
										lng: restaurant.geometry.location.lng()
									};

								var service = new google.maps.places.PlacesService(map.gMap);

								var request = {
									location: location,
							   //	placeId: restaurant.place_id,
							   	type: ['restaurant'],
							   	radius: '500'
							  };
				        service.nearbySearch(
				         request,
				         function(place, status) {
				          if (status === google.maps.places.PlacesServiceStatus.OK) {
				          	console.log(place);

				          	var id = place[0].place_id;

				          	service.getDetails({
				          		placeId: id
				          	}, function(result, status){
				          		if(status === google.maps.places.PlacesServiceStatus.OK){
				          			console.log(result);

				          			for(var i=0; i < result.photos.length; i++){
				          				console.log(result.photos[i].getUrl({'maxWidth': 400, 'maxHeight': 400}));
				          			}

				          		}
				          	})


				          	// if(place.photos){
				          	// 	console.log('below are photos');
				          	// 	for (var i = 0; i < place.photos.length; i++) {
				          	// 		console.log(place.photos[i].getUrl({'maxWidth': 400, 'maxHeight': 400}));
				          	// 	};
				          	// }


							}
						})



          		//localStorage.setItem('photo', place.photos[i].getUrl({'maxWidth': 400, 'maxHeight': 400}));




          }
        });



			},


				//Function for next button: This function will clear all markers but not hide result <div>
			next : function(){


				 //	setMapOnAll(null);
        	for (var i = 0; i < this.markers.length; i++ ) {
				    this.markers[i].setMap(null);
				  }
				  this.markers.length = 0;
				  document.getElementById("modify").innerHTML = "";

				      console.log('hi from jquery');
			},


			//creating service.
			_onService: function(opts){


					//var item = pickrestaurant(results);


					var distanceService = new google.maps.DistanceMatrixService();
					var directionsService = new google.maps.DirectionsService();

			      var directionsRequest = {
			            origin: opts.origin,
			            destination: opts.destination,
			            travelMode: google.maps.DirectionsTravelMode.DRIVING,
			            unitSystem: google.maps.UnitSystem.METRIC
			        };

			        directionsService.route(
			        directionsRequest,
			        function (response, status) {
			            if (status == google.maps.DirectionsStatus.OK) {
			                new google.maps.DirectionsRenderer({
			                    map: map.gMap,
			                    directions: response

			                });

			               // console.log(response.request.destination);


			            }
			            else{
			                console.log('error');
			            }
			        }
			    );


			 		distanceService.getDistanceMatrix(
					    {
					        origins: [opts.origin],
					        destinations: [opts.destination],
					        travelMode: google.maps.TravelMode.DRIVING,
					        avoidHighways: false,
					        avoidTolls: true
					    },	callback );

					function callback(response, status) {  //function to be called once distance is calculated

					    if(status=="OK") {

					    	console.log("in direction callback function");

					    	//this is the total distance between two points
					   	var distance =	response.rows[0].elements[0].distance.text;

					   	//this is the total time between two points by chosen vehicle type
					    	var time = response.rows[0].elements[0].duration.text;


					    	document.getElementById("modify").innerHTML = "Duration: "  + distance + ". Estimated time is " + time + " by car";


					    } else {
					        alert("Error: Try Again ");
					    }
					}




			} // end of _onService




		}; //end of prototype method
		return Mapster;
	}());

	Mapster.create = function(element, opts){
		return new Mapster(element, opts);
	};




	window.Mapster = Mapster;

}(window, google))