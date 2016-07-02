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

			// autocompete: function(){
			// 	var input = document.getElementById('input');
			// 	var autocomplete = new google.maps.places.Autocomplete(input);
			// }




		}; //end of prototype method
		return Mapster;
	}());

	Mapster.create = function(element, opts){
		return new Mapster(element, opts);
	};

	window.Mapster = Mapster;

}(window, google))