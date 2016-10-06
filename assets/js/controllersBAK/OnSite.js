dashboardControllers.controller('JobOnSiteController', function($scope, $rootScope, $routeParams, $controller, sharedService) {
	$rootScope.selectedMenu = "jobInfo";
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    
    var output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    output = sharedService.getDataFromServer(getOnSiteDailyJobByJobURL + "/_id/" + $scope._id);
    $scope.dailyJob = output.data[0];
    output = sharedService.getDataFromServer(getOnSiteTechDataByJobURL + "/_id/" + $scope._id);
    $scope.techData = output.data[0];
    output = sharedService.getDataFromServer(getOnSiteCustomerByJobURL + "/_id/" + $scope._id);
    $scope.customer = output.data[0];
    output = sharedService.getDataFromServer(getJarSetsImpactOrderByJobURL + "/_id/" + $scope._id);
    $scope.impact = output.data[0];
    output = sharedService.getDataFromServer(getJarSetsOpenHoleByJobURL + "/_id/" + $scope._id);
    $scope.approval = output.data[0];
    $scope.detailSummaryJobPdf = function() {
		window.open(getSummaryJobDetailPdfURL + "/_id/" + $scope._id, "_self");
	}
});

// DAILY JOB

dashboardControllers.controller('JobOnSiteDailyJobController', function($scope, $rootScope, $controller, $routeParams, sharedService, ngTableParams, $filter) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    $scope.obj = {};
    output = sharedService.getDataFromServer(getOnSiteDailyJobByJobURL + "/_id/" + $scope._id);
    $scope.obj = output.data;
    var data = $scope.obj;
    if (data == null) {
    	data = [];
    }
    
	$scope.objTableParams = $scope.getTableParam(data);
	
	$scope.deleteObj = function(idToDel) {
		if (confirm("Are You Sure Want To Delete ?")) {
			var dataToSend = {"_id": idToDel};
	        var output = sharedService.callAjax(deleteOnSiteDailyJobURL, "post", dataToSend);
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

dashboardControllers.controller('JobOnSiteDailyJobNewController', function($scope, $rootScope, $controller, $routeParams, sharedService, $filter) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    var output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact~Company~profile~Region');
	$scope.contactList = output[0].data;
	$scope.companyList = output[1].data;
	$scope.profileList = output[2].data;
	$scope.regionList = output[3].data;
    output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.svo = output.data[0];
    $scope.obj = {};
    // create technician list for ISI operator
    $scope.technicianList = [];
    if ($scope.jobInfo) {
    	if ($scope.jobInfo.technician) {
    		$scope.technicianList.push($scope.jobInfo.technician);
    		$scope.obj.operator = $scope.jobInfo.technician;
    	}
    	if ($scope.jobInfo.technician2) {
    		$scope.technicianList.push($scope.jobInfo.technician2);
    		$scope.obj.operator = $scope.jobInfo.technician2;
    	}
    	if ($scope.jobInfo.technician && $scope.jobInfo.technician2) {
    		$scope.technicianList.push($scope.jobInfo.technician + '/' + $scope.jobInfo.technician2);
    		$scope.obj.operator = $scope.jobInfo.technician + '/' + $scope.jobInfo.technician2;
    	}
    }
   
    // serialCount
    $scope.serialCount = $scope.svo.toolCount;
	
	output = sharedService.getDataFromServer(getJarSetsOpenHoleByJobURL + "/_id/" + $scope._id);
    $scope.approval = output.data[0];
    // set runList from preset approval
    $scope.status = 'Stand By';
    $scope.statusList = ['Stand By', 'End Job'];
    if ($scope.approval) {
    	for (var i = 0; i < $scope.approval.itemCount; i++) {
    		if ($scope.approval['run_' + (i + 1)]) {
        		$scope.statusList.push("Run : " + $scope.approval['run_' + (i + 1)]);
        	}
    	}
    }
    
    // get original data
    $scope.tdOri = null;
    if ($scope.svo.td != null) {
    	$scope.tdOri = $scope.svo.td;
    }
    $scope.mudWtOri = null;
    if ($scope.svo.mudWt != null) {
    	$scope.mudWtOri = $scope.svo.mudWt;
    }
    $scope.deviationOri = null;
    if ($scope.jobInfo.deviation != null) {
    	$scope.deviationOri = $scope.jobInfo.deviation;
    }
    $scope.bhpOri = null;
    if ($scope.svo.bhp != null) {
    	$scope.bhpOri = $scope.svo.bhp;
    }
    $scope.tempOri = null;
    if ($scope.jobInfo.temp != null) {
    	$scope.tempOri = $scope.jobInfo.temp;
    }
    $scope.wellNameOri = null;
    if ($scope.jobInfo.wellName != null) {
    	$scope.wellNameOri = $scope.jobInfo.wellName;
    }
	$scope.fieldOri = null;
    if ($scope.jobInfo.field != null) {
    	$scope.fieldOri = $scope.jobInfo.field;
    }
	$scope.stateOri = null;
    if ($scope.jobInfo.state != null) {
    	$scope.stateOri = $scope.jobInfo.state;
    }
	$scope.blockOri = null;
    if ($scope.jobInfo.block != null) {
    	$scope.blockOri = $scope.jobInfo.block;
    }
	$scope.ocsgOri = null;
    if ($scope.jobInfo.ocsg != null) {
    	$scope.ocsgOri = $scope.jobInfo.ocsg;
    }
	$scope.poOri = null;
    if ($scope.jobInfo.po != null) {
    	$scope.poOri = $scope.jobInfo.po;
    }
	$scope.apiOri = null;
    if ($scope.jobInfo.api != null) {
    	$scope.apiOri = $scope.jobInfo.api;
    }
	$scope.rigNameOri = null;
    if ($scope.jobInfo.rigName != null) {
    	$scope.rigNameOri = $scope.jobInfo.rigName;
    }
	$scope.leaseOri = null;
    if ($scope.jobInfo.lease != null) {
    	$scope.leaseOri = $scope.jobInfo.lease;
    }
	$scope.countryOri = null;
    if ($scope.jobInfo.country != null) {
    	$scope.countryOri = $scope.jobInfo.country;
    }
	$scope.parishOri = null;
    if ($scope.jobInfo.parish != null) {
    	$scope.parishOri = $scope.jobInfo.parish;
    }
    $scope.wirelineEngineerOri = null;
    if ($scope.jobInfo.wirelineEngineer != null) {
    	$scope.wirelineEngineerOri = $scope.jobInfo.wirelineEngineer;
    }
    $scope.serviceCompanyOri = null;
    if ($scope.jobInfo.serviceCompany != null) {
    	$scope.serviceCompanyOri = $scope.jobInfo.serviceCompany;
    }
    $scope.oilCompanyOri = null;
    if ($scope.jobInfo.oilCompany != null) {
    	$scope.oilCompanyOri = $scope.jobInfo.oilCompany;
    }
    $scope.afeOri = null;
    if ($scope.jobInfo.afe != null) {
    	$scope.afeOri = $scope.jobInfo.afe;
    }

    // calculate pricing
    output = sharedService.getDataFromServer(getPriceManagerDetailURL + "/_id/price");
    $scope.price = output.data[0];
	// calculate upcoming estimated revenue
    var job = $scope.jobInfo;
    var firstDayCharge = 0;
    var additionalCharge = 0;
    var standbyCharge = 0;
    var technicianCharge = 0;
    var activationCharge = 0;
    var mileageCharge = 0;
    var lostCharge = 0;
    var toolCharge = 0;
    var runCharge = 0;
    var impactProCharge = 0;
	if (job.environment == '0') { // Land
		if (job.isHighTemp || job.isHighPress) { // High Temp or High Press
		    firstDayCharge = 0;
		    additionalCharge = 0;
		    standbyCharge = $scope.price.hphtLandStandby;
		    technicianCharge = $scope.price.hphtLandTechnician;
		    activationCharge = $scope.price.hphtLandActivation;
		    mileageCharge = $scope.price.hphtLandMileage;
		    lostCharge = $scope.price.hphtLandLost;
		    toolCharge = $scope.price.hphtLandTool;
		    runCharge = $scope.price.hphtLandRun;
		    impactProCharge = $scope.price.hphtLandImpactPro;
		} else {
			firstDayCharge = $scope.price.landFirstDay;
		    additionalCharge = $scope.price.landAdditionalDay;
		    standbyCharge = $scope.price.landStandby;
		    technicianCharge = $scope.price.landTechnician;
		    activationCharge = $scope.price.landActivation;
		    mileageCharge = $scope.price.landMileage;
		    lostCharge = $scope.price.landLost;
		    toolCharge = 0;
		    runCharge = 0;
		    impactProCharge = $scope.price.landImpactPro;
		}
		
	} else if (job.environment == '1') { // Offshore
		if (job.isHighTemp || job.isHighPress) { // High Temp or High Press
			firstDayCharge = 0;
		    additionalCharge = 0;
		    standbyCharge = $scope.price.hphtOffshoreStandby;
		    technicianCharge = $scope.price.hphtOffshoreTechnician;
		    activationCharge = $scope.price.hphtOffshoreActivation;
		    mileageCharge = $scope.price.hphtOffshoreMileage;
		    lostCharge = $scope.price.hphtOffshoreLost;
		    toolCharge = $scope.price.hphtOffshoreTool;
		    runCharge = $scope.price.hphtOffshoreRun;
		    impactProCharge = $scope.price.hphtOffshoreImpactPro;
		} else {
			firstDayCharge = 0;
		    additionalCharge = 0;
		    standbyCharge = $scope.price.offshoreStandby;
		    technicianCharge = $scope.price.offshoreTechnician;
		    activationCharge = $scope.price.offshoreActivation;
		    mileageCharge = $scope.price.offshoreMileage;
		    lostCharge = $scope.price.offshoreLost;
		    toolCharge = 0;
		    runCharge = $scope.price.offshoreRun;
		    impactProCharge = $scope.price.offshoreImpactPro;
		}
	} else {
		firstDayCharge = 0;
	    additionalCharge = 0;
	    standbyCharge = 0;
	    technicianCharge = 0;
	    activationCharge = 0;
	    mileageCharge = 0;
	    lostCharge = 0;
	    toolCharge = 0;
	    runCharge = 0;
	    impactProCharge = 0;
	}
    // end calculate pricing
    
    var data = [];
    var chargeData = [];
    $scope.save = function() {
    	// check if linked variable changed
    	var isChanged = false;
    	var message = "";
    	if ($scope.tdOri != $scope.svo.td) { isChanged = true; message += "Changed Total Well Depth will effect Service Order\n" }
    	if ($scope.mudWtOri != $scope.svo.mudWt) { isChanged = true; message += "Changed Mud Weight will effect Service Order\n" }
    	if ($scope.deviationOri != $scope.jobInfo.deviation) { isChanged = true; message += "Changed Deviation will effect Job Information\n" }
    	if ($scope.bhpOri != $scope.svo.bhp) { isChanged = true; message += "Changed Bottom Hole Pressure will effect Service Order\n" }
    	if ($scope.tempOri != $scope.jobInfo.temp) { isChanged = true; message += "Changed Temperature will effect Job Information\n" }
    	if ($scope.wellNameOri != $scope.jobInfo.wellName) { isChanged = true; message += "Changed Well Name will effect Job Information\n" }
    	if ($scope.fieldOri != $scope.jobInfo.field) { isChanged = true; message += "Changed Field will effect Job Information\n" }
    	if ($scope.stateOri != $scope.jobInfo.state) { isChanged = true; message += "Changed State will effect Job Information\n" }
    	if ($scope.blockOri != $scope.jobInfo.block) { isChanged = true; message += "Changed Block will effect Job Information\n" }
    	if ($scope.ocsgOri != $scope.jobInfo.ocsg) { isChanged = true; message += "Changed OCSG will effect Job Information\n" }
    	if ($scope.poOri != $scope.jobInfo.po) { isChanged = true; message += "Changed PO will effect Job Information\n" }
    	if ($scope.apiOri != $scope.jobInfo.api) { isChanged = true; message += "Changed API will effect Job Information\n" }
    	if ($scope.rigNameOri != $scope.jobInfo.rigName) { isChanged = true; message += "Changed Rig Name will effect Job Information\n" }
    	if ($scope.leaseOri != $scope.jobInfo.lease) { isChanged = true; message += "Changed Lease will effect Job Information\n" }
    	if ($scope.countryOri != $scope.jobInfo.country) { isChanged = true; message += "Changed Country will effect Job Information\n" }
    	if ($scope.parishOri != $scope.jobInfo.parish) { isChanged = true; message += "Changed Parish will effect Job Information\n" }
        if ($scope.wirelineEngineerOri && $scope.jobInfo.wirelineEngineer && $scope.wirelineEngineerOri._id !== $scope.jobInfo.wirelineEngineer._id) { isChanged = true; message += "Changed Engineer will effect Job Information\n" }
        if ($scope.serviceCompanyOri && $scope.jobInfo.serviceCompany && $scope.serviceCompanyOri._id !== $scope.jobInfo.serviceCompany._id) { isChanged = true; message += "Changed Wireline Company will effect Job Information\n" }
        if ($scope.oilCompanyOri && $scope.jobInfo.oilCompany && $scope.oilCompanyOri._id !== $scope.jobInfo.oilCompany._id) { isChanged = true; message += "Changed Oil Company will effect Job Information\n" }
        if ($scope.afeOri != $scope.jobInfo.afe) { isChanged = true; message += "Changed AFE will effect Job Information\n" }
    	if (isChanged) {
    		var r = confirm(message + "\nAre you sure you want to changes?\n");
	        if (r == true) {
	            // continue process
	        } else {
	        	// break process
	            return;
	        }
    	}
    	
    	$scope.obj.job = $scope._id;
    	$scope.obj.jobInfo = $scope.jobInfo;
    	$scope.obj.svo = $scope.svo;
    	var chargeFiltered = [];
    	for (var i = 0; i < chargeData.length; i++) {
    		chargeFiltered.push({
        		"uid": UUID(),
        		"chargeDate": chargeData[i].chargeDate, 
        		"chargeName": chargeData[i].chargeName, 
        		"numOfCharge": chargeData[i].numOfCharge, 
        		"amount": chargeData[i].amount, 
        		"total": chargeData[i].total,
        		"chargeList": chargeData[i].chargeList
        	});
    	}
    	$scope.obj.chargeList = chargeFiltered;
    	$scope.calculateTotal();
    	var dataFiltered = [];
    	for (var i = 0; i < data.length; i++) {
    		dataFiltered.push({
        		"uid": UUID(),
        		"activityDate": data[i].activityDate, 
        		"status": data[i].status, 
        		"from": data[i].from, 
        		"to": data[i].to, 
        		"desc": data[i].desc
        	});
    	}
    	$scope.obj.itemList = dataFiltered;
	    var output = sharedService.callAjax(saveOnSiteDailyJobURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jobInfoOnSiteReport/' + $scope._id;;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
    
    $scope.calculateTotal = function() {
    	$scope.obj.numOfChargeFirst = $scope.obj.numOfChargeAdditional = $scope.obj.numOfChargeRun = $scope.obj.numOfChargeStandBy = $scope.obj.numOfChargeTechnician = $scope.obj.numOfChargeActivation = $scope.obj.numOfChargeLost = $scope.obj.numOfChargeMileage = 0;
    	$scope.obj.amountFirst = $scope.obj.amountAdditional = $scope.obj.amountRun = $scope.obj.amountStandBy = $scope.obj.amountTechnician = $scope.obj.amountActivation = $scope.obj.amountLost = $scope.obj.amountMileage = 0;
    	$scope.obj.totalFirst = $scope.obj.totalAdditional = $scope.obj.totalRun = $scope.obj.totalStandBy = $scope.obj.totalTechnician = $scope.obj.totalActivation = $scope.obj.totalLost = $scope.obj.totalMileage = 0;
    	$scope.obj.numOfChargeTool = $scope.serialCount;
    	$scope.obj.amountTool = toolCharge;
    	$scope.obj.totalTool = $scope.obj.numOfChargeTool * $scope.obj.amountTool;
    	for (var i = 0; i < chargeData.length; i++) {
    		var chargeList = chargeData[i].chargeList;
    		for (var j = 0; j < chargeList.length; j++) {
    			if (chargeList[j].type == "first") {
    				$scope.obj.numOfChargeFirst += (1*chargeList[j].numOfCharge);
    				$scope.obj.amountFirst = (1*chargeList[j].amount);
    				$scope.obj.totalFirst += (1*chargeList[j].total);
    			} else if (chargeList[j].type == "additional") {
    				$scope.obj.numOfChargeAdditional += (1*chargeList[j].numOfCharge);
    				$scope.obj.amountAdditional = (1*chargeList[j].amount);
    				$scope.obj.totalAdditional += (1*chargeList[j].total);
    			} else if (chargeList[j].type == "run") {
     				$scope.obj.numOfChargeRun += (1*chargeList[j].numOfCharge);
     				$scope.obj.amountRun = (1*chargeList[j].amount);
     				$scope.obj.totalRun += (1*chargeList[j].total);
     			} else if (chargeList[j].type == "standBy") {
     				$scope.obj.numOfChargeStandBy += (1*chargeList[j].numOfCharge);
     				$scope.obj.amountStandBy = (1*chargeList[j].amount);
     				$scope.obj.totalStandBy += (1*chargeList[j].total);
     			} else if (chargeList[j].type == "technician") {
     				$scope.obj.numOfChargeTechnician += (1*chargeList[j].numOfCharge);
     				$scope.obj.amountTechnician = (1*chargeList[j].amount);
     				$scope.obj.totalTechnician += (1*chargeList[j].total);
     			} else if (chargeList[j].type == "activation") {
     				$scope.obj.numOfChargeActivation += (1*chargeList[j].numOfCharge);
     				$scope.obj.amountActivation = (1*chargeList[j].amount);
     				$scope.obj.totalActivation += (1*chargeList[j].total);
     			} else if (chargeList[j].type == "lost") {
     				$scope.obj.numOfChargeLost += (1*chargeList[j].numOfCharge);
     				$scope.obj.amountLost = (1*chargeList[j].amount);
     				$scope.obj.totalLost += (1*chargeList[j].total);
     			} else if (chargeList[j].type == "mileage") {
     				$scope.obj.numOfChargeMileage += (1*chargeList[j].numOfCharge);
     				$scope.obj.amountMileage = (1*chargeList[j].amount);
     				$scope.obj.totalMileage += (1*chargeList[j].total);
     			}
    			
    		}
    	}
    }
    
    $scope.chargeTableParams = $scope.getTableParam(chargeData);
	$scope.addCharge = function() {
		var updateIndex = -1;
		if ($scope.chargeUid) {
			for (var i = 0; i < chargeData.length; i++) {
	    		if (chargeData[i].uid === $scope.chargeUid) {
	    			updateIndex = i;
	    			break;
	    		}
			}
		}
		var duplicatedIndex = -1;
		for (var loop = 0; loop < chargeData.length; loop++) {
			if (chargeData[loop]["chargeDate"] === $scope.chargeDate && loop != updateIndex) {
				duplicatedIndex = loop;
				break;
			}
		}
		
		if (duplicatedIndex != -1) {
			alert("there are already same date on the charge list");
			return;
		}
		
		var chargeList = [];
		$scope.chargeName = "";
		$scope.numOfCharge = "";
		$scope.amount = "";
		$scope.total = "";
		if ($scope.isFirstDay) {
			$scope.chargeName += "First Day Charge\n";
			$scope.numOfCharge += "1\n";
			$scope.amount += $filter("currency")(firstDayCharge) + "\n";
			$scope.total += $filter("currency")(1 * firstDayCharge) + "\n";
			chargeList.push({"type": "first", "name": "First Day Charge", "numOfCharge": 1, "amount": firstDayCharge, "total": (1 * firstDayCharge)});
		}
		if ($scope.isAdditionalDay) {
			$scope.chargeName += "Additional Day Charge\n";
			$scope.numOfCharge += "1\n";
			$scope.amount += $filter("currency")(additionalCharge) + "\n";
			$scope.total += $filter("currency")(1 * additionalCharge) + "\n";
			chargeList.push({"type": "additional", "name": "Additional Day Charge", "numOfCharge": 1, "amount": additionalCharge, "total": (1 * additionalCharge)});
		}
		if ($scope.isRun) {
			$scope.chargeName += "Run Charge\n";
			$scope.numOfCharge += $scope.runNum + "\n";
			$scope.amount += $filter("currency")(runCharge) + "\n";
			$scope.total += $filter("currency")($scope.runNum * runCharge) + "\n";
			chargeList.push({"type": "run", "name": "Run Charge", "numOfCharge": $scope.runNum, "amount": runCharge, "total": ($scope.runNum * runCharge)});
		}
		if ($scope.isStandBy) {
			$scope.chargeName += "StandBy Charge\n";
			$scope.numOfCharge += $scope.standByNum + "\n";
			$scope.amount += $filter("currency")(standbyCharge) + "\n";
			$scope.total += $filter("currency")($scope.standByNum * standbyCharge) + "\n";
			chargeList.push({"type": "standBy", "name": "StandBy Charge", "numOfCharge": $scope.standByNum, "amount": standbyCharge, "total": ($scope.standByNum * standbyCharge)});
		}
		if ($scope.isTechnician) {
			$scope.chargeName += "Technician Charge\n";
			$scope.numOfCharge += "1\n";
			$scope.amount += $filter("currency")(technicianCharge) + "\n";
			$scope.total += $filter("currency")(1 * technicianCharge) + "\n";
			chargeList.push({"type": "technician", "name": "Technician Charge", "numOfCharge": 1, "amount": technicianCharge, "total": (1 * technicianCharge)});
		}
		if ($scope.isActivation) {
			$scope.chargeName += "Activation Charge\n";
			$scope.numOfCharge += $scope.activationNum + "\n";
			$scope.amount += $filter("currency")(activationCharge) + "\n";
			$scope.total += $filter("currency")($scope.activationNum * activationCharge) + "\n";
			chargeList.push({"type": "activation", "name": "Activation Charge", "numOfCharge": $scope.activationNum, "amount": activationCharge, "total": ($scope.activationNum * activationCharge)});
		}
		if ($scope.isLost) {
			$scope.chargeName += "Lost In Hole Charge\n";
			$scope.numOfCharge += "1\n";
			$scope.amount += $filter("currency")(lostCharge) + "\n";
			$scope.total += $filter("currency")(1 * lostCharge) + "\n";
			chargeList.push({"type": "lost", "name": "Lost In Hole Charge", "numOfCharge": 1, "amount": lostCharge, "total": (1 * lostCharge)});
		}
		if ($scope.isMileage) {
			$scope.chargeName += "Mileage Charge\n";
			$scope.numOfCharge += $scope.mileageNum + "\n";
			$scope.amount += $filter("currency")(mileageCharge) + "\n";
			$scope.total += $filter("currency")($scope.mileageNum * mileageCharge) + "\n";
			chargeList.push({"type": "mileage", "name": "Mileage Charge", "numOfCharge": $scope.mileageNum, "amount": mileageCharge, "total": ($scope.mileageNum * mileageCharge)});
		}
		if (updateIndex != -1) {
			var chargeDatum = chargeData[updateIndex];
			chargeDatum.chargeDate = $scope.chargeDate;
			chargeDatum.chargeName = $scope.chargeName;
			chargeDatum.numOfCharge = $scope.numOfCharge;
			chargeDatum.amount = $scope.amount;
			chargeDatum.total = $scope.total;
			chargeDatum.chargeList = chargeList;
		} else {
			chargeData.push({
	    		"uid": UUID(),
	    		"chargeDate": $scope.chargeDate,
	    		"chargeName": $scope.chargeName,
	    		"numOfCharge": $scope.numOfCharge,
	    		"amount": $scope.amount,
	    		"total": $scope.total,
	    		"chargeList": chargeList
	    	});
		}
		chargeData.sort(function(a,b) { return a.chargeDate - b.chargeDate } );
    	$scope.chargeTableParams.reload();
    	$scope.calculateTotal();
    	//delete $scope.chargeUid;
	};
	$scope.editCharge = function(uid) {
		for (var i = 0; i < chargeData.length; i++) {
    		if (chargeData[i].uid === uid) {
    			delete $scope.chargeDate;
    			delete $scope.chargeName;
    			delete $scope.numOfCharge;
    			delete $scope.amount;
    			delete $scope.total;
    			delete $scope.isFirstDay;
    			delete $scope.isAdditionalDay;
    			delete $scope.isRun;
    			delete $scope.runNum;
    			delete $scope.isStandBy;
    			delete $scope.standByNum;
    			delete $scope.isTechnician;
    			delete $scope.isActivation;
    			delete $scope.activationNum;
    			delete $scope.isLost;
    			delete $scope.isMileage;
    			delete $scope.mileageNum;
    			$scope.chargeUid = chargeData[i].uid;
    			$scope.chargeDate = chargeData[i].chargeDate;
    			var chargeDateHandle = $('#chargeDate');
    			chargeDateHandle.attr('sync-lock', 'true');
    			chargeDateHandle.data('datepicker').setUTCDate(new Date($scope.chargeDate * 1000));
    			chargeDateHandle.removeAttr('sync-lock');
    			var chargeList = chargeData[i].chargeList;
    			for (var loop = 0; loop < chargeList.length; loop++) {
    				var chargeItem = chargeList[loop];
    				if (chargeItem.type == 'first') {
    					$scope.isFirstDay = true;
    				} else if (chargeItem.type == 'additional') {
    					$scope.isAdditionalDay = true;
    				} else if (chargeItem.type == 'run') {
    					$scope.isRun = true;
    					$scope.runNum = chargeItem.numOfCharge;
    				} else if (chargeItem.type == 'standBy') {
    					$scope.isStandBy = true;
    					$scope.standByNum = chargeItem.numOfCharge;
    				} else if (chargeItem.type == 'technician') {
    					$scope.isTechnician = true;
    				} else if (chargeItem.type == 'activation') {
    					$scope.isActivation = true;
    					$scope.activationNum = chargeItem.numOfCharge;
    				} else if (chargeItem.type == 'lost') {
    					$scope.isLost = true;
    				} else if (chargeItem.type == 'mileage') {
    					$scope.isMileage = true;
    					$scope.mileageNum = chargeItem.numOfCharge;
    				}
    			}
    			break;
    		}
    	}
	};
	$scope.deleteCharge = function(uid) {
		if (confirm("Are You Sure Want To Delete ?")) {
			if (uid === $scope.chargeUid) {
				delete $scope.chargeUid;
			}
	    	for (var i = chargeData.length - 1; i >= 0; i--) {
	    		if (chargeData[i].uid === uid) {
	    			chargeData.splice(i, 1);
	    		}
	    	}
	    	$scope.chargeTableParams.reload();
	    	$scope.calculateTotal();
		}
	};
	$scope.resetChargeForm = function() {
		delete $scope.chargeUid;
		delete $scope.chargeDate;
		delete $scope.chargeName;
		delete $scope.numOfCharge;
		delete $scope.amount;
		delete $scope.total;
		delete $scope.isFirstDay;
		delete $scope.isAdditionalDay;
		delete $scope.isRun;
		delete $scope.runNum;
		delete $scope.isStandBy;
		delete $scope.standByNum;
		delete $scope.isTechnician;
		delete $scope.isActivation;
		delete $scope.activationNum;
		delete $scope.isLost;
		delete $scope.isMileage;
		delete $scope.mileageNum;
	};
    
	$scope.objTableParams = $scope.getTableParam(data);
	$scope.addItem = function() {
		var updateIndex = -1;
		if ($scope.activityUid) {
			for (var i = 0; i < data.length; i++) {
	    		if (data[i].uid === $scope.activityUid) {
	    			updateIndex = i;
	    			break;
	    		}
			}
		}
		if (updateIndex != -1) {
			var activityDatum = data[updateIndex];
			activityDatum.activityDate = $scope.activityDate;
			activityDatum.status = $scope.status;
			activityDatum.from = $scope.from;
			activityDatum.to = $scope.to;
			activityDatum.desc = $scope.desc;
		} else {
	    	data.push({
	    		"uid": UUID(),
	    		"activityDate": $scope.activityDate, 
	    		"status": $scope.status, 
	    		"from": $scope.from, 
	    		"to": $scope.to, 
	    		"desc": $scope.desc
	    	});
		}
    	// sort items
    	data.sort(function(a,b) {
    		if (a.activityDate == b.activityDate && a.from && b.from) {
				var aFromToken = a.from.split(":");
				var aFromTime = parseInt(aFromToken[0]) * 60 + parseInt(aFromToken[1]);
				var bFromToken = b.from.split(":");
				var bFromTime = parseInt(bFromToken[0]) * 60 + parseInt(bFromToken[1]);
				return aFromTime - bFromTime;
			} else {
				return a.activityDate - b.activityDate;
			} 
    		} 
    	);
    	$scope.objTableParams.reload();
	};
	$scope.editItem = function(uid) {
		for (var i = 0; i < data.length; i++) {
    		if (data[i].uid === uid) {
    			delete $scope.activityDate;
    			delete $scope.status; 
    			delete $scope.from;
    			delete $scope.to;
    			delete $scope.desc;
    			$scope.activityUid = data[i].uid;
    			$scope.activityDate = data[i].activityDate;
    			$scope.status = data[i].status;
    			$scope.from = data[i].from;
    			$scope.to = data[i].to;
    			$scope.desc = data[i].desc;
    			var activityDateHandle = $('#activityDate');
    			activityDateHandle.attr('sync-lock', 'true');
    			activityDateHandle.data('datepicker').setUTCDate(new Date($scope.activityDate * 1000));
    			activityDateHandle.removeAttr('sync-lock');
    			break;
    		}
    	}
	};
	$scope.deleteItem = function(uid) {
		if (confirm("Are You Sure Want To Delete ?")) {
			if (uid === $scope.activityUid) {
				delete $scope.activityUid;
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
		delete $scope.activityUid;
		delete $scope.activityDate;
		delete $scope.status; 
		delete $scope.from;
		delete $scope.to;
		delete $scope.desc;
	};
	
	$scope.$on('newEngineerContact',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact');
    	$scope.contactList = output[0].data;
    	for (var i = 0; i < $scope.contactList.length; i++) {
    		if ($scope.contactList[i]._id == data.value.data._id) {
    			$scope.obj.wirelineEngineer = $scope.contactList[i];
    			break;
    		}
    	}
    });
	$scope.$on('newOilCompany',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company');
    	$scope.companyList = output[0].data;
    	for (var i = 0; i < $scope.companyList.length; i++) {
    		if ($scope.companyList[i]._id == data.value.data._id) {
    			$scope.jobInfo.oilCompany = $scope.companyList[i];
    			break;
    		}
    	}
    });
    $scope.$on('newServiceCompany',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company');
    	$scope.companyList = output[0].data;
    	for (var i = 0; i < $scope.companyList.length; i++) {
    		if ($scope.companyList[i]._id == data.value.data._id) {
    			$scope.jobInfo.serviceCompany = $scope.companyList[i];
    			break;
    		}
    	}
    });
    $scope.getSerial = function() {
    	var toolArr = [];
    	for (var i = 1; i <= $scope.svo.toolCount; i++) {
    		if ($scope.svo['serial' + i]) {
    			toolArr.push($scope.svo['serial' + i]);
    		}
    	}
    	return $rootScope.mergeString('/', toolArr);
    }
});

dashboardControllers.controller('JobOnSiteDailyJobEditController', function($scope, $rootScope, $controller, $routeParams, sharedService, $filter) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id
    var output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact~Company~profile~Region');
	$scope.contactList = output[0].data;
	$scope.companyList = output[1].data;
	$scope.profileList = output[2].data;
	$scope.regionList = output[3].data;
    output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.svo = output.data[0];
    
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
    // serialCount
    $scope.serialCount = $scope.svo.toolCount;
    
    output = sharedService.getDataFromServer(getJarSetsOpenHoleByJobURL + "/_id/" + $scope._id);
    $scope.approval = output.data[0];
    // set runList from preset approval
    $scope.statusList = ['Stand By', 'End Job'];
    if ($scope.approval) {
    	for (var i = 0; i < $scope.approval.itemCount; i++) {
    		if ($scope.approval['run_' + (i + 1)]) {
        		$scope.statusList.push("Run : " + $scope.approval['run_' + (i + 1)]);
        	}
    	}
    }
    $scope.obj = {};
    
    output = sharedService.getDataFromServer(getOnSiteDailyJobByJobURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    
    // get original data
    $scope.tdOri = null;
    if ($scope.svo.td != null) {
    	$scope.tdOri = $scope.svo.td;
    }
    $scope.mudWtOri = null;
    if ($scope.svo.mudWt != null) {
    	$scope.mudWtOri = $scope.svo.mudWt;
    }
    $scope.deviationOri = null;
    if ($scope.jobInfo.deviation != null) {
    	$scope.deviationOri = $scope.jobInfo.deviation;
    }
    $scope.bhpOri = null;
    if ($scope.svo.bhp != null) {
    	$scope.bhpOri = $scope.svo.bhp;
    }
    $scope.tempOri = null;
    if ($scope.jobInfo.temp != null) {
    	$scope.tempOri = $scope.jobInfo.temp;
    }
    $scope.wellNameOri = null;
    if ($scope.jobInfo.wellName != null) {
    	$scope.wellNameOri = $scope.jobInfo.wellName;
    }
	$scope.fieldOri = null;
    if ($scope.jobInfo.field != null) {
    	$scope.fieldOri = $scope.jobInfo.field;
    }
	$scope.stateOri = null;
    if ($scope.jobInfo.state != null) {
    	$scope.stateOri = $scope.jobInfo.state;
    }
	$scope.blockOri = null;
    if ($scope.jobInfo.block != null) {
    	$scope.blockOri = $scope.jobInfo.block;
    }
	$scope.ocsgOri = null;
    if ($scope.jobInfo.ocsg != null) {
    	$scope.ocsgOri = $scope.jobInfo.ocsg;
    }
	$scope.poOri = null;
    if ($scope.jobInfo.po != null) {
    	$scope.poOri = $scope.jobInfo.po;
    }
	$scope.apiOri = null;
    if ($scope.jobInfo.api != null) {
    	$scope.apiOri = $scope.jobInfo.api;
    }
	$scope.rigNameOri = null;
    if ($scope.jobInfo.rigName != null) {
    	$scope.rigNameOri = $scope.jobInfo.rigName;
    }
	$scope.leaseOri = null;
    if ($scope.jobInfo.lease != null) {
    	$scope.leaseOri = $scope.jobInfo.lease;
    }
	$scope.countryOri = null;
    if ($scope.jobInfo.country != null) {
    	$scope.countryOri = $scope.jobInfo.country;
    }
	$scope.parishOri = null;
    if ($scope.jobInfo.parish != null) {
    	$scope.parishOri = $scope.jobInfo.parish;
    }
    $scope.wirelineEngineerOri = null;
    if ($scope.jobInfo.wirelineEngineer != null) {
    	$scope.wirelineEngineerOri = $scope.jobInfo.wirelineEngineer;
    }
    $scope.serviceCompanyOri = null;
    if ($scope.jobInfo.serviceCompany != null) {
    	$scope.serviceCompanyOri = $scope.jobInfo.serviceCompany;
    }
    $scope.oilCompanyOri = null;
    if ($scope.jobInfo.oilCompany != null) {
    	$scope.oilCompanyOri = $scope.jobInfo.oilCompany;
    }
    $scope.afeOri = null;
    if ($scope.jobInfo.afe != null) {
    	$scope.afeOri = $scope.jobInfo.afe;
    }
    
    var chargeData = $scope.obj.chargeList;
    if (chargeData == null) {
    	chargeData = [];
    }
    var data = $scope.obj.itemList;
    if (data == null) {
    	data = [];
    }
    
 // calculate pricing
    output = sharedService.getDataFromServer(getPriceManagerDetailURL + "/_id/price");
    $scope.price = output.data[0];
	// calculate upcoming estimated revenue
    var job = $scope.jobInfo;
    var firstDayCharge = 0;
    var additionalCharge = 0;
    var standbyCharge = 0;
    var technicianCharge = 0;
    var activationCharge = 0;
    var mileageCharge = 0;
    var lostCharge = 0;
    var toolCharge = 0;
    var runCharge = 0;
    var impactProCharge = 0;
	if (job.environment == '0') { // Land
		if (job.isHighTemp || job.isHighPress) { // High Temp or High Press
		    firstDayCharge = 0;
		    additionalCharge = 0;
		    standbyCharge = $scope.price.hphtLandStandby;
		    technicianCharge = $scope.price.hphtLandTechnician;
		    activationCharge = $scope.price.hphtLandActivation;
		    mileageCharge = $scope.price.hphtLandMileage;
		    lostCharge = $scope.price.hphtLandLost;
		    toolCharge = $scope.price.hphtLandTool;
		    runCharge = $scope.price.hphtLandRun;
		    impactProCharge = $scope.price.hphtLandImpactPro;
		} else {
			firstDayCharge = $scope.price.landFirstDay;
		    additionalCharge = $scope.price.landAdditionalDay;
		    standbyCharge = $scope.price.landStandby;
		    technicianCharge = $scope.price.landTechnician;
		    activationCharge = $scope.price.landActivation;
		    mileageCharge = $scope.price.landMileage;
		    lostCharge = $scope.price.landLost;
		    toolCharge = 0;
		    runCharge = 0;
		    impactProCharge = $scope.price.landImpactPro;
		}
		
	} else if (job.environment == '1') { // Offshore
		if (job.isHighTemp || job.isHighPress) { // High Temp or High Press
			firstDayCharge = 0;
		    additionalCharge = 0;
		    standbyCharge = $scope.price.hphtOffshoreStandby;
		    technicianCharge = $scope.price.hphtOffshoreTechnician;
		    activationCharge = $scope.price.hphtOffshoreActivation;
		    mileageCharge = $scope.price.hphtOffshoreMileage;
		    lostCharge = $scope.price.hphtOffshoreLost;
		    toolCharge = $scope.price.hphtOffshoreTool;
		    runCharge = $scope.price.hphtOffshoreRun;
		    impactProCharge = $scope.price.hphtOffshoreImpactPro;
		} else {
			firstDayCharge = 0;
		    additionalCharge = 0;
		    standbyCharge = $scope.price.offshoreStandby;
		    technicianCharge = $scope.price.offshoreTechnician;
		    activationCharge = $scope.price.offshoreActivation;
		    mileageCharge = $scope.price.offshoreMileage;
		    lostCharge = $scope.price.offshoreLost;
		    toolCharge = 0;
		    runCharge = $scope.price.offshoreRun;
		    impactProCharge = $scope.price.offshoreImpactPro;
		}
	} else {
		firstDayCharge = 0;
	    additionalCharge = 0;
	    standbyCharge = 0;
	    technicianCharge = 0;
	    activationCharge = 0;
	    mileageCharge = 0;
	    lostCharge = 0;
	    toolCharge = 0;
	    runCharge = 0;
	    impactProCharge = 0;
	}
    // end calculate pricing
    
    $scope.save = function() {
    	// check if linked variable changed
    	var isChanged = false;
    	var message = "";
    	if ($scope.tdOri != $scope.svo.td) { isChanged = true; message += "Changed Total Well Depth will effect Service Order\n" }
    	if ($scope.mudWtOri != $scope.svo.mudWt) { isChanged = true; message += "Changed Mud Weight will effect Service Order\n" }
    	if ($scope.deviationOri != $scope.jobInfo.deviation) { isChanged = true; message += "Changed Deviation will effect Job Information\n" }
    	if ($scope.bhpOri != $scope.svo.bhp) { isChanged = true; message += "Changed Bottom Hole Pressure will effect Service Order\n" }
    	if ($scope.tempOri != $scope.jobInfo.temp) { isChanged = true; message += "Changed Temperature will effect Job Information\n" }
    	if ($scope.wellNameOri != $scope.jobInfo.wellName) { isChanged = true; message += "Changed Well Name will effect Job Information\n" }
    	if ($scope.fieldOri != $scope.jobInfo.field) { isChanged = true; message += "Changed Field will effect Job Information\n" }
    	if ($scope.stateOri != $scope.jobInfo.state) { isChanged = true; message += "Changed State will effect Job Information\n" }
    	if ($scope.blockOri != $scope.jobInfo.block) { isChanged = true; message += "Changed Block will effect Job Information\n" }
    	if ($scope.ocsgOri != $scope.jobInfo.ocsg) { isChanged = true; message += "Changed OCSG will effect Job Information\n" }
    	if ($scope.poOri != $scope.jobInfo.po) { isChanged = true; message += "Changed PO will effect Job Information\n" }
    	if ($scope.apiOri != $scope.jobInfo.api) { isChanged = true; message += "Changed API will effect Job Information\n" }
    	if ($scope.rigNameOri != $scope.jobInfo.rigName) { isChanged = true; message += "Changed Rig Name will effect Job Information\n" }
    	if ($scope.leaseOri != $scope.jobInfo.lease) { isChanged = true; message += "Changed Lease will effect Job Information\n" }
    	if ($scope.countryOri != $scope.jobInfo.country) { isChanged = true; message += "Changed Country will effect Job Information\n" }
    	if ($scope.parishOri != $scope.jobInfo.parish) { isChanged = true; message += "Changed Parish will effect Job Information\n" }
        if ($scope.wirelineEngineerOri && $scope.jobInfo.wirelineEngineer && $scope.wirelineEngineerOri._id !== $scope.jobInfo.wirelineEngineer._id) { isChanged = true; message += "Changed Engineer will effect Job Information\n" }
        if ($scope.serviceCompanyOri && $scope.jobInfo.serviceCompany && $scope.serviceCompanyOri._id !== $scope.jobInfo.serviceCompany._id) { isChanged = true; message += "Changed Wireline Company will effect Job Information\n" }
        if ($scope.oilCompanyOri && $scope.jobInfo.oilCompany && $scope.oilCompanyOri._id !== $scope.jobInfo.oilCompany._id) { isChanged = true; message += "Changed Oil Company will effect Job Information\n" }
        if ($scope.afeOri != $scope.jobInfo.afe) { isChanged = true; message += "Changed AFE will effect Job Information\n" }
    	if (isChanged) {
    		var r = confirm(message + "\nAre you sure you want to changes?\n");
	        if (r == true) {
	            // continue process
	        } else {
	        	// break process
	            return;
	        }
    	}
    	
    	$scope.obj.job = $scope._id;
    	$scope.obj.jobInfo = $scope.jobInfo;
    	$scope.obj.svo = $scope.svo;
    	var chargeFiltered = [];
    	for (var i = 0; i < chargeData.length; i++) {
    		chargeFiltered.push({
        		"uid": UUID(),
        		"chargeDate": chargeData[i].chargeDate, 
        		"chargeName": chargeData[i].chargeName, 
        		"numOfCharge": chargeData[i].numOfCharge, 
        		"amount": chargeData[i].amount, 
        		"total": chargeData[i].total,
        		"chargeList": chargeData[i].chargeList
        	});
    	}
    	$scope.obj.chargeList = chargeFiltered;
    	$scope.calculateTotal();
    	
    	var dataFiltered = [];
    	for (var i = 0; i < data.length; i++) {
    		dataFiltered.push({
        		"uid": UUID(),
        		"activityDate": data[i].activityDate, 
        		"status": data[i].status, 
        		"from": data[i].from, 
        		"to": data[i].to, 
        		"desc": data[i].desc
        	});
    	}
    	$scope.obj.itemList = dataFiltered;
	    var output = sharedService.callAjax(updateOnSiteDailyJobURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jobInfoOnSiteReport/' + $scope._id;;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
    $scope.calculateTotal = function() {
    	$scope.obj.numOfChargeFirst = $scope.obj.numOfChargeAdditional = $scope.obj.numOfChargeRun = $scope.obj.numOfChargeStandBy = $scope.obj.numOfChargeTechnician = $scope.obj.numOfChargeActivation = $scope.obj.numOfChargeLost = $scope.obj.numOfChargeMileage = 0;
    	$scope.obj.amountFirst = $scope.obj.amountAdditional = $scope.obj.amountRun = $scope.obj.amountStandBy = $scope.obj.amountTechnician = $scope.obj.amountActivation = $scope.obj.amountLost = $scope.obj.amountMileage = 0;
    	$scope.obj.totalFirst = $scope.obj.totalAdditional = $scope.obj.totalRun = $scope.obj.totalStandBy = $scope.obj.totalTechnician = $scope.obj.totalActivation = $scope.obj.totalLost = $scope.obj.totalMileage = 0;
    	$scope.obj.numOfChargeTool = $scope.serialCount;
    	$scope.obj.amountTool = toolCharge;
    	$scope.obj.totalTool = $scope.obj.numOfChargeTool * $scope.obj.amountTool;
    	for (var i = 0; i < chargeData.length; i++) {
    		var chargeList = chargeData[i].chargeList;
    		for (var j = 0; j < chargeList.length; j++) {
    			if (chargeList[j].type == "first") {
    				$scope.obj.numOfChargeFirst += (1*chargeList[j].numOfCharge);
    				$scope.obj.amountFirst = (1*chargeList[j].amount);
    				$scope.obj.totalFirst += (1*chargeList[j].total);
    			} else if (chargeList[j].type == "additional") {
    				$scope.obj.numOfChargeAdditional += (1*chargeList[j].numOfCharge);
    				$scope.obj.amountAdditional = (1*chargeList[j].amount);
    				$scope.obj.totalAdditional += (1*chargeList[j].total);
    			} else if (chargeList[j].type == "run") {
     				$scope.obj.numOfChargeRun += (1*chargeList[j].numOfCharge);
     				$scope.obj.amountRun = (1*chargeList[j].amount);
     				$scope.obj.totalRun += (1*chargeList[j].total);
     			} else if (chargeList[j].type == "standBy") {
     				$scope.obj.numOfChargeStandBy += (1*chargeList[j].numOfCharge);
     				$scope.obj.amountStandBy = (1*chargeList[j].amount);
     				$scope.obj.totalStandBy += (1*chargeList[j].total);
     			} else if (chargeList[j].type == "technician") {
     				$scope.obj.numOfChargeTechnician += (1*chargeList[j].numOfCharge);
     				$scope.obj.amountTechnician = (1*chargeList[j].amount);
     				$scope.obj.totalTechnician += (1*chargeList[j].total);
     			} else if (chargeList[j].type == "activation") {
     				$scope.obj.numOfChargeActivation += (1*chargeList[j].numOfCharge);
     				$scope.obj.amountActivation = (1*chargeList[j].amount);
     				$scope.obj.totalActivation += (1*chargeList[j].total);
     			} else if (chargeList[j].type == "lost") {
     				$scope.obj.numOfChargeLost += (1*chargeList[j].numOfCharge);
     				$scope.obj.amountLost = (1*chargeList[j].amount);
     				$scope.obj.totalLost += (1*chargeList[j].total);
     			} else if (chargeList[j].type == "mileage") {
     				$scope.obj.numOfChargeMileage += (1*chargeList[j].numOfCharge);
     				$scope.obj.amountMileage = (1*chargeList[j].amount);
     				$scope.obj.totalMileage += (1*chargeList[j].total);
     			}
    			
    		}
    	}
    }
    
    $scope.chargeTableParams = $scope.getTableParam(chargeData);
    $scope.addCharge = function() {
		var updateIndex = -1;
		if ($scope.chargeUid) {
			for (var i = 0; i < chargeData.length; i++) {
	    		if (chargeData[i].uid === $scope.chargeUid) {
	    			updateIndex = i;
	    			break;
	    		}
			}
		}
		var duplicatedIndex = -1;
		for (var loop = 0; loop < chargeData.length; loop++) {
			if (chargeData[loop]["chargeDate"] === $scope.chargeDate && loop != updateIndex) {
				duplicatedIndex = loop;
				break;
			}
		}
		
		if (duplicatedIndex != -1) {
			alert("there are already same date on the charge list");
			return;
		}
		
		var chargeList = [];
		$scope.chargeName = "";
		$scope.numOfCharge = "";
		$scope.amount = "";
		$scope.total = "";
		if ($scope.isFirstDay) {
			$scope.chargeName += "First Day Charge\n";
			$scope.numOfCharge += "1\n";
			$scope.amount += $filter("currency")(firstDayCharge) + "\n";
			$scope.total += $filter("currency")(1 * firstDayCharge) + "\n";
			chargeList.push({"type": "first", "name": "First Day Charge", "numOfCharge": 1, "amount": firstDayCharge, "total": (1 * firstDayCharge)});
		}
		if ($scope.isAdditionalDay) {
			$scope.chargeName += "Additional Day Charge\n";
			$scope.numOfCharge += "1\n";
			$scope.amount += $filter("currency")(additionalCharge) + "\n";
			$scope.total += $filter("currency")(1 * additionalCharge) + "\n";
			chargeList.push({"type": "additional", "name": "Additional Day Charge", "numOfCharge": 1, "amount": additionalCharge, "total": (1 * additionalCharge)});
		}
		if ($scope.isRun) {
			$scope.chargeName += "Run Charge\n";
			$scope.numOfCharge += $scope.runNum + "\n";
			$scope.amount += $filter("currency")(runCharge) + "\n";
			$scope.total += $filter("currency")($scope.runNum * runCharge) + "\n";
			chargeList.push({"type": "run", "name": "Run Charge", "numOfCharge": $scope.runNum, "amount": runCharge, "total": ($scope.runNum * runCharge)});
		}
		if ($scope.isStandBy) {
			$scope.chargeName += "StandBy Charge\n";
			$scope.numOfCharge += $scope.standByNum + "\n";
			$scope.amount += $filter("currency")(standbyCharge) + "\n";
			$scope.total += $filter("currency")($scope.standByNum * standbyCharge) + "\n";
			chargeList.push({"type": "standBy", "name": "StandBy Charge", "numOfCharge": $scope.standByNum, "amount": standbyCharge, "total": ($scope.standByNum * standbyCharge)});
		}
		if ($scope.isTechnician) {
			$scope.chargeName += "Technician Charge\n";
			$scope.numOfCharge += "1\n";
			$scope.amount += $filter("currency")(technicianCharge) + "\n";
			$scope.total += $filter("currency")(1 * technicianCharge) + "\n";
			chargeList.push({"type": "technician", "name": "Technician Charge", "numOfCharge": 1, "amount": technicianCharge, "total": (1 * technicianCharge)});
		}
		if ($scope.isActivation) {
			$scope.chargeName += "Activation Charge\n";
			$scope.numOfCharge += $scope.activationNum + "\n";
			$scope.amount += $filter("currency")(activationCharge) + "\n";
			$scope.total += $filter("currency")($scope.activationNum * activationCharge) + "\n";
			chargeList.push({"type": "activation", "name": "Activation Charge", "numOfCharge": $scope.activationNum, "amount": activationCharge, "total": ($scope.activationNum * activationCharge)});
		}
		if ($scope.isLost) {
			$scope.chargeName += "Lost In Hole Charge\n";
			$scope.numOfCharge += "1\n";
			$scope.amount += $filter("currency")(lostCharge) + "\n";
			$scope.total += $filter("currency")(1 * lostCharge) + "\n";
			chargeList.push({"type": "lost", "name": "Lost In Hole Charge", "numOfCharge": 1, "amount": lostCharge, "total": (1 * lostCharge)});
		}
		if ($scope.isMileage) {
			$scope.chargeName += "Mileage Charge\n";
			$scope.numOfCharge += $scope.mileageNum + "\n";
			$scope.amount += $filter("currency")(mileageCharge) + "\n";
			$scope.total += $filter("currency")($scope.mileageNum * mileageCharge) + "\n";
			chargeList.push({"type": "mileage", "name": "Mileage Charge", "numOfCharge": $scope.mileageNum, "amount": mileageCharge, "total": ($scope.mileageNum * mileageCharge)});
		}
		if (updateIndex != -1) {
			var chargeDatum = chargeData[updateIndex];
			chargeDatum.chargeDate = $scope.chargeDate;
			chargeDatum.chargeName = $scope.chargeName;
			chargeDatum.numOfCharge = $scope.numOfCharge;
			chargeDatum.amount = $scope.amount;
			chargeDatum.total = $scope.total;
			chargeDatum.chargeList = chargeList;
		} else {
			chargeData.push({
	    		"uid": UUID(),
	    		"chargeDate": $scope.chargeDate,
	    		"chargeName": $scope.chargeName,
	    		"numOfCharge": $scope.numOfCharge,
	    		"amount": $scope.amount,
	    		"total": $scope.total,
	    		"chargeList": chargeList
	    	});
		}
		chargeData.sort(function(a,b) { return a.chargeDate - b.chargeDate } );
    	$scope.chargeTableParams.reload();
    	$scope.calculateTotal();
    	//delete $scope.chargeUid;
	};
	$scope.editCharge = function(uid) {
		for (var i = 0; i < chargeData.length; i++) {
    		if (chargeData[i].uid === uid) {
    			delete $scope.chargeDate;
    			delete $scope.chargeName;
    			delete $scope.numOfCharge;
    			delete $scope.amount;
    			delete $scope.total;
    			delete $scope.isFirstDay;
    			delete $scope.isAdditionalDay;
    			delete $scope.isRun;
    			delete $scope.runNum;
    			delete $scope.isStandBy;
    			delete $scope.standByNum;
    			delete $scope.isTechnician;
    			delete $scope.isActivation;
    			delete $scope.activationNum;
    			delete $scope.isLost;
    			delete $scope.isMileage;
    			delete $scope.mileageNum;
    			$scope.chargeUid = chargeData[i].uid;
    			$scope.chargeDate = chargeData[i].chargeDate;
    			var chargeDateHandle = $('#chargeDate');
    			chargeDateHandle.attr('sync-lock', 'true');
    			chargeDateHandle.data('datepicker').setUTCDate(new Date($scope.chargeDate * 1000));
    			chargeDateHandle.removeAttr('sync-lock');
    			var chargeList = chargeData[i].chargeList;
    			for (var loop = 0; loop < chargeList.length; loop++) {
    				var chargeItem = chargeList[loop];
    				if (chargeItem.type == 'first') {
    					$scope.isFirstDay = true;
    				} else if (chargeItem.type == 'additional') {
    					$scope.isAdditionalDay = true;
    				} else if (chargeItem.type == 'run') {
    					$scope.isRun = true;
    					$scope.runNum = chargeItem.numOfCharge;
    				} else if (chargeItem.type == 'standBy') {
    					$scope.isStandBy = true;
    					$scope.standByNum = chargeItem.numOfCharge;
    				} else if (chargeItem.type == 'technician') {
    					$scope.isTechnician = true;
    				} else if (chargeItem.type == 'activation') {
    					$scope.isActivation = true;
    					$scope.activationNum = chargeItem.numOfCharge;
    				} else if (chargeItem.type == 'lost') {
    					$scope.isLost = true;
    				} else if (chargeItem.type == 'mileage') {
    					$scope.isMileage = true;
    					$scope.mileageNum = chargeItem.numOfCharge;
    				}
    			}
    			break;
    		}
    	}
	};
	$scope.deleteCharge = function(uid) {
		if (confirm("Are You Sure Want To Delete ?")) {
			if (uid === $scope.chargeUid) {
				delete $scope.chargeUid;
			}
	    	for (var i = chargeData.length - 1; i >= 0; i--) {
	    		if (chargeData[i].uid === uid) {
	    			chargeData.splice(i, 1);
	    		}
	    	}
	    	$scope.chargeTableParams.reload();
	    	$scope.calculateTotal();
		}
	};
	$scope.resetChargeForm = function() {
		delete $scope.chargeUid;
		delete $scope.chargeDate;
		delete $scope.chargeName;
		delete $scope.numOfCharge;
		delete $scope.amount;
		delete $scope.total;
		delete $scope.isFirstDay;
		delete $scope.isAdditionalDay;
		delete $scope.isRun;
		delete $scope.runNum;
		delete $scope.isStandBy;
		delete $scope.standByNum;
		delete $scope.isTechnician;
		delete $scope.isActivation;
		delete $scope.activationNum;
		delete $scope.isLost;
		delete $scope.isMileage;
		delete $scope.mileageNum;
	};
    
	$scope.objTableParams = $scope.getTableParam(data);
	$scope.addItem = function() {
		var updateIndex = -1;
		if ($scope.activityUid) {
			for (var i = 0; i < data.length; i++) {
	    		if (data[i].uid === $scope.activityUid) {
	    			updateIndex = i;
	    			break;
	    		}
			}
		}
		if (updateIndex != -1) {
			var activityDatum = data[updateIndex];
			activityDatum.activityDate = $scope.activityDate;
			activityDatum.status = $scope.status;
			activityDatum.from = $scope.from;
			activityDatum.to = $scope.to;
			activityDatum.desc = $scope.desc;
		} else {
	    	data.push({
	    		"uid": UUID(),
	    		"activityDate": $scope.activityDate, 
	    		"status": $scope.status, 
	    		"from": $scope.from, 
	    		"to": $scope.to, 
	    		"desc": $scope.desc
	    	});
		}
    	// sort items
    	data.sort(function(a,b) {
    		if (a.activityDate == b.activityDate && a.from && b.from) {
				var aFromToken = a.from.split(":");
				var aFromTime = parseInt(aFromToken[0]) * 60 + parseInt(aFromToken[1]);
				var bFromToken = b.from.split(":");
				var bFromTime = parseInt(bFromToken[0]) * 60 + parseInt(bFromToken[1]);
				return aFromTime - bFromTime;
			} else {
				return a.activityDate - b.activityDate;
			} 
    		} 
    	);
    	$scope.objTableParams.reload();
	};
	$scope.editItem = function(uid) {
		for (var i = 0; i < data.length; i++) {
    		if (data[i].uid === uid) {
    			delete $scope.activityDate;
    			delete $scope.status; 
    			delete $scope.from;
    			delete $scope.to;
    			delete $scope.desc;
    			$scope.activityUid = data[i].uid;
    			$scope.activityDate = data[i].activityDate;
    			$scope.status = data[i].status;
    			$scope.from = data[i].from;
    			$scope.to = data[i].to;
    			$scope.desc = data[i].desc;
    			var activityDateHandle = $('#activityDate');
    			activityDateHandle.attr('sync-lock', 'true');
    			activityDateHandle.data('datepicker').setUTCDate(new Date($scope.activityDate * 1000));
    			activityDateHandle.removeAttr('sync-lock');
    			break;
    		}
    	}
	};
	$scope.deleteItem = function(uid) {
		if (confirm("Are You Sure Want To Delete ?")) {
			if (uid === $scope.activityUid) {
				delete $scope.activityUid;
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
		delete $scope.activityUid;
		delete $scope.activityDate;
		delete $scope.status; 
		delete $scope.from;
		delete $scope.to;
		delete $scope.desc;
	};
	
	$scope.$on('newEngineerContact',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact');
    	$scope.contactList = output[0].data;
    	for (var i = 0; i < $scope.contactList.length; i++) {
    		if ($scope.contactList[i]._id == data.value.data._id) {
    			$scope.obj.wirelineEngineer = $scope.contactList[i];
    			break;
    		}
    	}
    });
	$scope.$on('newOilCompany',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company');
    	$scope.companyList = output[0].data;
    	for (var i = 0; i < $scope.companyList.length; i++) {
    		if ($scope.companyList[i]._id == data.value.data._id) {
    			$scope.jobInfo.oilCompany = $scope.companyList[i];
    			break;
    		}
    	}
    });
    $scope.$on('newServiceCompany',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company');
    	$scope.companyList = output[0].data;
    	for (var i = 0; i < $scope.companyList.length; i++) {
    		if ($scope.companyList[i]._id == data.value.data._id) {
    			$scope.jobInfo.serviceCompany = $scope.companyList[i];
    			break;
    		}
    	}
    });
    $scope.getSerial = function() {
    	var toolArr = [];
    	for (var i = 1; i <= $scope.svo.toolCount; i++) {
    		if ($scope.svo['serial' + i]) {
    			toolArr.push($scope.svo['serial' + i]);
    		}
    	}
    	return $rootScope.mergeString('/', toolArr);
    }
});

dashboardControllers.controller('JobOnSiteDailyJobDetailController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    var output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.svo = output.data[0];
    $scope.obj = {};
    
    output = sharedService.getDataFromServer(getOnSiteDailyJobByJobURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    var chargeData = $scope.obj.chargeList;
    if (chargeData == null) {
    	chargeData = [];
    }
    var data = $scope.obj.itemList;
    if (data == null) {
    	data = [];
    }
    $scope.chargeTableParams = $scope.getTableParam(chargeData);
	$scope.objTableParams = $scope.getTableParam(data);
	$scope.detailPdf = function() {
		window.open(getDailyJobDetailPdfURL + "/_id/" + $scope._id, "_self");
	}
	$scope.getSerial = function() {
    	var toolArr = [];
    	for (var i = 1; i <= $scope.svo.toolCount; i++) {
    		if ($scope.svo['serial' + i]) {
    			toolArr.push($scope.svo['serial' + i]);
    		}
    	}
    	return $rootScope.mergeString('/', toolArr);
    }
});

// ISI TECH DATA SHEET

dashboardControllers.controller('JobOnSiteTechDataNewController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    var output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company~Contact');
	$scope.companyList = output[0].data;
	$scope.contactList = output[1].data;
	output = sharedService.getDataFromServer(getOnSiteDailyJobByJobURL + "/_id/" + $scope._id);
    $scope.dailyJob = output.data[0];
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
    for (var i = 1; i <= 10; i++) {
    	$scope.obj['point' + i] = "10";
    }
    $scope.save = function() {
    	$scope.obj.job = $scope._id;
	    var output = sharedService.callAjax(saveOnSiteTechDataURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jobInfoOnSiteReport/' + $scope._id;;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
    $scope.selectCompanyName = function(item, model) {
    	$scope.obj.companyEmail = null;
    	$scope.obj.companyPhone = null;
    	if (item && item.email) { $scope.obj.companyEmail = item.email; }
    	if (item && item.phone) { $scope.obj.companyPhone = item.phone; }
    }
    $scope.selectComan1 = function(item, model) {
    	$scope.obj.coman1Email = null;
    	$scope.obj.coman1Phone = null;
    	if (item && item.email) { $scope.obj.coman1Email = item.email; }
    	if (item && item.phone) { $scope.obj.coman1Phone = item.phone; }
    }
    $scope.selectComan2 = function(item, model) {
    	$scope.obj.coman2Email = null;
    	$scope.obj.coman2Phone = null;
    	if (item && item.email) { $scope.obj.coman2Email = item.email; }
    	if (item && item.phone) { $scope.obj.coman2Phone = item.phone; }
    }
    $scope.selectComan3 = function(item, model) {
    	$scope.obj.coman3Email = null;
    	$scope.obj.coman3Phone = null;
    	if (item && item.email) { $scope.obj.coman3Email = item.email; }
    	if (item && item.phone) { $scope.obj.coman3Phone = item.phone; }
    }
    $scope.selectManager = function(item, model) {
    	$scope.obj.managerEmail = null;
    	$scope.obj.managerPhone = null;
    	if (item && item.email) { $scope.obj.managerEmail = item.email; }
    	if (item && item.phone) { $scope.obj.managerPhone = item.phone; }
    }
    $scope.selectEngineer = function(item, model) {
    	$scope.obj.engineerEmail = null;
    	$scope.obj.engineerPhone = null;
    	if (item && item.email) { $scope.obj.engineerEmail = item.email; }
    	if (item && item.phone) { $scope.obj.engineerPhone = item.phone; }
    }
    $scope.selectGeologist = function(item, model) {
    	$scope.obj.additionalEmail = null;
    	$scope.obj.additionalPhone = null;
    	if (item && item.email) { $scope.obj.additionalEmail = item.email; }
    	if (item && item.phone) { $scope.obj.additionalPhone = item.phone; }
    }
    $scope.$on('newCompanyMan1',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact');
    	$scope.contactList = output[0].data;
    	for (var i = 0; i < $scope.contactList.length; i++) {
    		if ($scope.contactList[i]._id == data.value.data._id) {
    			$scope.obj.coman1 = $scope.contactList[i];
    			$scope.selectComan1($scope.obj.coman1, null);
    			break;
    		}
    	}
    });
    $scope.$on('newCompanyMan2',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact');
    	$scope.contactList = output[0].data;
    	for (var i = 0; i < $scope.contactList.length; i++) {
    		if ($scope.contactList[i]._id == data.value.data._id) {
    			$scope.obj.coman2 = $scope.contactList[i];
    			$scope.selectComan2($scope.obj.coman2, null);
    			break;
    		}
    	}
    });
    $scope.$on('newCompanyMan3',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact');
    	$scope.contactList = output[0].data;
    	for (var i = 0; i < $scope.contactList.length; i++) {
    		if ($scope.contactList[i]._id == data.value.data._id) {
    			$scope.obj.coman3 = $scope.contactList[i];
    			$scope.selectComan3($scope.obj.coman3, null);
    			break;
    		}
    	}
    });
    $scope.$on('newManager',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact');
    	$scope.contactList = output[0].data;
    	for (var i = 0; i < $scope.contactList.length; i++) {
    		if ($scope.contactList[i]._id == data.value.data._id) {
    			$scope.obj.manager = $scope.contactList[i];
    			$scope.selectManager($scope.obj.manager, null);
    			break;
    		}
    	}
    });
    $scope.$on('newEngineer',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact');
    	$scope.contactList = output[0].data;
    	for (var i = 0; i < $scope.contactList.length; i++) {
    		if ($scope.contactList[i]._id == data.value.data._id) {
    			$scope.obj.engineer = $scope.contactList[i];
    			$scope.selectEngineer($scope.obj.engineer, null);
    			break;
    		}
    	}
    });
    $scope.$on('newGeologist',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact');
    	$scope.contactList = output[0].data;
    	for (var i = 0; i < $scope.contactList.length; i++) {
    		if ($scope.contactList[i]._id == data.value.data._id) {
    			$scope.obj.geologist = $scope.contactList[i];
    			$scope.selectGeologist($scope.obj.geologist, null);
    			break;
    		}
    	}
    });
    $scope.$on('newCompany',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company');
    	$scope.companyList = output[0].data;
    	for (var i = 0; i < $scope.companyList.length; i++) {
    		if ($scope.companyList[i]._id == data.value.data._id) {
    			$scope.obj.additionalCompany = $scope.companyList[i];
    			break;
    		}
    	}
    });
});

