dashboardControllers.controller('collaborationToolsController', function($scope, $rootScope, $controller, $routeParams, $filter, sharedService, ngTableParams) {
    $rootScope.selectedMenu = "collaborationTools";
    $rootScope.menuTitle = "Collaboration Tools";
    $scope._id = $routeParams._id;
});
/*
 *
 * F.A.Q
 *
 **/
dashboardControllers.controller('collaborationToolsFaqController', function($scope, $rootScope, $controller, $routeParams, $filter, sharedService, ngTableParams) {
    $controller('_ListController', {
        $scope: $scope,
        $menu: "collaborationTools:faq",
        $title: "Collaboration Tools",
        $listObjURL: getAllFaqURL,
        $updateObjURL: updateFaqURL,
        $successUpdatePath: "#/collaborationToolsFaq/"
    });
    var output = sharedService.getDataFromServer(getAllFaqURL);
    $scope.data = output.data;
});

dashboardControllers.controller('collaborationToolsFaqFormController', function($rootScope, $scope, sharedService, $controller) {
    $controller('_NewController', {
        $scope: $scope,
        $menu: "collaborationTools:faq",
        $title: "Collaboration Tools",
        $saveObjURL: saveFaqURL,
        $successSavePath: "#/collaborationToolsFaq"
    });
});


/*
 *
 * Glossary
 *
 * */
dashboardControllers.controller('collaborationToolsGlossaryController', function($scope, $rootScope, $controller, $routeParams, $filter, sharedService, ngTableParams) {
    $rootScope.selectedMenu = "collaborationTools:glossary";
    $rootScope.menuTitle = "Collaboration Tools";
    $scope._id = $routeParams._id;
});

dashboardControllers.controller('collaborationToolsGlossaryFormController', function($scope, $rootScope, $controller, $routeParams, $filter, sharedService, ngTableParams) {
    $rootScope.selectedMenu = "collaborationTools:glossary";
    $rootScope.menuTitle = "Collaboration Tools";
    $scope._id = $routeParams._id;
});

dashboardControllers.controller('collaborationToolsGlossaryController', function($scope, $rootScope, $controller, $routeParams, $filter, sharedService, ngTableParams) {
    $scope.filteredData = [];
    $scope.showData = [];
    $scope.currentPage = 1;
    $scope.numPerPage = 10;
    $scope.maxSize = 5;

    $controller('_ListController', {
        $scope: $scope,
        $menu: "collaborationTools:glossary",
        $title: "Collaboration Tools",
        $listObjURL: getAllGlossaryURL,
        $updateObjURL: updateGlossaryURL,
        $successUpdatePath: "#/collaborationToolsGlossary/"
    });
    var output = sharedService.getDataFromServer(getAllGlossaryURL);
    $scope.data = output.data;

    if($scope.data.length < 10){
        $scope.currentPage = 1;
    }

    $scope.pageCount = Math.ceil($scope.data.length / $scope.numPerPage);

    $scope.$watch('searchText', function() {
    	if ($scope.searchText && $scope.searchText.trim().length > 0) {
	        $scope.currentPage = 1;
	        $scope.filteredData.length = 0;
	        for (var i = 0; i < $scope.data.length; i++) {
	        	var datum = $scope.data[i];
	        	if (datum.name.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1) {
	        		$scope.filteredData.push(datum);
	        	}
	        }
    	} else {
    		$scope.filteredData.length = 0;
    		for (var i = 0; i < $scope.data.length; i++) {
    			var datum = $scope.data[i];
        		$scope.filteredData.push(datum);
    		}
    		$scope.currentPage = 1;
    	}
    	var begin = (($scope.currentPage - 1) * $scope.numPerPage)
        , end = begin + $scope.numPerPage;

    	$scope.showData = $scope.filteredData.slice(begin, end);
    	$scope.pageCount = Math.ceil($scope.filteredData.length / $scope.numPerPage);
    });

    $scope.$watch('currentPage', function() {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;

        $scope.showData = $scope.filteredData.slice(begin, end);
    });
    
    $scope.selectPage = function(page) {
    	$scope.currentPage = page;
    }

    $scope.getNumber = function(num) {
        return new Array(num);
    }
});


dashboardControllers.controller('collaborationToolsGlossaryFormController', function($rootScope, $scope, sharedService, $controller) {
    $controller('_NewController', {
        $scope: $scope,
        $menu: "collaborationTools:glossary",
        $title: "Collaboration Tools",
        $saveObjURL: saveGlossaryURL,
        $successSavePath: "#/collaborationToolsGlossary"
    });
});


/*
*
* Field Operation Manual
*
* */
dashboardControllers.controller('collaborationToolsManualController', function($scope, $rootScope, $controller, $routeParams, $filter, $window, sharedService, ngTableParams) {
    $controller('_ListController', {
        $scope: $scope,
        $menu: "collaborationTools:manual",
        $title: "Collaboration Tools",
        $listObjURL: getAllManualURL
    });
    var output = sharedService.getDataFromServer(getAllManualURL);
    $scope.data = output.data;
    
    $scope.upload = function() {
		var file = $('#upload')[0].files[0];
	    var type = "none";
	    if (file && file.type === 'application/pdf') {
	    	type = "pdf";
	    }
//	    if (type === "none") {
//	      alert("Only PDF files that can be uploaded");
//	      return;
//	    }
	    
	    var fd = new FormData(); 
	    fd.append("file", file);
	    var xhr = new XMLHttpRequest();
	    xhr.open("POST", uploadOperationManualURL);

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
    
    $scope.deleteObj = function(id) {
    	if (confirm("Are You Sure Want To Delete ?")) {
			var dataToSend = {"_id": id};
	        var output = sharedService.callAjax(deleteManualURL, "post", dataToSend);
	        if (output && output.status) {
	            //alert (output.message);
	            if (output.status == 1) {
	            	//alert("success delete");
	            	location.reload();
	            }
	        } else {
	            alert ("Failed to delete");
	        }
    	}
	};
});

dashboardControllers.controller('collaborationToolsManualEditController', function($rootScope, $scope, sharedService, $controller) {
	$controller('_EditController', {
		$scope: $scope, 
		$menu: "collaborationTools:manual",
		$title: "Collaboration Tools",
		$detailObjURL: getManualDetailURL, 
		$updateObjURL: updateManualURL, 
		$successUpdatePath: "#/collaborationToolsManual/"
	});
	$scope.save = function() {
        var output = sharedService.callAjax(updateManualURL, "post", $scope.obj);
        if (output && output.status) {
            //alert (output.message);
            if (output.status == 1) {
            	location.href = "#/collaborationToolsManual";
            }
        } else {
            alert ("Failed to update");
        }
    }
});

