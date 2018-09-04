var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(express.static("client"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Request API access: http://www.yelp.com/developers/getting_started/api_access
const yelp = require('yelp-fusion');
const client = yelp.client('v46A4XkKVRP2htkTOxZyjw2iQw_NqRe2tFUoEzqMf2drN0wFcMrY0y5lR9Qm7Co5ie1WkVuimnAbBOc0pSZRb2u1LE68H79dPs1kn1MDC2eBnFUP0l4ZLl055PGOW3Yx');

//use your yelp credentials
// var yelp = new Yelp({
//   consumer_key: 'WfydRv01aFXZWK6TaAJOnQ',
//   consumer_secret: 'oh9wyIny60Vc_edK4MBjCDHL0Bs',
//   token: 'n7GVnnmsVoXxjoRdP9fxeDpmJ17DqzVk',
//   token_secret: 'Y_ZibdstQn15p5eTjequFnFEo_A',
// });


//Posting data
app.post('/getyelp', function(req, res){

	var searchRestaurant		= req.body.restaurant;
	var yelpLocation 				= req.body.location;

	// See http://www.yelp.com/developers/documentation/v2/search_api
	client.search({ location: yelpLocation, term: searchRestaurant})
	.then(function (data) {
		res.json(data.jsonBody.businesses); // I will return all the data recieved from YELP API. I will filter the data in controller.js

	})
	.catch(function (err) {
	  console.error(err);

	});

})

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