dashboardControllers.controller('JobOnSiteTechDataEditController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    var output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company~Contact');
	$scope.companyList = output[0].data;
	$scope.contactList = output[1].data;
	output = sharedService.getDataFromServer(getOnSiteDailyJobByJobURL + "/_id/" + $scope._id);
    $scope.dailyJob = output.data[0];
    $scope.obj = {};
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
    output = sharedService.getDataFromServer(getOnSiteTechDataByJobURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    $scope.save = function() {
    	$scope.obj.job = $scope._id;
	    var output = sharedService.callAjax(updateOnSiteTechDataURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jobInfoOnSiteReport/' + $scope._id;;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
    $scope.selectCompanyName = function(item, model) {
    	$scope.obj.companyEmail = null;
    	$scope.obj.companyPhone = null;
    	if (item && item.email) { $scope.obj.companyEmail = item.email; }
    	if (item && item.phone) { $scope.obj.companyPhone = item.phone; }
    }
    $scope.selectComan1 = function(item, model) {
    	$scope.obj.coman1Email = null;
    	$scope.obj.coman1Phone = null;
    	if (item && item.email) { $scope.obj.coman1Email = item.email; }
    	if (item && item.phone) { $scope.obj.coman1Phone = item.phone; }
    }
    $scope.selectComan2 = function(item, model) {
    	$scope.obj.coman2Email = null;
    	$scope.obj.coman2Phone = null;
    	if (item && item.email) { $scope.obj.coman2Email = item.email; }
    	if (item && item.phone) { $scope.obj.coman2Phone = item.phone; }
    }
    $scope.selectComan3 = function(item, model) {
    	$scope.obj.coman3Email = null;
    	$scope.obj.coman3Phone = null;
    	if (item && item.email) { $scope.obj.coman3Email = item.email; }
    	if (item && item.phone) { $scope.obj.coman3Phone = item.phone; }
    }
    $scope.selectManager = function(item, model) {
    	$scope.obj.managerEmail = null;
    	$scope.obj.managerPhone = null;
    	if (item && item.email) { $scope.obj.managerEmail = item.email; }
    	if (item && item.phone) { $scope.obj.managerPhone = item.phone; }
    }
    $scope.selectEngineer = function(item, model) {
    	$scope.obj.engineerEmail = null;
    	$scope.obj.engineerPhone = null;
    	if (item && item.email) { $scope.obj.engineerEmail = item.email; }
    	if (item && item.phone) { $scope.obj.engineerPhone = item.phone; }
    }
    $scope.selectGeologist = function(item, model) {
    	$scope.obj.additionalEmail = null;
    	$scope.obj.additionalPhone = null;
    	if (item && item.email) { $scope.obj.additionalEmail = item.email; }
    	if (item && item.phone) { $scope.obj.additionalPhone = item.phone; }
    }
    $scope.$on('newCompanyMan1',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact');
    	$scope.contactList = output[0].data;
    	for (var i = 0; i < $scope.contactList.length; i++) {
    		if ($scope.contactList[i]._id == data.value.data._id) {
    			$scope.obj.coman1 = $scope.contactList[i];
    			$scope.selectComan1($scope.obj.coman1, null);
    			break;
    		}
    	}
    });
    $scope.$on('newCompanyMan2',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact');
    	$scope.contactList = output[0].data;
    	for (var i = 0; i < $scope.contactList.length; i++) {
    		if ($scope.contactList[i]._id == data.value.data._id) {
    			$scope.obj.coman2 = $scope.contactList[i];
    			$scope.selectComan2($scope.obj.coman2, null);
    			break;
    		}
    	}
    });
    $scope.$on('newCompanyMan3',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact');
    	$scope.contactList = output[0].data;
    	for (var i = 0; i < $scope.contactList.length; i++) {
    		if ($scope.contactList[i]._id == data.value.data._id) {
    			$scope.obj.coman3 = $scope.contactList[i];
    			$scope.selectComan3($scope.obj.coman3, null);
    			break;
    		}
    	}
    });
    $scope.$on('newManager',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact');
    	$scope.contactList = output[0].data;
    	for (var i = 0; i < $scope.contactList.length; i++) {
    		if ($scope.contactList[i]._id == data.value.data._id) {
    			$scope.obj.manager = $scope.contactList[i];
    			$scope.selectManager($scope.obj.manager, null);
    			break;
    		}
    	}
    });
    $scope.$on('newEngineer',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact');
    	$scope.contactList = output[0].data;
    	for (var i = 0; i < $scope.contactList.length; i++) {
    		if ($scope.contactList[i]._id == data.value.data._id) {
    			$scope.obj.engineer = $scope.contactList[i];
    			$scope.selectEngineer($scope.obj.engineer, null);
    			break;
    		}
    	}
    });
    $scope.$on('newGeologist',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact');
    	$scope.contactList = output[0].data;
    	for (var i = 0; i < $scope.contactList.length; i++) {
    		if ($scope.contactList[i]._id == data.value.data._id) {
    			$scope.obj.geologist = $scope.contactList[i];
    			$scope.selectGeologist($scope.obj.geologist, null);
    			break;
    		}
    	}
    });
    $scope.$on('newCompany',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company');
    	$scope.companyList = output[0].data;
    	for (var i = 0; i < $scope.companyList.length; i++) {
    		if ($scope.companyList[i]._id == data.value.data._id) {
    			$scope.obj.additionalCompany = $scope.companyList[i];
    			break;
    		}
    	}
    });
});

