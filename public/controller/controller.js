var app = angular.module('myApp', [])
app.controller('AppCtrl', function($scope, $http) {

    $scope.search = function() {
    	$http.post("/getyelp")
	    .then(function(response) {
	       console.log('response recieved');
	    });


    };
});

