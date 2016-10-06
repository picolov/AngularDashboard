dashboardControllers.controller('JobServiceOrderOpenController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    $scope.svo = output.data[0];
    if ($scope.obj == null) {
    	location.href = '#/jobInfoServiceOrderNew0/' + $scope._id;
    }
    var output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    $scope.detailPdf = function() {
		window.open(getServiceOrderOpenDetailPdfURL + "/_id/" + $scope._id, "_self");
	}
    $scope.upload = function(element) {
    	var num = $(element).data("idx");
		var file = $('#upload' + num)[0].files[0];
	    var type = "none";
	    if (file && file.type === 'application/pdf') {
	    	type = "pdf";
	    }
	    if (type === "none") {
	      alert("Only PDF files that can be uploaded");
	      return;
	    }
	    
	    var fd = new FormData(); 
	    fd.append("file", file);
	    fd.append("id", $scope._id);
	    fd.append("num", num);
	    var xhr = new XMLHttpRequest();
	    xhr.open("POST", uploadCalibrationURL);

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
    // item list
    $scope.getToolCount = [];
    for (var i = 1; i <= $scope.obj.toolCount; i++) {
    	$scope.getToolCount.push({id:UUID(), idx:i});
	}
    $scope.getBasketCount = [];
    for (var i = 1; i <= $scope.obj.basketCount; i++) {
    	$scope.getBasketCount.push({id:UUID(), idx:i});
	}
    $scope.getSlingCount = [];
    for (var i = 1; i <= $scope.obj.slingCount; i++) {
    	$scope.getSlingCount.push({id:UUID(), idx:i});
	}
});

