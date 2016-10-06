dashboardControllers.controller('JobOutgoingToolsOpenController', function($scope, $rootScope, $routeParams, $controller, sharedService) {
	$rootScope.selectedMenu = "jobInfo";
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.svo = output.data[0];
    // check if has BA SLB or HAL
    $scope.hasBA = false;
    $scope.hasSLB = false;
    $scope.hasHAL = false;
    for (var i = 1; i <= $scope.svo.toolCount; i++) {
	    if ($scope.svo['toolType' + i]) {
	    	if ($scope.svo['toolType' + i].indexOf('BA') != -1) { $scope.hasBA = true; }
	    	if ($scope.svo['toolType' + i].indexOf('SLB') != -1) { $scope.hasSLB = true; }
	    	if ($scope.svo['toolType' + i].indexOf('HAL') != -1) { $scope.hasHAL = true; }
	    }
    }
    var output = sharedService.getDataFromServer(getOutgoingToolsOpenInspectionByJobURL + "/_id/" + $scope._id);
    $scope.inspection = output.data[0];
    output = sharedService.getDataFromServer(getOutgoingToolsOpenLeakBakerByJobURL + "/_id/" + $scope._id);
    $scope.leakBaker = output.data[0];
    output = sharedService.getDataFromServer(getOutgoingToolsLeakBergerByJobURL + "/_id/" + $scope._id);
    $scope.leakBerger = output.data[0];
    output = sharedService.getDataFromServer(getOutgoingToolsLeakBurtonByJobURL + "/_id/" + $scope._id);
    $scope.leakBurton = output.data[0];
});

dashboardControllers.controller('JobOutgoingToolsCasedController', function($scope, $rootScope, $routeParams, $controller, sharedService) {
	$rootScope.selectedMenu = "jobInfo";
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    var output = sharedService.getDataFromServer(getOutgoingToolsCasedInspectionByJobURL + "/_id/" + $scope._id);
    $scope.inspection = output.data[0];
    output = sharedService.getDataFromServer(getOutgoingToolsCasedLeakBakerByJobURL + "/_id/" + $scope._id);
    $scope.leakBaker = output.data[0];
    output = sharedService.getDataFromServer(getOutgoingToolsLeakBergerByJobURL + "/_id/" + $scope._id);
    $scope.leakBerger = output.data[0];
    output = sharedService.getDataFromServer(getOutgoingToolsLeakBurtonByJobURL + "/_id/" + $scope._id);
    $scope.leakBurton = output.data[0];
});

