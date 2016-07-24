
app.controller('AppCtrl',function($scope, $http) {



    // ----> Code from autocomplete.js <------
    var inputFrom = document.getElementById('input');
    var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom);
    google.maps.event.addListener(autocompleteFrom, 'place_changed', function() {
        var place = autocompleteFrom.getPlace();

        var placeName = place.formatted_address;

        $scope.place = placeName;

    });




    $scope.search = function() {

        var restaurantName = localStorage.getItem('restaurantName');
        console.log('restaurantname from localstorage is ' + restaurantName);

        var input = {input: $scope.place, yelpName: restaurantName}
        console.log('post input sent is ')
        console.log(input);



        $http.post("/getyelp", input).success(function(response){

            //scope.yelp is undefined outside this function.
            $scope.yelp = response.businesses[0].name;
            console.log('yelp to localstorage is ' + $scope.yelp);

            $scope.yelp= localStorage.getItem('restaurantName', yelp);


       });


    };


});

