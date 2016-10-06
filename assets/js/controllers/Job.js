dashboardControllers.controller('JobController', function($scope, $controller, sharedService) {
	$controller('_ListController', { 
		$scope: $scope, 
		$menu: "jobInfo",
		$title: "Job Information",
		$listObjURL: getJobDetailsListingURL
		});
	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/StatusJob');
	$scope.statusList = output[0].data;
	var upcomingData = [];
	var activeData = [];
	var completedData = [];
	var canceledData = [];
	
	for (var i = 0; i < $scope.obj.length; i++) {
		var job = $scope.obj[i];
		job.currentRun = 0;
		if (job.preset) {
			for (var j = 1; j <= job.preset.itemCount; j++) {
				var runNum = job.preset['run_' + j];
				if (runNum && job.preset['fromDate_' + j] && job.preset['toDate_' + j] && job.preset['start_' + j] && job.preset['start_' + j].length > 0 && job.preset['end_' + j] && job.preset['end_' + j].length > 0) {					
					if (parseInt(runNum) > job.currentRun) {
						job.currentRun = runNum;
					}
				}
			}
		}
		job.typeOfTool = "Standard";
		if (job.isHighTemp || job.isHighPress) {
			job.typeOfTool = "HPHT";
		} else if (job.serviceOrder && job.serviceOrder.toolCount) {
			var toolCount = job.serviceOrder.toolCount;
			for (var j = 1; j <= toolCount; j++) {
				if  (job.serviceOrder['toolType' + j] && job.serviceOrder['toolType' + j].indexOf("HPHT") > -1) {
					job.typeOfTool = "HPHT";
					break;
				}
			}
			
		}
		if (job.status._id == '0') {
			upcomingData.push(job);
		} else if (job.status._id == '1') {
			activeData.push(job);
		} else if (job.status._id == '2') {
			completedData.push(job);
		} else if (job.status._id == '3') {
			canceledData.push(job);
		}
	}
	$scope.upcomingTableParams = $scope.getTableParam(upcomingData);
	$scope.activeTableParams = $scope.getTableParam(activeData);
	$scope.completedTableParams = $scope.getTableParam(completedData);
	$scope.canceledTableParams = $scope.getTableParam(canceledData);
	var countStatusMap = {};
	countStatusMap[0] = 0;
	countStatusMap[1] = 0;
	countStatusMap[2] = 0;
	countStatusMap[3] = 0;
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
	// modified job listing droplist
	$scope.statusList[1].text = $scope.statusList[1].name + " and " + $scope.statusList[0].name + " (" + (countStatusMap[$scope.statusList[0]._id] + countStatusMap[$scope.statusList[1]._id]) + ")"
	$scope.newStatusList= [$scope.statusList[1], $scope.statusList[2], $scope.statusList[3]];
	
	$scope.jobSelected = $scope.newStatusList[0];
	
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
	
	$scope.beforeToday = function(date) {
		var isBefore = false;
		var today = new Date();
		today.setHours(0,0,0,0);
		var todayLong = today.getTime() / 1000;
		if (date < todayLong) {
			isBefore = true;
		}
		return isBefore;
	};
	
});