dashboardControllers.controller('JobOutgoingToolsOpenInspectionNewController', function($scope, $rootScope, $controller, $routeParams, sharedService, ngTableParams, $filter) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
	$scope.obj = {};
    var output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.svo = output.data[0];
 // set serialList from service order
    $scope.serialList = [];
    if ($scope.svo) {
    	for (var i = 1; i <= $scope.svo.toolCount; i++) {
	    	if ($scope.svo['serial' + i]) {
	    		$scope.serialList.push($scope.svo['toolType' + i] + " - " + $scope.svo['serial' + i]);
	    	}
    	}
    }
    
    $scope.save = function() {
    	$scope.obj.job = $scope._id;
	    var output = sharedService.callAjax(saveOutgoingToolsOpenInspectionURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jobInfoOutgoingTools0InspectionDetail/' + $scope._id;;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
    
    $scope.getDescJar = function() {
    	var toolType = [];
    	for (var i = 1; i <= $scope.obj.toolCount; i++) {
        	toolType.push($scope.getToolType($scope.obj['serial' + i]));
    	}
    	return $rootScope.mergeStringNoDup(', ', toolType);
    }
    
    $scope.getToolCount = [];
    if (!$scope.obj.toolCount || $scope.obj.toolCount == 0) {
    	$scope.obj.toolCount = 1;
    }
    for (var i = 1; i <= $scope.obj.toolCount; i++) {
    	$scope.getToolCount.push({id:UUID(), idx:i});
	}
	
	$scope.addTool = function() {
		var idx = arguments[0];
		for (var i = 0; i < arguments.length; i++) {
			for (var j = $scope.obj.toolCount; j > idx ; j--) {
				$scope.obj[arguments[i] + (j + 1)] = $scope.obj[arguments[i] + j];
			}
		}
		for (var i = 0; i < arguments.length; i++) {
			delete $scope.obj[arguments[i] + (idx + 1)];
		}
		$scope.obj.toolCount++;
		$scope.getToolCount = [];
	    for (var i = 1; i <= $scope.obj.toolCount; i++) {
	    	$scope.getToolCount.push({id:UUID(), idx:i});
		}
	    
	};
	
	$scope.deleteTool = function() {
		if (confirm("Are You Sure Want To Delete ?")) {
			var idx = arguments[0];
			
			for (var i = 0; i < arguments.length; i++) {
				for (var j = idx; j < $scope.obj.toolCount ; j++) {
					$scope.obj[arguments[i] + (j)] = $scope.obj[arguments[i] + (j + 1)];
				}
			}
			for (var i = 0; i < arguments.length; i++) {
				delete $scope.obj[arguments[i] + ($scope.obj.toolCount)];
			}
			
			$scope.obj.toolCount--;
			$scope.getToolCount = [];
		    for (var i = 1; i <= $scope.obj.toolCount; i++) {
		    	$scope.getToolCount.push({id:UUID(), idx:i});
			}
		}
	};
});

dashboardControllers.controller('JobOutgoingToolsCasedInspectionNewController', function($scope, $rootScope, $controller, $routeParams, sharedService, ngTableParams, $filter) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    $scope.obj = {};
    output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.svo = output.data[0];
 // set serialList from service order
    $scope.serialList = [];
    if ($scope.svo) {
    	for (var i = 1; i <= $scope.svo.toolCount; i++) {
	    	if ($scope.svo['serial' + i]) {
	    		$scope.serialList.push($scope.svo['toolType' + i] + " - " + $scope.svo['serial' + i]);
	    	}
    	}
    }
    
    $scope.save = function() {
    	$scope.obj.job = $scope._id;
	    var output = sharedService.callAjax(saveOutgoingToolsCasedInspectionURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jobInfoOutgoingTools1InspectionDetail/' + $scope._id;;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
    
    $scope.getDescJar = function() {
    	var toolType = [];
    	for (var i = 1; i <= $scope.obj.toolCount; i++) {
        	toolType.push($scope.getToolType($scope.obj['serial' + i]));
    	}
    	return $rootScope.mergeStringNoDup(', ', toolType);
    }
    
    $scope.getToolCount = [];
    if (!$scope.obj.toolCount || $scope.obj.toolCount == 0) {
    	$scope.obj.toolCount = 1;
    }
    for (var i = 1; i <= $scope.obj.toolCount; i++) {
    	$scope.getToolCount.push({id:UUID(), idx:i});
	}
	
	$scope.addTool = function() {
		var idx = arguments[0];
		for (var i = 0; i < arguments.length; i++) {
			for (var j = $scope.obj.toolCount; j > idx ; j--) {
				$scope.obj[arguments[i] + (j + 1)] = $scope.obj[arguments[i] + j];
			}
		}
		for (var i = 0; i < arguments.length; i++) {
			delete $scope.obj[arguments[i] + (idx + 1)];
		}
		$scope.obj.toolCount++;
		$scope.getToolCount = [];
	    for (var i = 1; i <= $scope.obj.toolCount; i++) {
	    	$scope.getToolCount.push({id:UUID(), idx:i});
		}
	    
	};
	
	$scope.deleteTool = function() {
		if (confirm("Are You Sure Want To Delete ?")) {
			var idx = arguments[0];
			
			for (var i = 0; i < arguments.length; i++) {
				for (var j = idx; j < $scope.obj.toolCount ; j++) {
					$scope.obj[arguments[i] + (j)] = $scope.obj[arguments[i] + (j + 1)];
				}
			}
			for (var i = 0; i < arguments.length; i++) {
				delete $scope.obj[arguments[i] + ($scope.obj.toolCount)];
			}
			
			$scope.obj.toolCount--;
			$scope.getToolCount = [];
		    for (var i = 1; i <= $scope.obj.toolCount; i++) {
		    	$scope.getToolCount.push({id:UUID(), idx:i});
			}
		}
	};
});

// EDITING

dashboardControllers.controller('JobOutgoingToolsOpenInspectionEditController', function($scope, $rootScope, $controller, $routeParams, sharedService, ngTableParams, $filter) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    var output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.svo = output.data[0];
 // set serialList from service order
    $scope.serialList = [];
    if ($scope.svo) {
    	for (var i = 1; i <= $scope.svo.toolCount; i++) {
	    	if ($scope.svo['serial' + i]) {
	    		$scope.serialList.push($scope.svo['toolType' + i] + " - " + $scope.svo['serial' + i]);
	    	}
    	}
    }
    output = sharedService.getDataFromServer(getOutgoingToolsOpenInspectionByJobURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    
    $scope.save = function() {
    	$scope.obj.job = $scope._id;
	    var output = sharedService.callAjax(updateOutgoingToolsOpenInspectionURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jobInfoOutgoingTools0InspectionDetail/' + $scope._id;;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
    
    $scope.getDescJar = function() {
    	var toolType = [];
    	for (var i = 1; i <= $scope.obj.toolCount; i++) {
        	toolType.push($scope.getToolType($scope.obj['serial' + i]));
    	}
    	return $rootScope.mergeStringNoDup(', ', toolType);
    }
    
    $scope.getToolCount = [];
    if (!$scope.obj.toolCount || $scope.obj.toolCount == 0) {
    	$scope.obj.toolCount = 1;
    }
    for (var i = 1; i <= $scope.obj.toolCount; i++) {
    	$scope.getToolCount.push({id:UUID(), idx:i});
	}
	
	$scope.addTool = function() {
		var idx = arguments[0];
		for (var i = 0; i < arguments.length; i++) {
			for (var j = $scope.obj.toolCount; j > idx ; j--) {
				$scope.obj[arguments[i] + (j + 1)] = $scope.obj[arguments[i] + j];
			}
		}
		for (var i = 0; i < arguments.length; i++) {
			delete $scope.obj[arguments[i] + (idx + 1)];
		}
		$scope.obj.toolCount++;
		$scope.getToolCount = [];
	    for (var i = 1; i <= $scope.obj.toolCount; i++) {
	    	$scope.getToolCount.push({id:UUID(), idx:i});
		}
	    
	};
	
	$scope.deleteTool = function() {
		if (confirm("Are You Sure Want To Delete ?")) {
			var idx = arguments[0];
			
			for (var i = 0; i < arguments.length; i++) {
				for (var j = idx; j < $scope.obj.toolCount ; j++) {
					$scope.obj[arguments[i] + (j)] = $scope.obj[arguments[i] + (j + 1)];
				}
			}
			for (var i = 0; i < arguments.length; i++) {
				delete $scope.obj[arguments[i] + ($scope.obj.toolCount)];
			}
			
			$scope.obj.toolCount--;
			$scope.getToolCount = [];
		    for (var i = 1; i <= $scope.obj.toolCount; i++) {
		    	$scope.getToolCount.push({id:UUID(), idx:i});
			}
		}
	};
});

dashboardControllers.controller('JobOutgoingToolsCasedInspectionEditController', function($scope, $rootScope, $controller, $routeParams, sharedService, ngTableParams, $filter) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    var output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    $scope.obj = {};
    output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.svo = output.data[0];
 // set serialList from service order
    $scope.serialList = [];
    if ($scope.svo) {
    	for (var i = 1; i <= $scope.svo.toolCount; i++) {
	    	if ($scope.svo['serial' + i]) {
	    		$scope.serialList.push($scope.svo['toolType' + i] + " - " + $scope.svo['serial' + i]);
	    	}
    	}
    }
    output = sharedService.getDataFromServer(getOutgoingToolsCasedInspectionByJobURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    
    $scope.save = function() {
    	$scope.obj.job = $scope._id;
	    var output = sharedService.callAjax(updateOutgoingToolsCasedInspectionURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jobInfoOutgoingTools1InspectionDetail/' + $scope._id;;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
    
    $scope.getDescJar = function() {
    	var toolType = [];
    	for (var i = 1; i <= $scope.obj.toolCount; i++) {
        	toolType.push($scope.getToolType($scope.obj['serial' + i]));
    	}
    	return $rootScope.mergeStringNoDup(', ', toolType);
    }
    
    $scope.getToolCount = [];
    if (!$scope.obj.toolCount || $scope.obj.toolCount == 0) {
    	$scope.obj.toolCount = 1;
    }
    for (var i = 1; i <= $scope.obj.toolCount; i++) {
    	$scope.getToolCount.push({id:UUID(), idx:i});
	}
	
	$scope.addTool = function() {
		var idx = arguments[0];
		for (var i = 0; i < arguments.length; i++) {
			for (var j = $scope.obj.toolCount; j > idx ; j--) {
				$scope.obj[arguments[i] + (j + 1)] = $scope.obj[arguments[i] + j];
			}
		}
		for (var i = 0; i < arguments.length; i++) {
			delete $scope.obj[arguments[i] + (idx + 1)];
		}
		$scope.obj.toolCount++;
		$scope.getToolCount = [];
	    for (var i = 1; i <= $scope.obj.toolCount; i++) {
	    	$scope.getToolCount.push({id:UUID(), idx:i});
		}
	    
	};
	
	$scope.deleteTool = function() {
		if (confirm("Are You Sure Want To Delete ?")) {
			var idx = arguments[0];
			
			for (var i = 0; i < arguments.length; i++) {
				for (var j = idx; j < $scope.obj.toolCount ; j++) {
					$scope.obj[arguments[i] + (j)] = $scope.obj[arguments[i] + (j + 1)];
				}
			}
			for (var i = 0; i < arguments.length; i++) {
				delete $scope.obj[arguments[i] + ($scope.obj.toolCount)];
			}
			
			$scope.obj.toolCount--;
			$scope.getToolCount = [];
		    for (var i = 1; i <= $scope.obj.toolCount; i++) {
		    	$scope.getToolCount.push({id:UUID(), idx:i});
			}
		}
	};
});

// DETAIL

dashboardControllers.controller('JobOutgoingToolsOpenInspectionDetailController', function($scope, $rootScope, $controller, $routeParams, sharedService, ngTableParams, $filter) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    var output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.svo = output.data[0];
    output = sharedService.getDataFromServer(getOutgoingToolsOpenInspectionByJobURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    
    $scope.detailPdf = function() {
		window.open(getInspectionOpenDetailPdfURL + "/_id/" + $scope._id, "_self");
	}
    
    $scope.getDescJar = function() {
    	var toolType = [];
    	for (var i = 1; i <= $scope.obj.toolCount; i++) {
        	toolType.push($scope.getToolType($scope.obj['serial' + i]));
    	}
    	return $rootScope.mergeStringNoDup(', ', toolType);
    }
    
    // item list
    $scope.getToolCount = [];
    for (var i = 1; i <= $scope.obj.toolCount; i++) {
    	$scope.getToolCount.push({id:UUID(), idx:i});
	}
});

dashboardControllers.controller('JobOutgoingToolsCasedInspectionDetailController', function($scope, $rootScope, $controller, $routeParams, sharedService, ngTableParams, $filter) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    $scope.obj = {};
    output = sharedService.getDataFromServer(getOutgoingToolsCasedInspectionByJobURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    
    $scope.detailPdf = function() {
		window.open(getInspectionCasedDetailPdfURL + "/_id/" + $scope._id, "_self");
	}
    
    $scope.getDescJar = function() {
    	var toolType = [];
    	for (var i = 1; i <= $scope.obj.toolCount; i++) {
        	toolType.push($scope.getToolType($scope.obj['serial' + i]));
    	}
    	return $rootScope.mergeStringNoDup(', ', toolType);
    }
    
    // item list
    $scope.getToolCount = [];
    for (var i = 1; i <= $scope.obj.toolCount; i++) {
    	$scope.getToolCount.push({id:UUID(), idx:i});
	}
});

// JAR IN OUT

dashboardControllers.controller('JobOutgoingToolsInOutController', function($scope, $rootScope, $controller, $routeParams, sharedService, ngTableParams, $filter) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.svo = output.data[0];
    $scope.obj = {};
    output = sharedService.getDataFromServer(getOutgoingToolsInOutByJobURL + "/_id/" + $scope._id);
    $scope.obj = output.data;
    var data = $scope.obj;
    if (data == null) {
    	data = [];
    }
    
	$scope.objTableParams = $scope.getTableParam(data);
	
	$scope.deleteObj = function(idToDel) {
		if (confirm("Are You Sure Want To Delete ?")) {
			var dataToSend = {"_id": idToDel};
	        var output = sharedService.callAjax(deleteOutgoingToolsInOutURL, "post", dataToSend);
	        if (output && output.status) {
	            //alert (output.message);
	            if (output.status == 1) {
	            	//alert("success delete");
	            	location.reload(true);
	            }
	        } else {
	            alert ("Failed to delete");
	        }
		}
	};
	
	$scope.detailPdf = function() {
		window.open(getInOutDetailPdfURL + "/_id/" + $scope._id, "_self");
	}
});

dashboardControllers.controller('JobOutgoingToolsInOutNewController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    var output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.svo = output.data[0];
    $scope.obj = {};
 // set serialList from service order
    $scope.serialList = [];
    if ($scope.svo) {
    	for (var i = 1; i <= $scope.svo.toolCount; i++) {
	    	if ($scope.svo['serial' + i]) {
	    		$scope.serialList.push($scope.svo['toolType' + i] + ' - ' + $scope.svo['serial' + i]);
	    	}
    	}
    }
    // basket list
    if ($scope.svo.basket1) {
    	$scope.basketList = [];
    	for (var i = 1; i <= $scope.svo.basketCount; i++) {
    		$scope.basketList.push($scope.svo['basket' + i]);
    	}
    }
    // sling list
    if ($scope.svo.sling1) {
    	$scope.slingList = [];
    	for (var i = 1; i <= $scope.svo.slingCount; i++) {
    		$scope.slingList.push($scope.svo['sling' + i]);
    	}
    }
    $scope.save = function() {
    	$scope.obj.job = $scope._id;
	    var output = sharedService.callAjax(saveOutgoingToolsInOutURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jobInfoOutgoingToolsInOutList/' + $scope._id;;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
    
    $scope.selectSerial = function (item, model) {
    	$scope.obj.serialType = '0';
    	var jarSerial = null;
    	var jarType = "";
		if (item.indexOf(" - ") != -1) {
			var jarTypeSerial = item.split(" - ");
			jarType = jarTypeSerial[0];
			jarSerial = jarTypeSerial[1];
		} else {
			jarSerial = item;
		}
		if (jarSerial != null) {
			if ($scope.jobInfo.type == '0') { // open hole
				if (jarType.indexOf(' BA ') != -1 || jarType.indexOf(' BA') != -1) { // Baker
					var output = sharedService.getDataFromServer(getOutgoingToolsOpenLeakBakerByJobAndSerialURL + "/job/" + $scope._id + "/serial/" + item);
	    		    $scope.leakCon = output.data[0];
				} else if (jarType.indexOf(' SLB ') != -1 || jarType.indexOf(' SLB') != -1) { // Schlumberger
					var output = sharedService.getDataFromServer(getOutgoingToolsLeakBergerByJobAndSerialURL + "/job/" + $scope._id + "/serial/" + item);
	    		    $scope.leakCon = output.data[0];
				} else if (jarType.indexOf(' HAL ') != -1 || jarType.indexOf(' HAL') != -1) { // Halliburton
					var output = sharedService.getDataFromServer(getOutgoingToolsLeakBurtonByJobAndSerialURL + "/job/" + $scope._id + "/serial/" + item);
	    		    $scope.leakCon = output.data[0];
				}
				
    		} else if ($scope.jobInfo.type == '1') { // cased hole
    			var output = sharedService.getDataFromServer(getOutgoingToolsCasedLeakBakerByJobAndSerialURL + "/job/" + $scope._id + "/serial/" + item);
    		    $scope.leakCon = output.data[0];
    		}
			delete $scope.obj.inOut;
			delete $scope.obj.destination;
			if ($scope.leakCon && $scope.leakCon.inOut) {
				$scope.obj.inOut = $scope.leakCon.inOut;
				$scope.obj.destination = $scope.leakCon['inOut' + $scope.leakCon.inOut + 'Value'];
			}
		}
	};
	$scope.selectBasket = function (item, model) {
    	$scope.obj.serialType = '1';
    	// for editing, don't change value from leak continuity 
	};
	$scope.selectSling = function (item, model) {
    	$scope.obj.serialType = '2';
    	// for editing, don't change value from leak continuity 
	};
});

dashboardControllers.controller('JobOutgoingToolsInOutEditController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
    var jobAndObj = $routeParams._id.split('|');
	$scope._id = jobAndObj[0];
	$scope.obj_id = jobAndObj[1];
    var output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.svo = output.data[0];
    $scope.obj = {};
 // set serialList from service order
    $scope.serialList = [];
    if ($scope.svo) {
    	for (var i = 1; i <= $scope.svo.toolCount; i++) {
	    	if ($scope.svo['serial' + i]) {
	    		$scope.serialList.push($scope.svo['toolType' + i] + ' - ' + $scope.svo['serial' + i]);
	    	}
    	}
    }
    // basket list
    if ($scope.svo.basket1) {
    	$scope.basketList = [];
    	for (var i = 1; i <= $scope.svo.basketCount; i++) {
    		$scope.basketList.push($scope.svo['basket' + i]);
    	}
    }
    // sling list
    if ($scope.svo.sling1) {
    	$scope.slingList = [];
    	for (var i = 1; i <= $scope.svo.slingCount; i++) {
    		$scope.slingList.push($scope.svo['sling' + i]);
    	}
    }
    output = sharedService.getDataFromServer(getOutgoingToolsInOutURL + "/_id/" + $scope.obj_id);
    $scope.obj = output.data[0];
    $scope.save = function() {
    	$scope.obj.job = $scope._id;
	    var output = sharedService.callAjax(updateOutgoingToolsInOutURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jobInfoOutgoingToolsInOutList/' + $scope._id;;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
    
    $scope.selectSerial = function (item, model) {
    	$scope.obj.serialType = '0';
    	// for editing, don't change value from leak continuity 
	};
	$scope.selectBasket = function (item, model) {
    	$scope.obj.serialType = '1';
    	// for editing, don't change value from leak continuity 
	};
	$scope.selectSling = function (item, model) {
    	$scope.obj.serialType = '2';
    	// for editing, don't change value from leak continuity 
	};
});

dashboardControllers.controller('JobOutgoingToolsInOutDetailController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
    var jobAndObj = $routeParams._id.split('|');
	$scope._id = jobAndObj[0];
	$scope.obj_id = jobAndObj[1];
    var output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.svo = output.data[0];
    $scope.obj = {};
    
    output = sharedService.getDataFromServer(getOutgoingToolsInOutURL + "/_id/" + $scope.obj_id);
    $scope.obj = output.data[0];
    var data = $scope.obj.itemList;
    if (data == null) {
    	data = [];
    }
	$scope.detailPdf = function() {
		window.open(getInOutDetailPdfURL + "/_id/" + $scope._id, "_self");
	}
});

// Leak BAKER - OPEN

dashboardControllers.controller('JobOutgoingToolsOpenLeakBakerController', function($scope, $rootScope, $controller, $routeParams, sharedService, ngTableParams, $filter) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    $scope.obj = {};
    output = sharedService.getDataFromServer(getOutgoingToolsOpenLeakBakerByJobURL + "/_id/" + $scope._id);
    $scope.obj = output.data;
    var data = $scope.obj;
    if (data == null) {
    	data = [];
    }
    
	$scope.objTableParams = $scope.getTableParam(data);
	
	$scope.deleteObj = function(idToDel) {
		if (confirm("Are You Sure Want To Delete ?")) {
			var dataToSend = {"_id": idToDel};
	        var output = sharedService.callAjax(deleteOutgoingToolsOpenLeakBakerURL, "post", dataToSend);
	        if (output && output.status) {
	            //alert (output.message);
	            if (output.status == 1) {
	            	//alert("success delete");
	            	location.reload(true);
	            }
	        } else {
	            alert ("Failed to delete");
	        }
		}
	};
});

dashboardControllers.controller('JobOutgoingToolsOpenLeakBakerNewController', function($scope, $rootScope, $controller, $routeParams, sharedService, ngTableParams, $filter) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    $scope.obj = {};
    output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.svo = output.data[0];
    $scope.copyPrevMeg = function() {
    	output = sharedService.getDataFromServer(getPrevOutgoingToolsOpenLeakBakerByJobURL + "/_id/" + $scope._id);
        if (output != null && output.data.length > 0) {
        	var prevObj = output.data[0];
        	$scope.obj.megSerial = prevObj.megSerial;
        	$scope.obj.megDate = prevObj.megDate;
        	var megDateHandle = $('#megDate');
        	megDateHandle.attr('sync-lock', 'true');
        	megDateHandle.data('datepicker').setUTCDate(new Date(prevObj.megDate * 1000));
        	megDateHandle.removeAttr('sync-lock');
        	$scope.obj.inOut = prevObj.inOut;
        	$scope.obj.inOut0Value = prevObj.inOut0Value;
        	$scope.obj.inOut1Value = prevObj.inOut1Value;
        }
    }
    // set serialList from service order
    $scope.serialList = [];
    if ($scope.svo) {
    	for (var i = 1; i <= $scope.svo.toolCount; i++) {
	    	if ($scope.svo['serial' + i] && $scope.svo['toolType' + i].indexOf('BA') != -1) {
	    		$scope.serialList.push($scope.svo['toolType' + i] + ' - ' + $scope.svo['serial' + i]);
	    	}
    	}
    }
    
    $scope.selectSerial = function (item, model) {
    	var jarType = item.split(" - ")[0];
    	if (jarType.indexOf('MCX ') != -1) {
			$scope.obj.jarModel = '1';
		} else if (jarType.indexOf('BMFT ') != -1) {
			$scope.obj.jarModel = '2';
		} else {
			delete $scope.obj.jarModel;
		}
		if (jarType.indexOf(' 10') != -1) {
			$scope.obj.jarType = '0';
		} else if (jarType.indexOf(' 26') != -1) {
			$scope.obj.jarType = '1';
		} else {
			delete $scope.obj.jarType;
		}
	};
    
    $scope.getPinNumber = function(type) {
    	if (type == '0') {
    		var arr = [];
    		for (var i = 11; i <= 26; i++) {
    			$scope.obj['continuity' + i] = '';
    			$scope.obj['leaks' + i] = '';
    		}
    		for (var i = 1; i <= 10; i++) {
    			arr.push(i);
    		}
    		return arr;
    	} else {
    		var arr = [];
    		for (var i = 1; i <= 26; i++) {
    			arr.push(i);
    		}
    		return arr;
    	}
    }
    
    $scope.copyContinuity = function() {
    	if ($scope.obj.jarType == '0') {
    		for (var i = 1; i <= 10; i++) {
    			$scope.obj['continuity' + i] = $scope.continuityAll;
    		}
    	} else {
    		for (var i = 1; i <= 26; i++) {
    			$scope.obj['continuity' + i] = $scope.continuityAll;
    		}
    	}
    }
    
    $scope.copyLeaks = function() {
    	if ($scope.obj.jarType == '0') {
    		for (var i = 1; i <= 10; i++) {
    			$scope.obj['leaks' + i] = $scope.leaksAll;
    		}
    	} else {
    		for (var i = 1; i <= 26; i++) {
    			$scope.obj['leaks' + i] = $scope.leaksAll;
    		}
    	}
    }
    
    $scope.save = function() {
    	$scope.obj.job = $scope._id;
	    var output = sharedService.callAjax(saveOutgoingToolsOpenLeakBakerURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jobInfoOutgoingTools0LeakBakerList/' + $scope._id;;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('JobOutgoingToolsOpenLeakBakerEditController', function($scope, $rootScope, $controller, $routeParams, sharedService, ngTableParams, $filter) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	var jobAndObj = $routeParams._id.split('|');
	$scope._id = jobAndObj[0];
	$scope.obj_id = jobAndObj[1];
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    $scope.obj = {};
    output = sharedService.getDataFromServer(getOutgoingToolsOpenLeakBakerURL + "/_id/" + $scope.obj_id);
    $scope.obj = output.data[0];
    
    $scope.copyPrevMeg = function() {
    	output = sharedService.getDataFromServer(getPrevOutgoingToolsOpenLeakBakerByJobURL + "/_id/" + $scope._id);
        if (output != null && output.data.length > 0) {
        	var prevObj = output.data[0];
        	$scope.obj.megSerial = prevObj.megSerial;
        	$scope.obj.megDate = prevObj.megDate;
        	var megDateHandle = $('#megDate');
        	megDateHandle.attr('sync-lock', 'true');
        	megDateHandle.data('datepicker').setUTCDate(new Date(prevObj.megDate * 1000));
        	megDateHandle.removeAttr('sync-lock');
        	$scope.obj.inOut = prevObj.inOut;
        	$scope.obj.inOut0Value = prevObj.inOut0Value;
        	$scope.obj.inOut1Value = prevObj.inOut1Value;
        }
    }
    
    output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.svo = output.data[0];
    // set serialList from service order
    $scope.serialList = [];
    if ($scope.svo) {
    	for (var i = 1; i <= $scope.svo.toolCount; i++) {
	    	if ($scope.svo['serial' + i] && $scope.svo['toolType' + i].indexOf('BA') != -1) {
	    		$scope.serialList.push($scope.svo['toolType' + i] + ' - ' + $scope.svo['serial' + i]);
	    	}
    	}
    }
    
    $scope.selectSerial = function (item, model) {
    	var jarType = item.split(" - ")[0];
    	if (jarType.indexOf('MCX ') != -1) {
			$scope.obj.jarModel = '1';
		} else if (jarType.indexOf('BMFT ') != -1) {
			$scope.obj.jarModel = '2';
		} else {
			delete $scope.obj.jarModel;
		}
		if (jarType.indexOf(' 10') != -1) {
			$scope.obj.jarType = '0';
		} else if (jarType.indexOf(' 26') != -1) {
			$scope.obj.jarType = '1';
		} else {
			delete $scope.obj.jarType;
		}
	};
    
    $scope.getPinNumber = function(type) {
    	if (type == '0') {
    		var arr = [];
    		for (var i = 11; i <= 26; i++) {
    			$scope.obj['continuity' + i] = '';
    			$scope.obj['leaks' + i] = '';
    		}
    		for (var i = 1; i <= 10; i++) {
    			arr.push(i);
    		}
    		return arr;
    	} else {
    		var arr = [];
    		for (var i = 1; i <= 26; i++) {
    			arr.push(i);
    		}
    		return arr;
    	}
    }
    
    $scope.copyContinuity = function() {
    	if ($scope.obj.jarType == '0') {
    		for (var i = 1; i <= 10; i++) {
    			$scope.obj['continuity' + i] = $scope.continuityAll;
    		}
    	} else {
    		for (var i = 1; i <= 26; i++) {
    			$scope.obj['continuity' + i] = $scope.continuityAll;
    		}
    	}
    }
    
    $scope.copyLeaks = function() {
    	if ($scope.obj.jarType == '0') {
    		for (var i = 1; i <= 10; i++) {
    			$scope.obj['leaks' + i] = $scope.leaksAll;
    		}
    	} else {
    		for (var i = 1; i <= 26; i++) {
    			$scope.obj['leaks' + i] = $scope.leaksAll;
    		}
    	}
    }
    
    $scope.save = function() {
    	$scope.obj.job = $scope._id;
    	
	    var output = sharedService.callAjax(updateOutgoingToolsOpenLeakBakerURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jobInfoOutgoingTools0LeakBakerDetail/' + $scope._id + '|' + $scope.obj_id;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('JobOutgoingToolsOpenLeakBakerDetailController', function($scope, $rootScope, $controller, $routeParams, sharedService, ngTableParams, $filter) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	var jobAndObj = $routeParams._id.split('|');
	$scope._id = jobAndObj[0];
	$scope.obj_id = jobAndObj[1];
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    $scope.obj = {};
    output = sharedService.getDataFromServer(getOutgoingToolsOpenLeakBakerURL + "/_id/" + $scope.obj_id);
    $scope.obj = output.data[0];
    
    $scope.getPinNumber = function(type) {
    	if (type == '0') {
    		var arr = [];
    		for (var i = 11; i <= 26; i++) {
    			$scope.obj['continuity' + i] = '';
    			$scope.obj['leaks' + i] = '';
    		}
    		for (var i = 1; i <= 10; i++) {
    			arr.push(i);
    		}
    		return arr;
    	} else {
    		var arr = [];
    		for (var i = 1; i <= 26; i++) {
    			arr.push(i);
    		}
    		return arr;
    	}
    }
    
    $scope.detailPdf = function() {
		window.open(getLeakBakerOpenDetailPdfURL + "/_id/" + $scope.obj_id, "_self");
	}
});


//Leak SCHLUMBERGER 

dashboardControllers.controller('JobOutgoingToolsOpenLeakBergerController', function($scope, $rootScope, $controller, $routeParams, sharedService, ngTableParams, $filter) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    $scope.obj = {};
    output = sharedService.getDataFromServer(getOutgoingToolsLeakBergerByJobURL + "/_id/" + $scope._id);
    $scope.obj = output.data;
    var data = $scope.obj;
    if (data == null) {
    	data = [];
    }
    
	$scope.objTableParams = $scope.getTableParam(data);
	
	$scope.deleteObj = function(idToDel) {
		if (confirm("Are You Sure Want To Delete ?")) {
			var dataToSend = {"_id": idToDel};
	        var output = sharedService.callAjax(deleteOutgoingToolsLeakBergerURL, "post", dataToSend);
	        if (output && output.status) {
	            //alert (output.message);
	            if (output.status == 1) {
	            	//alert("success delete");
	            	location.reload(true);
	            }
	        } else {
	            alert ("Failed to delete");
	        }
		}
	};
});

dashboardControllers.controller('JobOutgoingToolsOpenLeakBergerNewController', function($scope, $rootScope, $controller, $routeParams, sharedService, ngTableParams, $filter) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    $scope.obj = {};

    $scope.copyPrevMeg = function() {
    	output = sharedService.getDataFromServer(getPrevOutgoingToolsLeakBergerByJobURL + "/_id/" + $scope._id);
        if (output != null && output.data.length > 0) {
        	var prevObj = output.data[0];
        	$scope.obj.megSerial = prevObj.megSerial;
        	$scope.obj.megDate = prevObj.megDate;
        	var megDateHandle = $('#megDate');
        	megDateHandle.attr('sync-lock', 'true');
        	megDateHandle.data('datepicker').setUTCDate(new Date(prevObj.megDate * 1000));
        	megDateHandle.removeAttr('sync-lock');
        	$scope.obj.inOut = prevObj.inOut;
        	$scope.obj.inOut0Value = prevObj.inOut0Value;
        	$scope.obj.inOut1Value = prevObj.inOut1Value;
        }
    }
    
    output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.svo = output.data[0];
    
    // set serialList from service order
    $scope.serialList = [];
    if ($scope.svo) {
    	for (var i = 1; i <= $scope.svo.toolCount; i++) {
	    	if ($scope.svo['serial' + i] && $scope.svo['toolType' + i].indexOf('SLB') != -1) {
	    		$scope.serialList.push($scope.svo['toolType' + i] + ' - ' + $scope.svo['serial' + i]);
	    	}
    	}
    }
    
    $scope.selectSerial = function (item, model) {
    	var jarType = item.split(" - ")[0];	
		if (jarType.indexOf('MCX ') != -1) {
			$scope.obj.jarModel = '1';
		} else if (jarType.indexOf('SMFT ') != -1) {
			$scope.obj.jarModel = '2';
		} else {
			delete $scope.obj.jarModel;
		}
		
		if (jarType.indexOf(' 15') != -1) {
			$scope.obj.jarType = '0';
		} else if (jarType.indexOf(' 19') != -1) {
			$scope.obj.jarType = '1';
		} else {
			delete $scope.obj.jarType;
		}
	};
    
    $scope.getPinNumber = function(type) {
    	if (type == '0') {
    		// 1-10,14,15,16,19,20 => 15 pin
    		$scope.obj['continuity12'] = '';$scope.obj['leaks12'] = '';
    		$scope.obj['continuity13'] = '';$scope.obj['leaks13'] = '';
    		$scope.obj['continuity30'] = '';$scope.obj['leaks30'] = '';
    		$scope.obj['continuity31'] = '';$scope.obj['leaks31'] = '';
    		var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15, 16, 19, 20];
    		return arr;
    	} else {
    		// 1-10,12-16,19,20,30,31 => 19 pin
    		var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 19, 20, 30, 31];
    		return arr;
    	}
    }
    
    $scope.copyContinuity = function() {
    	var arr = [];
    	if ($scope.obj.jarType == '0') {
    		arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15, 16, 19, 20];
    	} else {
    		arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 19, 20, 30, 31];
    	}
    	for (var i = 0; i < arr.length; i++) {
			$scope.obj['continuity' + arr[i]] = $scope.continuityAll;
		}
    }
    
    $scope.copyLeaks = function() {
    	var arr = [];
    	if ($scope.obj.jarType == '0') {
    		arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15, 16, 19, 20];
    	} else {
    		arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 19, 20, 30, 31];
    	}
    	for (var i = 0; i < arr.length; i++) {
			$scope.obj['leaks' + arr[i]] = $scope.leaksAll;
		}
    }
    
    $scope.save = function() {
    	$scope.obj.job = $scope._id;
	    var output = sharedService.callAjax(saveOutgoingToolsLeakBergerURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jobInfoOutgoingTools0LeakBergerList/' + $scope._id;;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('JobOutgoingToolsOpenLeakBergerEditController', function($scope, $rootScope, $controller, $routeParams, sharedService, ngTableParams, $filter) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	var jobAndObj = $routeParams._id.split('|');
	$scope._id = jobAndObj[0];
	$scope.obj_id = jobAndObj[1];
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    $scope.obj = {};
    output = sharedService.getDataFromServer(getOutgoingToolsLeakBergerURL + "/_id/" + $scope.obj_id);
    $scope.obj = output.data[0];

    $scope.copyPrevMeg = function() {
    	output = sharedService.getDataFromServer(getPrevOutgoingToolsLeakBergerByJobURL + "/_id/" + $scope._id);
        if (output != null && output.data.length > 0) {
        	var prevObj = output.data[0];
        	$scope.obj.megSerial = prevObj.megSerial;
        	$scope.obj.megDate = prevObj.megDate;
        	var megDateHandle = $('#megDate');
        	megDateHandle.attr('sync-lock', 'true');
        	megDateHandle.data('datepicker').setUTCDate(new Date(prevObj.megDate * 1000));
        	megDateHandle.removeAttr('sync-lock');
        	$scope.obj.inOut = prevObj.inOut;
        	$scope.obj.inOut0Value = prevObj.inOut0Value;
        	$scope.obj.inOut1Value = prevObj.inOut1Value;
        }
    }
    
    output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.svo = output.data[0];
    // set serialList from service order
    $scope.serialList = [];
    if ($scope.svo) {
    	for (var i = 1; i <= $scope.svo.toolCount; i++) {
	    	if ($scope.svo['serial' + i] && $scope.svo['toolType' + i].indexOf('SLB') != -1) {
	    		$scope.serialList.push($scope.svo['toolType' + i] + ' - ' + $scope.svo['serial' + i]);
	    	}
    	}
    }
    
    $scope.selectSerial = function (item, model) {
    	var jarType = item.split(" - ")[0];	
		if (jarType.indexOf('MCX ') != -1) {
			$scope.obj.jarModel = '1';
		} else if (jarType.indexOf('SMFT ') != -1) {
			$scope.obj.jarModel = '2';
		} else {
			delete $scope.obj.jarModel;
		}
		
		if (jarType.indexOf(' 15') != -1) {
			$scope.obj.jarType = '0';
		} else if (jarType.indexOf(' 19') != -1) {
			$scope.obj.jarType = '1';
		} else {
			delete $scope.obj.jarType;
		}
	};
    
    $scope.getPinNumber = function(type) {
    	if (type == '0') {
    		// 1-10,14,15,16,19,20 => 15 pin
    		$scope.obj['continuity12'] = '';$scope.obj['leaks12'] = '';
    		$scope.obj['continuity13'] = '';$scope.obj['leaks13'] = '';
    		$scope.obj['continuity30'] = '';$scope.obj['leaks30'] = '';
    		$scope.obj['continuity31'] = '';$scope.obj['leaks31'] = '';
    		var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15, 16, 19, 20];
    		return arr;
    	} else {
    		// 1-10,12-16,19,20,30,31 => 19 pin
    		var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 19, 20, 30, 31];
    		return arr;
    	}
    }
    
    $scope.copyContinuity = function() {
    	var arr = [];
    	if ($scope.obj.jarType == '0') {
    		arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15, 16, 19, 20];
    	} else {
    		arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 19, 20, 30, 31];
    	}
    	for (var i = 0; i < arr.length; i++) {
			$scope.obj['continuity' + arr[i]] = $scope.continuityAll;
		}
    }
    
    $scope.copyLeaks = function() {
    	var arr = [];
    	if ($scope.obj.jarType == '0') {
    		arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15, 16, 19, 20];
    	} else {
    		arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 19, 20, 30, 31];
    	}
    	for (var i = 0; i < arr.length; i++) {
			$scope.obj['leaks' + arr[i]] = $scope.leaksAll;
		}
    }
    
    $scope.save = function() {
    	$scope.obj.job = $scope._id;
    	
	    var output = sharedService.callAjax(updateOutgoingToolsLeakBergerURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jobInfoOutgoingTools0LeakBergerDetail/' + $scope._id + '|' + $scope.obj_id;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('JobOutgoingToolsOpenLeakBergerDetailController', function($scope, $rootScope, $controller, $routeParams, sharedService, ngTableParams, $filter) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	var jobAndObj = $routeParams._id.split('|');
	$scope._id = jobAndObj[0];
	$scope.obj_id = jobAndObj[1];
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    $scope.obj = {};
    output = sharedService.getDataFromServer(getOutgoingToolsLeakBergerURL + "/_id/" + $scope.obj_id);
    $scope.obj = output.data[0];
    
    $scope.getPinNumber = function(type) {
    	if (type == '0') {
    		// 1-10,14,15,16,19,20 => 15 pin
    		$scope.obj['continuity12'] = '';$scope.obj['leaks12'] = '';
    		$scope.obj['continuity13'] = '';$scope.obj['leaks13'] = '';
    		$scope.obj['continuity30'] = '';$scope.obj['leaks30'] = '';
    		$scope.obj['continuity31'] = '';$scope.obj['leaks31'] = '';
    		var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15, 16, 19, 20];
    		return arr;
    	} else {
    		// 1-10,12-16,19,20,30,31 => 19 pin
    		var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 19, 20, 30, 31];
    		return arr;
    	}
    }
    
    $scope.detailPdf = function() {
		window.open(getLeakBergerOpenDetailPdfURL + "/_id/" + $scope.obj_id, "_self");
	}
});

