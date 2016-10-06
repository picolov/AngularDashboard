dashboardControllers.controller('WorkLogController', function($scope, $controller, $routeParams, sharedService, $route) {
	$controller('_ListController', { 
		$scope: $scope, 
		$menu: "workLog",
		$title: "WorkLog",
		$listObjURL: getAllWorkLogURL
		});
	
    $scope.fromDatePicker = $('#fromDatePicker').datepicker({
    	format: "mm/dd/yy",
    	weekStart: 1,
    	todayBtn: "linked",
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true}).data("datepicker");
    $scope.toDatePicker = $('#toDatePicker').datepicker({
    	format: "mm/dd/yy",
    	weekStart: 1,
    	todayBtn: "linked",
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true}).data("datepicker");
    $scope.ifNumberConvertToFormat = function(str, format) {
    	if (isNaN(str)) {
    		return str;
    	} else {
    		if (format == null) {
        		format = "mm/dd/yy, h:mm:ss a";
        	}
        	return moment.unix(str).format(format);
    	}
    };
    if ($routeParams.args) {
    	var startEndTime = $routeParams.args.split(",");
    	$scope.fromDatePicker.update(new Date(parseInt(startEndTime[0]) * 1000));
    	$scope.fromDate = $scope.fromDatePicker.getFormattedDate();
    	$scope.toDatePicker.update(new Date(parseInt(startEndTime[1]) * 1000));
    	$scope.toDate = $scope.toDatePicker.getFormattedDate();
    }
    $scope.searchWorkLog = function() {
    	location.href = "#/workLog/" + ($scope.fromDatePicker.getUTCDate().getTime() / 1000) + "," + ($scope.toDatePicker.getUTCDate().getTime() / 1000);
    }
    $scope.deleteWorkLog = function(_id) {
    	if (confirm("Are You Sure Want To Delete ?")) {
	    	var dataToSend = {"_id": _id};
	        var output = sharedService.callAjax(deleteWorkLogURL, "post", dataToSend);
	        if (output && output.status) {
	            //alert (output.message);
	            if (output.status == 1) {
	            	//alert("success delete");
	            	//location.href = "#/workLog/" + ($scope.fromDatePicker.getUTCDate().getTime() / 1000) + "," + ($scope.toDatePicker.getUTCDate().getTime() / 1000);
	            	$route.reload();
	            }
	        } else {
	            alert ("Failed to delete");
	        }
    	}
    }
});

dashboardControllers.controller('WorkLogNewDailyController', function($rootScope, $scope, sharedService, $controller) {
	$rootScope.selectedMenu = 'workLog';
	//$rootScope.breadcrumbs = sharedService.addBreadcrumb('New Company', $location.path());
	$rootScope.menuTitle = 'WorkLog';
	$scope.obj = {};
	$scope.saveDaily = function() {
		$scope.obj.workTime = $scope.workDate.getUTCDate().getTime() / 1000;
		$scope.obj.logType = "Daily";
	    var output = sharedService.callAjax(saveWorkLogURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = "#/workLog";
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
	$scope.workDate = $('#workDatePicker').datepicker({
		format: "mm/dd/yy",
		weekStart: 1,
		todayBtn: "linked",
	    calendarWeeks: true,
	    autoclose: true,
	    todayHighlight: true}).data("datepicker");
});

dashboardControllers.controller('WorkLogNewWeeklyController', function($rootScope, $scope, sharedService, $controller) {
	$rootScope.selectedMenu = 'workLog';
	//$rootScope.breadcrumbs = sharedService.addBreadcrumb('New Company', $location.path());
	$rootScope.menuTitle = 'WorkLog';
	$scope.obj = {};
	$scope.saveWeekly = function() {
		$scope.obj.workTime = $scope.workDate.getUTCDate().getTime() / 1000;
		$scope.obj.logType = "Weekly";
	    var output = sharedService.callAjax(saveWorkLogURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = "#/workLog";
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
	$scope.workDate = $('#workDatePicker').datepicker({
		selectWeek: true,
		format: "[Week] WW [of] YYYY",
		//format: "D-MM-YYYY",
		weekStart: 1,
		todayBtn: "linked",
	    calendarWeeks: true,
	    autoclose: true,
	    todayHighlight: true
	    }).data("datepicker");
});

dashboardControllers.controller('WorkLogEditDailyController', function($rootScope, $scope, sharedService, $controller, $routeParams) {
	$rootScope.selectedMenu = 'workLog';
	//$rootScope.breadcrumbs = sharedService.addBreadcrumb('New Company', $location.path());
	$rootScope.menuTitle = 'WorkLog';
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getWorkLogDetailURL + "?_id=" + $scope._id);
    $scope.obj = output.data[0];
    
	$scope.saveDaily = function() {
		$scope.obj.workTime = $scope.workDate.getUTCDate().getTime() / 1000;
	    var output = sharedService.callAjax(updateWorkLogURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = "#/workLog";
	        }
	    } else {
	        alert ("Failed to update");
	    }
	}
	$scope.workDate = $('#workDatePicker').datepicker({
		format: "mm/dd/yy",
		weekStart: 1,
		todayBtn: "linked",
	    calendarWeeks: true,
	    autoclose: true,
	    todayHighlight: true}).data("datepicker");
	$scope.workDate.update(new Date($scope.obj.workTime * 1000));
});

dashboardControllers.controller('WorkLogEditWeeklyController', function($rootScope, $scope, sharedService, $controller, $routeParams) {
	$rootScope.selectedMenu = 'workLog';
	//$rootScope.breadcrumbs = sharedService.addBreadcrumb('New Company', $location.path());
	$rootScope.menuTitle = 'WorkLog';
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getWorkLogDetailURL + "?_id=" + $scope._id);
    $scope.obj = output.data[0];
    
	$scope.saveWeekly = function() {
		$scope.obj.workTime = $scope.workDate.getUTCDate().getTime() / 1000;
	    var output = sharedService.callAjax(updateWorkLogURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = "#/workLog";
	        }
	    } else {
	        alert ("Failed to update");
	    }
	}
	$scope.workDate = $('#workDatePicker').datepicker({
		selectWeek: true,
		format: "[Week] WW [of] YYYY",
		//format: "D-MM-YYYY",
		weekStart: 1,
		todayBtn: "linked",
	    calendarWeeks: true,
	    autoclose: true,
	    todayHighlight: true
	    }).data("datepicker");
	$scope.workDate.update(new Date($scope.obj.workTime * 1000));
});