dashboardControllers.controller('JobDetailController', function($scope, $controller, sharedService) {
	$controller('_DetailController', {
		$scope: $scope, 
		$menu: "jobInfo",
		$title: "Job Information",
		$detailObjURL: getJobDetailURL, 
		$deleteObjURL: deleteJobURL,
		$successDeletePath: "#/jobInfo"
		});
	$scope.statusJob = '0';
	if ($scope.obj.status && $scope.obj.status._id) {
		$scope.statusJob = $scope.obj.status._id;
	}
	var output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.svo = output.data[0];
	output = sharedService.getDataFromServer(getPriceManagerDetailURL + "/_id/price");
    $scope.price = output.data[0];
    if ($scope.obj.environment == '0') { // Land
		if ($scope.obj.isHighTemp || $scope.obj.isHighPress) { // High Temp or High Press
			$scope.runChargeFirst = 0;
			$scope.runCharge = $scope.price.hphtLandRun;
		} else {
			$scope.runChargeFirst = $scope.price.landFirstDay;
			$scope.runCharge = $scope.price.landFirstDay;
		}
		
	} else if ($scope.obj.environment == '1') { // Offshore
		if ($scope.obj.isHighTemp || $scope.obj.isHighPress) { // High Temp or High Press
			$scope.runChargeFirst = 0;
			$scope.runCharge = $scope.price.hphtOffshoreRun;
		} else {
			$scope.runChargeFirst = 0;
			$scope.runCharge = $scope.price.offshoreRun;
		}
	} else {
		$scope.runChargeFirst = 0;
		$scope.runCharge = 0;
	}
    
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
	    fd.append("id", $scope._id);
	    var xhr = new XMLHttpRequest();
	    xhr.open("POST", uploadJobFromDetailURL);

	    xhr.onload = function() {
	      try {
	    	  var res = JSON.parse(xhr.responseText);
	    	  if ($scope.obj.uploadedFile) {
	    		  $scope.obj.uploadedFile.push(res);
	    	  } else {
	    		  $scope.obj.uploadedFile = [res];
	    	  }
	    	  $scope.$apply();
	      } catch(e) {
	        alert('failed when trying to upload');
	      }
	      alert('Succesfully uploaded');
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
    $scope.deleteFile = function(file) {
    	if (confirm("Are You Sure Want To Delete ?")) {
	    	var dataToSend = {"_id": $scope._id, "file": file};
	        var output = sharedService.callAjax(deleteFileJobURL, "post", dataToSend);
	        if (output && output.status) {
	            //alert (output.message);
	            if (output.status == 1) {
	            	//alert("success delete");
	            	if ($scope.obj.uploadedFile) {
	            		for (var i = $scope.obj.uploadedFile.length - 1; i >= 0 ; i--) {
	            			if ($scope.obj.uploadedFile[i].url === file.url) {
	            				$scope.obj.uploadedFile.splice(i, 1);
	            			}
	            		}
	            	}
	            }
	        } else {
	            alert ("Failed to delete");
	        }
    	}
    }
});

dashboardControllers.controller('JobNewController', function($rootScope, $scope, sharedService, $controller, $window) {
	$rootScope.selectedMenu = 'jobInfo';
	//$rootScope.breadcrumbs = sharedService.addBreadcrumb('New Company', $location.path());
	$rootScope.menuTitle = 'Job Information';
	$scope.obj = {};
	$scope.statusJob = '0';
	$scope.obj.uid = "job/" + $rootScope.currentUser.username + "/" + Math.floor((Math.random() * 10000) + 1);
	// get pricing
	output = sharedService.getDataFromServer(getPriceManagerDetailURL + "/_id/price");
    $scope.price = output.data[0];
    $scope.$watch('[obj.environment,obj.isHighTemp,obj.isHighPress]', function () {
    	if ($scope.obj.environment == '0') { // Land
    		if ($scope.obj.isHighTemp || $scope.obj.isHighPress) { // High Temp or High Press
    			$scope.runChargeFirst = 0;
    			$scope.runCharge = $scope.price.hphtLandRun;
    		} else {
    			$scope.runChargeFirst = $scope.price.landFirstDay;
    			$scope.runCharge = $scope.price.landFirstDay;
    		}
    		
    	} else if ($scope.obj.environment == '1') { // Offshore
    		if ($scope.obj.isHighTemp || $scope.obj.isHighPress) { // High Temp or High Press
    			$scope.runChargeFirst = 0;
    			$scope.runCharge = $scope.price.hphtOffshoreRun;
    		} else {
    			$scope.runChargeFirst = 0;
    			$scope.runCharge = $scope.price.offshoreRun;
    		}
    	} else {
    		$scope.runChargeFirst = 0;
    		$scope.runCharge = 0;
    	}
    }, true);
    
	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Well~Company~profile~Contact~StatusJob~TypeRig~Region');
	$scope.wellList = output[0].data;
	$scope.companyList = output[1].data;
	$scope.profileList = output[2].data;
	$scope.contactList = output[3].data;
	$scope.statusList = output[4].data;
	$scope.countryList = $window.COUNTRY_LIST;
	$scope.stateList = $window.STATE_LIST;
	$scope.technicianList = [];
	for (var i = 0; i < $scope.profileList.length; i++) {
		if ($scope.profileList[i].position == "Technician") {
			$scope.technicianList.push($scope.profileList[i].employeeName);
		}
	}
	$scope.selectCountry = function (item, model) {
		delete $scope.obj.state;
		if (item.code == 'US') {
			$scope.obj.state = "";
		}
	};
	$scope.selectCompanyMan = function (item, model) {
		if (!$scope.obj.dispatcher) {
			$scope.obj.rigPhone = item.phone;
			$scope.obj.rigFax = item.fax;
			$scope.obj.rigEmail = item.email;
		}
	}
	$scope.selectDispatcher = function (item, model) {
		if (item) {
			$scope.obj.rigPhone = item.phone;
			$scope.obj.rigFax = item.fax;
			$scope.obj.rigEmail = item.email;
		} else {
			delete $scope.obj.rigPhone;
			delete $scope.obj.rigEmail;
			if ($scope.obj.companyMan) {
				$scope.obj.rigPhone = $scope.obj.companyMan.phone;
				$scope.obj.rigFax = $scope.obj.companyMan.fax;
				$scope.obj.rigEmail = $scope.obj.companyMan.email;
			}
		}
	}
	if ($scope.statusList && $scope.statusList.length > 0) {
		$scope.obj.status = $scope.statusList[0];
	}
	$scope.rigTypeList = output[5].data;
	$scope.regionList = output[6].data;
    
	// initial value must have
	$scope.obj.impactPro = '0';
	
    $scope.save = function() {
    	// remove $$hashkey from uploadedFile
    	if ($scope.obj.uploadedFile) {
    		for (var i = 0; i < $scope.obj.uploadedFile.length; i++) {
    			var obj = $scope.obj.uploadedFile[i];
    			if (obj.hasOwnProperty("$$hashKey")) {
    				delete obj['$$hashKey'];
    			}
    		}
    	}
    	var latLng = $("#latlng").val();
    	if (latLng && latLng.trim().length > 0) {
    		var latLngArr = latLng.split(",");
    		if (latLngArr.length == 2) {
    			$scope.obj.latitude = latLngArr[0].trim();
    			$scope.obj.longitude = latLngArr[1].trim();
    		}
    	} else {
    		$scope.obj.latitude = null;
			$scope.obj.longitude = null;
    	}
	    var output = sharedService.callAjax(saveJobURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = '#/jobInfoServiceOrder' + output.data.type + '/' + output.data._id;
	        } else {
	        	alert (output.message);
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
    $scope.$on('newOilCompany',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company');
    	$scope.companyList = output[0].data;
    	for (var i = 0; i < $scope.companyList.length; i++) {
    		if ($scope.companyList[i]._id == data.value.data._id) {
    			$scope.obj.oilCompany = $scope.companyList[i];
    			break;
    		}
    	}
    });
    $scope.$on('newServiceCompany',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company');
    	$scope.companyList = output[0].data;
    	for (var i = 0; i < $scope.companyList.length; i++) {
    		if ($scope.companyList[i]._id == data.value.data._id) {
    			$scope.obj.serviceCompany = $scope.companyList[i];
    			break;
    		}
    	}
    });
    $scope.$on('newEngineerContact',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact');
    	$scope.contactList = output[0].data;
    	for (var i = 0; i < $scope.contactList.length; i++) {
    		if ($scope.contactList[i]._id == data.value.data._id) {
    			$scope.obj.wirelineEngineer = $scope.contactList[i];
    			break;
    		}
    	}
    });
    $scope.$on('newCompanyManContact',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact');
    	$scope.contactList = output[0].data;
    	for (var i = 0; i < $scope.contactList.length; i++) {
    		if ($scope.contactList[i]._id == data.value.data._id) {
    			$scope.obj.companyMan = $scope.contactList[i];
    			$scope.selectCompanyMan($scope.obj.companyMan, null);
    			break;
    		}
    	}
    });
    $scope.$on('newDispatcherContact',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact');
    	$scope.contactList = output[0].data;
    	for (var i = 0; i < $scope.contactList.length; i++) {
    		if ($scope.contactList[i]._id == data.value.data._id) {
    			$scope.obj.dispatcher = $scope.contactList[i];
    			$scope.selectDispatcher($scope.obj.dispatcher, null);
    			break;
    		}
    	}
    });
    $scope.$on('newContactContact',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact');
    	$scope.contactList = output[0].data;
    	for (var i = 0; i < $scope.contactList.length; i++) {
    		if ($scope.contactList[i]._id == data.value.data._id) {
    			$scope.obj.contact = $scope.contactList[i];
    			break;
    		}
    	}
    });
    $("#latlng").locationPicker();
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
	    fd.append("id", $scope._id);
	    var xhr = new XMLHttpRequest();
	    xhr.open("POST", uploadJobURL);

	    xhr.onload = function() {
	      try {
	    	  var res = JSON.parse(xhr.responseText);
	    	  if ($scope.obj.uploadedFile) {
	    		  $scope.obj.uploadedFile.push(res);
	    	  } else {
	    		  $scope.obj.uploadedFile = [res];
	    	  }
	    	  $scope.$apply();
	      } catch(e) {
	        alert('failed when trying to upload');
	      }
	      alert('Succesfully uploaded');
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
    $scope.deleteFile = function(file) {
    	if (confirm("Are You Sure Want To Delete ?")) {
	    	if ($scope.obj.uploadedFile) {
	    		for (var i = $scope.obj.uploadedFile.length - 1; i >= 0 ; i--) {
	    			if ($scope.obj.uploadedFile[i].url === file.url) {
	    				$scope.obj.uploadedFile.splice(i, 1);
	    			}
	    		}
	    	}
    	}
    }
});