dashboardControllers.controller('JobServiceOrderOpenEditController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company~profile~Contact~JarType~TypeRig');
	$scope.companyList = output[0].data;
	$scope.profileList = output[1].data;
	$scope.contactList = output[2].data;
	$scope.jarTypeList = output[3].data;
	$scope.rigTypeList = output[4].data;
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    $scope.svo = output.data[0];
    if ($scope.obj == null) {
    	$scope.obj = {};
    }
    $scope.selectBillTo = function (item, model) {
	    $scope.obj.billToAddress = "";
	    if (model && model.billingStreet) {
	    	$scope.obj.billToAddress += model.billingStreet;
	    }
	    $scope.obj.billToAddress2 = "";
	    if (model && model.billingCity) {
	    	$scope.obj.billToAddress2 += model.billingCity;
	    }
	    if (model && model.billingState) {
	    	$scope.obj.billToAddress2 += ", " + model.billingState;
	    }
	    if (model && model.billingZip) {
	    	if (model.billingState) {
	    		$scope.obj.billToAddress2 += " " + model.billingZip;
	    	} else {
	    		$scope.obj.billToAddress2 += ", " + model.billingZip;
	    	}
	    }
	    $scope.obj.billToPhone = "";
	    if (model && model.phone) {
	    	$scope.obj.billToPhone = model.phone;
	    }
    };
    
    $scope.save = function() {
    	$scope.obj.job = $scope._id;
    	$scope.obj.jobInfo = $scope.jobInfo;
	    var output = sharedService.callAjax(updateServiceOrderURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	        	//alert("success saved");
	            //sharedService.setToBreadcrumb(sharedService.getBreadcrumb().length-1);
	            location.href = '#/jobInfoServiceOrder0/' + $scope._id;;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
    $scope.$on('newCompany',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company');
    	$scope.companyList = output[0].data;
    	for (var i = 0; i < $scope.companyList.length; i++) {
    		if ($scope.companyList[i]._id == data.value.data._id) {
    			$scope.obj.billTo = $scope.companyList[i];
    			$scope.selectBillTo("", $scope.obj.billTo);
    			break;
    		}
    	}
    });
    $scope.$on('newOilCompany',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company');
    	$scope.companyList = output[0].data;
    	for (var i = 0; i < $scope.companyList.length; i++) {
    		if ($scope.companyList[i]._id == data.value.data._id) {
    			$scope.jobInfo.oilCompany = $scope.companyList[i];
    			break;
    		}
    	}
    });
    $scope.$on('newServiceCompany',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company');
    	$scope.companyList = output[0].data;
    	for (var i = 0; i < $scope.companyList.length; i++) {
    		if ($scope.companyList[i]._id == data.value.data._id) {
    			$scope.jobInfo.serviceCompany = $scope.companyList[i];
    			break;
    		}
    	}
    });
    $scope.$on('newEngineerContact',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact');
    	$scope.contactList = output[0].data;
    	for (var i = 0; i < $scope.contactList.length; i++) {
    		if ($scope.contactList[i]._id == data.value.data._id) {
    			$scope.jobInfo.wirelineEngineer = $scope.contactList[i];
    			break;
    		}
    	}
    });
    $scope.$on('newCompanyManContact',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact');
    	$scope.contactList = output[0].data;
    	for (var i = 0; i < $scope.contactList.length; i++) {
    		if ($scope.contactList[i]._id == data.value.data._id) {
    			$scope.jobInfo.companyMan = $scope.contactList[i];
    			break;
    		}
    	}
    });
    $scope.$on('newContactContact',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact');
    	$scope.contactList = output[0].data;
    	for (var i = 0; i < $scope.contactList.length; i++) {
    		if ($scope.contactList[i]._id == data.value.data._id) {
    			$scope.jobInfo.contact = $scope.contactList[i];
    			break;
    		}
    	}
    });
    
    $scope.getToolCount = [];
    if (!$scope.obj.toolCount || $scope.obj.toolCount == 0) {
    	$scope.obj.toolCount = 1;
    }
    for (var i = 1; i <= $scope.obj.toolCount; i++) {
    	$scope.getToolCount.push({id:UUID(), idx:i});
	}
	
	$scope.addTool = function() {
		var idx = arguments[0];
		for (var i = 0; i < arguments.length; i++) {
			for (var j = $scope.obj.toolCount; j > idx ; j--) {
				$scope.obj[arguments[i] + (j + 1)] = $scope.obj[arguments[i] + j];
			}
		}
		for (var i = 0; i < arguments.length; i++) {
			delete $scope.obj[arguments[i] + (idx + 1)];
		}
		$scope.obj.toolCount++;
		$scope.getToolCount = [];
	    for (var i = 1; i <= $scope.obj.toolCount; i++) {
	    	$scope.getToolCount.push({id:UUID(), idx:i});
		}
	    
	};
	
	$scope.deleteTool = function() {
		if (confirm("Are You Sure Want To Delete ?")) {
			var idx = arguments[0];
			
			for (var i = 0; i < arguments.length; i++) {
				for (var j = idx; j < $scope.obj.toolCount ; j++) {
					$scope.obj[arguments[i] + (j)] = $scope.obj[arguments[i] + (j + 1)];
				}
			}
			for (var i = 0; i < arguments.length; i++) {
				delete $scope.obj[arguments[i] + ($scope.obj.toolCount)];
			}
			
			$scope.obj.toolCount--;
			$scope.getToolCount = [];
		    for (var i = 1; i <= $scope.obj.toolCount; i++) {
		    	$scope.getToolCount.push({id:UUID(), idx:i});
			}
		}
	};
	
	// BASKET
	$scope.getBasketCount = [];
    if (!$scope.obj.basketCount || $scope.obj.basketCount == 0) {
    	$scope.obj.basketCount = 1;
    }
    for (var i = 1; i <= $scope.obj.basketCount; i++) {
    	$scope.getBasketCount.push({id:UUID(), idx:i});
	}
	
	$scope.addBasket = function() {
		var idx = arguments[0];
		for (var i = 0; i < arguments.length; i++) {
			for (var j = $scope.obj.basketCount; j > idx ; j--) {
				$scope.obj[arguments[i] + (j + 1)] = $scope.obj[arguments[i] + j];
			}
		}
		for (var i = 0; i < arguments.length; i++) {
			delete $scope.obj[arguments[i] + (idx + 1)];
		}
		$scope.obj.basketCount++;
		$scope.getBasketCount = [];
	    for (var i = 1; i <= $scope.obj.basketCount; i++) {
	    	$scope.getBasketCount.push({id:UUID(), idx:i});
		}
	    
	};
	
	$scope.deleteBasket = function() {
		if (confirm("Are You Sure Want To Delete ?")) {
			var idx = arguments[0];
			
			for (var i = 0; i < arguments.length; i++) {
				for (var j = idx; j < $scope.obj.basketCount ; j++) {
					$scope.obj[arguments[i] + (j)] = $scope.obj[arguments[i] + (j + 1)];
				}
			}
			for (var i = 0; i < arguments.length; i++) {
				delete $scope.obj[arguments[i] + ($scope.obj.basketCount)];
			}
			
			$scope.obj.basketCount--;
			$scope.getBasketCount = [];
		    for (var i = 1; i <= $scope.obj.basketCount; i++) {
		    	$scope.getBasketCount.push({id:UUID(), idx:i});
			}
		}
	};
	
	// SLING
	$scope.getSlingCount = [];
    if (!$scope.obj.slingCount || $scope.obj.slingCount == 0) {
    	$scope.obj.slingCount = 1;
    }
    for (var i = 1; i <= $scope.obj.slingCount; i++) {
    	$scope.getSlingCount.push({id:UUID(), idx:i});
	}
	
	$scope.addSling = function() {
		var idx = arguments[0];
		for (var i = 0; i < arguments.length; i++) {
			for (var j = $scope.obj.slingCount; j > idx ; j--) {
				$scope.obj[arguments[i] + (j + 1)] = $scope.obj[arguments[i] + j];
			}
		}
		for (var i = 0; i < arguments.length; i++) {
			delete $scope.obj[arguments[i] + (idx + 1)];
		}
		$scope.obj.slingCount++;
		$scope.getSlingCount = [];
	    for (var i = 1; i <= $scope.obj.slingCount; i++) {
	    	$scope.getSlingCount.push({id:UUID(), idx:i});
		}
	    
	};
	
	$scope.deleteSling = function() {
		if (confirm("Are You Sure Want To Delete ?")) {
			var idx = arguments[0];
			
			for (var i = 0; i < arguments.length; i++) {
				for (var j = idx; j < $scope.obj.slingCount ; j++) {
					$scope.obj[arguments[i] + (j)] = $scope.obj[arguments[i] + (j + 1)];
				}
			}
			for (var i = 0; i < arguments.length; i++) {
				delete $scope.obj[arguments[i] + ($scope.obj.slingCount)];
			}
			
			$scope.obj.slingCount--;
			$scope.getSlingCount = [];
		    for (var i = 1; i <= $scope.obj.slingCount; i++) {
		    	$scope.getSlingCount.push({id:UUID(), idx:i});
			}
		}
	};
});

