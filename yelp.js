var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(express.static("client"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Request API access: http://www.yelp.com/developers/getting_started/api_access
var Yelp = require('yelp');

//use your yelp credentials
var yelp = new Yelp({
  consumer_key: 'WfydRv01aFXZWK6TaAJOnQ',
  consumer_secret: 'oh9wyIny60Vc_edK4MBjCDHL0Bs',
  token: 'n7GVnnmsVoXxjoRdP9fxeDpmJ17DqzVk',
  token_secret: 'Y_ZibdstQn15p5eTjequFnFEo_A',
});


//Posting data
app.post('/getyelp', function(req, res){

	var searchRestaurant		= req.body.restaurant;
	var yelpLocation 				= req.body.location;

	// See http://www.yelp.com/developers/documentation/v2/search_api
	yelp.search({ location: yelpLocation, term: searchRestaurant})
	.then(function (data) {

		console.log('Sending data to controller');
		res.json(data); // I will return all the data recieved from YELP API. I will filter the data in controller.js

	})
	.catch(function (err) {
	  console.error(err);

	});

})

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
