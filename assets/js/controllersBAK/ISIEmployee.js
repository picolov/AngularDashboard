dashboardControllers.controller('ISIEmployeeController', function($scope, $controller, sharedService) {
	$controller('_ListController', { 
		$scope: $scope, 
		$menu: "contact",
		$title: "ISI Employee",
		$listObjURL: getAllProfileURL
		});
});

dashboardControllers.controller('ISIEmployeeDetailController', function($scope, $controller, sharedService) {
	$controller('_DetailController', { 
		$scope: $scope, 
		$menu: "contact",
		$title: "ISI Employee",
		$detailObjURL: getISIEmployeeDetailURL,
		$deleteObjURL: deleteEmployeeURL,
		$successDeletePath: "#/isiEmployee"
		});
	if ($scope.obj && $scope.obj.photo) {
    	$("#photo").attr("src", $scope.obj.photo);
    }
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