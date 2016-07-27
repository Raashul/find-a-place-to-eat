
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
            var name            = response.businesses[0].name;
            var rating          = response.businesses[0].rating;
            var url             = response.businesses[0].url;
            var status          = response.businesses[0].is_closed;
            var contact         = response.businesses[0].phone;
            var address         = response.businesses[0].location.display_address;
            var rating_url     = response.businesses[0].location.rating_img_url;

             var snippet        = response.businesses[0].snippet_text;



            console.log('yelp to localstorage is ' + $scope.yelp);


            $scope.link     = "See me at yelp";

            $scope.name     = "Name : " + name;
            $scope.rating   = "rating : " + rating;
           //$scope.url = "url :" + url;
            $scope.status   = "status : " + closed;
            $scope.contact  = "Contact : " + contact;

            $scope.snippet  = snippet;

            $scope.url      = url;



            //$scope.yelp= localStorage.getItem('restaurantName', yelp);


       });

        //this is undefined because we are using a callback function
        console.log($scope.yelp);


    };


});

