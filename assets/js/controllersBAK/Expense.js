// EXPENSE REPORT

dashboardControllers.controller('JobExpenseReportNewController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    var output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    $scope.obj = {};
    $scope.save = function() {
    	$scope.obj.job = $scope._id;
	    var output = sharedService.callAjax(saveExpenseReportURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jobInfoExpenseReport/' + $scope._id;;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('JobExpenseReportEditController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    var output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    $scope.obj = {};
    
    output = sharedService.getDataFromServer(getExpenseReportByJobURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    $scope.save = function() {
    	$scope.obj.job = $scope._id;
	    var output = sharedService.callAjax(updateExpenseReportURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jobInfoExpenseReport/' + $scope._id;;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('JobExpenseReportDetailController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    var output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    $scope.obj = {};
    
    output = sharedService.getDataFromServer(getExpenseReportByJobURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    if ($scope.obj == null) {
    	location.href = '#/jobInfoExpenseReportNew/' + $scope._id;
    }
	$scope.detailPdf = function() {
		window.open(getExpenseReportDetailPdfURL + "/_id/" + $scope._id, "_self");
	}
});