dashboardControllers.controller('JobServiceOrderOpenNewController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company~profile~Contact~JarType~TypeRig');
	$scope.companyList = output[0].data;
	$scope.profileList = output[1].data;
	$scope.contactList = output[2].data;
	$scope.jarTypeList = output[3].data;
	$scope.rigTypeList = output[4].data;
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    $scope.obj = {};
    $scope.selectBillTo = function (item, model) {
	    $scope.obj.billToAddress = "";
	    if (model && model.billingStreet) {
	    	$scope.obj.billToAddress += model.billingStreet;
	    }
	    $scope.obj.billToAddress2 = "";
	    if (model && model.billingCity) {
	    	$scope.obj.billToAddress2 += model.billingCity;
	    }
	    if (model && model.billingState) {
	    	$scope.obj.billToAddress2 += ", " + model.billingState;
	    }
	    if (model && model.billingZip) {
	    	if (model.billingState) {
	    		$scope.obj.billToAddress2 += " " + model.billingZip;
	    	} else {
	    		$scope.obj.billToAddress2 += ", " + model.billingZip;
	    	}
	    }
	    $scope.obj.billToPhone = "";
	    if (model && model.phone) {
	    	$scope.obj.billToPhone = model.phone;
	    }
    };
  
    $scope.save = function() {
    	$scope.obj.job = $scope._id;
    	$scope.obj.jobInfo = $scope.jobInfo;
	    var output = sharedService.callAjax(saveServiceOrderURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	        	//alert("success saved");
	            //sharedService.setToBreadcrumb(sharedService.getBreadcrumb().length-1);
	            location.href = '#/jobInfoServiceOrder0/' + $scope._id;;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
    $scope.$on('newCompany',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company');
    	$scope.companyList = output[0].data;
    	for (var i = 0; i < $scope.companyList.length; i++) {
    		if ($scope.companyList[i]._id == data.value.data._id) {
    			$scope.obj.billTo = $scope.companyList[i];
    			$scope.selectBillTo("", $scope.obj.billTo);
    			break;
    		}
    	}
    });
    $scope.$on('newOilCompany',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company');
    	$scope.companyList = output[0].data;
    	for (var i = 0; i < $scope.companyList.length; i++) {
    		if ($scope.companyList[i]._id == data.value.data._id) {
    			$scope.jobInfo.oilCompany = $scope.companyList[i];
    			break;
    		}
    	}
    });
    $scope.$on('newServiceCompany',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company');
    	$scope.companyList = output[0].data;
    	for (var i = 0; i < $scope.companyList.length; i++) {
    		if ($scope.companyList[i]._id == data.value.data._id) {
    			$scope.jobInfo.serviceCompany = $scope.companyList[i];
    			break;
    		}
    	}
    });
    $scope.$on('newEngineerContact',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact');
    	$scope.contactList = output[0].data;
    	for (var i = 0; i < $scope.contactList.length; i++) {
    		if ($scope.contactList[i]._id == data.value.data._id) {
    			$scope.jobInfo.wirelineEngineer = $scope.contactList[i];
    			break;
    		}
    	}
    });
    $scope.$on('newCompanyManContact',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact');
    	$scope.contactList = output[0].data;
    	for (var i = 0; i < $scope.contactList.length; i++) {
    		if ($scope.contactList[i]._id == data.value.data._id) {
    			$scope.jobInfo.companyMan = $scope.contactList[i];
    			break;
    		}
    	}
    });
    $scope.$on('newContactContact',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact');
    	$scope.contactList = output[0].data;
    	for (var i = 0; i < $scope.contactList.length; i++) {
    		if ($scope.contactList[i]._id == data.value.data._id) {
    			$scope.jobInfo.contact = $scope.contactList[i];
    			break;
    		}
    	}
    });
    $scope.getToolCount = [];
    if (!$scope.obj.toolCount || $scope.obj.toolCount == 0) {
    	$scope.obj.toolCount = 1;
    }
    for (var i = 1; i <= $scope.obj.toolCount; i++) {
    	$scope.getToolCount.push({id:UUID(), idx:i});
	}
	
	$scope.addTool = function() {
		var idx = arguments[0];
		for (var i = 0; i < arguments.length; i++) {
			for (var j = $scope.obj.toolCount; j > idx ; j--) {
				$scope.obj[arguments[i] + (j + 1)] = $scope.obj[arguments[i] + j];
			}
		}
		for (var i = 0; i < arguments.length; i++) {
			delete $scope.obj[arguments[i] + (idx + 1)];
		}
		$scope.obj.toolCount++;
		$scope.getToolCount = [];
	    for (var i = 1; i <= $scope.obj.toolCount; i++) {
	    	$scope.getToolCount.push({id:UUID(), idx:i});
		}
	    
	};
	
	$scope.deleteTool = function() {
		if (confirm("Are You Sure Want To Delete ?")) {
			var idx = arguments[0];
			
			for (var i = 0; i < arguments.length; i++) {
				for (var j = idx; j < $scope.obj.toolCount ; j++) {
					$scope.obj[arguments[i] + (j)] = $scope.obj[arguments[i] + (j + 1)];
				}
			}
			for (var i = 0; i < arguments.length; i++) {
				delete $scope.obj[arguments[i] + ($scope.obj.toolCount)];
			}
			
			$scope.obj.toolCount--;
			$scope.getToolCount = [];
		    for (var i = 1; i <= $scope.obj.toolCount; i++) {
		    	$scope.getToolCount.push({id:UUID(), idx:i});
			}
		}
	};
	
	// BASKET
	$scope.getBasketCount = [];
    if (!$scope.obj.basketCount || $scope.obj.basketCount == 0) {
    	$scope.obj.basketCount = 1;
    }
    for (var i = 1; i <= $scope.obj.basketCount; i++) {
    	$scope.getBasketCount.push({id:UUID(), idx:i});
	}
	
	$scope.addBasket = function() {
		var idx = arguments[0];
		for (var i = 0; i < arguments.length; i++) {
			for (var j = $scope.obj.basketCount; j > idx ; j--) {
				$scope.obj[arguments[i] + (j + 1)] = $scope.obj[arguments[i] + j];
			}
		}
		for (var i = 0; i < arguments.length; i++) {
			delete $scope.obj[arguments[i] + (idx + 1)];
		}
		$scope.obj.basketCount++;
		$scope.getBasketCount = [];
	    for (var i = 1; i <= $scope.obj.basketCount; i++) {
	    	$scope.getBasketCount.push({id:UUID(), idx:i});
		}
	    
	};
	
	$scope.deleteBasket = function() {
		if (confirm("Are You Sure Want To Delete ?")) {
			var idx = arguments[0];
			
			for (var i = 0; i < arguments.length; i++) {
				for (var j = idx; j < $scope.obj.basketCount ; j++) {
					$scope.obj[arguments[i] + (j)] = $scope.obj[arguments[i] + (j + 1)];
				}
			}
			for (var i = 0; i < arguments.length; i++) {
				delete $scope.obj[arguments[i] + ($scope.obj.basketCount)];
			}
			
			$scope.obj.basketCount--;
			$scope.getBasketCount = [];
		    for (var i = 1; i <= $scope.obj.basketCount; i++) {
		    	$scope.getBasketCount.push({id:UUID(), idx:i});
			}
		}
	};
	
	// SLING
	$scope.getSlingCount = [];
    if (!$scope.obj.slingCount || $scope.obj.slingCount == 0) {
    	$scope.obj.slingCount = 1;
    }
    for (var i = 1; i <= $scope.obj.slingCount; i++) {
    	$scope.getSlingCount.push({id:UUID(), idx:i});
	}
	
	$scope.addSling = function() {
		var idx = arguments[0];
		for (var i = 0; i < arguments.length; i++) {
			for (var j = $scope.obj.slingCount; j > idx ; j--) {
				$scope.obj[arguments[i] + (j + 1)] = $scope.obj[arguments[i] + j];
			}
		}
		for (var i = 0; i < arguments.length; i++) {
			delete $scope.obj[arguments[i] + (idx + 1)];
		}
		$scope.obj.slingCount++;
		$scope.getSlingCount = [];
	    for (var i = 1; i <= $scope.obj.slingCount; i++) {
	    	$scope.getSlingCount.push({id:UUID(), idx:i});
		}
	    
	};
	
	$scope.deleteSling = function() {
		if (confirm("Are You Sure Want To Delete ?")) {
			var idx = arguments[0];
			
			for (var i = 0; i < arguments.length; i++) {
				for (var j = idx; j < $scope.obj.slingCount ; j++) {
					$scope.obj[arguments[i] + (j)] = $scope.obj[arguments[i] + (j + 1)];
				}
			}
			for (var i = 0; i < arguments.length; i++) {
				delete $scope.obj[arguments[i] + ($scope.obj.slingCount)];
			}
			
			$scope.obj.slingCount--;
			$scope.getSlingCount = [];
		    for (var i = 1; i <= $scope.obj.slingCount; i++) {
		    	$scope.getSlingCount.push({id:UUID(), idx:i});
			}
		}
	};
});


