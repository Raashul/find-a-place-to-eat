
app.controller('AppCtrl',function($scope, $http, filterdata) {


    // ----> Code from autocomplete.js <------
    var inputFrom = document.getElementById('input');
    var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom);
    google.maps.event.addListener(autocompleteFrom, 'place_changed', function() {
        var place = autocompleteFrom.getPlace();

        var placeName = place.formatted_address;

        $scope.place = placeName;

    });


    $scope.search = function() {

      console.log('inside search yelp function');

        var input = {input: $scope.place}
        console.log('post input sent is ')
        console.log(input);


        $http.post("/getyelp", input).success(function(response){

          console.log('sending data to service');

            //filterdata is an array of buisnesses.
            $scope.filterdata = filterdata.filter(response.businesses);
            console.log($scope.filterdata);

            var restaurant = $scope.filterdata;



            //scope.yelp is undefined outside this function.
           //  var name            = response.name;
           //  console.log('name found ' + name);

           var name = restaurant[0].name

           localStorage.setItem('restaurant', name);

            var rating          = restaurant[0].rating;
            var url             = restaurant[0].url;
            var status          = restaurant[0].is_closed;
            var contact         = restaurant[0].phone;
            $scope.rating_img   = restaurant[0].rating_img_url;
            var address         = restaurant[0].location.display_address;

            var rating_url      =  restaurant[0].location.rating_img_url;

            $scope.snippet        = restaurant[0].snippet_text;



            $scope.link     = "See me at yelp";
            $scope.address = "Address : " + address;

            $scope.name     = "Name : " + name;
            $scope.rating   = "rating : " + rating;


           if(status == "false"){
                 $scope.status   = "Closed!";
           } else{
            $scope.status = "Open!";
           }



             $scope.contact  = "Contact : " + contact;

             $scope.url      = url;

             $scope.display_name = name;

             document.getElementById("result").style.visibility = "visible"

            //$scope.yelp= localStorage.getItem('restaurantName', yelp);


       });

        //this is undefined because we are using a callback function
        //console.log($scope.yelp);


    };


    $scope.reset = function(){

        $scope.name = "";
        $scope.address = "";
        $scope.snippet = "";

    }


});

