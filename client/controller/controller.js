
app.controller('AppCtrl',function($scope, $http, filterdata) {


    // ----> Code from autocomplete.js <------
    var inputFrom = document.getElementById('input');
    var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom);
    google.maps.event.addListener(autocompleteFrom, 'place_changed', function() {
        var place = autocompleteFrom.getPlace();

        var placeName = place.formatted_address;

        $scope.place = placeName;

    });



    //Funtion for the search button
    // This function will recieve data from the server, filter the data , and respond back to the DOM
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


            //this will be used for the reset button
            $scope.resetR = $scope.filterdata;

            var restaurant = $scope.filterdata;

            //scope.yelp is undefined outside this function.
           //  var name            = response.name;
           //  console.log('name found ' + name);




           var name = restaurant[0].name


           //Storing all relevent data

            var rating          = restaurant[0].rating;
            var image           = restaurant[0].image_url;
            var url             = restaurant[0].url;
            var status          = restaurant[0].is_closed;
            var contact         = restaurant[0].phone;
            $scope.rating_img   = restaurant[0].rating_img_url;
            var address         = restaurant[0].location.display_address;

            var rating_url      =  restaurant[0].location.rating_img_url;
            var reviewCount     = restaurant[0].review_count;
            $scope.rimage          = restaurant[0].image_url;

            $scope.snippet        =  restaurant[0].snippet_text;

            localStorage.setItem('restaurant', address);



         $scope.link   = "Check out " + reviewCount + " reviews "+ " in Yelp ";
            $scope.contact  = "Contact : " + contact;
            $scope.url      = url;
            $scope.display_name = name;
            $scope.address = "Address : " + address;

            $scope.name     = "Name : " + name;
            $scope.rating   = "rating : " + rating + " / 5";;


           if(status == "false"){
                 $scope.status   = "Closed!";
           } else{
            $scope.status = "Open!";
           }


           document.getElementById("result").style.visibility = "visible"


             $scope.show = true;

            //$scope.yelp= localStorage.getItem('restaurantName', yelp);


       });



        //this is undefined because we are using a callback function
        //console.log($scope.yelp);


    };

    //  <-------Function for reset button ----->

  $scope.reset = function(){

      $scope.link = "";
      $scope.address = "";
      $scope.name = "";
      $scope.rating = "";
      $scope.status = "";
      $scope.contact = "";
      $scope.url = "";
      $scope.display_name = "";
      $scope.rating_img   = "";
      $scope.snippet = "";
      $scope.rimage = "";

    }



    $scope.count = 0;



      //<-----------This is the function for the next button-------->
    $scope.next = function(){

      var restaurant = $scope.resetR;
      var number = $scope.count;


      $scope.reset();

      console.log(restaurant.length);
      if(restaurant.length <= 1){
        alert('no more restaurants. Search again');
        $scope.reset();
      }

      else{

            //scope.yelp is undefined outside this function.
           //  var name            = response.name;
           //  console.log('name found ' + name);

          restaurant.splice(number, 1);
          console.log(restaurant);

         //Storing all relevent data
            var name            = restaurant[number].name
            var rating          = restaurant[number].rating;
            var image           = restaurant[number].image_url;
            var url             = restaurant[number].url;
            var status          = restaurant[number].is_closed;
            var contact         = restaurant[number].phone;
            $scope.rating_img   = restaurant[number].rating_img_url;
            var address         = restaurant[number].location.display_address;

            var rating_url      =  restaurant[number].location.rating_img_url;
            var reviewCount     = restaurant[number].review_count;
              $scope.rimage     = restaurant[number].image_url;

            $scope.snippet        = restaurant[number].snippet_text;

            localStorage.setItem('restaurant', address);



            $scope.link   = "Check out " + reviewCount + " reviews "+ " in Yelp ";
            $scope.contact  = "Contact : " + contact;
            $scope.url      = url;
            $scope.display_name = name;
            $scope.address = "Address : " + address;

            $scope.name     = "Name : " + name;
            $scope.rating   = "rating : " + rating + " / 5";


           if(status == "false"){
                 $scope.status   = "Closed!";
           } else{
            $scope.status = "Open!";
           }


    }


      }






});

