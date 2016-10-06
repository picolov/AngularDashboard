dashboardControllers.controller('UserController', function($scope, $controller, sharedService) {
	$controller('_ListController', { 
		$scope: $scope, 
		$menu: "user",
		$title: "User Management",
		$listObjURL: getAllUserURL
		});
	var output = sharedService.getDataFromServer(getAllRoleURL);
	var roles = output.data;
	for (var i = 0; i < $scope.obj.length; i++) {
		$scope.obj[i].name = "";
		if ($scope.obj[i].titleName) {
			$scope.obj[i].name += $scope.obj[i].titleName + " ";  
		}
		if ($scope.obj[i].firstName) {
			$scope.obj[i].name += $scope.obj[i].firstName + " ";  
		}
		if ($scope.obj[i].middleName) {
			$scope.obj[i].name += $scope.obj[i].middleName + " ";  
		}
		if ($scope.obj[i].lastName) {
			$scope.obj[i].name += $scope.obj[i].lastName + " ";  
		}
		var currRoles = $scope.obj[i].role;
		var rolesArr = [];
		for (var j = 0; j < currRoles.length; j++) {
			for (var k = 0; k < roles.length; k++) {
				if (roles[k]._id == currRoles[j]) {
					currRoles[j] = roles[k];
				}
			}
		}
	}
	
});

dashboardControllers.controller('UserDetailController', function($scope, $controller, sharedService) {
	$controller('_DetailController', { 
		$scope: $scope, 
		$menu: "user",
		$title: "User Management",
		$detailObjURL: getUserDetailURL, 
		$deleteObjURL: deleteUserURL,
		$successDeletePath: "#/user"
		});
	$scope.resetPassword = function() {
		var dataToSend = {"_id": $scope._id};
        var output = sharedService.callAjax(resetPasswordURL, "post", dataToSend);
        if (output && output.status) {
            //alert (output.message);
            if (output.status == 1) {
            	//alert("success delete");
            	//location.href = $successDeletePath;
            }
        } else {
            alert ("Failed to delete");
        }
	};
	var output = sharedService.getDataFromServer(getAllRoleURL);
	var roles = output.data;
	var currRoles = $scope.obj.role;
	var rolesArr = [];
	for (var j = 0; j < currRoles.length; j++) {
		for (var k = 0; k < roles.length; k++) {
			if (roles[k]._id == currRoles[j]) {
				currRoles[j] = roles[k];
			}
		}
	}
	
});

dashboardControllers.controller('UserNewController', function($rootScope, $scope, sharedService, $controller) {
	$controller('_NewController', { 
		$scope: $scope, 
		$menu: "user",
		$title: "User Management",
		$saveObjURL: saveUserURL,
		$successSavePath: "#/user"
	});
	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/profile');
	$scope.profileList = output[0].data;
	output = sharedService.getDataFromServer(getAllRoleURL);
	var roles = [];
	for (var i = 0; i < output.data.length; i++) {
		roles.push(output.data[i]._id);
	}
    $scope.roles = output.data;
    $scope.selectEmployee = function(item, model) {
    	if (item) {
	    	var names = item.employeeName.split(' ');
	    	$scope.obj.firstName = names[0];
	    	if (names.length > 1) {
	    		$scope.obj.lastName = names[1];
	    	}
	    	$scope.obj.email = item.email;
	    	$scope.obj.phone = item.phone;
	    	$scope.obj.mobile = item.mobile;
    	}
    }
});

dashboardControllers.controller('UserEditController', function($rootScope, $scope, sharedService, $controller) {
	$controller('_EditController', {
		$scope: $scope, 
		$menu: "user",
		$title: "User Management",
		$detailObjURL: getUserDetailURL, 
		$updateObjURL: updateUserURL, 
		$successUpdatePath: "#/userDetail/"
	});
	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/profile');
	$scope.profileList = output[0].data;
	var output = sharedService.getDataFromServer(getAllRoleURL);
	var roles = [];
	for (var i = 0; i < output.data.length; i++) {
		roles.push(output.data[i]._id);
	}
    $scope.roles = output.data;
    $scope.selectEmployee = function(item, model) {
    	if (item) {
    		var names = item.employeeName.split(' ');
	    	$scope.obj.firstName = names[0];
	    	if (names.length > 1) {
	    		$scope.obj.lastName = names[1];
	    	}
	    	$scope.obj.email = item.email;
	    	$scope.obj.phone = item.phone;
	    	$scope.obj.mobile = item.mobile;
    	}
    }
});