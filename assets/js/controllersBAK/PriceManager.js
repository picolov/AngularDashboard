dashboardControllers.controller('PriceManagerDetailController', function($scope, $controller) {
	$controller('_DetailController', { 
		$scope: $scope, 
		$menu: "priceManager",
		$title: "Price Manager",
		$detailObjURL: getPriceManagerDetailURL, 
		$deleteObjURL: "",
		$successDeletePath: "#/priceManagerDetail/price"
		});
});

dashboardControllers.controller('PriceManagerEditController', function($rootScope, $scope, sharedService, $controller) {
	$controller('_EditController', {
		$scope: $scope, 
		$menu: "priceManager",
		$title: "Price Manager",
		$detailObjURL: getPriceManagerDetailURL, 
		$updateObjURL: updatePriceManagerURL, 
		$successUpdatePath: "#/priceManagerDetail/"
	});
});