dashboardControllers.controller('JobOnSiteTechDataDetailController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    var output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    output = sharedService.getDataFromServer(getOnSiteDailyJobByJobURL + "/_id/" + $scope._id);
    $scope.dailyJob = output.data[0];
    $scope.obj = {};
    
    output = sharedService.getDataFromServer(getOnSiteTechDataByJobURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    var data = $scope.obj.itemList;
    if (data == null) {
    	data = [];
    }
	$scope.detailPdf = function() {
		window.open(getTechDataDetailPdfURL + "/_id/" + $scope._id, "_self");
	}
});

// JSEA

dashboardControllers.controller('JobOnSiteJSEAController', function($scope, $rootScope, $controller, $routeParams, sharedService, ngTableParams, $filter) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    $scope.obj = {};
    output = sharedService.getDataFromServer(getOnSiteJSEAByJobURL + "/_id/" + $scope._id);
    $scope.obj = output.data;
    var data = $scope.obj;
    if (data == null) {
    	data = [];
    }
    
	$scope.objTableParams = $scope.getTableParam(data);
	
	$scope.deleteObj = function(idToDel) {
		if (confirm("Are You Sure Want To Delete ?")) {
			var dataToSend = {"_id": idToDel};
	        var output = sharedService.callAjax(deleteOnSiteJSEAURL, "post", dataToSend);
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

dashboardControllers.controller('JobOnSiteJSEANewController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    var output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company');
	$scope.companyList = output[0].data;
	output = sharedService.getDataFromServer(getOnSiteDailyJobByJobURL + "/_id/" + $scope._id);
    $scope.dailyJob = output.data[0];
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
    $scope.save = function() {
    	$scope.obj.job = $scope._id;
	    var output = sharedService.callAjax(saveOnSiteJSEAURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jobInfoOnSiteReport/' + $scope._id;;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('JobOnSiteJSEAEditController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
    var jobAndObj = $routeParams._id.split('|');
	$scope._id = jobAndObj[0];
	$scope.obj_id = jobAndObj[1];
    var output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    output = sharedService.getDataFromServer(getOnSiteDailyJobByJobURL + "/_id/" + $scope._id);
    $scope.dailyJob = output.data[0];
    output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company');
	$scope.companyList = output[0].data;
    $scope.obj = {};
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
    output = sharedService.getDataFromServer(getOnSiteJSEAURL + "/_id/" + $scope.obj_id);
    $scope.obj = output.data[0];
    $scope.save = function() {
    	$scope.obj.job = $scope._id;
	    var output = sharedService.callAjax(updateOnSiteJSEAURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jobInfoOnSiteReport/' + $scope._id;;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('JobOnSiteJSEADetailController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
    var jobAndObj = $routeParams._id.split('|');
	$scope._id = jobAndObj[0];
	$scope.obj_id = jobAndObj[1];
    var output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    output = sharedService.getDataFromServer(getOnSiteDailyJobByJobURL + "/_id/" + $scope._id);
    $scope.dailyJob = output.data[0];
    $scope.obj = {};
    
    output = sharedService.getDataFromServer(getOnSiteJSEAURL + "/_id/" + $scope.obj_id);
    $scope.obj = output.data[0];
    var data = $scope.obj.itemList;
    if (data == null) {
    	data = [];
    }
	$scope.detailPdf = function() {
		window.open(getJSEADetailPdfURL + "/_id/" + $scope.obj_id, "_self");
	}
	$scope.upload = function() {
		var file = $('#upload')[0].files[0];
	    var type = "none";
	    if (file && file.type === 'application/pdf') {
	    	type = "pdf";
	    }
	    if (type === "none") {
	      alert("Only PDF files that can be uploaded");
	      return;
	    }
	    
	    var fd = new FormData(); 
	    fd.append("file", file);
	    fd.append("id", $scope.obj_id);
	    var xhr = new XMLHttpRequest();
	    xhr.open("POST", uploadJSEAURL);

	    xhr.onload = function() {
	      try {
	        var res = JSON.parse(xhr.responseText);
	      } catch(e) {
	        alert('failed when trying to upload');
	      }
	      alert('Succesfully uploaded');
	      location.reload();
	    };
	    xhr.onerror = function() {
	    	alert("on error handler")
	    };
	    xhr.upload.onprogress = function(e) {
	      //this.setProgress(e.loaded / e.total);
	    	$scope.uploadProgress = (e.loaded / e.total) * 100;
	    	$scope.$apply();
	    }.closure(this);
	    xhr.send(fd);
    }
    $scope.download = function(url) {
		window.open(serverURL +  url, "_blank");
	}
});

// CUSTOMER SATISFACTION

dashboardControllers.controller('JobOnSiteCustomerNewController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    var output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company');
	$scope.companyList = output[0].data;
    $scope.obj = {};
    for (var i = 1; i <= 10; i++) {
    	$scope.obj['point' + i] = "10";
    }
    $scope.save = function() {
    	$scope.obj.job = $scope._id;
	    var output = sharedService.callAjax(saveOnSiteCustomerURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jobInfoOnSiteReport/' + $scope._id;;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('JobOnSiteCustomerEditController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    var output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company');
	$scope.companyList = output[0].data;
    $scope.obj = {};
    
    output = sharedService.getDataFromServer(getOnSiteCustomerByJobURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    $scope.save = function() {
    	$scope.obj.job = $scope._id;
	    var output = sharedService.callAjax(updateOnSiteCustomerURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jobInfoOnSiteReport/' + $scope._id;;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('JobOnSiteCustomerDetailController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    var output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    $scope.obj = {};
    
    output = sharedService.getDataFromServer(getOnSiteCustomerByJobURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    var data = $scope.obj.itemList;
    if (data == null) {
    	data = [];
    }
	$scope.detailPdf = function() {
		window.open(getCustomerDetailPdfURL + "/_id/" + $scope._id, "_self");
	}
});

// FIRST ALERT

dashboardControllers.controller('JobOnSiteAlertController', function($scope, $rootScope, $controller, $routeParams, sharedService, ngTableParams, $filter) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    $scope.obj = {};
    output = sharedService.getDataFromServer(getOnSiteAlertByJobURL + "/_id/" + $scope._id);
    $scope.obj = output.data;
    var data = $scope.obj;
    if (data == null) {
    	data = [];
    }
    
	$scope.objTableParams = $scope.getTableParam(data);
	
	$scope.deleteObj = function(idToDel) {
		if (confirm("Are You Sure Want To Delete ?")) {
			var dataToSend = {"_id": idToDel};
	        var output = sharedService.callAjax(deleteOnSiteAlertURL, "post", dataToSend);
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

dashboardControllers.controller('JobOnSiteAlertNewController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/NatureAlert');
	$scope.natureAlertList = output[0].data;
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    output = sharedService.getDataFromServer(getJarSetsOpenHoleByJobURL + "/_id/" + $scope._id);
    $scope.approval = output.data[0];
    // set runList from preset approval
    $scope.runList = [];
    if ($scope.approval) {
    	for (var i = 0; i < $scope.approval.itemCount; i++) {
    		if ($scope.approval['run_' + (i + 1)]) {
        		$scope.runList.push({id: i+1, name: $scope.approval['run_' + (i + 1)]});
        	}
    	}
    }
    output = sharedService.getDataFromServer(getOnSiteDailyJobByJobURL + "/_id/" + $scope._id);
    $scope.dailyJob = output.data[0];
    output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.svo = output.data[0];
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
    $scope.serialList = [];
    if ($scope.svo) {
    	if ($scope.svo.serial1) {
    		$scope.serialList.push($scope.svo.serial1);
    	}
    	if ($scope.svo.serial2) {
    		$scope.serialList.push($scope.svo.serial2);
    	}
    	if ($scope.svo.serial3) {
    		$scope.serialList.push($scope.svo.serial3);
    	}
    	if ($scope.svo.serial4) {
    		$scope.serialList.push($scope.svo.serial4);
    	}
    }
	
    $scope.save = function() {
    	$scope.obj.job = $scope._id;
	    var output = sharedService.callAjax(saveOnSiteAlertURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jobInfoOnSiteReport/' + $scope._id;;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('JobOnSiteAlertEditController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
    var output = sharedService.getDataFromServer(getPluralListURL + '/collections/NatureAlert');
	$scope.natureAlertList = output[0].data;
    var jobAndObj = $routeParams._id.split('|');
	$scope._id = jobAndObj[0];
	$scope.obj_id = jobAndObj[1];
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    output = sharedService.getDataFromServer(getJarSetsOpenHoleByJobURL + "/_id/" + $scope._id);
    $scope.approval = output.data[0];
    // set runList from preset approval
    $scope.runList = [];
    if ($scope.approval) {
    	for (var i = 0; i < $scope.approval.itemCount; i++) {
    		if ($scope.approval['run_' + (i + 1)]) {
        		$scope.runList.push({id: i+1, name: $scope.approval['run_' + (i + 1)]});
        	}
    	}
    }
    output = sharedService.getDataFromServer(getOnSiteDailyJobByJobURL + "/_id/" + $scope._id);
    $scope.dailyJob = output.data[0];
    output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.svo = output.data[0];
    $scope.serialList = [];
    if ($scope.svo) {
    	if ($scope.svo.serial1) {
    		$scope.serialList.push($scope.svo.serial1);
    	}
    	if ($scope.svo.serial2) {
    		$scope.serialList.push($scope.svo.serial2);
    	}
    	if ($scope.svo.serial3) {
    		$scope.serialList.push($scope.svo.serial3);
    	}
    	if ($scope.svo.serial4) {
    		$scope.serialList.push($scope.svo.serial4);
    	}
    }
    $scope.obj = {};
    output = sharedService.getDataFromServer(getOnSiteAlertURL + "/_id/" + $scope.obj_id);
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
    $scope.save = function() {
    	$scope.obj.job = $scope._id;
	    var output = sharedService.callAjax(updateOnSiteAlertURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jobInfoOnSiteReport/' + $scope._id;;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('JobOnSiteAlertDetailController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
    var jobAndObj = $routeParams._id.split('|');
	$scope._id = jobAndObj[0];
	$scope.obj_id = jobAndObj[1];
    var output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    output = sharedService.getDataFromServer(getJarSetsOpenHoleByJobURL + "/_id/" + $scope._id);
    $scope.approval = output.data[0];
    // set runList from preset approval
    $scope.runList = [];
    if ($scope.approval) {
    	for (var i = 0; i < $scope.approval.itemCount; i++) {
    		if ($scope.approval['run_' + (i + 1)]) {
        		$scope.runList.push({id: i+1, name: $scope.approval['run_' + (i + 1)]});
        	}
    	}
    }
    output = sharedService.getDataFromServer(getOnSiteDailyJobByJobURL + "/_id/" + $scope._id);
    $scope.dailyJob = output.data[0];
    output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.svo = output.data[0];
    $scope.serialList = [];
    if ($scope.svo) {
    	if ($scope.svo.serial1) {
    		$scope.serialList.push($scope.svo.serial1);
    	}
    	if ($scope.svo.serial2) {
    		$scope.serialList.push($scope.svo.serial2);
    	}
    	if ($scope.svo.serial3) {
    		$scope.serialList.push($scope.svo.serial3);
    	}
    	if ($scope.svo.serial4) {
    		$scope.serialList.push($scope.svo.serial4);
    	}
    }
    $scope.obj = {};
    
    output = sharedService.getDataFromServer(getOnSiteAlertURL + "/_id/" + $scope.obj_id);
    $scope.obj = output.data[0];
    var data = $scope.obj.itemList;
    if (data == null) {
    	data = [];
    }
	$scope.detailPdf = function() {
		window.open(getAlertDetailPdfURL + "/_id/" + $scope.obj_id, "_self");
	}
});

// Calibration

dashboardControllers.controller('JobOnSiteCalibrationController', function($scope, $rootScope, $controller, $routeParams, sharedService, ngTableParams, $filter) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    $scope.obj = {};
    output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    var data = [];
    for (var i = 1; i <= $scope.obj.toolCount; i++) {
	    if ($scope.obj['serial' + i] && $scope.obj['serial' + i + 'File']) {
	    	data.push({"serial": $scope.obj['serial' + i], "url": $scope.obj['serial' + i + 'File'], "size": $scope.obj['serial' + i + 'Size'], "uploadDate": $scope.obj['serial' + i + 'Date']});
	    }
    }
    
	$scope.objTableParams = $scope.getTableParam(data);
	
	$scope.deleteObj = function(idToDel) {
		if (confirm("Are You Sure Want To Delete ?")) {
			var dataToSend = {"_id": idToDel};
	        var output = sharedService.callAjax(deleteOnSiteAlertURL, "post", dataToSend);
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
	
	$scope.download = function(url) {
		window.open(serverURL +  url, "_blank");
	}
});