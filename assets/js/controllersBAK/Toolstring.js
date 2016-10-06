dashboardControllers.controller('ToolstringController', function($scope, $controller) {
	$controller('_ListController', { 
		$scope: $scope, 
		$menu: "toolstring",
		$title: "Toolstring",
		$listObjURL: getAllToolstringURL
		});
});

dashboardControllers.controller('ToolstringDetailController', function($scope, $controller) {
	$controller('_DetailController', { 
		$scope: $scope, 
		$menu: "toolstring",
		$title: "Toolstring",
		$detailObjURL: getToolstringDetailURL, 
		$deleteObjURL: deleteToolstringURL,
		$successDeletePath: "#/toolstring"
		});
});

dashboardControllers.controller('ToolstringNewController', function($rootScope, $scope, sharedService, $controller) {
	$controller('_NewController', { 
		$scope: $scope, 
		$menu: "toolstring",
		$title: "Toolstring",
		$saveObjURL: saveToolstringURL,
		$successSavePath: "#/toolstring"
	});
});

dashboardControllers.controller('ToolstringEditController', function($rootScope, $scope, sharedService, $controller) {
	$controller('_EditController', {
		$scope: $scope, 
		$menu: "toolstring",
		$title: "Toolstring",
		$detailObjURL: getToolstringDetailURL, 
		$updateObjURL: updateToolstringURL, 
		$successUpdatePath: "#/toolstringDetail/"
	});
});