
app.controller('AppCtrl',function($scope, $http, filterdata) {

  $scope.searchButtonText = "Find a place to eat!"

  $scope.searchClicked = 0;


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

      $scope.searchClicked += counter;



      if($scope.searchClicked ==1){

      //call the geocode function
      $scope.geocode($scope.place);
       $scope.searchButtonText = "Not this One. Next!!!"

      } else{

        $scope.next();
      }


    };


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
            console.log('results below');
            console.log(result);


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




          } //end of service if


        })


    } //end of getDetail function.



      //<-----------This is the function for the next button-------->
    $scope.next = function(){



      $scope.listOfPhotos = [];

      var restaurant = $scope.filterdata;

      $scope.reset();


      if(restaurant.length <= 1){
        alert('no more restaurants. Search again');
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
              $scope.rimage     = restaurant[0].image_url;

            $scope.snippet        = restaurant[0].snippet_text;


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
      $scope.listOfPhotos   = "";
      $scope.reviews        = "";

      document.getElementById("modify").innerHTML = "";

       $scope.show = false;

      document.getElementById("accordion").style.visibility = "hidden"
      document.getElementById('map-canvas').style.visibility="hidden";
      document.getElementById('slideshow').style.visibility = "hidden";




    }



    //This method will call yelp api and retrieve relevant data about the restaurant
    $scope.callServer = function(){

       var server = {location: $scope.place, restaurant: $scope.restaurantName};


      $http.post("/getyelp", server)
        .success(function(response){



        var restaurant = response.businesses;



        var name = restaurant[0].name


         //Storing all relevent data



          $scope.displayWebsite = "Click to visit website";

          $scope.web            = "Website : "


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




          $scope.link   = "Click to check out " + reviewCount + " reviews "+ " in Yelp ";
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
        document.getElementById("accordion").style.visibility = "visible"
        document.getElementById('map-canvas').style.visibility="visible";
        document.getElementById('slideshow').style.visibility = "visible";


           $scope.show = true;

          //$scope.yelp= localStorage.getItem('restaurantName', yelp);



    });

}







});

