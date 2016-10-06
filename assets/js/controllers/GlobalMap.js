var markersArray = [];

function clearOverlays() {
  for (var i = 0; i < markersArray.length; i++ ) {
    markersArray[i].setMap(null);
  }
  markersArray.length = 0;
}

dashboardControllers.controller('GlobalMapController', function($rootScope, $scope, $controller, sharedService) {
	$rootScope.selectedMenu = "globalMap";
	//$rootScope.breadcrumbs = sharedService.newBreadcrumb('Company Listing', $location.path());
	$rootScope.menuTitle = "Global Operation Map";
    
    var gMapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 2,
        maxZoom:12,
        minZoom:2,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"), gMapOptions);
    
    var output = sharedService.getDataFromServer(getPluralListURL + '/collections/profile~StatusJob~Company');
	$scope.profileList = output[0].data;
	$scope.statusList = output[1].data;
	$scope.companyList = output[2].data;
	var isFirstTime = true;
	$scope.technicianList = [];
	for (var i = 0; i < $scope.profileList.length; i++) {
		if ($scope.profileList[i].position == 'Technician') {
			$scope.technicianList.push($scope.profileList[i]);
		}
	}
	
	$scope.changeFilter = function() {
		clearOverlays();
		var mapFilter = "";
		if ($scope.technician) {
			mapFilter += $scope.technician.employeeName;
		}
		mapFilter += "~";
		if ($scope.status) {
			mapFilter += $scope.status._id;
		}
		mapFilter += "~";
		if ($scope.company) {
			mapFilter += $scope.company._id;
		}
		var output = sharedService.getDataFromServer(getAllJobByMapFilterURL + '/mapFilter/' + mapFilter);
		var data = output.data;
		$scope.obj = data;
		var jobFoundWithLocation = false;
		var bounds = new google.maps.LatLngBounds();
		var latLonArr = [];
		// merge content string for marker that closely located
		for (var i = 0; i < $scope.obj.length; i++) {
			var job = $scope.obj[i];
			var latitude = parseFloat(job.latitude);
			var longitude = parseFloat(job.longitude);
			if (!isNaN(latitude) && !isNaN(longitude)) {
				var merged = false;
				for (var j = 0; j < latLonArr.length; j++) {
					if (Math.abs(latLonArr[j][0] - latitude) < 0.1 && Math.abs(latLonArr[j][1] - longitude) < 0.1) {
						// merge
						latLonArr[j][2].push(job);
						merged = true;
						break;
					}
				}
				if (!merged) {
					latLonArr.push([latitude, longitude, [job]]);
				}
			}
	    }
	    for (var i = 0; i < latLonArr.length; i++) {			
			var latitude = latLonArr[i][0];
			var longitude = latLonArr[i][1];
		    var jobs = latLonArr[i][2];
		    	
	    	var step = 10 / jobs.length;
	    	for (var j = jobs.length - 1; j >= 0; j--) {
	    		var job = jobs[j];
	    		var jobDetailUrl = '#/jobInfoDetail/' + job._id;
	    		var contentString = "";
	    		for (var j2 = 0; j2 < jobs.length; j2++) {
	    			var innerLoopJob = jobs[j2];
	    			if (jobs.length > 1 && innerLoopJob == job) {
	    				contentString += "<div style='background-color: #000000; color: #FFFFFF;'>";
	    			}
					if (innerLoopJob.uid) {
						contentString += "UID: " + innerLoopJob.uid + "<br>";
					}
					if (innerLoopJob.status) {
						contentString += "Status: " + innerLoopJob.status.name + "<br>";
					}
					if (innerLoopJob.technician) {
						contentString += "Tech: " + innerLoopJob.technician;
						if (innerLoopJob.technician2) {
							contentString += " / " + innerLoopJob.technician2;
						}
						contentString += "<br>";
					}
					if (innerLoopJob.oilCompany) {
						contentString += "Company: " + innerLoopJob.oilCompany.name + "<br>";
					}
					if (contentString.length > 0) {
						contentString = contentString.substr(0, contentString.length - '<br>'.length);
					}
					if (jobs.length > 1 && innerLoopJob == job) {
	    				contentString += "</div>";
	    			}
					contentString += "<hr style='margin-top: 5px; margin-bottom: 5px; border-width: 2px;'>";
					
	    		}
	    		if (contentString.length > 0) {
					contentString = contentString.substr(0, contentString.length - "<hr style='margin-top: 5px; margin-bottom: 5px; border-width: 2px;'>".length) ;
				}
	    		var positionLatLon = new google.maps.LatLng(latitude, longitude);
			    var infowindow = new google.maps.InfoWindow({
			        content: contentString
			    });
			    var fillColor = "black";
			    if (job.status._id == '0') { // Upcoming
			    	fillColor = "yellow";
			    } else if (job.status._id == '1') { // Active
			    	fillColor = "green";
			    } else if (job.status._id == '2') { // Completed
			    	fillColor = "red";
			    } else if (job.status._id == '3') { // Canceled
			    	fillColor = "blue";
			    }
			    var iconPath = 'M ' + (j * step) + ' 0 L ' + ((j + 1) * step) + ' 0 L ' + ((j + 1) * step) + ' 10 L ' + (j * step) + ' 10 L ' + (j * step) + ' 0 Z';
			    var marker = new google.maps.Marker({
			        position: positionLatLon,
			        map: map,
			        title: job.uid,
			        //,icon: 'assets/img/business.png'
			        icon: {
			            path: iconPath,//google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
			            strokeColor: "black",
			            fillColor: fillColor,
			            fillOpacity: 1.0,
			            scale: 1.2,
			            strokeWeight: 0.5
			        },
			    });
			    markersArray.push(marker);
			    google.maps.event.addListener(marker,'click', (function(jobDetailUrl){ 
			        return function() {
			           location.href = jobDetailUrl;
			        };
			    })(jobDetailUrl));
			    
			    google.maps.event.addListener(marker,'mouseover', (function(marker,contentString,infowindow){ 
			        return function() {
			           infowindow.setContent(contentString);
			           infowindow.open(map, marker);
			        };
			    })(marker,contentString,infowindow));
			    
			    google.maps.event.addListener(marker,'mouseout', (function(marker,contentString,infowindow){ 
			        return function() {
			           //infowindow.setContent(contentString);
			           infowindow.close();
			        };
			    })(marker,contentString,infowindow)); 
			                    
			    //infowindow.open(map, marker);
			    bounds.extend(positionLatLon);
			                    
			    //infowindow.open(map, marker);
			    bounds.extend(positionLatLon);
	    	}
		    
	    }
	    
	    /*
	    if (isFirstTime) {
	    	isFirstTime = false;
		    if (jobFoundWithLocation) {
			    // Don't zoom in too far on only one marker
			    if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
			       var extendPoint1 = new google.maps.LatLng(bounds.getNorthEast().lat() + 0.1, bounds.getNorthEast().lng() + 0.1);
			       var extendPoint2 = new google.maps.LatLng(bounds.getNorthEast().lat() - 0.1, bounds.getNorthEast().lng() - 0.1);
			       bounds.extend(extendPoint1);
			       bounds.extend(extendPoint2);
			    }
			    map.fitBounds(bounds);
		    } else {
		    	// if empty, position it back to center
				var positionLatLon = new google.maps.LatLng(0, 0);
				map.setCenter(positionLatLon);
				map.setZoom(1);
		    }
	    }
	    */
	};
                  
    $scope.changeFilter();
	
});

// sample marker
/*
map.addMarker({
	lat: -12.043333,
    lng: -77.03,
    title: 'Lima',
    click: function(e) {
    	if(console.log)
    		console.log(e);
    	alert('You clicked in this marker');
    }
});
*/