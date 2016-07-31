

// This code will be used in controller.js for address autocomplete feature.

var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', function ($scope) {

    // var options = {
    //     componentRestrictions: {country: "in"}
    // };
    var inputFrom = document.getElementById('input');
    var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom);
    google.maps.event.addListener(autocompleteFrom, 'place_changed', function() {
        var place = autocompleteFrom.getPlace();
        // $scope.user.fromLat = place.geometry.location.lat();
        // $scope.user.fromLng = place.geometry.location.lng();
        // $scope.user.from = place.formatted_address;
        console.log("autocomplete " + place);
    });
});