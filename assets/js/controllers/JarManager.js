dashboardControllers.controller('JarManagerController', function($scope, $rootScope, $routeParams, $controller, sharedService) {
	$rootScope.selectedMenu = "jarManager";
    $rootScope.menuTitle = "Jar Manager";
});

// EXPENSE REPORT

dashboardControllers.controller('JarManagerExpenseController', function($scope, $rootScope, $controller, $routeParams, sharedService, NgTableParams, $filter) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
    output = sharedService.getDataFromServer(getOutgoingToolsExpenseListURL + "/_id/" + $scope._id);
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

dashboardControllers.controller('JarManagerExpenseNewController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
    var output = sharedService.getDataFromServer(getPluralListURL + '/collections/JarType');
	$scope.jarTypeList = output[0].data;
    $scope.obj = {};
    $scope.save = function() {
	    var output = sharedService.callAjax(saveOutgoingToolsExpenseURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jarManagerExpenseList';
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('JarManagerExpenseEditController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
    var output = sharedService.getDataFromServer(getPluralListURL + '/collections/JarType');
	$scope.jarTypeList = output[0].data;
	$scope._id = $routeParams._id;
    
    output = sharedService.getDataFromServer(getOutgoingToolsExpenseURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    $scope.save = function() {
	    var output = sharedService.callAjax(updateOutgoingToolsExpenseURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jarManagerExpenseList';
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('JarManagerExpenseDetailController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
	$scope._id = $routeParams._id;
    
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

//JAR EQUIPMENT TRANSFER

dashboardControllers.controller('JarManagerTransferController', function($scope, $rootScope, $controller, $routeParams, sharedService, NgTableParams, $filter) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
    output = sharedService.getDataFromServer(getOutgoingToolsTransferListURL + "/_id/" + $scope._id);
    $scope.obj = output.data;
    var data = $scope.obj;
    if (data == null) {
    	data = [];
    }
    
	$scope.objTableParams = $scope.getTableParam(data);
	
	$scope.deleteObj = function(idToDel) {
		if (confirm("Are You Sure Want To Delete ?")) {
			var dataToSend = {"_id": idToDel};
	        var output = sharedService.callAjax(deleteOutgoingToolsTransferURL, "post", dataToSend);
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

dashboardControllers.controller('JarManagerTransferNewController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
    var output = sharedService.getDataFromServer(getPluralListURL + '/collections/JarType');
	$scope.jarTypeList = output[0].data;
    $scope.obj = {};
    $scope.save = function() {
	    var output = sharedService.callAjax(saveOutgoingToolsTransferURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jarManagerTransferList';
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('JarManagerTransferEditController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
    var output = sharedService.getDataFromServer(getPluralListURL + '/collections/JarType');
	$scope.jarTypeList = output[0].data;
	$scope._id = $routeParams._id;
    
    output = sharedService.getDataFromServer(getOutgoingToolsTransferURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    $scope.save = function() {
	    var output = sharedService.callAjax(updateOutgoingToolsTransferURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jarManagerTransferList';
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('JarManagerTransferDetailController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
	$scope._id = $routeParams._id;
    
    output = sharedService.getDataFromServer(getOutgoingToolsTransferURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    if ($scope.obj && $scope.obj.job) {
    	output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope.obj.job);
    	if (output && output.data) {
    		$scope.jobInfo = output.data[0];
    	}
    }
	$scope.detailPdf = function() {
		window.open(getTransferDetailPdfURL + "/_id/" + $scope._id, "_self");
	}
});

//JAR IN OUT

dashboardControllers.controller('JarManagerInOutController', function($scope, $rootScope, $controller, $routeParams, sharedService, NgTableParams, $filter) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
    var parameter = $routeParams._id;
    if (parameter && parameter.indexOf('|') != -1) {
    	var searchParams = parameter.split('|');
    	output = sharedService.getDataFromServer(getOutgoingToolsInOutListURL + "/from/" + searchParams[0] + "/to/" + searchParams[1]);
    } else {
    	output = sharedService.getDataFromServer(getOutgoingToolsInOutListURL);
	}
    $scope.obj = output.data;
    if (parameter && parameter.indexOf('|') != -1) {
    	var searchParams = parameter.split('|');
    	$scope.fromDate = searchParams[0];
    	$scope.toDate = searchParams[1];
    }
    var data = $scope.obj;
    if (data == null) {
    	data = [];
    }
    
	$scope.objTableParams = $scope.getTableParam(data);
	
	$scope.deleteObj = function(idToDel) {
		if (confirm("Are You Sure Want To Delete ?")) {
			var dataToSend = {"_id": idToDel};
	        var output = sharedService.callAjax(deleteOutgoingToolsInOutURL, "post", dataToSend);
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
	
	$scope.detailPdf = function() {
		//alert($scope.fromDate)
		var fromDate = $scope.fromDate;
		var toDate = $scope.toDate;
		if (fromDate != null && toDate != null) {
			//alert("parameter Date detected ....");
			window.open(getInOutDetailPdfURL + "/from/" + fromDate + "/to/" + toDate, "_self");
		} else {
			//alert("EMPTY parameter detected ....");
			window.open(getInOutDetailPdfURL, "_self");
		}
		
	}
	
});

dashboardControllers.controller('JarManagerInOutNewController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
    var output = sharedService.getDataFromServer(getPluralListURL + '/collections/JarType~JarTypeCased');
	$scope.jarTypeList = output[0].data;
	$scope.jarTypeList = $scope.jarTypeList.concat(output[1].data);
    $scope.obj = {};
    $scope.save = function() {
	    var output = sharedService.callAjax(saveOutgoingToolsInOutURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jarManagerInOutList';
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('JarManagerInOutEditController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
    var output = sharedService.getDataFromServer(getPluralListURL + '/collections/JarType~JarTypeCased');
	$scope.jarTypeList = output[0].data;
	$scope.jarTypeList = $scope.jarTypeList.concat(output[1].data);
	$scope._id = $routeParams._id;
    
    output = sharedService.getDataFromServer(getOutgoingToolsInOutURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    $scope.save = function() {
	    var output = sharedService.callAjax(updateOutgoingToolsInOutURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jarManagerInOutList';
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('JarManagerInOutDetailController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
	$scope._id = $routeParams._id;
    
    output = sharedService.getDataFromServer(getOutgoingToolsInOutURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    if ($scope.obj && $scope.obj.job) {
    	output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope.obj.job);
    	if (output && output.data) {
    		$scope.jobInfo = output.data[0];
    		output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope.obj.job);
    	    $scope.svo = output.data[0];
    	}
    }
	$scope.detailPdf = function() {
		window.open(getInOutDetailPdfURL + "/_id/" + $scope._id, "_self");
	}
});

// Inspection Report
dashboardControllers.controller('JarManagerOpenInspectionController', function($scope, $rootScope, $controller, $routeParams, sharedService, NgTableParams, $filter) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
    $scope.obj = {};
    output = sharedService.getDataFromServer(getOutgoingToolsOpenInspectionListURL);
    $scope.obj = output.data;
    var data = $scope.obj;
    if (data == null) {
    	data = [];
    }
    
    $scope.objTableParams = $scope.getTableParam(data);
	
	$scope.deleteObj = function(idToDel) {
		if (confirm("Are You Sure Want To Delete ?")) {
			var dataToSend = {"_id": idToDel};
	        var output = sharedService.callAjax(deleteOutgoingToolsOpenInspectionURL, "post", dataToSend);
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

dashboardControllers.controller('JarManagerCasedInspectionController', function($scope, $rootScope, $controller, $routeParams, sharedService, NgTableParams, $filter) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
    $scope.obj = {};
    output = sharedService.getDataFromServer(getOutgoingToolsCasedInspectionListURL);
    $scope.obj = output.data;
    var data = $scope.obj;
    if (data == null) {
    	data = [];
    }
    
    $scope.objTableParams = $scope.getTableParam(data);
	
	$scope.deleteObj = function(idToDel) {
		if (confirm("Are You Sure Want To Delete ?")) {
			var dataToSend = {"_id": idToDel};
	        var output = sharedService.callAjax(deleteOutgoingToolsCasedInspectionURL, "post", dataToSend);
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


dashboardControllers.controller('JarManagerOpenInspectionNewController', function($scope, $rootScope, $controller, $routeParams, sharedService, NgTableParams, $filter) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
    var output = sharedService.getDataFromServer(getPluralListURL + '/collections/JarType');
	$scope.jarTypeList = output[0].data;
    $scope.obj = {};
    
    $scope.save = function() {
    	$scope.obj.job = $scope._id;
	    var output = sharedService.callAjax(saveOutgoingToolsOpenInspectionURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jarManagerOpenInspectionList';
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('JarManagerCasedInspectionNewController', function($scope, $rootScope, $controller, $routeParams, sharedService, NgTableParams, $filter) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
    var output = sharedService.getDataFromServer(getPluralListURL + '/collections/JarTypeCased');
	$scope.jarTypeList = output[0].data;
    $scope.obj = {};
    
    $scope.save = function() {
    	$scope.obj.job = $scope._id;
	    var output = sharedService.callAjax(saveOutgoingToolsCasedInspectionURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jarManagerCasedInspectionList';
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

// EDITING

dashboardControllers.controller('JarManagerOpenInspectionEditController', function($scope, $rootScope, $controller, $routeParams, sharedService, NgTableParams, $filter) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
    var output = sharedService.getDataFromServer(getPluralListURL + '/collections/JarType');
	$scope.jarTypeList = output[0].data;
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getOutgoingToolsOpenInspectionURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    
    $scope.save = function() {
	    var output = sharedService.callAjax(updateOutgoingToolsOpenInspectionURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jarManagerOpenInspectionDetail/' + $scope._id;;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('JarManagerCasedInspectionEditController', function($scope, $rootScope, $controller, $routeParams, sharedService, NgTableParams, $filter) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
    var output = sharedService.getDataFromServer(getPluralListURL + '/collections/JarTypeCased');
	$scope.jarTypeList = output[0].data;
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getOutgoingToolsCasedInspectionURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    
    $scope.save = function() {
	    var output = sharedService.callAjax(updateOutgoingToolsCasedInspectionURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jarManagerCasedInspectionDetail/' + $scope._id;;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

// DETAIL

dashboardControllers.controller('JarManagerOpenInspectionDetailController', function($scope, $rootScope, $controller, $routeParams, sharedService, NgTableParams, $filter) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getOutgoingToolsOpenInspectionURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    if ($scope.obj && $scope.obj.job) {
    	output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope.obj.job);
    	if (output && output.data) {
    		$scope.jobInfo = output.data[0];
    		output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope.obj.job);
    	    $scope.svo = output.data[0];
    	}
    }
    $scope.detailPdf = function() {
		window.open(getInspectionOpenDetailPdfURL + "/_id/" + $scope._id, "_self");
	}
});

dashboardControllers.controller('JarManagerCasedInspectionDetailController', function($scope, $rootScope, $controller, $routeParams, sharedService, NgTableParams, $filter) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getOutgoingToolsCasedInspectionURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    if ($scope.obj && $scope.obj.job) {
    	output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope.obj.job);
    	if (output && output.data) {
    		$scope.jobInfo = output.data[0];
    	}
    }
    $scope.detailPdf = function() {
		window.open(getInspectionCasedDetailPdfURL + "/_id/" + $scope._id, "_self");
	}
});

//leak BARKER - CASED

dashboardControllers.controller('JarManagerCasedLeakBakerController', function($scope, $rootScope, $controller, $routeParams, sharedService, NgTableParams, $filter) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
    $scope.obj = {};
    output = sharedService.getDataFromServer(getOutgoingToolsCasedLeakBakerListURL);
    $scope.obj = output.data;
    var data = $scope.obj;
    if (data == null) {
    	data = [];
    }
    
    $scope.objTableParams = $scope.getTableParam(data);
	
	$scope.deleteObj = function(idToDel) {
		if (confirm("Are You Sure Want To Delete ?")) {
			var dataToSend = {"_id": idToDel};
	        var output = sharedService.callAjax(deleteOutgoingToolsCasedLeakBakerURL, "post", dataToSend);
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

dashboardControllers.controller('JarManagerCasedLeakBakerNewController', function($scope, $rootScope, $controller, $routeParams, sharedService, NgTableParams, $filter) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
    $scope.obj = {};

    $scope.copyPrevMeg = function() {
    	output = sharedService.getDataFromServer(getPrevOutgoingToolsCasedLeakBakerURL + "/_id/" + $scope._id);
        if (output != null && output.data.length > 0) {
        	var prevObj = output.data[0];
        	$scope.obj.megSerial = prevObj.megSerial;
        	$scope.obj.megDate = prevObj.megDate;
        	var megDateHandle = $('#megDate');
        	megDateHandle.attr('sync-lock', 'true');
        	megDateHandle.data('datepicker').setUTCDate(new Date(prevObj.megDate * 1000));
        	megDateHandle.removeAttr('sync-lock');
        	$scope.obj.inOut = prevObj.inOut;
        	$scope.obj.inOut0Value = prevObj.inOut0Value;
        	$scope.obj.inOut1Value = prevObj.inOut1Value;
        }
    }
    
    $scope.save = function() {
	    var output = sharedService.callAjax(saveOutgoingToolsCasedLeakBakerURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jarManagerCasedLeakBakerList';
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('JarManagerCasedLeakBakerEditController', function($scope, $rootScope, $controller, $routeParams, sharedService, NgTableParams, $filter) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getOutgoingToolsCasedLeakBakerURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];

    $scope.copyPrevMeg = function() {
    	output = sharedService.getDataFromServer(getPrevOutgoingToolsCasedLeakBakerURL + "/_id/" + $scope._id);
        if (output != null && output.data.length > 0) {
        	var prevObj = output.data[0];
        	$scope.obj.megSerial = prevObj.megSerial;
        	$scope.obj.megDate = prevObj.megDate;
        	var megDateHandle = $('#megDate');
        	megDateHandle.attr('sync-lock', 'true');
        	megDateHandle.data('datepicker').setUTCDate(new Date(prevObj.megDate * 1000));
        	megDateHandle.removeAttr('sync-lock');
        	$scope.obj.inOut = prevObj.inOut;
        	$scope.obj.inOut0Value = prevObj.inOut0Value;
        	$scope.obj.inOut1Value = prevObj.inOut1Value;
        }
    }
    
    $scope.save = function() {
	    var output = sharedService.callAjax(updateOutgoingToolsCasedLeakBakerURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jarManagerCasedLeakBakerDetail/' + $scope._id;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('JarManagerCasedLeakBakerDetailController', function($scope, $rootScope, $controller, $routeParams, sharedService, NgTableParams, $filter) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getOutgoingToolsCasedLeakBakerURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    if ($scope.obj && $scope.obj.job) {
    	output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope.obj.job);
    	if (output && output.data) {
    		$scope.jobInfo = output.data[0];
    	}
    }
    
    $scope.detailPdf = function() {
		window.open(getLeakBakerCasedDetailPdfURL + "/_id/" + $scope._id, "_self");
	}
});

//Leak BAKER - OPEN

dashboardControllers.controller('JarManagerOpenLeakBakerController', function($scope, $rootScope, $controller, $routeParams, sharedService, NgTableParams, $filter) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getOutgoingToolsOpenLeakBakerListURL + "/_id/" + $scope._id);
    $scope.obj = output.data;
    var data = $scope.obj;
    if (data == null) {
    	data = [];
    }
    
	$scope.objTableParams = $scope.getTableParam(data);
	
	$scope.deleteObj = function(idToDel) {
		if (confirm("Are You Sure Want To Delete ?")) {
			var dataToSend = {"_id": idToDel};
	        var output = sharedService.callAjax(deleteOutgoingToolsOpenLeakBakerURL, "post", dataToSend);
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

dashboardControllers.controller('JarManagerOpenLeakBakerNewController', function($scope, $rootScope, $controller, $routeParams, sharedService, NgTableParams, $filter) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
    $scope.obj = {};

    $scope.copyPrevMeg = function() {
    	output = sharedService.getDataFromServer(getPrevOutgoingToolsOpenLeakBakerURL + "/_id/" + $scope._id);
        if (output != null && output.data.length > 0) {
        	var prevObj = output.data[0];
        	$scope.obj.megSerial = prevObj.megSerial;
        	$scope.obj.megDate = prevObj.megDate;
        	var megDateHandle = $('#megDate');
        	megDateHandle.attr('sync-lock', 'true');
        	megDateHandle.data('datepicker').setUTCDate(new Date(prevObj.megDate * 1000));
        	megDateHandle.removeAttr('sync-lock');
        	$scope.obj.inOut = prevObj.inOut;
        	$scope.obj.inOut0Value = prevObj.inOut0Value;
        	$scope.obj.inOut1Value = prevObj.inOut1Value;
        }
    }
    
    $scope.getPinNumber = function(type) {
    	if (type == '0') {
    		var arr = [];
    		for (var i = 11; i <= 26; i++) {
    			$scope.obj['continuity' + i] = '';
    			$scope.obj['leaks' + i] = '';
    		}
    		for (var i = 1; i <= 10; i++) {
    			arr.push(i);
    		}
    		return arr;
    	} else {
    		var arr = [];
    		for (var i = 1; i <= 26; i++) {
    			arr.push(i);
    		}
    		return arr;
    	}
    }
    
    $scope.copyContinuity = function() {
    	if ($scope.obj.jarType == '0') {
    		for (var i = 1; i <= 10; i++) {
    			$scope.obj['continuity' + i] = $scope.continuityAll;
    		}
    	} else {
    		for (var i = 1; i <= 26; i++) {
    			$scope.obj['continuity' + i] = $scope.continuityAll;
    		}
    	}
    }
    
    $scope.copyLeaks = function() {
    	if ($scope.obj.jarType == '0') {
    		for (var i = 1; i <= 10; i++) {
    			$scope.obj['leaks' + i] = $scope.leaksAll;
    		}
    	} else {
    		for (var i = 1; i <= 26; i++) {
    			$scope.obj['leaks' + i] = $scope.leaksAll;
    		}
    	}
    }
    
    $scope.save = function() {
	    var output = sharedService.callAjax(saveOutgoingToolsOpenLeakBakerURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jarManagerOpenLeakBakerList';
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('JarManagerOpenLeakBakerEditController', function($scope, $rootScope, $controller, $routeParams, sharedService, NgTableParams, $filter) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getOutgoingToolsOpenLeakBakerURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];

    $scope.copyPrevMeg = function() {
    	output = sharedService.getDataFromServer(getPrevOutgoingToolsOpenLeakBakerURL + "/_id/" + $scope._id);
        if (output != null && output.data.length > 0) {
        	var prevObj = output.data[0];
        	$scope.obj.megSerial = prevObj.megSerial;
        	$scope.obj.megDate = prevObj.megDate;
        	var megDateHandle = $('#megDate');
        	megDateHandle.attr('sync-lock', 'true');
        	megDateHandle.data('datepicker').setUTCDate(new Date(prevObj.megDate * 1000));
        	megDateHandle.removeAttr('sync-lock');
        	$scope.obj.inOut = prevObj.inOut;
        	$scope.obj.inOut0Value = prevObj.inOut0Value;
        	$scope.obj.inOut1Value = prevObj.inOut1Value;
        }
    }
    
    $scope.getPinNumber = function(type) {
    	if (type == '0') {
    		var arr = [];
    		for (var i = 11; i <= 26; i++) {
    			$scope.obj['continuity' + i] = '';
    			$scope.obj['leaks' + i] = '';
    		}
    		for (var i = 1; i <= 10; i++) {
    			arr.push(i);
    		}
    		return arr;
    	} else {
    		var arr = [];
    		for (var i = 1; i <= 26; i++) {
    			arr.push(i);
    		}
    		return arr;
    	}
    }
    
    $scope.copyContinuity = function() {
    	if ($scope.obj.jarType == '0') {
    		for (var i = 1; i <= 10; i++) {
    			$scope.obj['continuity' + i] = $scope.continuityAll;
    		}
    	} else {
    		for (var i = 1; i <= 26; i++) {
    			$scope.obj['continuity' + i] = $scope.continuityAll;
    		}
    	}
    }
    
    $scope.copyLeaks = function() {
    	if ($scope.obj.jarType == '0') {
    		for (var i = 1; i <= 10; i++) {
    			$scope.obj['leaks' + i] = $scope.leaksAll;
    		}
    	} else {
    		for (var i = 1; i <= 26; i++) {
    			$scope.obj['leaks' + i] = $scope.leaksAll;
    		}
    	}
    }
    $scope.save = function() {
	    var output = sharedService.callAjax(updateOutgoingToolsOpenLeakBakerURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jarManagerOpenLeakBakerDetail/' + $scope._id;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('JarManagerOpenLeakBakerDetailController', function($scope, $rootScope, $controller, $routeParams, sharedService, NgTableParams, $filter) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getOutgoingToolsOpenLeakBakerURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    if ($scope.obj && $scope.obj.job) {
    	output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope.obj.job);
    	if (output && output.data) {
    		$scope.jobInfo = output.data[0];
    	}
    }
    
    $scope.getPinNumber = function(type) {
    	if (type == '0') {
    		var arr = [];
    		for (var i = 11; i <= 26; i++) {
    			$scope.obj['continuity' + i] = '';
    			$scope.obj['leaks' + i] = '';
    		}
    		for (var i = 1; i <= 10; i++) {
    			arr.push(i);
    		}
    		return arr;
    	} else {
    		var arr = [];
    		for (var i = 1; i <= 26; i++) {
    			arr.push(i);
    		}
    		return arr;
    	}
    }
    
    $scope.detailPdf = function() {
		window.open(getLeakBakerOpenDetailPdfURL + "/_id/" + $scope._id, "_self");
	}
});

//Leak SCHLUMBERGER 

dashboardControllers.controller('JarManagerOpenLeakBergerController', function($scope, $rootScope, $controller, $routeParams, sharedService, NgTableParams, $filter) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
    $scope.obj = {};
    output = sharedService.getDataFromServer(getOutgoingToolsLeakBergerListURL);
    $scope.obj = output.data;
    var data = $scope.obj;
    if (data == null) {
    	data = [];
    }
    
	$scope.objTableParams = $scope.getTableParam(data);
	
	$scope.deleteObj = function(idToDel) {
		if (confirm("Are You Sure Want To Delete ?")) {
			var dataToSend = {"_id": idToDel};
	        var output = sharedService.callAjax(deleteOutgoingToolsLeakBergerURL, "post", dataToSend);
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

dashboardControllers.controller('JarManagerOpenLeakBergerNewController', function($scope, $rootScope, $controller, $routeParams, sharedService, NgTableParams, $filter) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
    $scope.obj = {};

    $scope.copyPrevMeg = function() {
    	output = sharedService.getDataFromServer(getPrevOutgoingToolsLeakBergerURL + "/_id/" + $scope._id);
        if (output != null && output.data.length > 0) {
        	var prevObj = output.data[0];
        	$scope.obj.megSerial = prevObj.megSerial;
        	$scope.obj.megDate = prevObj.megDate;
        	var megDateHandle = $('#megDate');
        	megDateHandle.attr('sync-lock', 'true');
        	megDateHandle.data('datepicker').setUTCDate(new Date(prevObj.megDate * 1000));
        	megDateHandle.removeAttr('sync-lock');
        	$scope.obj.inOut = prevObj.inOut;
        	$scope.obj.inOut0Value = prevObj.inOut0Value;
        	$scope.obj.inOut1Value = prevObj.inOut1Value;
        }
    }
    
    $scope.getPinNumber = function(type) {
    	if (type == '0') {
    		// 1-10,14,15,16,19,20 => 15 pin
    		$scope.obj['continuity12'] = '';$scope.obj['leaks12'] = '';
    		$scope.obj['continuity13'] = '';$scope.obj['leaks13'] = '';
    		$scope.obj['continuity30'] = '';$scope.obj['leaks30'] = '';
    		$scope.obj['continuity31'] = '';$scope.obj['leaks31'] = '';
    		var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15, 16, 19, 20];
    		return arr;
    	} else {
    		// 1-10,12-16,19,20,30,31 => 19 pin
    		var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 19, 20, 30, 31];
    		return arr;
    	}
    }
    
    $scope.copyContinuity = function() {
    	var arr = [];
    	if ($scope.obj.jarType == '0') {
    		arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15, 16, 19, 20];
    	} else {
    		arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 19, 20, 30, 31];
    	}
    	for (var i = 0; i < arr.length; i++) {
			$scope.obj['continuity' + arr[i]] = $scope.continuityAll;
		}
    }
    
    $scope.copyLeaks = function() {
    	var arr = [];
    	if ($scope.obj.jarType == '0') {
    		arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15, 16, 19, 20];
    	} else {
    		arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 19, 20, 30, 31];
    	}
    	for (var i = 0; i < arr.length; i++) {
			$scope.obj['leaks' + arr[i]] = $scope.leaksAll;
		}
    }
    
    $scope.save = function() {
	    var output = sharedService.callAjax(saveOutgoingToolsLeakBergerURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jarManagerOpenLeakBergerList';
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('JarManagerOpenLeakBergerEditController', function($scope, $rootScope, $controller, $routeParams, sharedService, NgTableParams, $filter) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getOutgoingToolsLeakBergerURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];

    $scope.copyPrevMeg = function() {
    	output = sharedService.getDataFromServer(getPrevOutgoingToolsLeakBergerURL + "/_id/" + $scope._id);
        if (output != null && output.data.length > 0) {
        	var prevObj = output.data[0];
        	$scope.obj.megSerial = prevObj.megSerial;
        	$scope.obj.megDate = prevObj.megDate;
        	var megDateHandle = $('#megDate');
        	megDateHandle.attr('sync-lock', 'true');
        	megDateHandle.data('datepicker').setUTCDate(new Date(prevObj.megDate * 1000));
        	megDateHandle.removeAttr('sync-lock');
        	$scope.obj.inOut = prevObj.inOut;
        	$scope.obj.inOut0Value = prevObj.inOut0Value;
        	$scope.obj.inOut1Value = prevObj.inOut1Value;
        }
    }
    
    $scope.getPinNumber = function(type) {
    	if (type == '0') {
    		// 1-10,14,15,16,19,20 => 15 pin
    		$scope.obj['continuity12'] = '';$scope.obj['leaks12'] = '';
    		$scope.obj['continuity13'] = '';$scope.obj['leaks13'] = '';
    		$scope.obj['continuity30'] = '';$scope.obj['leaks30'] = '';
    		$scope.obj['continuity31'] = '';$scope.obj['leaks31'] = '';
    		var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15, 16, 19, 20];
    		return arr;
    	} else {
    		// 1-10,12-16,19,20,30,31 => 19 pin
    		var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 19, 20, 30, 31];
    		return arr;
    	}
    }
    
    $scope.copyContinuity = function() {
    	var arr = [];
    	if ($scope.obj.jarType == '0') {
    		arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15, 16, 19, 20];
    	} else {
    		arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 19, 20, 30, 31];
    	}
    	for (var i = 0; i < arr.length; i++) {
			$scope.obj['continuity' + arr[i]] = $scope.continuityAll;
		}
    }
    
    $scope.copyLeaks = function() {
    	var arr = [];
    	if ($scope.obj.jarType == '0') {
    		arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15, 16, 19, 20];
    	} else {
    		arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 19, 20, 30, 31];
    	}
    	for (var i = 0; i < arr.length; i++) {
			$scope.obj['leaks' + arr[i]] = $scope.leaksAll;
		}
    }
    $scope.save = function() {
	    var output = sharedService.callAjax(updateOutgoingToolsLeakBergerURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jarManagerOpenLeakBergerDetail/' + $scope._id;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('JarManagerOpenLeakBergerDetailController', function($scope, $rootScope, $controller, $routeParams, sharedService, NgTableParams, $filter) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getOutgoingToolsLeakBergerURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    if ($scope.obj && $scope.obj.job) {
    	output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope.obj.job);
    	if (output && output.data) {
    		$scope.jobInfo = output.data[0];
    	}
    }
    
    $scope.getPinNumber = function(type) {
    	if (type == '0') {
    		// 1-10,14,15,16,19,20 => 15 pin
    		$scope.obj['continuity12'] = '';$scope.obj['leaks12'] = '';
    		$scope.obj['continuity13'] = '';$scope.obj['leaks13'] = '';
    		$scope.obj['continuity30'] = '';$scope.obj['leaks30'] = '';
    		$scope.obj['continuity31'] = '';$scope.obj['leaks31'] = '';
    		var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15, 16, 19, 20];
    		return arr;
    	} else {
    		// 1-10,12-16,19,20,30,31 => 19 pin
    		var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 19, 20, 30, 31];
    		return arr;
    	}
    }
    
    $scope.detailPdf = function() {
		window.open(getLeakBergerOpenDetailPdfURL + "/_id/" + $scope._id, "_self");
	}
});

//Leak HALLIBURTON 

dashboardControllers.controller('JarManagerOpenLeakBurtonController', function($scope, $rootScope, $controller, $routeParams, sharedService, NgTableParams, $filter) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
    $scope.obj = {};
    output = sharedService.getDataFromServer(getOutgoingToolsLeakBurtonListURL);
    $scope.obj = output.data;
    var data = $scope.obj;
    if (data == null) {
    	data = [];
    }
    
	$scope.objTableParams = $scope.getTableParam(data);
	
	$scope.deleteObj = function(idToDel) {
		if (confirm("Are You Sure Want To Delete ?")) {
			var dataToSend = {"_id": idToDel};
	        var output = sharedService.callAjax(deleteOutgoingToolsLeakBurtonURL, "post", dataToSend);
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

dashboardControllers.controller('JarManagerOpenLeakBurtonNewController', function($scope, $rootScope, $controller, $routeParams, sharedService, NgTableParams, $filter) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
    $scope.obj = {};
    $scope.obj.jarModel = '1';
    $scope.obj.jarType = '0';

    $scope.copyPrevMeg = function() {
    	output = sharedService.getDataFromServer(getPrevOutgoingToolsLeakBurtonURL + "/_id/" + $scope._id);
        if (output != null && output.data.length > 0) {
        	var prevObj = output.data[0];
        	$scope.obj.megSerial = prevObj.megSerial;
        	$scope.obj.megDate = prevObj.megDate;
        	var megDateHandle = $('#megDate');
        	megDateHandle.attr('sync-lock', 'true');
        	megDateHandle.data('datepicker').setUTCDate(new Date(prevObj.megDate * 1000));
        	megDateHandle.removeAttr('sync-lock');
        	$scope.obj.inOut = prevObj.inOut;
        	$scope.obj.inOut0Value = prevObj.inOut0Value;
        	$scope.obj.inOut1Value = prevObj.inOut1Value;
        }
    }
    
    $scope.getPinNumber = function(type) {
    	if (type == '0') {
    		// 1-10,14,15,16,19,20 => 12 pin
    		var arr = [1, 2, 3, 4, 12, 13, 14, 15, 16, 17, 18, 19];
    		return arr;
    	}
    }
    
    $scope.copyContinuity = function() {
    	var arr = [];
    	if ($scope.obj.jarType == '0') {
    		arr = [1, 2, 3, 4, 12, 13, 14, 15, 16, 17, 18, 19];
    	}
    	for (var i = 0; i < arr.length; i++) {
			$scope.obj['continuity' + arr[i]] = $scope.continuityAll;
		}
    }
    
    $scope.copyLeaks = function() {
    	var arr = [];
    	if ($scope.obj.jarType == '0') {
    		arr = [1, 2, 3, 4, 12, 13, 14, 15, 16, 17, 18, 19];
    	}
    	for (var i = 0; i < arr.length; i++) {
			$scope.obj['leaks' + arr[i]] = $scope.leaksAll;
		}
    }
    
    $scope.save = function() {
	    var output = sharedService.callAjax(saveOutgoingToolsLeakBurtonURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jarManagerOpenLeakBurtonList';
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('JarManagerOpenLeakBurtonEditController', function($scope, $rootScope, $controller, $routeParams, sharedService, NgTableParams, $filter) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getOutgoingToolsLeakBurtonURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];

    $scope.copyPrevMeg = function() {
    	output = sharedService.getDataFromServer(getPrevOutgoingToolsLeakBurtonURL + "/_id/" + $scope._id);
        if (output != null && output.data.length > 0) {
        	var prevObj = output.data[0];
        	$scope.obj.megSerial = prevObj.megSerial;
        	$scope.obj.megDate = prevObj.megDate;
        	var megDateHandle = $('#megDate');
        	megDateHandle.attr('sync-lock', 'true');
        	megDateHandle.data('datepicker').setUTCDate(new Date(prevObj.megDate * 1000));
        	megDateHandle.removeAttr('sync-lock');
        	$scope.obj.inOut = prevObj.inOut;
        	$scope.obj.inOut0Value = prevObj.inOut0Value;
        	$scope.obj.inOut1Value = prevObj.inOut1Value;
        }
    }
    
    $scope.getPinNumber = function(type) {
    	if (type == '0') {
    		// 1-10,14,15,16,19,20 => 12 pin
    		var arr = [1, 2, 3, 4, 12, 13, 14, 15, 16, 17, 18, 19];
    		return arr;
    	}
    }
    
    $scope.copyContinuity = function() {
    	var arr = [];
    	if ($scope.obj.jarType == '0') {
    		arr = [1, 2, 3, 4, 12, 13, 14, 15, 16, 17, 18, 19];
    	}
    	for (var i = 0; i < arr.length; i++) {
			$scope.obj['continuity' + arr[i]] = $scope.continuityAll;
		}
    }
    
    $scope.copyLeaks = function() {
    	var arr = [];
    	if ($scope.obj.jarType == '0') {
    		arr = [1, 2, 3, 4, 12, 13, 14, 15, 16, 17, 18, 19];
    	}
    	for (var i = 0; i < arr.length; i++) {
			$scope.obj['leaks' + arr[i]] = $scope.leaksAll;
		}
    }
    
    $scope.save = function() {
	    var output = sharedService.callAjax(updateOutgoingToolsLeakBurtonURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jarManagerOpenLeakBurtonDetail/' + $scope._id;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
});

dashboardControllers.controller('JarManagerOpenLeakBurtonDetailController', function($scope, $rootScope, $controller, $routeParams, sharedService, NgTableParams, $filter) {
	$rootScope.selectedMenu = "jarManager";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Jar Manager";
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getOutgoingToolsLeakBurtonURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    if ($scope.obj && $scope.obj.job) {
    	output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope.obj.job);
    	if (output && output.data) {
    		$scope.jobInfo = output.data[0];
    	}
    }
    
    $scope.getPinNumber = function(type) {
    	if (type == '0') {
    		// 1-10,14,15,16,19,20 => 12 pin
    		var arr = [1, 2, 3, 4, 12, 13, 14, 15, 16, 17, 18, 19];
    		return arr;
    	}
    }
    
    $scope.detailPdf = function() {
		window.open(getLeakBurtonOpenDetailPdfURL + "/_id/" + $scope._id, "_self");
	}
});