dashboardControllers.controller('EmployeeController', function($scope, $controller, sharedService) {
	$controller('_ListController', { 
		$scope: $scope, 
		$menu: "employee:profiles",
		$title: "Employee Profiles",
		$listObjURL: getAllProfileURL
		});
});

dashboardControllers.controller('EmployeeDetailController', function($rootScope, $scope, $controller, sharedService, $routeParams) {
	$rootScope.selectedMenu = "employee:profiles";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Employee Profiles";
    var userOrId = $routeParams._id.split("|");
    if (userOrId[0].trim().length > 0) {
    	$scope._id = userOrId[0];
    	$rootScope.userBind = true;
    } else {
    	$scope._id = userOrId[1];
    	$rootScope.userBind = false;
    }
    var output = {};
    if ($rootScope.userBind) {
    	output = sharedService.getDataFromServer(getProfileDetailByUserURL + "/_id/" + $scope._id);
    } else {
    	output = sharedService.getDataFromServer(getProfileDetailURL + "/_id/" + $scope._id);
    }
    
    $scope.obj = output.data[0];
    if ($scope.obj && $scope.obj.photo) {
    	$("#photo").attr("src", $scope.obj.photo);
    }
	$scope.deleteObj = function() {
		if (confirm("Are You Sure Want To Delete ?")) {
			var dataToSend = {"_id": $scope._id};
	        var output = sharedService.callAjax(deleteEmployeeURL, "post", dataToSend);
	        if (output && output.status) {
	            //alert (output.message);
	            if (output.status == 1) {
	            	//alert("success delete");
	            	location.href = "#/employeeProfiles";
	            }
	        } else {
	            alert ("Failed to delete");
	        }
		}
	};
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

dashboardControllers.controller('EmployeeNewController', function($rootScope, $scope, $controller, sharedService) {
	$rootScope.userBind = false;
	$rootScope.selectedMenu = "employee:profiles";
	//$rootScope.breadcrumbs = sharedService.newBreadcrumb('Company Listing', $location.path());
	$rootScope.menuTitle = "Employee Profiles";
	$scope.obj = {};
	// File container
	var fileInput = document.getElementById('fileInput');
	$scope.photoChanges = false;
    fileInput.addEventListener('change', function(e) {
    	var file = fileInput.files[0];
    	var imageType = /image.*/;
    	if (file.type.match(imageType)) {
    		var reader = new FileReader();
    		reader.onload = function(e) {
    		    resizeBase64Image(reader.result, 300, 400, '#photo');
    		    $scope.photoChanges = true;
    		}
    		reader.readAsDataURL(file); 
		} else {
			alert("File format is not supported");
		}
    });
	
	$scope.save = function() {
		
		// pickup the photo, only if there are changes (because resending unchange photo is cost much)
		if ($scope.photoChanges) {
			$scope.obj.photo = $("#photo").attr("src");
		}
        var output = sharedService.callAjax(saveProfileURL, "post", $scope.obj);
        if (output && output.status) {
            //alert (output.message);
            if (output.status == 1) {
            	location.href = "#/employeeProfiles";
            }
        } else {
            alert ("Failed to update");
        }
    };
    
});

dashboardControllers.controller('EmployeeEditController', function($rootScope, $scope, $controller, sharedService) {
	$controller('_EditController', {
		$scope: $scope, 
		$menu: "employee:profiles",
		$title: "Employee Profiles",
		$detailObjURL: getProfileDetailURL, 
		$updateObjURL: updateEmployeeURL, 
		$successUpdatePath: "#/isiEmployeeDetail/"
	});
	// File container
	var fileInput = document.getElementById('fileInput');
	$scope.photoChanges = false;
    fileInput.addEventListener('change', function(e) {
    	var file = fileInput.files[0];
    	var imageType = /image.*/;
    	if (file.type.match(imageType)) {
    		var reader = new FileReader();
    		reader.onload = function(e) {
    		    resizeBase64Image(reader.result, 300, 400, '#photo');
    		    $scope.photoChanges = true;
    		}
    		reader.readAsDataURL(file); 
		} else {
			alert("File format is not supported");
		}
    });
    if ($scope.obj && $scope.obj.photo) {
    	$("#photo").attr("src", $scope.obj.photo);
    }
	
	$scope.save = function() {
		
		// pickup the photo, only if there are changes (because resending unchange photo is cost much)
		if ($scope.photoChanges) {
			$scope.obj.photo = $("#photo").attr("src");
		}
        var output = sharedService.callAjax(updateEmployeeURL, "post", $scope.obj);
        if (output && output.status) {
            //alert (output.message);
            if (output.status == 1) {
            	location.href = "#/employeeProfilesDetail/|" + $scope._id;
            }
        } else {
            alert ("Failed to update");
        }
    };
    
});

dashboardControllers.controller('EmployeeDetailExperienceController', function($rootScope, $scope, $routeParams, $controller, sharedService, $filter, ngTableParams) {
	$rootScope.selectedMenu = "employee:profiles";
	//$rootScope.breadcrumbs = sharedService.newBreadcrumb('Company Listing', $location.path());
	$rootScope.menuTitle = "Employee Profiles";
	$scope._id = $routeParams._id;
	var data = []
	$scope.obj = data;
	$scope.objTableParams = $scope.getTableParam(data);
});

dashboardControllers.controller('EmployeeDetailActivityLogController', function($rootScope, $scope, $routeParams, $controller, sharedService, $filter, ngTableParams) {
	$rootScope.selectedMenu = "employee:profiles";
	//$rootScope.breadcrumbs = sharedService.newBreadcrumb('Company Listing', $location.path());
	$rootScope.menuTitle = "Employee Profiles";
	$scope._id = $routeParams._id;
	var output;
	output = sharedService.getDataFromServer(getActivityByUserURL + "/_id/" + $scope._id);
	var data = output.data;
	$scope.obj = data;
	$scope.objTableParams = $scope.getTableParam(data);
});