dashboardControllers.controller('JobEditController', function($rootScope, $scope, sharedService, $controller, $window) {
	$controller('_EditController', {
		$scope: $scope, 
		$menu: "jobInfo",
		$title: "job Information",
		$detailObjURL: getJobDetailURL, 
		$updateObjURL: updateJobURL, 
		$successUpdatePath: "#/jobInfoDetail/"
	});
	$scope.statusJob = '0';
	if ($scope.obj.status && $scope.obj.status._id) {
		$scope.statusJob = $scope.obj.status._id;
	}
	var output = sharedService.getDataFromServer(getServiceOrderByJobURL + "/_id/" + $scope._id);
    $scope.svo = output.data[0];
	output = sharedService.getDataFromServer(getPriceManagerDetailURL + "/_id/price");
    $scope.price = output.data[0];
    $scope.$watch('[obj.environment,obj.isHighTemp,obj.isHighPress]', function () {
    	if ($scope.obj.environment == '0') { // Land
    		if ($scope.obj.isHighTemp || $scope.obj.isHighPress) { // High Temp or High Press
    			$scope.runChargeFirst = 0;
    			$scope.runCharge = $scope.price.hphtLandRun;
    		} else {
    			$scope.runChargeFirst = $scope.price.landFirstDay;
    			$scope.runCharge = $scope.price.landFirstDay;
    		}
    		
    	} else if ($scope.obj.environment == '1') { // Offshore
    		if ($scope.obj.isHighTemp || $scope.obj.isHighPress) { // High Temp or High Press
    			$scope.runChargeFirst = 0;
    			$scope.runCharge = $scope.price.hphtOffshoreRun;
    		} else {
    			$scope.runChargeFirst = 0;
    			$scope.runCharge = $scope.price.offshoreRun;
    		}
    	} else {
    		$scope.runChargeFirst = 0;
    		$scope.runCharge = 0;
    	}
    }, true);
	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Well~Company~profile~Contact~StatusJob~TypeRig~Region');
	$scope.wellList = output[0].data;
	$scope.companyList = output[1].data;
	$scope.profileList = output[2].data;
	$scope.contactList = output[3].data;
	$scope.statusList = output[4].data;
	$scope.rigTypeList = output[5].data;
	$scope.regionList = output[6].data;
	$scope.countryList = $window.COUNTRY_LIST;
	$scope.stateList = $window.STATE_LIST;
	$scope.technicianList = [];
	for (var i = 0; i < $scope.profileList.length; i++) {
		if ($scope.profileList[i].position == "Technician") {
			$scope.technicianList.push($scope.profileList[i].employeeName);
		}
	}
	$scope.selectCountry = function (item, model) {
		delete $scope.obj.state;
		if (item.code == 'US') {
			$scope.obj.state = "";
		}
		
	};
	$scope.selectCompanyMan = function (item, model) {
		if (!$scope.obj.dispatcher) {
			$scope.obj.rigPhone = item.phone;
			$scope.obj.rigFax = item.fax;
			$scope.obj.rigEmail = item.email;
		}
	}
	$scope.selectDispatcher = function (item, model) {
		if (item) {
			$scope.obj.rigPhone = item.phone;
			$scope.obj.rigFax = item.fax;
			$scope.obj.rigEmail = item.email;
		} else {
			delete $scope.obj.rigPhone;
			delete $scope.obj.rigEmail;
			if ($scope.obj.companyMan) {
				$scope.obj.rigPhone = $scope.obj.companyMan.phone;
				$scope.obj.rigFax = $scope.obj.companyMan.fax;
				$scope.obj.rigEmail = $scope.obj.companyMan.email;
			}
		}
	}
    $scope.save = function() {
    	// remove $$hashkey from uploadedFile
    	if ($scope.obj.uploadedFile) {
    		for (var i = 0; i < $scope.obj.uploadedFile.length; i++) {
    			var obj = $scope.obj.uploadedFile[i];
    			if (obj.hasOwnProperty("$$hashKey")) {
    				delete obj['$$hashKey'];
    			}
    		}
    	}
    	var latLng = $("#latlng").val();
    	if (latLng && latLng.trim().length > 0) {
    		var latLngArr = latLng.split(",");
    		if (latLngArr.length == 2) {
    			$scope.obj.latitude = latLngArr[0].trim();
    			$scope.obj.longitude = latLngArr[1].trim();
    		}
    	} else {
    		$scope.obj.latitude = null;
			$scope.obj.longitude = null;
    	}
	    var output = sharedService.callAjax(updateJobURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	        	//alert("success saved");
	            //sharedService.setToBreadcrumb(sharedService.getBreadcrumb().length-1);
	            location.href = '#/jobInfoDetail/' + $scope._id;;
	        } else {
	        	alert (output.message);
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
    $scope.$on('newOilCompany',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company');
    	$scope.companyList = output[0].data;
    	for (var i = 0; i < $scope.companyList.length; i++) {
    		if ($scope.companyList[i]._id == data.value.data._id) {
    			$scope.obj.oilCompany = $scope.companyList[i];
    			break;
    		}
    	}
    });
    $scope.$on('newServiceCompany',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company');
    	$scope.companyList = output[0].data;
    	for (var i = 0; i < $scope.companyList.length; i++) {
    		if ($scope.companyList[i]._id == data.value.data._id) {
    			$scope.obj.serviceCompany = $scope.companyList[i];
    			break;
    		}
    	}
    });
    $scope.$on('newEngineerContact',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact');
    	$scope.contactList = output[0].data;
    	for (var i = 0; i < $scope.contactList.length; i++) {
    		if ($scope.contactList[i]._id == data.value.data._id) {
    			$scope.obj.wirelineEngineer = $scope.contactList[i];
    			break;
    		}
    	}
    });
    $scope.$on('newCompanyManContact',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact');
    	$scope.contactList = output[0].data;
    	for (var i = 0; i < $scope.contactList.length; i++) {
    		if ($scope.contactList[i]._id == data.value.data._id) {
    			$scope.obj.companyMan = $scope.contactList[i];
    			$scope.selectCompanyMan($scope.obj.companyMan, null);
    			break;
    		}
    	}
    });
    $scope.$on('newDispatcherContact',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact');
    	$scope.contactList = output[0].data;
    	for (var i = 0; i < $scope.contactList.length; i++) {
    		if ($scope.contactList[i]._id == data.value.data._id) {
    			$scope.obj.dispatcher = $scope.contactList[i];
    			$scope.selectDispatcher($scope.obj.dispatcher, null);
    			break;
    		}
    	}
    });
    $scope.$on('newContactContact',function(event, data) {
    	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Contact');
    	$scope.contactList = output[0].data;
    	for (var i = 0; i < $scope.contactList.length; i++) {
    		if ($scope.contactList[i]._id == data.value.data._id) {
    			$scope.obj.contact = $scope.contactList[i];
    			break;
    		}
    	}
    });
    if ($scope.obj && $scope.obj.latitude && $scope.obj.longitude) {
    	$("#latlng").val($scope.obj.latitude + "," + $scope.obj.longitude);
    }
    $("#latlng").locationPicker();
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
	    fd.append("id", $scope._id);
	    var xhr = new XMLHttpRequest();
	    xhr.open("POST", uploadJobURL);

	    xhr.onload = function() {
	      try {
	    	  var res = JSON.parse(xhr.responseText);
	    	  if ($scope.obj.uploadedFile) {
	    		  $scope.obj.uploadedFile.push(res);
	    	  } else {
	    		  $scope.obj.uploadedFile = [res];
	    	  }
	    	  $scope.$apply();
	      } catch(e) {
	        alert('failed when trying to upload');
	      }
	      alert('Succesfully uploaded');
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
    $scope.deleteFile = function(file) {
    	if (confirm("Are You Sure Want To Delete ?")) {
	    	if ($scope.obj.uploadedFile) {
	    		for (var i = $scope.obj.uploadedFile.length - 1; i >= 0 ; i--) {
	    			if ($scope.obj.uploadedFile[i].url === file.url) {
	    				$scope.obj.uploadedFile.splice(i, 1);
	    			}
	    		}
	    	}
    	}
    }
});