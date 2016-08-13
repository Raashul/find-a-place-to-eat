app.controller('footerController', function($scope, $window){
	$scope.fb = function(){
		$window.open('https://www.facebook.com/Chelsealover.Rashul', '_blank');

	}

	$scope.git = function(){
		$window.open('https://github.com/Raashul', '_blank');

	}

	$scope.twitter = function(){
		$window.open('https://twitter.com/Rashul_Cfc', '_blank');

	}

	$scope.medium = function(){
		$window.open('https://medium.com/@rashul_cfc', '_blank');

	}
})