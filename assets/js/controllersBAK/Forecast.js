dashboardControllers.controller('ForecastController', function($rootScope, $location, $scope, $routeParams, ngTableParams, $filter, sharedService) {
	$rootScope.selectedMenu = "forecast";
	//$rootScope.breadcrumbs = sharedService.newBreadcrumb('Company Listing', $location.path());
	$rootScope.menuTitle = "Forecast Report";
	$scope.month = $routeParams.month;
	var output;
	var data;
	output = sharedService.getDataFromServer(getJobMonthThisYearURL);
	$scope.currentMonth = parseInt(output.currentMonth); // current month on server
	var monthArray = output.monthList; // list of month
	
	if ($scope.month) {
		output = sharedService.getDataFromServer(getThisMonthJobURL + "/month/" + $scope.month);
		$scope.currentMonth = $scope.month;
	} else {
		output = sharedService.getDataFromServer(getThisMonthJobURL);
	}
	$scope.monthList = [];
	var monthNameList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	$scope.monthNameList = monthNameList; 
	if (monthArray && monthArray.length > 0) {
		var idxCurrent = 0;
		for (var i = 0; i < monthArray.length; i++) {
			var value = monthArray[i];
			if (value >= $scope.currentMonth) {
				$scope.currentMonth = value;
				idxCurrent = i;
				break;
			}
		}
		for (var i = 0; i < monthArray.length; i++) {
			if (i == idxCurrent) {
				$scope.monthList.push({id: monthArray[i], name: monthNameList[monthArray[i] - 1], selected: true});
			} else {
				$scope.monthList.push({id: monthArray[i], name: monthNameList[monthArray[i] - 1]});
			}
		}
	}
	data = output.data;
	
	output = sharedService.getDataFromServer(getPriceManagerDetailURL + "/_id/price");
    $scope.price = output.data[0];
	
	$scope.impactProTotalAll = 0;
	$scope.toolTotalAll = 0;
	$scope.firstTotalAll = 0;
	$scope.additionalTotalAll = 0;
	$scope.runTotalAll = 0;
	$scope.standByTotalAll = 0;
	$scope.techTotalAll = 0;
	$scope.activationTotalAll = 0;
	
	$scope.upcomingJobTotal = 0;
	$scope.activeJobTotal = 0;
	$scope.completedJobTotal = 0;
	$scope.projectedTotalRevenue = 0;
	$scope.monthlyTotalRevenue = 0;
	
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
		// fill impact pro pricing
		if (job.environment == '0') { // Land
			if (job.isHighTemp || job.isHighPress) { // High Temp or High Press
				job.impactProCharge = $scope.price.hphtLandImpactPro;
			} else {
				job.impactProCharge = $scope.price.landImpactPro;
			}
		} else if (job.environment == '1') { // Offshore
			if (job.isHighTemp || job.isHighPress) { // High Temp or High Press
				job.impactProCharge = $scope.price.hphtOffshoreImpactPro;
			} else {
				job.impactProCharge = $scope.price.offshoreImpactPro;
			}
		} else {
			job.impactProCharge = 0;
		}
		if (job.status._id == '0') { // upcoming
			job.tool = serialCount;
			job.run = job.runs;
			if (!job.run) {
				job.run = 0;
			}
			// count for upcoming and tool prep charge and total
			if (job.environment == '0') { // Land
				if (job.isHighTemp || job.isHighPress) { // High Temp or High Press
					if (job.tool == 0) { // if there are no service order yet, hence the 0 serial number/tool, then for hpht make it forecasting 2 tool
						job.tool = 2;
					}
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
		} else if (job.status._id == '1' || job.status._id == '2') { // active
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
				// get last comment if DJR is avaiable
				if (job.dailyJob.itemList.length > 0 && job.dailyJob.itemList[job.dailyJob.itemList.length - 1]) {
					job.comment = job.dailyJob.itemList[job.dailyJob.itemList.length - 1].desc;
				}
				// remove comment if Job is Completed
				if (job.status._id == '2') {
					job.comment = "";
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
			}
		} else if (job.status._id == '3') { // cancelled
			job.tool = 0;
			job.run = 0;
			job.toolCharge = 0;
			job.toolTotal = 0;
			job.runCharge = 0;
			job.runTotal = 0;
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
		}
		
		// calculate impact pro (don't count for Cancelled Job)
		if (job.status._id != '3' && job.impactPro == '1') {
			job.impactProTotal = 1 * job.impactProCharge;
		} else {
			job.impactProTotal = 0;
		}
		$scope.impactProTotalAll += job.impactProTotal;

		// calculate tool
		$scope.toolTotalAll += job.toolTotal;
		// calculate first
		$scope.firstTotalAll += job.firstTotal;
		// calculate additional
		$scope.additionalTotalAll += job.additionalTotal;
		// calculate run
		$scope.runTotalAll += job.runTotal;
		// calculate standBy
		$scope.standByTotalAll += job.standByTotal;
		// calculate tech
		$scope.techTotalAll += job.techTotal;
		// calculate activation
		$scope.activationTotalAll += job.activationTotal;
		
		var totalPerRow = job.impactProTotal + job.toolTotal + job.firstTotal + job.additionalTotal + job.runTotal + job.standByTotal + job.techTotal + job.activationTotal;
		if (job.status._id == '0') { // upcoming
			$scope.upcomingJobTotal += totalPerRow;
			$scope.projectedTotalRevenue += totalPerRow;
		} else if (job.status._id == '1') { // active
			$scope.activeJobTotal += totalPerRow;
			$scope.projectedTotalRevenue += totalPerRow;
		} else if (job.status._id == '2') { // completed
			$scope.completedJobTotal += totalPerRow;
			$scope.monthlyTotalRevenue += totalPerRow;
			$scope.projectedTotalRevenue += totalPerRow;
		}
	}
	$scope.obj = data;
	$scope.forecastTableParams = $scope.getTableParam(data);
});