dashboardControllers.controller('JobJarSetsController', function($scope, $rootScope, $controller, $routeParams, $filter, sharedService, ngTableParams) {
	$rootScope.selectedMenu = "jobInfo";
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    var output = sharedService.getDataFromServer(getJarSetsImpactOrderByJobURL + "/_id/" + $scope._id);
    $scope.impact = output.data[0];
    output = sharedService.getDataFromServer(getJarSetsOpenHoleByJobURL + "/_id/" + $scope._id);
    $scope.approval = output.data[0];
});

dashboardControllers.controller('JobJarSetsImpactOrderNewController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
    $scope._id = $routeParams._id;
    var output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
	var output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.svo = output.data[0];
    output = sharedService.getDataFromServer(getOnSiteDailyJobByJobURL + "/_id/" + $scope._id);
    $scope.dailyJob = output.data[0];
    output = sharedService.getDataFromServer(getPluralListURL + '/collections/TypeCable~Toolstring');
	$scope.cableTypeList = output[0].data;
    $scope.toolstringList = output[1].data;
    $scope.toolstringListAll = output[1].data;
	
	$scope.selectSerial = function(item, model) {
		$scope.toolstringList = [];
		var jarTypeSerial = item.split(" - ");
		for (var i = 0; i < $scope.toolstringListAll.length; i++) {
			if ((jarTypeSerial[0].indexOf(' BA ') != -1 || jarTypeSerial[0].indexOf(' BA') != -1) &&  $scope.toolstringListAll[i].category == 'Baker') { // Baker
				$scope.toolstringList.push(output[0].data[i]);
			} else if ((jarTypeSerial[0].indexOf(' SLB ') != -1 || jarTypeSerial[0].indexOf(' SLB') != -1) &&  $scope.toolstringListAll[i].category == 'Schlumberger') { // Schlumberger
				$scope.toolstringList.push(output[0].data[i]);
			} else if ((jarTypeSerial[0].indexOf(' HAL ') != -1 || jarTypeSerial[0].indexOf(' HAL') != -1) &&  $scope.toolstringListAll[i].category == 'Halliburton') { // Halliburton
				$scope.toolstringList.push(output[0].data[i]);
			}
		}
	}
	
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    $scope.obj = {};
    // create technician list for ISI operator
    $scope.technicianList = [];
    if ($scope.jobInfo) {
    	if ($scope.jobInfo.technician) {
    		$scope.technicianList.push($scope.jobInfo.technician);
    		$scope.obj.technician = $scope.jobInfo.technician;
    	}
    	if ($scope.jobInfo.technician2) {
    		$scope.technicianList.push($scope.jobInfo.technician2);
    		$scope.obj.technician = $scope.jobInfo.technician2;
    	}
    	if ($scope.jobInfo.technician && $scope.jobInfo.technician2) {
    		$scope.technicianList.push($scope.jobInfo.technician + '/' + $scope.jobInfo.technician2);
    		$scope.obj.technician = $scope.jobInfo.technician + '/' + $scope.jobInfo.technician2;
    	}
    }
    var data = [];
    $scope.save = function() {
    	$scope.obj.job = $scope._id;
    	$scope.obj.jobInfo = $scope.jobInfo;
    	var dataFiltered = [];
    	for (var i = 0; i < data.length; i++) {
    		dataFiltered.push({
        		"uid": UUID(),
        		"run": data[i].run, 
        		"toolString": data[i].toolString, 
        		"length": data[i].length, 
        		"weightInFluid": data[i].weightInFluid,
        		"weightInAir": data[i].weightInAir,
        		"surfaceTensionTotalDepth": data[i].surfaceTensionTotalDepth, 
        		"maxToolOuterDiameter": data[i].maxToolOuterDiameter, 
        		"targetJarSetting": data[i].targetJarSetting, 
        		"targetMaxJarForce": data[i].targetMaxJarForce
        	});
    	}
    	$scope.obj.itemList = dataFiltered;
	    var output = sharedService.callAjax(saveJarSetsImpactOrderURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jobInfoOnSiteReport/' + $scope._id;;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
    
    
	$scope.objTableParams = $scope.getTableParam(data);
	
	$scope.addItem = function() {
		var updateIndex = -1;
		if ($scope.runUid) {
			for (var i = 0; i < data.length; i++) {
	    		if (data[i].uid === $scope.runUid) {
	    			updateIndex = i;
	    			break;
	    		}
			}
		}
		if (updateIndex != -1) {
			var runDatum = data[updateIndex];
			runDatum.run = $scope.run;
			runDatum.toolString = $scope.toolString;
			runDatum.length = $scope.length;
			runDatum.weightInFluid = $scope.weightInFluid;
			runDatum.weightInAir = $scope.weightInAir;
			runDatum.surfaceTensionTotalDepth = $scope.surfaceTensionTotalDepth;
			runDatum.maxToolOuterDiameter = $scope.maxToolOuterDiameter;
			runDatum.targetJarSetting = $scope.targetJarSetting;
			runDatum.targetMaxJarForce = $scope.targetMaxJarForce;
		} else {
	    	data.push({
	    		"uid": UUID(),
	    		"run": $scope.run, 
	    		"toolString": $scope.toolString, 
	    		"length": $scope.length, 
	    		"weightInFluid": $scope.weightInFluid, 
	    		"weightInAir": $scope.weightInAir, 
	    		"surfaceTensionTotalDepth": $scope.surfaceTensionTotalDepth, 
	    		"maxToolOuterDiameter": $scope.maxToolOuterDiameter, 
	    		"targetJarSetting": $scope.targetJarSetting, 
	    		"targetMaxJarForce": $scope.targetMaxJarForce
	    	});
		}
    	$scope.objTableParams.reload();
	};
	$scope.editItem = function(uid) {
		for (var i = 0; i < data.length; i++) {
    		if (data[i].uid === uid) {
    			delete $scope.run;
    			delete $scope.toolString;
    			delete $scope.length;
    			delete $scope.weightInFluid;
    			delete $scope.weightInAir;
    			delete $scope.surfaceTensionTotalDepth;
    			delete $scope.maxToolOuterDiameter;
    			delete $scope.targetJarSetting;
    			delete $scope.targetMaxJarForce;
    			$scope.runUid = data[i].uid;
    			$scope.run = data[i].run;
    			$scope.toolString = data[i].toolString;
    			$scope.length = data[i].length;
    			$scope.weightInFluid = data[i].weightInFluid;
    			$scope.weightInAir = data[i].weightInAir;
    			$scope.surfaceTensionTotalDepth = data[i].surfaceTensionTotalDepth;
    			$scope.maxToolOuterDiameter = data[i].maxToolOuterDiameter;
    			$scope.targetJarSetting = data[i].targetJarSetting;
    			$scope.targetMaxJarForce = data[i].targetMaxJarForce;
    			break;
    		}
    	}
	};
	
	$scope.deleteItem = function(uid) {
		if (confirm("Are You Sure Want To Delete ?")) {
			if (uid === $scope.runUid) {
				delete $scope.runUid;
			}
	    	for (var i = data.length - 1; i >= 0; i--) {
	    		if (data[i].uid === uid) {
	    			data.splice(i, 1);
	    		}
	    	}
	    	$scope.objTableParams.reload();
		}
	};
	
	$scope.resetItemForm = function() {
		delete $scope.runUid;
		delete $scope.run;
		delete $scope.toolString;
		delete $scope.length;
		delete $scope.weightInFluid;
		delete $scope.weightInAir;
		delete $scope.surfaceTensionTotalDepth;
		delete $scope.maxToolOuterDiameter;
		delete $scope.targetJarSetting;
		delete $scope.targetMaxJarForce;
	};
});

dashboardControllers.controller('JobJarSetsImpactOrderEditController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    var output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.svo = output.data[0];
    output = sharedService.getDataFromServer(getOnSiteDailyJobByJobURL + "/_id/" + $scope._id);
    $scope.dailyJob = output.data[0];
    output = sharedService.getDataFromServer(getPluralListURL + '/collections/TypeCable~Toolstring');
	$scope.cableTypeList = output[0].data;
	$scope.toolstringList = output[1].data;
	$scope.toolstringListAll = output[1].data;
	
	$scope.selectSerial = function(item, model) {
		$scope.toolstringList = [];
		var jarTypeSerial = item.split(" - ");
		for (var i = 0; i < $scope.toolstringListAll.length; i++) {
			if ((jarTypeSerial[0].indexOf(' BA ') != -1 || jarTypeSerial[0].indexOf(' BA') != -1) &&  $scope.toolstringListAll[i].category == 'Baker') { // Baker
				$scope.toolstringList.push(output[0].data[i]);
			} else if ((jarTypeSerial[0].indexOf(' SLB ') != -1 || jarTypeSerial[0].indexOf(' SLB') != -1) &&  $scope.toolstringListAll[i].category == 'Schlumberger') { // Schlumberger
				$scope.toolstringList.push(output[0].data[i]);
			} else if ((jarTypeSerial[0].indexOf(' HAL ') != -1 || jarTypeSerial[0].indexOf(' HAL') != -1) &&  $scope.toolstringListAll[i].category == 'Halliburton') { // Halliburton
				$scope.toolstringList.push(output[0].data[i]);
			}
		}
	}
	$scope.obj = {};
    output = sharedService.getDataFromServer(getJarSetsImpactOrderByJobURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    // create technician list for ISI operator
    $scope.technicianList = [];
    if ($scope.jobInfo) {
    	if ($scope.jobInfo.technician) {
    		$scope.technicianList.push($scope.jobInfo.technician);
    		$scope.obj.technician = $scope.jobInfo.technician;
    	}
    	if ($scope.jobInfo.technician2) {
    		$scope.technicianList.push($scope.jobInfo.technician2);
    		$scope.obj.technician = $scope.jobInfo.technician2;
    	}
    	if ($scope.jobInfo.technician && $scope.jobInfo.technician2) {
    		$scope.technicianList.push($scope.jobInfo.technician + '/' + $scope.jobInfo.technician2);
    		$scope.obj.technician = $scope.jobInfo.technician + '/' + $scope.jobInfo.technician2;
    	}
    }
    var data = $scope.obj.itemList;
    if (data == null) {
    	data = [];
    }
    $scope.save = function() {
    	var dataFiltered = [];
    	$scope.obj.jobInfo = $scope.jobInfo;
    	for (var i = 0; i < data.length; i++) {
    		dataFiltered.push({
        		"uid": UUID(),
        		"run": data[i].run, 
        		"toolString": data[i].toolString, 
        		"length": data[i].length, 
        		"weightInFluid": data[i].weightInFluid, 
        		"weightInAir": data[i].weightInAir, 
        		"surfaceTensionTotalDepth": data[i].surfaceTensionTotalDepth, 
        		"maxToolOuterDiameter": data[i].maxToolOuterDiameter, 
        		"targetJarSetting": data[i].targetJarSetting, 
        		"targetMaxJarForce": data[i].targetMaxJarForce
        	});
    	}
    	$scope.obj.itemList = dataFiltered;
	    var output = sharedService.callAjax(updateJarSetsImpactOrderURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jobInfoOnSiteReport/' + $scope._id;;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
    
	$scope.objTableParams = $scope.getTableParam(data);
	
	$scope.addItem = function() {
		var updateIndex = -1;
		if ($scope.runUid) {
			for (var i = 0; i < data.length; i++) {
	    		if (data[i].uid === $scope.runUid) {
	    			updateIndex = i;
	    			break;
	    		}
			}
		}
		if (updateIndex != -1) {
			var runDatum = data[updateIndex];
			runDatum.run = $scope.run;
			runDatum.toolString = $scope.toolString;
			runDatum.length = $scope.length;
			runDatum.weightInFluid = $scope.weightInFluid;
			runDatum.weightInAir = $scope.weightInAir;
			runDatum.surfaceTensionTotalDepth = $scope.surfaceTensionTotalDepth;
			runDatum.maxToolOuterDiameter = $scope.maxToolOuterDiameter;
			runDatum.targetJarSetting = $scope.targetJarSetting;
			runDatum.targetMaxJarForce = $scope.targetMaxJarForce;
		} else {
	    	data.push({
	    		"uid": UUID(),
	    		"run": $scope.run, 
	    		"toolString": $scope.toolString, 
	    		"length": $scope.length, 
	    		"weightInFluid": $scope.weightInFluid, 
	    		"weightInAir": $scope.weightInAir, 
	    		"surfaceTensionTotalDepth": $scope.surfaceTensionTotalDepth, 
	    		"maxToolOuterDiameter": $scope.maxToolOuterDiameter, 
	    		"targetJarSetting": $scope.targetJarSetting, 
	    		"targetMaxJarForce": $scope.targetMaxJarForce
	    	});
		}
    	$scope.objTableParams.reload();
	};
	$scope.editItem = function(uid) {
		for (var i = 0; i < data.length; i++) {
    		if (data[i].uid === uid) {
    			delete $scope.run;
    			delete $scope.toolString;
    			delete $scope.length;
    			delete $scope.weightInFluid;
    			delete $scope.weightInAir;
    			delete $scope.surfaceTensionTotalDepth;
    			delete $scope.maxToolOuterDiameter;
    			delete $scope.targetJarSetting;
    			delete $scope.targetMaxJarForce;
    			$scope.runUid = data[i].uid;
    			$scope.run = data[i].run;
    			$scope.toolString = data[i].toolString;
    			$scope.length = data[i].length;
    			$scope.weightInFluid = data[i].weightInFluid;
    			$scope.weightInAir = data[i].weightInAir;
    			$scope.surfaceTensionTotalDepth = data[i].surfaceTensionTotalDepth;
    			$scope.maxToolOuterDiameter = data[i].maxToolOuterDiameter;
    			$scope.targetJarSetting = data[i].targetJarSetting;
    			$scope.targetMaxJarForce = data[i].targetMaxJarForce;
    			break;
    		}
    	}
	};
	
	$scope.deleteItem = function(uid) {
		if (confirm("Are You Sure Want To Delete ?")) {
			if (uid === $scope.runUid) {
				delete $scope.runUid;
			}
	    	for (var i = data.length - 1; i >= 0; i--) {
	    		if (data[i].uid === uid) {
	    			data.splice(i, 1);
	    		}
	    	}
	    	$scope.objTableParams.reload();
		}
	};
	
	$scope.resetItemForm = function() {
		delete $scope.runUid;
		delete $scope.run;
		delete $scope.toolString;
		delete $scope.length;
		delete $scope.weightInFluid;
		delete $scope.weightInAir;
		delete $scope.surfaceTensionTotalDepth;
		delete $scope.maxToolOuterDiameter;
		delete $scope.targetJarSetting;
		delete $scope.targetMaxJarForce;
	};
});

dashboardControllers.controller('JobJarSetsImpactOrderDetailController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.svo = output.data[0];
    output = sharedService.getDataFromServer(getOnSiteDailyJobByJobURL + "/_id/" + $scope._id);
    $scope.dailyJob = output.data[0];
    $scope.obj = {};
    
    output = sharedService.getDataFromServer(getJarSetsImpactOrderByJobURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    var data = $scope.obj.itemList;
    if (data == null) {
    	data = [];
    }
	$scope.objTableParams = $scope.getTableParam(data);
	$scope.detailPdf = function() {
		window.open(getJarSetsImpactOrderDetailPdfURL + "/_id/" + $scope._id, "_self");
	}
});

// Open Hole Approval

dashboardControllers.controller('JobJarSetsOpenHoleNewController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/ImpactProSlotSize');
	$scope.slotSizeList = output[0].data;
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.svo = output.data[0];
    $scope.obj = {};
    // create technician list for ISI operator
    $scope.technicianList = [];
    if ($scope.jobInfo) {
    	if ($scope.jobInfo.technician) {
    		$scope.technicianList.push($scope.jobInfo.technician);
    		$scope.obj.techName_1 = $scope.jobInfo.technician;
    	}
    	if ($scope.jobInfo.technician2) {
    		$scope.technicianList.push($scope.jobInfo.technician2);
    		$scope.obj.techName_1 = $scope.jobInfo.technician2;
    	}
    	if ($scope.jobInfo.technician && $scope.jobInfo.technician2) {
    		$scope.technicianList.push($scope.jobInfo.technician + '/' + $scope.jobInfo.technician2);
    		$scope.obj.techName_1 = $scope.jobInfo.technician + '/' + $scope.jobInfo.technician2;
    	}
    }
    // set serialList from service order
    $scope.serialList = [];
    if ($scope.svo) {
    	for (var i = 1; i <= $scope.svo.toolCount; i++) {
	    	if ($scope.svo['serial' + i]) {
	    		$scope.serialList.push($scope.svo['toolType' + i] + ' - ' + $scope.svo['serial' + i]);
	    	}
    	}
    }
    $scope.getItemCount = [];
    if (!$scope.obj.itemCount || $scope.obj.itemCount == 0) {
    	$scope.obj.itemCount = 1;
    }
    output = sharedService.getDataFromServer(getPluralListURL + '/collections/Toolstring');
    $scope.toolstringList = [];
    for (var i = 0; i <= $scope.obj.itemCount; i++) {
    	$scope.toolstringList.push([]);
    }
    $scope.toolstringListAll = output[0].data;
	
	$scope.selectSerial = function(item, model, runNum) {
		$scope.toolstringList[runNum] = [];
		var jarTypeSerial = item.split(" - ");
		for (var i = 0; i < $scope.toolstringListAll.length; i++) {
			if ((jarTypeSerial[0].indexOf(' BA ') != -1 || jarTypeSerial[0].indexOf(' BA') != -1) &&  $scope.toolstringListAll[i].category == 'Baker') { // Baker
				$scope.toolstringList[runNum].push($scope.toolstringListAll[i]);
			} else if ((jarTypeSerial[0].indexOf(' SLB ') != -1 || jarTypeSerial[0].indexOf(' SLB') != -1) &&  $scope.toolstringListAll[i].category == 'Schlumberger') { // Schlumberger
				$scope.toolstringList[runNum].push($scope.toolstringListAll[i]);
			} else if ((jarTypeSerial[0].indexOf(' HAL ') != -1 || jarTypeSerial[0].indexOf(' HAL') != -1) &&  $scope.toolstringListAll[i].category == 'Halliburton') { // Halliburton
				$scope.toolstringList[runNum].push($scope.toolstringListAll[i]);
			}
		}
	}
	
    
    $scope.save = function() {
    	$scope.obj.job = $scope._id;
	    var output = sharedService.callAjax(saveJarSetsOpenHoleURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jobInfoOnSiteReport/' + $scope._id;;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
    
 // item list
    
    for (var i = 1; i <= $scope.obj.itemCount; i++) {
    	$scope.getItemCount.push({id:UUID(), idx:i});
	}
	
	$scope.addItem = function() {
		var idx = arguments[0];
		for (var i = 0; i < arguments.length; i++) {
			for (var j = $scope.obj.itemCount; j > idx ; j--) {
				$scope.obj[arguments[i] + '_' + (j + 1)] = $scope.obj[arguments[i] + '_' + j];
			}
		}
		for (var i = 0; i < arguments.length; i++) {
			delete $scope.obj[arguments[i] + '_' + (idx + 1)];
		}
		
		$scope.toolstringList.push([]);
		for (var j = $scope.obj.itemCount; j > idx ; j--) {
			$scope.toolstringList[j + 1] = $scope.toolstringList[j];
		}
		$scope.toolstringList[idx + 1] = [];
		
		if ($scope.obj['msp_' + idx]) {
			$scope.obj['msp_' + (idx + 1)] = $scope.obj['msp_' + idx];
		}
		if ($scope.obj['wp_' + idx]) {
			$scope.obj['wp_' + (idx + 1)] = $scope.obj['wp_' + idx];
		}
		if ($scope.jobInfo) {
	    	if ($scope.jobInfo.technician) {
	    		$scope.obj['techName_' + (idx + 1)] = $scope.jobInfo.technician;
	    	}
	    	if ($scope.jobInfo.technician2) {
	    		$scope.obj['techName_' + (idx + 1)] = $scope.jobInfo.technician2;
	    	}
	    	if ($scope.jobInfo.technician && $scope.jobInfo.technician2) {
	    		$scope.obj['techName_' + (idx + 1)] = $scope.jobInfo.technician + '/' + $scope.jobInfo.technician2;
	    	}
	    }
		$scope.obj.itemCount++;
		$scope.getItemCount = [];
	    for (var i = 1; i <= $scope.obj.itemCount; i++) {
	    	$scope.getItemCount.push({id:UUID(), idx:i});
		}
	    
	};
	
	$scope.deleteItem = function() {
		if (confirm("Are You Sure Want To Delete ?")) {
			var idx = arguments[0];
			
			for (var i = 0; i < arguments.length; i++) {
				for (var j = idx; j < $scope.obj.itemCount ; j++) {
					$scope.obj[arguments[i] + '_' + (j)] = $scope.obj[arguments[i] + '_' + (j + 1)];
				}
			}
			for (var i = 0; i < arguments.length; i++) {
				delete $scope.obj[arguments[i] + '_' + ($scope.obj.itemCount)];
			}
			
			for (var j = idx; j < $scope.obj.itemCount ; j++) {
				$scope.toolstringList[j] = $scope.toolstringList[j + 1];
			}
			$scope.toolstringList[$scope.obj.itemCount] = [];
			
			$scope.obj.itemCount--;
			$scope.getItemCount = [];
		    for (var i = 1; i <= $scope.obj.itemCount; i++) {
		    	$scope.getItemCount.push({id:UUID(), idx:i});
			}
		}
	};
	$scope.activationChange = function(idx) {
		if ($scope.obj['activation_' + idx] == '0') {
			$scope.obj['numOfActivation_' + idx] = 0;
		}
	}
});

dashboardControllers.controller('JobJarSetsOpenHoleEditController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/ImpactProSlotSize');
	$scope.slotSizeList = output[0].data;
    var output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.svo = output.data[0];
    var output = sharedService.getDataFromServer(getJarSetsOpenHoleByJobURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    // create technician list for ISI operator
    $scope.technicianList = [];
    if ($scope.jobInfo) {
    	if ($scope.jobInfo.technician) {
    		$scope.technicianList.push($scope.jobInfo.technician);
    	}
    	if ($scope.jobInfo.technician2) {
    		$scope.technicianList.push($scope.jobInfo.technician2);
    	}
    	if ($scope.jobInfo.technician && $scope.jobInfo.technician2) {
    		$scope.technicianList.push($scope.jobInfo.technician + '/' + $scope.jobInfo.technician2);
    	}
    }
 // set serialList from service order
    $scope.serialList = [];
    if ($scope.svo) {
    	for (var i = 1; i <= $scope.svo.toolCount; i++) {
	    	if ($scope.svo['serial' + i]) {
	    		$scope.serialList.push($scope.svo['toolType' + i] + ' - ' + $scope.svo['serial' + i]);
	    	}
    	}
    }
    $scope.getItemCount = [];
    if (!$scope.obj.itemCount || $scope.obj.itemCount == 0) {
    	$scope.obj.itemCount = 1;
    }
    output = sharedService.getDataFromServer(getPluralListURL + '/collections/Toolstring');
    $scope.toolstringList = [];
    for (var i = 0; i <= $scope.obj.itemCount; i++) {
    	$scope.toolstringList.push([]);
    }
    $scope.toolstringListAll = output[0].data;
	
	$scope.selectSerial = function(item, model, runNum) {
		$scope.toolstringList[runNum] = [];
		var jarTypeSerial = item.split(" - ");
		for (var i = 0; i < $scope.toolstringListAll.length; i++) {
			if ((jarTypeSerial[0].indexOf(' BA ') != -1 || jarTypeSerial[0].indexOf(' BA') != -1) &&  $scope.toolstringListAll[i].category == 'Baker') { // Baker
				$scope.toolstringList[runNum].push($scope.toolstringListAll[i]);
			} else if ((jarTypeSerial[0].indexOf(' SLB ') != -1 || jarTypeSerial[0].indexOf(' SLB') != -1) &&  $scope.toolstringListAll[i].category == 'Schlumberger') { // Schlumberger
				$scope.toolstringList[runNum].push($scope.toolstringListAll[i]);
			} else if ((jarTypeSerial[0].indexOf(' HAL ') != -1 || jarTypeSerial[0].indexOf(' HAL') != -1) &&  $scope.toolstringListAll[i].category == 'Halliburton') { // Halliburton
				$scope.toolstringList[runNum].push($scope.toolstringListAll[i]);
			}
		}
	}
	
    
    $scope.save = function() {
    	$scope.obj.job = $scope._id;
	    var output = sharedService.callAjax(updateJarSetsOpenHoleURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jobInfoOnSiteReport/' + $scope._id;;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
    
    // item list
    
    for (var i = 1; i <= $scope.obj.itemCount; i++) {
    	$scope.getItemCount.push({id:UUID(), idx:i});
    	if ($scope.obj['jarSerial_' + i]) {
    		$scope.selectSerial($scope.obj['jarSerial_' + i], null, i);
    	}
	}
	
	$scope.addItem = function() {
		var idx = arguments[0];
		
		for (var i = 0; i < arguments.length; i++) {
			for (var j = $scope.obj.itemCount; j > idx ; j--) {
				$scope.obj[arguments[i] + '_' + (j + 1)] = $scope.obj[arguments[i] + '_' + j];
			}
		}
		for (var i = 0; i < arguments.length; i++) {
			delete $scope.obj[arguments[i] + '_' + (idx + 1)];
		}
		
		$scope.toolstringList.push([]);
		for (var j = $scope.obj.itemCount; j > idx ; j--) {
			$scope.toolstringList[j + 1] = $scope.toolstringList[j];
		}
		$scope.toolstringList[idx + 1] = [];
		
		if ($scope.obj['msp_' + idx]) {
			$scope.obj['msp_' + (idx + 1)] = $scope.obj['msp_' + idx];
		}
		if ($scope.obj['wp_' + idx]) {
			$scope.obj['wp_' + (idx + 1)] = $scope.obj['wp_' + idx];
		}
		if ($scope.jobInfo) {
	    	if ($scope.jobInfo.technician) {
	    		$scope.obj['techName_' + (idx + 1)] = $scope.jobInfo.technician;
	    	}
	    	if ($scope.jobInfo.technician2) {
	    		$scope.obj['techName_' + (idx + 1)] = $scope.jobInfo.technician2;
	    	}
	    	if ($scope.jobInfo.technician && $scope.jobInfo.technician2) {
	    		$scope.obj['techName_' + (idx + 1)] = $scope.jobInfo.technician + '/' + $scope.jobInfo.technician2;
	    	}
	    }
		$scope.obj.itemCount++;
		$scope.getItemCount = [];
	    for (var i = 1; i <= $scope.obj.itemCount; i++) {
	    	$scope.getItemCount.push({id:UUID(), idx:i});
		}
	};
	
	$scope.deleteItem = function() {
		if (confirm("Are You Sure Want To Delete ?")) {
			var idx = arguments[0];
			
			for (var i = 0; i < arguments.length; i++) {
				for (var j = idx; j < $scope.obj.itemCount ; j++) {
					$scope.obj[arguments[i] + '_' + (j)] = $scope.obj[arguments[i] + '_' + (j + 1)];
				}
			}
			for (var i = 0; i < arguments.length; i++) {
				delete $scope.obj[arguments[i] + '_' + ($scope.obj.itemCount)];
			}
			
			for (var j = idx; j < $scope.obj.itemCount ; j++) {
				$scope.toolstringList[j] = $scope.toolstringList[j + 1];
			}
			$scope.toolstringList[$scope.obj.itemCount] = [];
			
			$scope.obj.itemCount--;
			$scope.getItemCount = [];
		    for (var i = 1; i <= $scope.obj.itemCount; i++) {
		    	$scope.getItemCount.push({id:UUID(), idx:i});
			}
		}
	};
	$scope.activationChange = function(idx) {
		if ($scope.obj['activation_' + idx] == '0') {
			$scope.obj['numOfActivation_' + idx] = 0;
		}
	}
});

dashboardControllers.controller('JobJarSetsOpenHoleDetailController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    var output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.svo = output.data[0];
    var output = sharedService.getDataFromServer(getJarSetsOpenHoleByJobURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    
    $scope.detailPdf = function() {
		window.open(getJarSetsOpenHoleDetailPdfURL + "/_id/" + $scope._id, "_self");
	}
    
    // item list
    $scope.getItemCount = [];
    for (var i = 1; i <= $scope.obj.itemCount; i++) {
    	$scope.getItemCount.push({id:UUID(), idx:i});
	}
});

dashboardApp.filter('filterByCategory', function() {
	return function( items, serial, jobType) {
		if (jobType == '1') {
		    var filtered = [];
		    angular.forEach(items, function(item) {
		    	if (serial && serial.indexOf(' BA ') != -1 && item.category == 'Baker') {
		    		filtered.push(item);
		    	} else if (serial && serial.indexOf(' SLB ') != -1 && item.category == 'Schlumberger') {
		    		filtered.push(item);
		    	}
		    });
		    return filtered;
		} else {
			return items;
		}
	  };
});