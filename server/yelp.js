var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(express.static("../client"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Request API access: http://www.yelp.com/developers/getting_started/api_access
var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'WfydRv01aFXZWK6TaAJOnQ',
  consumer_secret: 'oh9wyIny60Vc_edK4MBjCDHL0Bs',
  token: 'n7GVnnmsVoXxjoRdP9fxeDpmJ17DqzVk',
  token_secret: 'Y_ZibdstQn15p5eTjequFnFEo_A',
});


//Posting data
app.post('/getyelp', function(req, res){

	console.log('post request here');

	//error is here req.body.input --> comes undefined
	var yelpLocation = req.body.input;
	console.log('Location for yelp search is ' + yelpLocation);

	var yelpName = req.body.yelpName;
		console.log('random restaurant from angular is ' + yelpName);


	// See http://www.yelp.com/developers/documentation/v2/search_api
	yelp.search({ term: 'food', location: yelpLocation, radius_filter: 1000})
	.then(function (data) {

		for(i=0	; i < data.businesses.length; i++){
			if (data.businesses[i].name = yelpName){
				console.log('found');
				console.log(i);
				console.log(data.businesses[i].name);
				console.log(data.businesses[i].display_phone);
				console.log(data.businesses[i].location.display_address);

				console.log('go to client side');
				break;

				// return data;

			}
			else{
				console.log('no restaurant');
			}
		}


		res.json(data);


	})
	.catch(function (err) {
	  console.error(err);
	});

})






console.log('Port running in 3000');
app.listen(3000);

