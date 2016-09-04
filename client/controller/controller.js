
app.controller('AppCtrl',function($scope, $http, filterdata) {

  $scope.searchButtonText = "Find a place to eat!";


  $scope.searchClicked=0;

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
  $scope.search = function(counter) {

    $scope.searchClicked = $scope.searchClicked + counter;


    if($scope.searchClicked == 1){

    //call the geocode function
    $scope.geocode($scope.place);

    } else{

      //Call the Next Function.
      $scope.next();
    }

  };

      //<-----------This is the function for the next button-------->
  $scope.next = function(){



    $scope.listOfPhotos = [];

    var restaurant = $scope.filterdata;
    if(restaurant.length <= 1){
      $scope.alertShow = true;
      $scope.alert_msg = "We ran out of 10 restaurant. Enter a different location?"
      $scope.reset();
    }

    else{

      $scope.filterdata.splice(0, 1);

      restaurant = $scope.filterdata;

      //call the getDetails method
      $scope.getDetails();

      var server = {location: $scope.place, restaurant: restaurant[0].name};

      $http.post("/getyelp", server)
        .success(function(response){

          var restaurant = response.businesses;

         //Storing all relevent data
        var name            = restaurant[0].name



        localStorage.setItem('restaurantName', name);


        /*

          -The order of scope variables is coded according to what is
          - displayed in the website

        */


        var rating_url      =  restaurant[0].location.rating_img_url;
        $scope.rating_img   = restaurant[0].rating_img_url;

        $scope.snippet        = restaurant[0].snippet_text;

        $scope.name     =  name;
        $scope.display_name = name;

        var address         = restaurant[0].location.display_address;
        $scope.address = "Address : " + address;

        var status          = restaurant[0].is_closed;

         if(status == "false"){
             $scope.status   = "Closed!";
         } else{
          $scope.status = "Open!";
         }

        var rating          = restaurant[0].rating;
        $scope.rating   = "rating : " + rating + " / 5";

        var contact         = restaurant[0].phone;
        $scope.contact  = "Contact : " + contact;

        var url             = restaurant[0].url;
        $scope.url      = url;

        var reviewCount     = restaurant[0].review_count;
        $scope.link   = "Check out " + reviewCount + " reviews "+ " in Yelp ";

        var image           = restaurant[0].image_url;

        $scope.rimage     = restaurant[0].image_url;

    });

    } //end of main else


  } //end of next


  //this geocode function  with find a nearby restaurant.
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
                radius: '10000' //in meters
              };

              service.nearbySearch(
               request,
               function(place, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {


                  //filterdata will call service.js
                  $scope.filterdata = filterdata.filter(place);   //filterdata is an array of buisnesses.

                  //this will be used for the reset button
                  $scope.resetR = $scope.filterdata;

                  //call the getdetail method.
                  $scope.getDetails();


            }
          })

        } //end of main IF

        else{
          $scope.alertShow = true;
          $scope.alert_msg = "We cannot find a nearby restaurant from this location"

        }

      });

  } //end of geocode function



  //this method will get the restaurant reviews and photos.
  //This function will get called after search function
  $scope.getDetails = function(){



    var service = new google.maps.places.PlacesService(map.gMap);
    var listOfRestaurants = $scope.filterdata;


    var id = listOfRestaurants[0].place_id;

    console.log(listOfRestaurants[0]);

      service.getDetails({
        placeId: id
      }, function(result, status){
        if(status === google.maps.places.PlacesServiceStatus.OK){

          $scope.restaurantName = result.name;

          $scope.callServer();

          //display website
          $scope.website        =  result.website;


          if(result.reviews){
            console.log('reviews are ' + result.reviews.length);
             //document.getElementById('accordion').style.visibility = "visible";
            //store reviews in scope variable
            $scope.reviews      = result.reviews;
          }

        if(result.photos){
          $scope.listOfPhotos = [];

          // if($scope.listOfPhotos.length >=1){
          //   console.log('remove old photos')
          //    $scope.listOfPhotos   = "";
          // }

          for(var i=0; i < result.photos.length; i++){
            var photos = result.photos[i].getUrl({'maxWidth': 600, 'maxHeight': 600});

           $scope.listOfPhotos.push(photos);
           //$scope.test = $scope.photos

          }
        }
        else{
          document.getElementById('slideshow').style.visibility= "hidden";
          $scope.noPhotoText = "No photos to display"
        }

        $scope.searchButtonText = "Not this One. Next!!!"

        } //end of service if

        else{
          $scope.alertShow = true;
          $scope.alert_msg = "Couldn't retrieve details from Google."
        }


      })


  } //end of getDetail function.




//  <-------Function for reset button ----->

$scope.reset = function(){

  /*

  -Set all scope varibles to null
  -hide all components such as maps, results, ratings and photo slidehow


  */
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
    $scope.reviews        = "";
    $scope.listOfPhotos   = "";

    $scope.searchButtonText = "Find a place to eat!";

    document.getElementById("modify").innerHTML = "";

    $scope.show = false;

    document.getElementById("accordion").style.visibility = "hidden"
    document.getElementById('map-canvas').style.visibility="hidden";
    document.getElementById('slideshow').style.visibility = "hidden";

    $scope.searchClicked = 0;


  }



  //This method will call yelp api and retrieve relevant data about the restaurant
  $scope.callServer = function(){

     var server = {location: $scope.place, restaurant: $scope.restaurantName};


    $http.post("/getyelp", server)
      .success(function(response){



      var restaurant = response.businesses;



      var name = restaurant[0].name


       //Storing all relevent data

      /*

          -The order of scope variables is coded according to what is
          - displayed in the website

        */

      $scope.displayWebsite = "Click to visit website";

      $scope.web            = "Website : "


      var rating_url      =  restaurant[0].location.rating_img_url;
      $scope.rating_img   = restaurant[0].rating_img_url;

      $scope.snippet        = restaurant[0].snippet_text;



      $scope.name     =  name;
      $scope.display_name = name;

      var address         = restaurant[0].location.display_address;
      $scope.address = "Address : " + address;

      var status          = restaurant[0].is_closed;

       if(status == "false"){
           $scope.status   = "Closed!";
       } else{
        $scope.status = "Open!";
       }

      var rating          = restaurant[0].rating;
      $scope.rating   = "rating : " + rating + " / 5";

      var contact         = restaurant[0].phone;
      $scope.contact  = "Contact : " + contact;

      var url             = restaurant[0].url;
      $scope.url      = url;

      var reviewCount     = restaurant[0].review_count;
      $scope.link   = "Check out " + reviewCount + " reviews "+ " in Yelp ";

      var image           = restaurant[0].image_url;

      $scope.rimage     = restaurant[0].image_url;


      document.getElementById("result").style.visibility = "visible"

      document.getElementById("accordion").style.visibility = "visible"
      document.getElementById('map-canvas').style.visibility="visible";
      document.getElementById('slideshow').style.visibility = "visible";


      $scope.show = true;



    });

  }









});

