dashboardControllers.controller('ContactController', function($scope, $controller) {
	$controller('_ListController', { 
		$scope: $scope, 
		$menu: "contact",
		$title: "Directory",
		$listObjURL: getAllContactURL
		});
	for (var i = 0; i < $scope.obj.length; i++) {
		$scope.obj[i].name = "";
		if ($scope.obj[i].titleName) {
			$scope.obj[i].name += $scope.obj[i].titleName + " ";  
		}
		if ($scope.obj[i].firstName) {
			$scope.obj[i].name += $scope.obj[i].firstName + " ";  
		}
		if ($scope.obj[i].lastName) {
			$scope.obj[i].name += $scope.obj[i].lastName + " ";  
		}
	}
});

dashboardControllers.controller('ContactDetailController', function($scope, $controller) {
	$controller('_DetailController', { 
		$scope: $scope, 
		$menu: "contact",
		$title: "Directory",
		$detailObjURL: getContactDetailURL, 
		$deleteObjURL: deleteContactURL,
		$successDeletePath: "#/contact"
		});
});

dashboardControllers.controller('ContactNewController', function($rootScope, $scope, sharedService, $controller) {
	$controller('_NewController', { 
		$scope: $scope, 
		$menu: "contact",
		$title: "Directory",
		$saveObjURL: saveContactURL,
		$successSavePath: "#/contact"
	});
    
    $scope.titleList = ["Mr.", "Mrs.", "Ms."];
	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company~Contact');
	$scope.companyList = output[0].data;
	$scope.contactList = output[1].data;
	
	$scope.save = function() {
	    var output = sharedService.callAjax(saveContactURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/contact';
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('ContactEditController', function($rootScope, $scope, sharedService, $controller) {
	$controller('_EditController', {
		$scope: $scope, 
		$menu: "contact",
		$title: "Directory",
		$detailObjURL: getContactDetailURL, 
		$updateObjURL: updateContactURL, 
		$successUpdatePath: "#/contactDetail/"
	});
    
    $scope.titleList = ["Mr.", "Mrs.", "Ms."];
	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company~Contact');
	$scope.companyList = output[0].data;
	$scope.contactList = output[1].data;
	
	$scope.save = function() {
        var output = sharedService.callAjax(updateContactURL, "post", $scope.obj);
        if (output && output.status) {
            //alert (output.message);
            if (output.status == 1) {
            	location.href = "#/contactDetail/" + $scope._id;
            }
        } else {
            alert ("Failed to update");
        }
    }
});

dashboardControllers.controller('ContactNewPopupController', function($rootScope, $scope, sharedService, $controller) {
	$controller('_NewPopupController', { 
		$scope: $scope,
		$saveObjURL: saveContactURL
	});
    $scope.titleList = ["Mr.", "Mrs.", "Ms."];
    $scope.obj.titleName = "Mr.";
	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company~Contact');
	$scope.companyList = output[0].data;
	$scope.contactList = output[1].data;
});