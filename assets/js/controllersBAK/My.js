dashboardControllers.controller('ChangePasswordController', function($rootScope, $scope, $controller, sharedService) {
	$rootScope.selectedMenu = "changePassword";
	//$rootScope.breadcrumbs = sharedService.newBreadcrumb('Company Listing', $location.path());
	$rootScope.menuTitle = "Change Password";
	$scope.obj = {};
	
	$scope.save = function() {
		if ($scope.obj.newPassword != $scope.obj.verifyPassword) {
			alert("Verify Password is not the same, please check again");
			return;
		}
	    var output = sharedService.callAjax(changePasswordURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	        	location.reload(true);
	        }
	    } else {
	        alert ("Failed to change password");
	    }
	}
});

dashboardControllers.controller('MyProfileController', function($rootScope, $scope, $controller, sharedService) {
	$rootScope.selectedMenu = "myProfile";
	//$rootScope.breadcrumbs = sharedService.newBreadcrumb('Company Listing', $location.path());
	$rootScope.menuTitle = "My Profile";
	output = sharedService.getDataFromServer(getMyProfileURL);
	$scope.obj = output.data;
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

dashboardControllers.controller('MyProfileEditController', function($rootScope, $scope, $controller, sharedService) {
	$rootScope.selectedMenu = "myProfile";
	//$rootScope.breadcrumbs = sharedService.newBreadcrumb('Company Listing', $location.path());
	$rootScope.menuTitle = "My Profile";
	output = sharedService.getDataFromServer(getMyProfileURL);
	$scope.obj = output.data;
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
        var output = sharedService.callAjax(saveMyProfileURL, "post", $scope.obj);
        if (output && output.status) {
            //alert (output.message);
            if (output.status == 1) {
            	location.href = "#/myProfile";
            }
        } else {
            alert ("Failed to update");
        }
    };
});

dashboardControllers.controller('MyExperienceController', function($rootScope, $scope, $controller, sharedService, $filter, ngTableParams) {
	$rootScope.selectedMenu = "myProfile";
	//$rootScope.breadcrumbs = sharedService.newBreadcrumb('Company Listing', $location.path());
	$rootScope.menuTitle = "My Profile";
	var data = []
	$scope.obj = data;
	$scope.objTableParams = $scope.getTableParam(data);
});

dashboardControllers.controller('MyActivityLogController', function($rootScope, $scope, $controller, sharedService, $filter, ngTableParams) {
	$rootScope.selectedMenu = "myProfile";
	//$rootScope.breadcrumbs = sharedService.newBreadcrumb('Company Listing', $location.path());
	$rootScope.menuTitle = "My Profile";
	var output;
	output = sharedService.getDataFromServer(getMyActivityURL);
	var data = output.data;
	$scope.obj = data;
	$scope.objTableParams = $scope.getTableParam(data);
});

// MY EXPENSE REPORT

dashboardControllers.controller('MyExpenseController', function($scope, $rootScope, $controller, $routeParams, sharedService, ngTableParams, $filter) {
	$rootScope.selectedMenu = "myProfile";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "My Profile";
    var output = sharedService.getDataFromServer(getOutgoingToolsExpenseListURL + "/_id/" + $scope._id);
    $scope.obj = output.data;
    var data = $scope.obj;
    if (data == null) {
    	data = [];
    }
    
	$scope.objTableParams = $scope.getTableParam(data);
	
	$scope.deleteObj = function(idToDel) {
		if (confirm("Are You Sure Want To Delete ?")) {
			var dataToSend = {"_id": idToDel};
	        var output = sharedService.callAjax(deleteOutgoingToolsExpenseURL, "post", dataToSend);
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

dashboardControllers.controller('MyExpenseNewController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "myProfile";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "My Profile";
    var output = sharedService.getDataFromServer(getMyProfileURL);
	$scope.profile = output.data;
    output = sharedService.getDataFromServer(getPluralListURL + '/collections/JarType');
	$scope.jarTypeList = output[0].data;
    $scope.obj = {};
    $scope.save = function() {
	    var output = sharedService.callAjax(saveOutgoingToolsExpenseURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/myExpenseList';
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('MyExpenseEditController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "myProfile";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "My Profile";
    var output = sharedService.getDataFromServer(getMyProfileURL);
	$scope.profile = output.data;
    output = sharedService.getDataFromServer(getPluralListURL + '/collections/JarType');
	$scope.jarTypeList = output[0].data;
	$scope._id = $routeParams._id;
    
    output = sharedService.getDataFromServer(getOutgoingToolsExpenseURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    $scope.save = function() {
	    var output = sharedService.callAjax(updateOutgoingToolsExpenseURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/myExpenseList';
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('MyExpenseDetailController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "myProfile";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "My Profile";
	$scope._id = $routeParams._id;
	var output = sharedService.getDataFromServer(getMyProfileURL);
	$scope.profile = output.data;
    output = sharedService.getDataFromServer(getOutgoingToolsExpenseURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    if ($scope.obj && $scope.obj.job) {
    	output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope.obj.job);
    	if (output && output.data) {
    		$scope.jobInfo = output.data[0];
    	}
    }
	$scope.detailPdf = function() {
		window.open(getExpenseDetailPdfURL + "/_id/" + $scope._id, "_self");
	}
});