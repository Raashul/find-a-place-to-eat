
app.controller('AppCtrl',function($scope, $http, filterdata) {


    // ----> Code from autocomplete.js <------
    var inputFrom = document.getElementById('input');


    var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom);
    google.maps.event.addListener(autocompleteFrom, 'place_changed', function() {


        var place = autocompleteFrom.getPlace();

        var placeName = place.formatted_address;

        $scope.place = placeName;



    }); //end of autocomplete function.


    //Funtion for the search button
    // This function will recieve data from the server, filter the data , and respond back to the DOM
    $scope.search = function() {

      document.getElementById('map-canvas').style.visibility="visible";
      document.getElementById('slideshow').style.visibility = "visible";

     // newTyped();

      //call the geocode function
      $scope.geocode($scope.place);


      var server = {location: $scope.place, restaurant: $scope.restaurantName};


      $http.post("/getyelp", server)
        .success(function(response){

        console.log(response);

          //filterdata is an array of buisnesses.
          // $scope.filterdata = filterdata.filter(response.businesses);

          // //this will be used for the reset button
          // $scope.resetR = $scope.filterdata;

          var restaurant = response.businesses;

          //scope.yelp is undefined outside this function.
         //  var name            = response.name;
         //  console.log('name found ' + name);



        var name = restaurant[0].name
        //localStorage.setItem('restaurantName', name);


         //Storing all relevent data

          var rating          = restaurant[0].rating;
          var image           = restaurant[0].image_url;
          var url             = restaurant[0].url;
          var status          = restaurant[0].is_closed;
          var contact         = restaurant[0].phone;
          $scope.rating_img   = restaurant[0].rating_img_url;
          var address         = restaurant[0].location.display_address;

           localStorage.setItem('restaurant', address);


          var rating_url      =  restaurant[0].location.rating_img_url;
          var reviewCount     = restaurant[0].review_count;
          $scope.rimage          = restaurant[0].image_url;

          $scope.snippet        =  restaurant[0].snippet_text;




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






    };

    //  <-------Function for reset button ----->

  $scope.reset = function(){

      $scope.link           = "";
      $scope.address        = "";
      $scope.name           = "";
      $scope.rating         = "";
      $scope.status         = "";
      $scope.contact        = "";
      $scope.url            = "";
      $scope.display_name   = "";
      $scope.rating_img     = "";
      $scope.snippet        = "";
      $scope.rimage         = "";
      $scope.displayWebsite = "";

    }



    $scope.count = 0;



      //<-----------This is the function for the next button-------->
    $scope.next = function(){



      var restaurant = $scope.filterdata;
      var number = $scope.count;


      $scope.reset();

      console.log(restaurant.length);
      if(restaurant.length <= 1){
        alert('no more restaurants. Search again');
        $scope.reset();
      }

      else{

          $scope.filterdata.splice(number, 1);

          $scope.getDetails();

          var server = {location: $scope.place, restaurant: restaurant[number].name};

          $http.post("/getyelp", server)
            .success(function(response){

              var restaurant = response.businesses;

             //Storing all relevent data
            var name            = restaurant[number].name


            localStorage.setItem('restaurantName', name);

            var rating          = restaurant[number].rating;
            var image           = restaurant[number].image_url;
            var url             = restaurant[number].url;
            var status          = restaurant[number].is_closed;
            var contact         = restaurant[number].phone;
            $scope.rating_img   = restaurant[number].rating_img_url;
            var address         = restaurant[number].location.display_address;

              localStorage.setItem('restaurant', address);

            var rating_url      =  restaurant[number].location.rating_img_url;
            var reviewCount     = restaurant[number].review_count;
              $scope.rimage     = restaurant[number].image_url;

            $scope.snippet        = restaurant[number].snippet_text;




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


           $scope.photo = localStorage.getItem('photo');


        });

      } //end of main else







    } //end of next


    $scope.geocode = function(placeName){


      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({
              address: placeName
            }, function(results, status){
              if(status === google.maps.GeocoderStatus.OK){

                address = results[0];

                  var location = {
                    lat: address.geometry.location.lat(),
                    lng: address.geometry.location.lng()
                  };

                var service = new google.maps.places.PlacesService(map.gMap);

                var request = {
                  location: location,
                 // placeId: restaurant.place_id,
                  type: ['restaurant'],
                  radius: '5000'
                };
                service.nearbySearch(
                 request,
                 function(place, status) {
                  if (status === google.maps.places.PlacesServiceStatus.OK) {
                    //filterdata is an array of buisnesses.
                    $scope.filterdata = filterdata.filter(place);

                    console.log('filter data');
                    console.log($scope.filterdata);


                    //this will be used for the reset button
                    $scope.resetR = $scope.filterdata;

                    //call the getdetail method.
                    $scope.getDetails();


              }
            })



          }
        });




    } //end of geocode function


    $scope.getDetails = function(){

      var service = new google.maps.places.PlacesService(map.gMap);
      var listOfRestaurants = $scope.filterdata;


      var id = listOfRestaurants[0].place_id;

        service.getDetails({
          placeId: id
        }, function(result, status){
          if(status === google.maps.places.PlacesServiceStatus.OK){
            console.log('results below');
            console.log(result);


            $scope.restaurantName = result.name;


            //display website
            $scope.website        =  result.website;

            $scope.displayWebsite = "Website : " + $scope.website;

            $scope.web            = "Website : "

            //store reviews in scope variable
            $scope.reviews      = result.reviews;

          if(result.photos){
            $scope.listOfPhotos = [];
            for(var i=0; i < result.photos.length; i++){
              var photos = result.photos[i].getUrl({'maxWidth': 200, 'maxHeight': 200});
             $scope.listOfPhotos.push(photos);
             //$scope.test = $scope.photos

            }
          }
          else{
            $scope.listOfPhotos = "No photos to display"
          }



          } //end of service if


        })


    } //end of getDetail function.









});