// CASED HOLE

dashboardControllers.controller('JobServiceOrderCasedController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    $scope.svo = output.data[0];
    if ($scope.obj == null) {
    	location.href = '#/jobInfoServiceOrderNew1/' + $scope._id;
    }
    var output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    $scope.detailPdf = function() {
		window.open(getServiceOrderCasedDetailPdfURL + "/_id/" + $scope._id, "_self");
	}
    $scope.upload = function(element) {
    	var num = $(element).data("idx");
		var file = $('#upload' + num)[0].files[0];
	    var type = "none";
	    if (file && file.type === 'application/pdf') {
	    	type = "pdf";
	    }
	    if (type === "none") {
	      alert("Only PDF files that can be uploaded");
	      return;
	    }
	    
	    var fd = new FormData(); 
	    fd.append("file", file);
	    fd.append("id", $scope._id);
	    fd.append("num", num);
	    var xhr = new XMLHttpRequest();
	    xhr.open("POST", uploadCalibrationURL);

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
    // item list
    $scope.getToolCount = [];
    for (var i = 1; i <= $scope.obj.toolCount; i++) {
    	$scope.getToolCount.push({id:UUID(), idx:i});
	}
});

dashboardControllers.controller('JobServiceOrderCasedEditController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company~profile~Contact~JarTypeCased~TypeRig');
	$scope.companyList = output[0].data;
	$scope.profileList = output[1].data;
	$scope.contactList = output[2].data;
	$scope.jarTypeList = output[3].data;
	$scope.rigTypeList = output[4].data;
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.obj = output.data[0];
    $scope.svo = output.data[0];
    if ($scope.obj == null) {
    	$scope.obj = {};
    }
    $scope.selectBillTo = function (item, model) {
	    $scope.obj.billToAddress = "";
	    if (model && model.billingStreet) {
	    	$scope.obj.billToAddress += model.billingStreet;
	    }
	    $scope.obj.billToAddress2 = "";
	    if (model && model.billingCity) {
	    	$scope.obj.billToAddress2 += model.billingCity;
	    }
	    if (model && model.billingState) {
	    	$scope.obj.billToAddress2 += ", " + model.billingState;
	    }
	    if (model && model.billingZip) {
	    	if (model.billingState) {
	    		$scope.obj.billToAddress2 += " " + model.billingZip;
	    	} else {
	    		$scope.obj.billToAddress2 += ", " + model.billingZip;
	    	}
	    }
	    $scope.obj.billToPhone = "";
	    if (model && model.phone) {
	    	$scope.obj.billToPhone = model.phone;
	    }
    };
    
    $scope.save = function() {
    	$scope.obj.job = $scope._id;
    	$scope.obj.jobInfo = $scope.jobInfo;
	    var output = sharedService.callAjax(updateServiceOrderURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	        	//alert("success saved");
	            //sharedService.setToBreadcrumb(sharedService.getBreadcrumb().length-1);
	            location.href = '#/jobInfoServiceOrder1/' + $scope._id;;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
    $scope.$on('newCompany',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company');
    	$scope.companyList = output[0].data;
    	for (var i = 0; i < $scope.companyList.length; i++) {
    		if ($scope.companyList[i]._id == data.value.data._id) {
    			$scope.obj.billTo = $scope.companyList[i];
    			$scope.selectBillTo("", $scope.obj.billTo);
    			break;
    		}
    	}
    });
    
    $scope.$on('newOilCompany',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company');
    	$scope.companyList = output[0].data;
    	for (var i = 0; i < $scope.companyList.length; i++) {
    		if ($scope.companyList[i]._id == data.value.data._id) {
    			$scope.jobInfo.oilCompany = $scope.companyList[i];
    			break;
    		}
    	}
    });
    $scope.$on('newServiceCompany',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company');
    	$scope.companyList = output[0].data;
    	for (var i = 0; i < $scope.companyList.length; i++) {
    		if ($scope.companyList[i]._id == data.value.data._id) {
    			$scope.jobInfo.serviceCompany = $scope.companyList[i];
    			break;
    		}
    	}
    });
    $scope.$on('newEngineerContact',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact');
    	$scope.contactList = output[0].data;
    	for (var i = 0; i < $scope.contactList.length; i++) {
    		if ($scope.contactList[i]._id == data.value.data._id) {
    			$scope.jobInfo.wirelineEngineer = $scope.contactList[i];
    			break;
    		}
    	}
    });
    $scope.$on('newCompanyManContact',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact');
    	$scope.contactList = output[0].data;
    	for (var i = 0; i < $scope.contactList.length; i++) {
    		if ($scope.contactList[i]._id == data.value.data._id) {
    			$scope.jobInfo.companyMan = $scope.contactList[i];
    			break;
    		}
    	}
    });
    $scope.$on('newContactContact',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact');
    	$scope.contactList = output[0].data;
    	for (var i = 0; i < $scope.contactList.length; i++) {
    		if ($scope.contactList[i]._id == data.value.data._id) {
    			$scope.jobInfo.contact = $scope.contactList[i];
    			break;
    		}
    	}
    });
    $scope.getToolCount = [];
    if (!$scope.obj.toolCount || $scope.obj.toolCount == 0) {
    	$scope.obj.toolCount = 1;
    }
    for (var i = 1; i <= $scope.obj.toolCount; i++) {
    	$scope.getToolCount.push({id:UUID(), idx:i});
	}
	
	$scope.addTool = function() {
		var idx = arguments[0];
		for (var i = 0; i < arguments.length; i++) {
			for (var j = $scope.obj.toolCount; j > idx ; j--) {
				$scope.obj[arguments[i] + (j + 1)] = $scope.obj[arguments[i] + j];
			}
		}
		for (var i = 0; i < arguments.length; i++) {
			delete $scope.obj[arguments[i] + (idx + 1)];
		}
		$scope.obj.toolCount++;
		$scope.getToolCount = [];
	    for (var i = 1; i <= $scope.obj.toolCount; i++) {
	    	$scope.getToolCount.push({id:UUID(), idx:i});
		}
	    
	};
	
	$scope.deleteTool = function() {
		if (confirm("Are You Sure Want To Delete ?")) {
			var idx = arguments[0];
			
			for (var i = 0; i < arguments.length; i++) {
				for (var j = idx; j < $scope.obj.toolCount ; j++) {
					$scope.obj[arguments[i] + (j)] = $scope.obj[arguments[i] + (j + 1)];
				}
			}
			for (var i = 0; i < arguments.length; i++) {
				delete $scope.obj[arguments[i] + ($scope.obj.toolCount)];
			}
			
			$scope.obj.toolCount--;
			$scope.getToolCount = [];
		    for (var i = 1; i <= $scope.obj.toolCount; i++) {
		    	$scope.getToolCount.push({id:UUID(), idx:i});
			}
		}
	};
});

