dashboardControllers.controller('WellController', function($scope, $controller) {
	$controller('_ListController', { 
		$scope: $scope, 
		$menu: "well",
		$title: "Well",
		$listObjURL: getAllWellURL
		});
});

dashboardControllers.controller('WellDetailController', function($scope, $controller) {
	$controller('_DetailController', { 
		$scope: $scope, 
		$menu: "well",
		$title: "Well",
		$detailObjURL: getWellDetailURL, 
		$deleteObjURL: deleteWellURL,
		$successDeletePath: "#/well"
		});
});

dashboardControllers.controller('WellNewController', function($rootScope, $scope, sharedService, $controller) {
	$controller('_NewController', { 
		$scope: $scope, 
		$menu: "well",
		$title: "Well",
		$saveObjURL: saveWellURL,
		$successSavePath: "#/well"
	});
});

dashboardControllers.controller('WellEditController', function($rootScope, $scope, sharedService, $controller) {
	$controller('_EditController', {
		$scope: $scope, 
		$menu: "well",
		$title: "Well",
		$detailObjURL: getWellDetailURL, 
		$updateObjURL: updateWellURL, 
		$successUpdatePath: "#/wellDetail/"
	});
});