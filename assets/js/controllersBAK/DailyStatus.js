dashboardControllers.controller('DailyStatusController', function($rootScope, $location, $scope, $routeParams, ngTableParams, $filter, sharedService) {
	$rootScope.selectedMenu = "dailyStatus";
	//$rootScope.breadcrumbs = sharedService.newBreadcrumb('Company Listing', $location.path());
	$rootScope.menuTitle = "Daily Status Report";
	var output;
	output = sharedService.getDataFromServer(getPriceManagerDetailURL + "/_id/price");
    $scope.price = output.data[0];
	output = sharedService.getDataFromServer(getJobSvoDjrURL);
	var data = output.data;
	$scope.upcomingJob = [];
	$scope.activeJob = [];
	$scope.$on('upcomingRepeatDone', function(scope, element, attrs){
		// equaling all upcoming panel element
		var h = 0;
	    $('.upcoming-panel').each(function(){
	        $(this).css({'height':'auto'});
	        if($(this).outerHeight() > h)
	        {
	            h = $(this).outerHeight();
	        }
	    });
	    $('.upcoming-panel').each(function(){
	    	$(this).css({'height':h});
	    });
    });
	
	$scope.$on('activeRepeatDone', function(scope, element, attrs){
		// equaling all upcoming panel element
		
		var h = 0;
	    $('.active-panel').each(function(){
	        $(this).css({'height':'auto'});
	        var dim = getHiddenDimensions($(this), false);
	        if(dim.outerHeight > h)
	        {
	            h = dim.outerHeight;
	        }
	    });
	    
	    $('.active-panel').each(function(){
	    	$(this).css({'height':h});
	    });
	    
    });
	
	
	// calculate all estimated revenue
	for (var i = 0; i < data.length; i++) {
		var serialCount = 0;
		var job = data[i];
		if (job.serviceOrder) {
			if (job.serviceOrder.serial1) { serialCount++}
			if (job.serviceOrder.serial2) { serialCount++}
			if (job.serviceOrder.serial3) { serialCount++}
			if (job.serviceOrder.serial4) { serialCount++}
		}
		// fill impact pro pricing and remain run pricing
		if (job.environment == '0') { // Land
			if (job.isHighTemp || job.isHighPress) { // High Temp or High Press
				job.impactProCharge = $scope.price.hphtLandImpactPro;
				job.remainCharge = $scope.price.hphtLandRun;
			} else {
				job.impactProCharge = $scope.price.landImpactPro;
				job.remainCharge = $scope.price.landAdditionalDay;
			}
		} else if (job.environment == '1') { // Offshore
			if (job.isHighTemp || job.isHighPress) { // High Temp or High Press
				job.impactProCharge = $scope.price.hphtOffshoreImpactPro;
				job.remainCharge = $scope.price.hphtOffshoreRun;
			} else {
				job.impactProCharge = $scope.price.offshoreImpactPro;
				job.remainCharge = $scope.price.offshoreRun;
			}
		} else {
			job.impactProCharge = 0;
		}
		if (job.status._id == '0') { // upcoming
			$scope.upcomingJob.push(job);
			job.tool = serialCount;
			job.run = job.runs;
			// count for upcoming and tool prep charge and total
			if (job.environment == '0') { // Land
				if (job.isHighTemp || job.isHighPress) { // High Temp or High Press
					job.toolCharge = $scope.price.hphtLandTool;
					job.toolTotal = job.tool * job.toolCharge;
					job.runCharge = $scope.price.hphtLandRun;
					job.runTotal = job.run * job.runCharge;
				} else {
					job.toolCharge = 0;
					job.toolTotal = job.tool * job.toolCharge;
					job.runCharge = $scope.price.landFirstDay;
					job.runTotal = 1 * job.runCharge; // for Upcoming Land the total is based on 1 * first day pricing
				}
			} else if (job.environment == '1') { // Offshore
				if (job.isHighTemp || job.isHighPress) { // High Temp or High Press
					job.toolCharge = $scope.price.hphtOffshoreTool;
					job.toolTotal = job.tool * job.toolCharge;
					job.runCharge = $scope.price.hphtOffshoreRun;
					job.runTotal = job.run * job.runCharge;
				} else {
					job.toolCharge = 0;
					job.toolTotal = job.tool * job.toolCharge;
					job.runCharge = $scope.price.offshoreRun;
					job.runTotal = job.run * job.runCharge;
				}
			} else {
				job.toolCharge = 0;
				job.toolTotal = 0;
				job.runCharge = 0;
				job.runTotal = 0;
			}
			job.first = 0;
			job.firstCharge = 0;
			job.firstTotal = 0;
			job.additional = 0;
			job.additionalCharge = 0;
			job.additionalTotal = 0;
			job.standBy = 0;
			job.standByCharge = 0;
			job.standByTotal = 0;
			job.tech = 0;
			job.techCharge = 0;
			job.techTotal = 0;
			job.activation = 0;
			job.activationCharge = 0;
			job.activationTotal = 0;
			job.remain = 0;
			job.remainCharge = 0;
			job.remainTotal = 0;
		} else if (job.status._id == '1') { // active
			$scope.activeJob.push(job);
			// default job last update to comment in job info
			job.lastUpdate = job.comment;
			
			if (job.dailyJob) {
				job.tool = job.dailyJob.numOfChargeTool;
				job.toolCharge = job.dailyJob.amountTool;
				job.toolTotal = job.dailyJob.totalTool;
				job.first = job.dailyJob.numOfChargeFirst;
				job.firstCharge = job.dailyJob.amountFirst;
				job.firstTotal = job.dailyJob.totalFirst;
				job.additional = job.dailyJob.numOfChargeAdditional;
				job.additionalCharge = job.dailyJob.amountAdditional;
				job.additionalTotal = job.dailyJob.totalAdditional;
				job.run = job.dailyJob.numOfChargeRun;
				job.runCharge = job.dailyJob.amountRun;
				job.runTotal = job.dailyJob.totalRun;
				job.standBy = job.dailyJob.numOfChargeStandBy;
				job.standByCharge = job.dailyJob.amountStandBy;
				job.standByTotal = job.dailyJob.totalStandBy;
				job.tech = job.dailyJob.numOfChargeTechnician;
				job.techCharge = job.dailyJob.amountTechnician;
				job.techTotal = job.dailyJob.totalTechnician;
				job.activation = job.dailyJob.numOfChargeActivation;
				job.activationCharge = job.dailyJob.amountActivation;
				job.activationTotal = job.dailyJob.totalActivation;
				job.remain = job.runs - (job.first + job.additional + job.run);
				if (job.remain < 0) { job.remain = 0; }
				job.remainTotal = job.remain * job.remainCharge;
				
				// get last comment if DJR is avaiable
				if (job.dailyJob.itemList.length > 0 && job.dailyJob.itemList[job.dailyJob.itemList.length - 1]) {
					job.lastUpdate = job.dailyJob.itemList[job.dailyJob.itemList.length - 1].desc;
				}
			} else {
				job.tool = 0;
				job.toolCharge = 0;
				job.toolTotal = 0;
				job.first = 0;
				job.firstCharge = 0;
				job.firstTotal = 0;
				job.additional = 0;
				job.additionalCharge = 0;
				job.additionalTotal = 0;
				job.run = 0;
				job.runCharge = 0;
				job.runTotal = 0;
				job.standBy = 0;
				job.standByCharge = 0;
				job.standByTotal = 0;
				job.tech = 0;
				job.techCharge = 0;
				job.techTotal = 0;
				job.activation = 0;
				job.activationCharge = 0;
				job.activationTotal = 0;
				job.remain = 0;
				job.remainCharge = 0;
				job.remainTotal = 0;
			}
		}
		
		
		// calculate impact pro
		if (job.impactPro == '1') {
			job.impactProTotal = 1 * job.impactProCharge;
		} else {
			job.impactProTotal = 0;
		}
		$scope.impactProTotalAll += job.impactProTotal;

		
		
		var totalPerRow = job.impactProTotal + job.toolTotal + job.firstTotal + job.additionalTotal + job.runTotal + job.standByTotal + job.techTotal + job.activationTotal;
		job.totalAll = totalPerRow;
	}
});