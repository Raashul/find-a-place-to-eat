// Request API access: http://www.yelp.com/developers/getting_started/api_access
var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'WfydRv01aFXZWK6TaAJOnQ',
  consumer_secret: 'oh9wyIny60Vc_edK4MBjCDHL0Bs',
  token: 'n7GVnnmsVoXxjoRdP9fxeDpmJ17DqzVk',
  token_secret: 'Y_ZibdstQn15p5eTjequFnFEo_A',
});


getYelp = function(yelpName, yelpLocation){

	// See http://www.yelp.com/developers/documentation/v2/search_api
	yelp.search({ term: 'food', location: yelpLocation, radius_filter: 1000})
	.then(function (data) {

		for(i=0	; i < data.businesses.length; i++){
			if (data.businesses[i].name = yelpName){
				console.log(i);
				console.log(data.businesses[i].name);
				console.log(data.businesses[i].display_phone);
				console.log(data.businesses[i].location.display_address);

				return data;

				console.log('found');
				//break;
			}
		}


	})
	.catch(function (err) {
	  console.error(err);
	});

}


