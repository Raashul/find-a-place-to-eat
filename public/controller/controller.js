var app = angular.module('myApp', ['ngResource'])
app.controller('AppCtrl', function($scope, $http) {


    $scope.search = function() {

    	var yelpName = localStorage.getItem('yelpName');
		//console.log("yelpname is " + yelpName);

    	var input = {input: $scope.input, test: "hello", yelpName: yelpName}


    	$http.post("/getyelp", input).success(function(response){
    		var yelp = response.businesses[0].name;
    		//console.log("scope yelp is " + $scope.yelp);
    			localStorage.setItem('yelp', yelp);
    	});

    	  $scope.yelp = localStorage.getItem('yelp');

    };



});

