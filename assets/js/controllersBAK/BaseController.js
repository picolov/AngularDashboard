dashboardControllers.controller('_ListController', function($rootScope, $scope, sharedService, $filter, ngTableParams, $routeParams, $menu, $title, $listObjURL) {
	$rootScope.selectedMenu = $menu;
	//$rootScope.breadcrumbs = sharedService.newBreadcrumb('Company Listing', $location.path());
	$rootScope.menuTitle = $title;
	var output;
	if ($routeParams.args) {
		output = sharedService.getDataFromServer($listObjURL + "?args=" + $routeParams.args);
	} else {
		output = sharedService.getDataFromServer($listObjURL);
	}
	var data = output.data;
	$scope.obj = data;
	$scope.objTableParams = $scope.getTableParam(data);
});

dashboardControllers.controller('_DetailController', function($rootScope, $scope, sharedService, $routeParams, $detailObjURL, $deleteObjURL, $successDeletePath, $menu, $title) {
	$rootScope.selectedMenu = $menu;
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = $title;
	$scope._id = $routeParams._id;
    var output = sharedService.getDataFromServer($detailObjURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
	
	$scope.deleteObj = function() {
		if (confirm("Are You Sure Want To Delete ?")) {
			var dataToSend = {"_id": $scope._id};
	        var output = sharedService.callAjax($deleteObjURL, "post", dataToSend);
	        if (output && output.status) {
	            //alert (output.message);
	            if (output.status == 1) {
	            	//alert("success delete");
	            	location.href = $successDeletePath;
	            }
	        } else {
	            alert ("Failed to delete");
	        }
		}
	};
});

dashboardControllers.controller('_NewController', function($rootScope, $scope, sharedService, $routeParams, $saveObjURL, $successSavePath, $menu, $title) {
	$rootScope.selectedMenu = $menu;
	//$rootScope.breadcrumbs = sharedService.addBreadcrumb('New Company', $location.path());
	$rootScope.menuTitle = $title;
	$scope.obj = {};
	
	$scope.save = function() {
	    var output = sharedService.callAjax($saveObjURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	        	//alert("success saved");
	            //sharedService.setToBreadcrumb(sharedService.getBreadcrumb().length-1);
	            location.href = $successSavePath;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('_NewPopupController', function($rootScope, $scope, sharedService, $routeParams, $saveObjURL) {
	$scope.obj = {};
	
	$scope.save = function() {
	    var output = sharedService.callAjax($saveObjURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	        	$scope.closeThisDialog(output);
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('_EditController', function($rootScope, $scope, sharedService, $routeParams, $detailObjURL, $updateObjURL, $successUpdatePath, $menu, $title) {
	$rootScope.selectedMenu = $menu;
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Edit Company', $location.path());
    $rootScope.menuTitle = $title;
    
    $scope._id = $routeParams._id;
    output = sharedService.getDataFromServer($detailObjURL + "?_id=" + $scope._id);
    $scope.obj = output.data[0];
    
    $scope.save = function() {
        var output = sharedService.callAjax($updateObjURL, "post", $scope.obj);
        if (output && output.status) {
            //alert (output.message);
            if (output.status == 1) {
            	//alert("success updated");
                //sharedService.setToBreadcrumb(sharedService.getBreadcrumb().length-1);
            	location.href = $successUpdatePath + $scope._id;
            }
        } else {
            alert ("Failed to update");
        }
    }
});