//Leak HALLIBURTON 

dashboardControllers.controller('JobOutgoingToolsOpenLeakBurtonController', function($scope, $rootScope, $controller, $routeParams, sharedService, ngTableParams, $filter) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    $scope.obj = {};
    output = sharedService.getDataFromServer(getOutgoingToolsLeakBurtonByJobURL + "/_id/" + $scope._id);
    $scope.obj = output.data;
    var data = $scope.obj;
    if (data == null) {
    	data = [];
    }
    
	$scope.objTableParams = $scope.getTableParam(data);
	
	$scope.deleteObj = function(idToDel) {
		if (confirm("Are You Sure Want To Delete ?")) {
			var dataToSend = {"_id": idToDel};
	        var output = sharedService.callAjax(deleteOutgoingToolsLeakBurtonURL, "post", dataToSend);
	        if (output && output.status) {
	            //alert (output.message);
	            if (output.status == 1) {
	            	//alert("success delete");
	            	location.reload(true);
	            }
	        } else {
	            alert ("Failed to delete");
	        }
		}
	};
});

dashboardControllers.controller('JobOutgoingToolsOpenLeakBurtonNewController', function($scope, $rootScope, $controller, $routeParams, sharedService, ngTableParams, $filter) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    $scope.obj = {};

    $scope.copyPrevMeg = function() {
    	output = sharedService.getDataFromServer(getPrevOutgoingToolsLeakBurtonByJobURL + "/_id/" + $scope._id);
        if (output != null && output.data.length > 0) {
        	var prevObj = output.data[0];
        	$scope.obj.megSerial = prevObj.megSerial;
        	$scope.obj.megDate = prevObj.megDate;
        	var megDateHandle = $('#megDate');
        	megDateHandle.attr('sync-lock', 'true');
        	megDateHandle.data('datepicker').setUTCDate(new Date(prevObj.megDate * 1000));
        	megDateHandle.removeAttr('sync-lock');
        	$scope.obj.inOut = prevObj.inOut;
        	$scope.obj.inOut0Value = prevObj.inOut0Value;
        	$scope.obj.inOut1Value = prevObj.inOut1Value;
        }
    }
    
    output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.svo = output.data[0];
    
    // set serialList from service order
    $scope.serialList = [];
    if ($scope.svo) {
    	for (var i = 1; i <= $scope.svo.toolCount; i++) {
	    	if ($scope.svo['serial' + i] && $scope.svo['toolType' + i].indexOf('HAL') != -1) {
	    		$scope.serialList.push($scope.svo['toolType' + i] + ' - ' + $scope.svo['serial' + i]);
	    	}
    	}
    }
    
    $scope.selectSerial = function (item, model) {
    	var jarType = item.split(" - ")[0];	
		if (jarType.indexOf('MCX ') != -1) {
			$scope.obj.jarModel = '1';
		} else {
			delete $scope.obj.jarModel;
		}
		
		if (jarType.indexOf(' 12') != -1) {
			$scope.obj.jarType = '0';
		} else {
			delete $scope.obj.jarType;
		}
	};
    
    $scope.getPinNumber = function(type) {
    	if (type == '0') {
    		// 1-10,14,15,16,19,20 => 12 pin
    		var arr = [1, 2, 3, 4, 12, 13, 14, 15, 16, 17, 18, 19];
    		return arr;
    	}
    }
    
    $scope.copyContinuity = function() {
    	var arr = [];
    	if ($scope.obj.jarType == '0') {
    		arr = [1, 2, 3, 4, 12, 13, 14, 15, 16, 17, 18, 19];
    	}
    	for (var i = 0; i < arr.length; i++) {
			$scope.obj['continuity' + arr[i]] = $scope.continuityAll;
		}
    }
    
    $scope.copyLeaks = function() {
    	var arr = [];
    	if ($scope.obj.jarType == '0') {
    		arr = [1, 2, 3, 4, 12, 13, 14, 15, 16, 17, 18, 19];
    	}
    	for (var i = 0; i < arr.length; i++) {
			$scope.obj['leaks' + arr[i]] = $scope.leaksAll;
		}
    }
    
    $scope.save = function() {
    	$scope.obj.job = $scope._id;
	    var output = sharedService.callAjax(saveOutgoingToolsLeakBurtonURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jobInfoOutgoingTools0LeakBurtonList/' + $scope._id;;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('JobOutgoingToolsOpenLeakBurtonEditController', function($scope, $rootScope, $controller, $routeParams, sharedService, ngTableParams, $filter) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	var jobAndObj = $routeParams._id.split('|');
	$scope._id = jobAndObj[0];
	$scope.obj_id = jobAndObj[1];
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    $scope.obj = {};
    output = sharedService.getDataFromServer(getOutgoingToolsLeakBurtonURL + "/_id/" + $scope.obj_id);
    $scope.obj = output.data[0];

    $scope.copyPrevMeg = function() {
    	output = sharedService.getDataFromServer(getPrevOutgoingToolsLeakBurtonByJobURL + "/_id/" + $scope._id);
        if (output != null && output.data.length > 0) {
        	var prevObj = output.data[0];
        	$scope.obj.megSerial = prevObj.megSerial;
        	$scope.obj.megDate = prevObj.megDate;
        	var megDateHandle = $('#megDate');
        	megDateHandle.attr('sync-lock', 'true');
        	megDateHandle.data('datepicker').setUTCDate(new Date(prevObj.megDate * 1000));
        	megDateHandle.removeAttr('sync-lock');
        	$scope.obj.inOut = prevObj.inOut;
        	$scope.obj.inOut0Value = prevObj.inOut0Value;
        	$scope.obj.inOut1Value = prevObj.inOut1Value;
        }
    }
    
    output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.svo = output.data[0];
    
    // set serialList from service order
    $scope.serialList = [];
    if ($scope.svo) {
    	for (var i = 1; i <= $scope.svo.toolCount; i++) {
	    	if ($scope.svo['serial' + i] && $scope.svo['toolType' + i].indexOf('HAL') != -1) {
	    		$scope.serialList.push($scope.svo['toolType' + i] + ' - ' + $scope.svo['serial' + i]);
	    	}
    	}
    }
    
    $scope.selectSerial = function (item, model) {
    	var jarType = item.split(" - ")[0];	
		if (jarType.indexOf('MCX ') != -1) {
			$scope.obj.jarModel = '1';
		} else {
			delete $scope.obj.jarModel;
		}
		
		if (jarType.indexOf(' 12') != -1) {
			$scope.obj.jarType = '0';
		} else {
			delete $scope.obj.jarType;
		}
	};
    
    $scope.getPinNumber = function(type) {
    	if (type == '0') {
    		// 1-10,14,15,16,19,20 => 12 pin
    		var arr = [1, 2, 3, 4, 12, 13, 14, 15, 16, 17, 18, 19];
    		return arr;
    	}
    }
    
    $scope.copyContinuity = function() {
    	var arr = [];
    	if ($scope.obj.jarType == '0') {
    		arr = [1, 2, 3, 4, 12, 13, 14, 15, 16, 17, 18, 19];
    	}
    	for (var i = 0; i < arr.length; i++) {
			$scope.obj['continuity' + arr[i]] = $scope.continuityAll;
		}
    }
    
    $scope.copyLeaks = function() {
    	var arr = [];
    	if ($scope.obj.jarType == '0') {
    		arr = [1, 2, 3, 4, 12, 13, 14, 15, 16, 17, 18, 19];
    	}
    	for (var i = 0; i < arr.length; i++) {
			$scope.obj['leaks' + arr[i]] = $scope.leaksAll;
		}
    }
    
    $scope.save = function() {
    	$scope.obj.job = $scope._id;
    	
	    var output = sharedService.callAjax(updateOutgoingToolsLeakBurtonURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jobInfoOutgoingTools0LeakBurtonDetail/' + $scope._id + '|' + $scope.obj_id;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('JobOutgoingToolsOpenLeakBurtonDetailController', function($scope, $rootScope, $controller, $routeParams, sharedService, ngTableParams, $filter) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	var jobAndObj = $routeParams._id.split('|');
	$scope._id = jobAndObj[0];
	$scope.obj_id = jobAndObj[1];
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    $scope.obj = {};
    output = sharedService.getDataFromServer(getOutgoingToolsLeakBurtonURL + "/_id/" + $scope.obj_id);
    $scope.obj = output.data[0];
    
    $scope.getPinNumber = function(type) {
    	if (type == '0') {
    		// 1-10,14,15,16,19,20 => 12 pin
    		var arr = [1, 2, 3, 4, 12, 13, 14, 15, 16, 17, 18, 19];
    		return arr;
    	}
    }
    
    $scope.detailPdf = function() {
		window.open(getLeakBurtonOpenDetailPdfURL + "/_id/" + $scope.obj_id, "_self");
	}
});

// leak BAKER - CASED

dashboardControllers.controller('JobOutgoingToolsCasedLeakBakerController', function($scope, $rootScope, $controller, $routeParams, sharedService, ngTableParams, $filter) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    $scope.obj = {};
    output = sharedService.getDataFromServer(getOutgoingToolsCasedLeakBakerByJobURL + "/_id/" + $scope._id);
    $scope.obj = output.data;
    var data = $scope.obj;
    if (data == null) {
    	data = [];
    }
    
	$scope.objTableParams = $scope.getTableParam(data);
	
	$scope.deleteObj = function(idToDel) {
		if (confirm("Are You Sure Want To Delete ?")) {
			var dataToSend = {"_id": idToDel};
	        var output = sharedService.callAjax(deleteOutgoingToolsCasedLeakBakerURL, "post", dataToSend);
	        if (output && output.status) {
	            //alert (output.message);
	            if (output.status == 1) {
	            	//alert("success delete");
	            	location.reload(true);
	            }
	        } else {
	            alert ("Failed to delete");
	        }
		}
	};
});

dashboardControllers.controller('JobOutgoingToolsCasedLeakBakerNewController', function($scope, $rootScope, $controller, $routeParams, sharedService, ngTableParams, $filter) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    $scope.obj = {};

    $scope.copyPrevMeg = function() {
    	output = sharedService.getDataFromServer(getPrevOutgoingToolsCasedLeakBakerByJobURL + "/_id/" + $scope._id);
        if (output != null && output.data.length > 0) {
        	var prevObj = output.data[0];
        	$scope.obj.megSerial = prevObj.megSerial;
        	$scope.obj.megDate = prevObj.megDate;
        	var megDateHandle = $('#megDate');
        	megDateHandle.attr('sync-lock', 'true');
        	megDateHandle.data('datepicker').setUTCDate(new Date(prevObj.megDate * 1000));
        	megDateHandle.removeAttr('sync-lock');
        	$scope.obj.inOut = prevObj.inOut;
        	$scope.obj.inOut0Value = prevObj.inOut0Value;
        	$scope.obj.inOut1Value = prevObj.inOut1Value;
        }
    }
    
    output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.svo = output.data[0];
    // set serialList from service order
    $scope.serialList = [];
    if ($scope.svo) {
    	for (var i = 1; i <= $scope.svo.toolCount; i++) {
	    	if ($scope.svo['serial' + i]) {
	    		$scope.serialList.push($scope.svo['toolType' + i] + ' - ' + $scope.svo['serial' + i]);
	    	}
    	}
    	$scope.obj.jarModel = '3';
    }
    
    $scope.save = function() {
    	$scope.obj.job = $scope._id;
	    var output = sharedService.callAjax(saveOutgoingToolsCasedLeakBakerURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jobInfoOutgoingTools1LeakBakerList/' + $scope._id;;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('JobOutgoingToolsCasedLeakBakerEditController', function($scope, $rootScope, $controller, $routeParams, sharedService, ngTableParams, $filter) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	var jobAndObj = $routeParams._id.split('|');
	$scope._id = jobAndObj[0];
	$scope.obj_id = jobAndObj[1];
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    $scope.obj = {};
    output = sharedService.getDataFromServer(getOutgoingToolsCasedLeakBakerURL + "/_id/" + $scope.obj_id);
    $scope.obj = output.data[0];

    $scope.copyPrevMeg = function() {
    	output = sharedService.getDataFromServer(getPrevOutgoingToolsCasedLeakBakerByJobURL + "/_id/" + $scope._id);
        if (output != null && output.data.length > 0) {
        	var prevObj = output.data[0];
        	$scope.obj.megSerial = prevObj.megSerial;
        	$scope.obj.megDate = prevObj.megDate;
        	var megDateHandle = $('#megDate');
        	megDateHandle.attr('sync-lock', 'true');
        	megDateHandle.data('datepicker').setUTCDate(new Date(prevObj.megDate * 1000));
        	megDateHandle.removeAttr('sync-lock');
        	$scope.obj.inOut = prevObj.inOut;
        	$scope.obj.inOut0Value = prevObj.inOut0Value;
        	$scope.obj.inOut1Value = prevObj.inOut1Value;
        }
    }
    
    output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.svo = output.data[0];
    // set serialList from service order
    $scope.serialList = [];
    if ($scope.svo) {
    	for (var i = 1; i <= $scope.svo.toolCount; i++) {
	    	if ($scope.svo['serial' + i]) {
	    		$scope.serialList.push($scope.svo['toolType' + i] + ' - ' + $scope.svo['serial' + i]);
	    	}
    	}
    	$scope.obj.jarModel = '3';
    }
    
    $scope.save = function() {
    	$scope.obj.job = $scope._id;
    	
	    var output = sharedService.callAjax(updateOutgoingToolsCasedLeakBakerURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jobInfoOutgoingTools1LeakBakerDetail/' + $scope._id + '|' + $scope.obj_id;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('JobOutgoingToolsCasedLeakBakerDetailController', function($scope, $rootScope, $controller, $routeParams, sharedService, ngTableParams, $filter) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	var jobAndObj = $routeParams._id.split('|');
	$scope._id = jobAndObj[0];
	$scope.obj_id = jobAndObj[1];
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    $scope.obj = {};
    output = sharedService.getDataFromServer(getOutgoingToolsCasedLeakBakerURL + "/_id/" + $scope.obj_id);
    $scope.obj = output.data[0];
    
    $scope.detailPdf = function() {
		window.open(getLeakBakerCasedDetailPdfURL + "/_id/" + $scope.obj_id, "_self");
	}
});