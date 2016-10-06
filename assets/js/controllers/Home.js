dashboardControllers.controller('HomeController', function($rootScope, $location, $scope, $routeParams, NgTableParams, $filter, sharedService) {
	$rootScope.selectedMenu = "home";
	//$rootScope.breadcrumbs = sharedService.newBreadcrumb('Company Listing', $location.path());
	$rootScope.menuTitle = "Home";
	var output;
	if ($routeParams.args) {
		output = sharedService.getDataFromServer(getMyJobURL + "?args=" + $routeParams.args);
	} else {
		output = sharedService.getDataFromServer(getMyJobURL);
	}
	var data = output.data;
	var upcomingData = [];
	var activeData = [];
	
	for (var i = 0; i < data.length; i++) {
		var job = data[i];
		if (job.status._id == '0') {
			upcomingData.push(job);
		} else if (job.status._id == '1') {
			activeData.push(job);
		}
	}
	$scope.obj = data;
	$scope.objTableParams = $scope.getTableParam(upcomingData);
	$scope.objTableParams2 = $scope.getTableParam(activeData);
	
	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/StatusJob');
	$scope.statusList = output[0].data;
	var countStatusMap = {};
	for (var i = 0; i < $scope.obj.length; i++) {
		if (countStatusMap[$scope.obj[i].status._id]) {
			countStatusMap[$scope.obj[i].status._id]++;
		} else {
			countStatusMap[$scope.obj[i].status._id] = 1;
		}
		
	}
	for (var i = 0; i < $scope.statusList.length; i++) {
		var count = 0;
		if (countStatusMap[$scope.statusList[i]._id]) {
			count = countStatusMap[$scope.statusList[i]._id];
		}
		$scope.statusList[i].text = $scope.statusList[i].name + " (" + count + ")";
	}
	$scope.jobSelected = $scope.statusList[0];
	
	$scope.$on('onRepeatLast', function(scope, element, attrs){
		
		$('.mapPopover').each(function() {
			var selector = $(this);
			var position = selector.data("location");
			var content = getStaticMap({center: position, markers: "color:red|" + position});
			selector.qtip({
				content: {
					text: content
				},
				style: {
			        classes: 'qtip-dark qtip-shadow'
			    },
				position: {
					my: 'right center',
			        target: 'mouse',
			        adjust: {
			            mouse: true  // Can be omitted (e.g. default behaviour)
			        }
			    }
		    });
	     });
    });
});