dashboardControllers.controller('CompanyController', function($scope, $controller) {
	$controller('_ListController', { 
		$scope: $scope, 
		$menu: "contact",
		$title: "Directory",
		$listObjURL: getAllCompanyURL
		});
});

dashboardControllers.controller('CompanyDetailController', function($scope, $controller) {
	$controller('_DetailController', { 
		$scope: $scope, 
		$menu: "contact",
		$title: "Directory",
		$detailObjURL: getCompanyDetailURL, 
		$deleteObjURL: deleteCompanyURL,
		$successDeletePath: "#/company"
		});
});

dashboardControllers.controller('CompanyNewController', function($rootScope, $scope, sharedService, $controller) {
	$controller('_NewController', { 
		$scope: $scope, 
		$menu: "contact",
		$title: "Directory",
		$saveObjURL: saveCompanyURL, 
		$successSavePath: "#/company"
	});
	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company~StatusCompany~BusinessType~TypeCompany~TerritoryCompany');
	$scope.companyList = output[0].data;
	$scope.statusList = output[1].data;
	$scope.businessList = output[2].data;
	$scope.typeList = output[3].data;
	$scope.territoryList = output[4].data;
});

dashboardControllers.controller('CompanyEditController', function($rootScope, $scope, sharedService, $controller) {
	$controller('_EditController', {
		$scope: $scope, 
		$menu: "contact",
		$title: "Directory",
		$detailObjURL: getCompanyDetailURL, 
		$updateObjURL: updateCompanyURL, 
		$successUpdatePath: "#/companyDetail/"
	});
	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company~StatusCompany~BusinessType~TypeCompany~TerritoryCompany');
	$scope.companyList = output[0].data;
	// remove our own company
	for (var i = $scope.companyList.length - 1; i >= 0 ; i--) {
		if ($scope.companyList[i]._id == $scope._id) {
			$scope.companyList.splice(i, 1);
		}
	}
	$scope.statusList = output[1].data;
	$scope.businessList = output[2].data;
	$scope.typeList = output[3].data;
	$scope.territoryList = output[4].data;
});

dashboardControllers.controller('CompanyNewOilPopupController', function($rootScope, $scope, sharedService, $controller) {
	$controller('_NewPopupController', { 
		$scope: $scope,
		$saveObjURL: saveCompanyURL
	});
	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company~StatusCompany~BusinessType~TypeCompany~TerritoryCompany');
	$scope.companyList = output[0].data;
	$scope.statusList = output[1].data;
	$scope.businessList = output[2].data;
	// only use businessType = 0 - Oil & Gas
	for (var i = 0; i < $scope.businessList.length; i++) {
		if ($scope.businessList[i]._id == '0') {
			$scope.obj.business = $scope.businessList[i];
			$scope.businessList = [$scope.businessList[i]];
			break;
		}
	}
	$scope.typeList = output[3].data;
	$scope.territoryList = output[4].data;
});

dashboardControllers.controller('CompanyNewServicePopupController', function($rootScope, $scope, sharedService, $controller) {
	$controller('_NewPopupController', { 
		$scope: $scope,
		$saveObjURL: saveCompanyURL
	});
	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company~StatusCompany~BusinessType~TypeCompany~TerritoryCompany');
	$scope.companyList = output[0].data;
	$scope.statusList = output[1].data;
	$scope.businessList = output[2].data;
	// only use businessType = 1 - Service
	for (var i = 0; i < $scope.businessList.length; i++) {
		if ($scope.businessList[i]._id == '1') {
			$scope.obj.business = $scope.businessList[i];
			$scope.businessList = [$scope.businessList[i]];
			break;
		}
	}
	$scope.typeList = output[3].data;
	$scope.territoryList = output[4].data;
});

dashboardControllers.controller('CompanyNewPopupController', function($rootScope, $scope, sharedService, $controller) {
	$controller('_NewPopupController', { 
		$scope: $scope,
		$saveObjURL: saveCompanyURL
	});
	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company~StatusCompany~BusinessType~TypeCompany~TerritoryCompany');
	$scope.companyList = output[0].data;
	$scope.statusList = output[1].data;
	$scope.businessList = output[2].data;
	$scope.typeList = output[3].data;
	$scope.territoryList = output[4].data;
});