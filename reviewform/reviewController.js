mobileApp.controller('reviewController', function($scope, $rootScope, appService,  $routeParams, $location) {
    $scope.pageClass 		= 'slideLeft';
	$rootScope.appTitle 	= $routeParams.title;
	$rootScope.itemID		= $routeParams.id;
	$scope.serviceApi		= serviceApi;
	$scope.GetServiceApi	= GetServiceApi;
	$scope.start			= 0;
	$scope.limit			= 20;
	$scope.no				= 0;
	$scope.requestData 		= [];
	
    $scope.loadMore = function () {
		$rootScope.loading = true;
		var requestParams = {
			"token": token,
			"start": $scope.start,
			"limit": $scope.limit,
			"lon": $rootScope.longitude,
			"id": $rootScope.itemID,
			"lat": $rootScope.latitude
		};
		
		appService.HttpRequest('POST',GetServiceApi+'service/get_review/', requestParams).success(function(data) {
			for (var i = 0; i < data.length; i++) {
				$scope.requestData.push({ID: i+(1+$scope.no),comment_name: data[i].comment_name,comment_value: data[i].comment_value,comment_date: data[i].comment_date,comment_rating: data[i].comment_rating});
			}
			$rootScope.loading = false;
			$scope.no = $scope.no + $scope.limit;

		});
		$scope.start++;
    };
	
	$scope.loadMore();
	
	$scope.link = function(menu_id,menu_name) {
		$location.path('/detail/'+menu_id+'/'+menu_name);
	}
	
});