dashboardControllers.controller('JobServiceOrderCasedNewController', function($scope, $rootScope, $controller, $routeParams, sharedService) {
	$rootScope.selectedMenu = "jobInfo";
    //$rootScope.breadcrumbs = sharedService.addBreadcrumb('Company Detail', $location.path());
    $rootScope.menuTitle = "Job Information";
	$scope._id = $routeParams._id;
	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company~profile~Contact~JarTypeCased~TypeRig');
	$scope.companyList = output[0].data;
	$scope.profileList = output[1].data;
	$scope.contactList = output[2].data;
	$scope.jarTypeList = output[3].data;
	$scope.rigTypeList = output[4].data;
    output = sharedService.getDataFromServer(getJobDetailURL + "/_id/" + $scope._id);
    $scope.jobInfo = output.data[0];
    $scope.obj = {};
    $scope.selectBillTo = function (item, model) {
	    $scope.obj.billToAddress = "";
	    if (model && model.billingStreet) {
	    	$scope.obj.billToAddress += model.billingStreet;
	    }
	    $scope.obj.billToAddress2 = "";
	    if (model && model.billingCity) {
	    	$scope.obj.billToAddress2 += model.billingCity;
	    }
	    if (model && model.billingState) {
	    	$scope.obj.billToAddress2 += ", " + model.billingState;
	    }
	    if (model && model.billingZip) {
	    	if (model.billingState) {
	    		$scope.obj.billToAddress2 += " " + model.billingZip;
	    	} else {
	    		$scope.obj.billToAddress2 += ", " + model.billingZip;
	    	}
	    }
	    $scope.obj.billToPhone = "";
	    if (model && model.phone) {
	    	$scope.obj.billToPhone = model.phone;
	    }
    };
    
    $scope.save = function() {
    	$scope.obj.job = $scope._id;
    	$scope.obj.jobInfo = $scope.jobInfo;
	    var output = sharedService.callAjax(saveServiceOrderURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	        	//alert("success saved");
	            //sharedService.setToBreadcrumb(sharedService.getBreadcrumb().length-1);
	            location.href = '#/jobInfoServiceOrder1/' + $scope._id;;
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
    $scope.$on('newCompany',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company');
    	$scope.companyList = output[0].data;
    	for (var i = 0; i < $scope.companyList.length; i++) {
    		if ($scope.companyList[i]._id == data.value.data._id) {
    			$scope.obj.billTo = $scope.companyList[i];
    			$scope.selectBillTo("", $scope.obj.billTo);
    			break;
    		}
    	}
    });
    
    $scope.$on('newOilCompany',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company');
    	$scope.companyList = output[0].data;
    	for (var i = 0; i < $scope.companyList.length; i++) {
    		if ($scope.companyList[i]._id == data.value.data._id) {
    			$scope.jobInfo.oilCompany = $scope.companyList[i];
    			break;
    		}
    	}
    });
    $scope.$on('newServiceCompany',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company');
    	$scope.companyList = output[0].data;
    	for (var i = 0; i < $scope.companyList.length; i++) {
    		if ($scope.companyList[i]._id == data.value.data._id) {
    			$scope.jobInfo.serviceCompany = $scope.companyList[i];
    			break;
    		}
    	}
    });
    $scope.$on('newEngineerContact',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact');
    	$scope.contactList = output[0].data;
    	for (var i = 0; i < $scope.contactList.length; i++) {
    		if ($scope.contactList[i]._id == data.value.data._id) {
    			$scope.jobInfo.wirelineEngineer = $scope.contactList[i];
    			break;
    		}
    	}
    });
    $scope.$on('newCompanyManContact',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact');
    	$scope.contactList = output[0].data;
    	for (var i = 0; i < $scope.contactList.length; i++) {
    		if ($scope.contactList[i]._id == data.value.data._id) {
    			$scope.jobInfo.companyMan = $scope.contactList[i];
    			break;
    		}
    	}
    });
    $scope.$on('newContactContact',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact');
    	$scope.contactList = output[0].data;
    	for (var i = 0; i < $scope.contactList.length; i++) {
    		if ($scope.contactList[i]._id == data.value.data._id) {
    			$scope.jobInfo.contact = $scope.contactList[i];
    			break;
    		}
    	}
    });
    $scope.getToolCount = [];
    if (!$scope.obj.toolCount || $scope.obj.toolCount == 0) {
    	$scope.obj.toolCount = 1;
    }
    for (var i = 1; i <= $scope.obj.toolCount; i++) {
    	$scope.getToolCount.push({id:UUID(), idx:i});
	}
	
	$scope.addTool = function() {
		var idx = arguments[0];
		for (var i = 0; i < arguments.length; i++) {
			for (var j = $scope.obj.toolCount; j > idx ; j--) {
				$scope.obj[arguments[i] + (j + 1)] = $scope.obj[arguments[i] + j];
			}
		}
		for (var i = 0; i < arguments.length; i++) {
			delete $scope.obj[arguments[i] + (idx + 1)];
		}
		$scope.obj.toolCount++;
		$scope.getToolCount = [];
	    for (var i = 1; i <= $scope.obj.toolCount; i++) {
	    	$scope.getToolCount.push({id:UUID(), idx:i});
		}
	    
	};
	
	$scope.deleteTool = function() {
		if (confirm("Are You Sure Want To Delete ?")) {
			var idx = arguments[0];
			
			for (var i = 0; i < arguments.length; i++) {
				for (var j = idx; j < $scope.obj.toolCount ; j++) {
					$scope.obj[arguments[i] + (j)] = $scope.obj[arguments[i] + (j + 1)];
				}
			}
			for (var i = 0; i < arguments.length; i++) {
				delete $scope.obj[arguments[i] + ($scope.obj.toolCount)];
			}
			
			$scope.obj.toolCount--;
			$scope.getToolCount = [];
		    for (var i = 1; i <= $scope.obj.toolCount; i++) {
		    	$scope.getToolCount.push({id:UUID(), idx:i});
			}
		}
	};
});