dashboardControllers.controller('QueryController', function($scope, $rootScope, $controller, sharedService) {
	$rootScope.selectedMenu = "query";
	//$rootScope.breadcrumbs = sharedService.newBreadcrumb('Company Listing', $location.path());
	$rootScope.menuTitle = "Query";
	$scope.data = [];
	$scope.objTableParams = $scope.getTableParam($scope.data);
	$scope.searchParam = {};
	var output = sharedService.getDataFromServer(getPluralListURL + '/collections/Company~profile~Contact~StatusJob~TypeRig~Toolstring~JarType~ImpactProSlotSize');
	$scope.companyList = output[0].data;
	$scope.profileList = output[1].data;
	$scope.contactList = output[2].data;
	$scope.statusList = output[3].data;
	$scope.rigTypeList = output[4].data;
	$scope.toolstringList = output[5].data;
	$scope.jarTypeList = output[6].data;
	$scope.slotSizeList = output[7].data;
	$scope.technicianList = [];
	for (var i = 0; i < $scope.profileList.length; i++) {
		if ($scope.profileList[i].position == 'Technician') {
			$scope.technicianList.push($scope.profileList[i].employeeName);
		}
	}
	
	$scope.selectAll = function() {
		// Rig Info
		$scope.isRigName = true; $scope.pickColumn('isRigName'); // 1
		$scope.isPlatform = true; $scope.pickColumn('isPlatform'); // 2
		// Job Info
		$scope.isDjrNo = true; $scope.pickColumn('isDjrNo'); // 3
		$scope.isStartDate = true; $scope.pickColumn('isStartDate'); // 4
		$scope.isEndDate = true; $scope.pickColumn('isEndDate'); // 5
		$scope.isJobStatus = true; $scope.pickColumn('isJobStatus'); // 6
		$scope.isOilCompany = true; $scope.pickColumn('isOilCompany'); // 7
		$scope.isServiceCompany = true; $scope.pickColumn('isServiceCompany'); // 8
		$scope.isJobType = true; $scope.pickColumn('isJobType'); // 9
		$scope.isRevenue = true; $scope.pickColumn('isRevenue'); // 10
		$scope.isPo = true; $scope.pickColumn('isPo'); // 11
		$scope.isApi = true; $scope.pickColumn('isApi'); // 12
		$scope.isCostCenter = true; $scope.pickColumn('isCostCenter'); // 13
		$scope.isAfe = true; $scope.pickColumn('isAfe'); // 14
		$scope.isOcsg = true; $scope.pickColumn('isOcsg'); // 15
		$scope.isStateLease = true; $scope.pickColumn('isStateLease'); // 16
		$scope.isEnvironment = true; $scope.pickColumn('isEnvironment'); // 17
		// Well Info
		$scope.isTemp = true; $scope.pickColumn('isTemp'); // 18
		$scope.isWellCondition = true; $scope.pickColumn('isWellCondition'); // 19
		$scope.isWellType = true; $scope.pickColumn('isWellType'); // 20
		$scope.isWellName = true; $scope.pickColumn('isWellName'); // 21
		$scope.isBlock = true; $scope.pickColumn('isBlock'); // 22
		$scope.isLease = true; $scope.pickColumn('isLease'); // 23
		$scope.isField = true; $scope.pickColumn('isField'); // 24
		$scope.isDeviation = true; $scope.pickColumn('isDeviation'); // 25
		$scope.isWaterDepth = true; $scope.pickColumn('isWaterDepth'); // 26
		$scope.isHoleSize = true; $scope.pickColumn('isHoleSize'); // 27
		$scope.isBHP = true; $scope.pickColumn('isBHP'); // 28
		$scope.isTD = true; $scope.pickColumn('isTD'); // 29
		$scope.isMudWt = true; $scope.pickColumn('isMudWt'); // 30
		// Tool Info
		$scope.isJarType = true; $scope.pickColumn('isJarType'); // 31
		$scope.isJarSerial = true; $scope.pickColumn('isJarSerial'); // 32
		$scope.isJarSerialJob = true; $scope.pickColumn('isJarSerialJob'); // 33
		// Run Info
		$scope.isRun = true; $scope.pickColumn('isRun'); // 34
		$scope.isTotalRun = true; $scope.pickColumn('isTotalRun'); // 35
		$scope.isTotalActivation = true; $scope.pickColumn('isTotalActivation'); // 36
		$scope.isActivation = true; $scope.pickColumn('isActivation'); // 37
		$scope.isJarSetting = true; $scope.pickColumn('isJarSetting'); // 38
		$scope.isImpactPro = true; $scope.pickColumn('isImpactPro'); // 39
		$scope.isImpactProRun = true; $scope.pickColumn('isImpactProRun'); // 40
		$scope.isImpactProSlotSize = true; $scope.pickColumn('isImpactProSlotSize'); // 41
		$scope.isFishing = true; $scope.pickColumn('isFishing'); // 42
		$scope.isMSP = true; $scope.pickColumn('isMSP'); // 43
		$scope.isWIF = true; $scope.pickColumn('isWIF'); // 44
		$scope.isWIA = true; $scope.pickColumn('isWIA'); // 45
		$scope.isWOB = true; $scope.pickColumn('isWOB'); // 46
		$scope.isToolstringName = true; $scope.pickColumn('isToolstringName'); // 47
		$scope.isToolstringLength = true; $scope.pickColumn('isToolstringLength'); // 48
		$scope.isCableSize = true; $scope.pickColumn('isCableSize'); // 49
		$scope.isCableWeight = true; $scope.pickColumn('isCableWeight'); // 50
		$scope.isRunDate = true; $scope.pickColumn('isRunDate'); // 51
		$scope.isTotalRunTime = true; $scope.pickColumn('isTotalRunTime'); // 52
		$scope.isToolsFreed = true; $scope.pickColumn('isToolsFreed'); // 53
		$scope.isFormulaUsed = true; $scope.pickColumn('isFormulaUsed'); // 54
		$scope.isWP = true; $scope.pickColumn('isWP'); // 55
		// Location
		$scope.isCountry = true; $scope.pickColumn('isCountry'); // 56
		$scope.isCounty = true; $scope.pickColumn('isCounty'); // 57
		$scope.isParish = true; $scope.pickColumn('isParish'); // 58
		$scope.isState = true; $scope.pickColumn('isState'); // 59
		$scope.isCity = true; $scope.pickColumn('isCity'); // 60
		$scope.isLatLon = true; $scope.pickColumn('isLatLon'); // 61
		// Personnel
		$scope.isTechnician = true; $scope.pickColumn('isTechnician'); // 62
		$scope.isWirelineEngineer = true; $scope.pickColumn('isWirelineEngineer'); // 63
		$scope.isCompanyMan = true; $scope.pickColumn('isCompanyMan'); // 64
		$scope.isSales = true; $scope.pickColumn('isSales'); // 65
		// Contact Info
		$scope.isRigPhone = true; $scope.pickColumn('isRigPhone'); // 66
		$scope.isRigFax = true; $scope.pickColumn('isRigFax'); // 67
		$scope.isRigEmail = true; $scope.pickColumn('isRigEmail'); // 68
		$scope.isEngineerPhone = true; $scope.pickColumn('isEngineerPhone'); // 69
		$scope.isEngineerEmail = true; $scope.pickColumn('isEngineerEmail'); // 70
	}
	$scope.clearAll = function() {
		// Rig Info
		$scope.isRigName = false; $scope.pickColumn('isRigName'); // 1
		$scope.isPlatform = false; $scope.pickColumn('isPlatform'); // 2
		// Job Info
		$scope.isDjrNo = false; $scope.pickColumn('isDjrNo'); // 3 -- NEW --1
		$scope.isStartDate = false; $scope.pickColumn('isStartDate'); // 4
		$scope.isEndDate = false; $scope.pickColumn('isEndDate'); // 5
		$scope.isJobStatus = false; $scope.pickColumn('isJobStatus'); // 6
		$scope.isOilCompany = false; $scope.pickColumn('isOilCompany'); // 7
		$scope.isServiceCompany = false; $scope.pickColumn('isServiceCompany'); // 8
		$scope.isJobType = false; $scope.pickColumn('isJobType'); // 9
		$scope.isRevenue = false; $scope.pickColumn('isRevenue'); // 10
		$scope.isPo = false; $scope.pickColumn('isPo'); // 11 -- NEW --2
		$scope.isApi = false; $scope.pickColumn('isApi'); // 12 -- NEW --3
		$scope.isCostCenter = false; $scope.pickColumn('isCostCenter'); // 13 -- NEW --4
		$scope.isAfe = false; $scope.pickColumn('isAfe'); // 14 -- NEW --5
		$scope.isOcsg = false; $scope.pickColumn('isOcsg'); // 15 -- NEW --6
		$scope.isStateLease = false; $scope.pickColumn('isStateLease'); // 16 -- NEW --7
		$scope.isEnvironment = false; $scope.pickColumn('isEnvironment'); // 17 -- NEW --8
		// Well Info
		$scope.isTemp = false; $scope.pickColumn('isTemp'); // 18
		$scope.isWellCondition = false; $scope.pickColumn('isWellCondition'); // 19
		$scope.isWellType = false; $scope.pickColumn('isWellType'); // 20
		$scope.isWellName = false; $scope.pickColumn('isWellName'); // 21
		$scope.isBlock = false; $scope.pickColumn('isBlock'); // 22
		$scope.isLease = false; $scope.pickColumn('isLease'); // 23
		$scope.isField = false; $scope.pickColumn('isField'); // 24
		$scope.isDeviation = false; $scope.pickColumn('isDeviation'); // 25
		$scope.isWaterDepth = false; $scope.pickColumn('isWaterDepth'); // 26
		$scope.isHoleSize = false; $scope.pickColumn('isHoleSize'); // 27
		$scope.isBHP = false; $scope.pickColumn('isBHP'); // 28
		$scope.isTD = false; $scope.pickColumn('isTD'); // 29
		$scope.isMudWt = false; $scope.pickColumn('isMudWt'); // 30
		// Tool Info
		$scope.isJarType = false; $scope.pickColumn('isJarType'); // 31
		$scope.isJarSerial = false; $scope.pickColumn('isJarSerial'); // 32
		$scope.isJarSerialJob = false; $scope.pickColumn('isJarSerialJob'); // 33 -- NEW --9
		// Run Info
		$scope.isRun = false; $scope.pickColumn('isRun'); // 34
		$scope.isTotalRun = false; $scope.pickColumn('isTotalRun'); // 35
		$scope.isTotalActivation = false; $scope.pickColumn('isTotalActivation'); // 36
		$scope.isActivation = false; $scope.pickColumn('isActivation'); // 37
		$scope.isJarSetting = false; $scope.pickColumn('isJarSetting'); // 38
		$scope.isImpactPro = false; $scope.pickColumn('isImpactPro'); // 39
		$scope.isImpactProRun = false; $scope.pickColumn('isImpactProRun'); // 40 -- NEW --10
		$scope.isImpactProSlotSize = false; $scope.pickColumn('isImpactProSlotSize'); // 41 -- NEW --11
		$scope.isFishing = false; $scope.pickColumn('isFishing'); // 42
		$scope.isMSP = false; $scope.pickColumn('isMSP'); // 43
		$scope.isWIF = false; $scope.pickColumn('isWIF'); // 44
		$scope.isWIA = false; $scope.pickColumn('isWIA'); // 45
		$scope.isWOB = false; $scope.pickColumn('isWOB'); // 46
		$scope.isToolstringName = false; $scope.pickColumn('isToolstringName'); // 47
		$scope.isToolstringLength = false; $scope.pickColumn('isToolstringLength'); // 48
		$scope.isCableSize = false; $scope.pickColumn('isCableSize'); // 49
		$scope.isCableWeight = false; $scope.pickColumn('isCableWeight'); // 50
		$scope.isRunDate = false; $scope.pickColumn('isRunDate'); // 51 -- NEW --12
		$scope.isTotalRunTime = false; $scope.pickColumn('isTotalRunTime'); // 52 -- NEW --13
		$scope.isToolsFreed = false; $scope.pickColumn('isToolsFreed'); // 53 -- NEW --14
		$scope.isFormulaUsed = false; $scope.pickColumn('isFormulaUsed'); // 54
		$scope.isWP = false; $scope.pickColumn('isWP'); // 55
		// Location
		$scope.isCountry = false; $scope.pickColumn('isCountry'); // 56
		$scope.isCounty = false; $scope.pickColumn('isCounty'); // 57
		$scope.isParish = false; $scope.pickColumn('isParish'); // 58
		$scope.isState = false; $scope.pickColumn('isState'); // 59
		$scope.isCity = false; $scope.pickColumn('isCity'); // 60 -- NEW --15
		$scope.isLatLon = false; $scope.pickColumn('isLatLon'); // 61 -- NEW --16
		// Personnel
		$scope.isTechnician = false; $scope.pickColumn('isTechnician'); // 62
		$scope.isWirelineEngineer = false; $scope.pickColumn('isWirelineEngineer'); // 63
		$scope.isCompanyMan = false; $scope.pickColumn('isCompanyMan'); // 64 -- NEW --17
		$scope.isSales = false; $scope.pickColumn('isSales'); // 65 -- NEW --18
		// Contact Info
		$scope.isRigPhone = false; $scope.pickColumn('isRigPhone'); // 66 -- NEW --19
		$scope.isRigFax = false; $scope.pickColumn('isRigFax'); // 67 -- NEW --20
		$scope.isRigEmail = false; $scope.pickColumn('isRigEmail'); // 68 -- NEW --21
		$scope.isEngineerPhone = false; $scope.pickColumn('isEngineerPhone'); // 69 -- NEW --22
		$scope.isEngineerEmail = false; $scope.pickColumn('isEngineerEmail'); // 70 -- NEW --23
	}
	$scope.$watchCollection(
        "searchParam",
        function( newValue, oldValue ) {
        	if (newValue.field1) {
        		$("#latlng1").locationPicker();
        	}
        	if (newValue.field2) {
        		$("#latlng2").locationPicker();
        	}
        	if (newValue.field3) {
        		$("#latlng3").locationPicker();
        	}
        	if (newValue.field4) {
        		$("#latlng4").locationPicker();
        	}
        	if (newValue.field5) {
        		$("#latlng5").locationPicker();
        	}
        }
    );
	
	
	$scope.search = function() {
		var searchSent = {};
		for (var i = 1; i <= 5; i++) {
			if ($scope.searchParam['field' + i]) {
				searchSent['field' + i] = {};
				searchSent['field' + i].id = $scope.searchParam['field' + i].id;
				searchSent['field' + i].name = $scope.searchParam['field' + i].name;
				searchSent['field' + i].type = $scope.searchParam['field' + i].type;
				searchSent['field' + i].variable = $scope.searchParam['field' + i].variable;
				if (searchSent['field' + i].type == 'LatLon') {
					searchSent['paramLeft' + i] = $("#latlng" + i).val();
				}
			}
			if ($scope.searchParam['operator' + i]) {
				searchSent['operator' + i] = {};
				searchSent['operator' + i].id = $scope.searchParam['operator' + i].id;
				searchSent['operator' + i].name = $scope.searchParam['operator' + i].name;
			}
			if ($scope.searchParam['paramLeft' + i]) {
				if ($scope.searchParam['paramLeft' + i] !== null && typeof $scope.searchParam['paramLeft' + i] === 'object') {
					if ($.isArray($scope.searchParam['paramLeft' + i])) {
						searchSent['paramLeft' + i] = $scope.searchParam['paramLeft' + i];
					} else {
						searchSent['paramLeft' + i] = {};
						searchSent['paramLeft' + i]['_id'] = $scope.searchParam['paramLeft' + i]['_id'];
					}
				} else {
					searchSent['paramLeft' + i] = $scope.searchParam['paramLeft' + i];
				}
			}
			if ($scope.searchParam['paramRight' + i]) {
				if ($scope.searchParam['paramRight' + i] !== null && typeof $scope.searchParam['paramRight' + i] === 'object') {
					if ($.isArray($scope.searchParam['paramRight' + i])) {
						searchSent['paramRight' + i] = $scope.searchParam['paramRight' + i];
					} else {
						searchSent['paramRight' + i] = {};
						searchSent['paramRight' + i]['_id'] = $scope.searchParam['paramRight' + i]['_id'];
					}
				} else {
					searchSent['paramRight' + i] = $scope.searchParam['paramRight' + i];
				}
			}
			if ($scope.searchParam['paramLeft' + i + '_1']) {
				searchSent['paramLeft' + i + '_1'] = $scope.searchParam['paramLeft' + i + '_1'];
			}
			if ($scope.searchParam['paramLeft' + i + '_2']) {
				searchSent['paramLeft' + i + '_2'] = $scope.searchParam['paramLeft' + i + '_2'];
			}
			if ($scope.searchParam['paramLeft' + i + '_3']) {
				searchSent['paramLeft' + i + '_3'] = $scope.searchParam['paramLeft' + i + '_3'];
			}
			if ($scope.searchParam['paramLeft' + i + '_4']) {
				searchSent['paramLeft' + i + '_4'] = $scope.searchParam['paramLeft' + i + '_4'];
			}
			if ($scope.searchParam['paramLeft' + i + '_5']) {
				searchSent['paramLeft' + i + '_5'] = $scope.searchParam['paramLeft' + i + '_5'];
			}
			
		}
		output = sharedService.getDataFromServer(getJobQueryURL + "?" + $.param(searchSent));
		if (output && output.data) {
			$scope.data.length = 0;
			for (var i = 0; i < output.data.length; i++) {
				$scope.data.push(output.data[i]);
			}
			$scope.objTableParams.$params.page = 1;
			$scope.objTableParams.reload();	
		}
	}
	
	$scope.searchCsv = function() {
		var searchSent = {};
		for (var i = 1; i <= 5; i++) {
			if ($scope.searchParam['field' + i]) {
				searchSent['field' + i] = {};
				searchSent['field' + i].id = $scope.searchParam['field' + i].id;
				searchSent['field' + i].name = $scope.searchParam['field' + i].name;
				searchSent['field' + i].type = $scope.searchParam['field' + i].type;
				searchSent['field' + i].variable = $scope.searchParam['field' + i].variable;
				if (searchSent['field' + i].type == 'LatLon') {
					searchSent['paramLeft' + i] = $("#latlng" + i).val();
				}
			}
			if ($scope.searchParam['operator' + i]) {
				searchSent['operator' + i] = {};
				searchSent['operator' + i].id = $scope.searchParam['operator' + i].id;
				searchSent['operator' + i].name = $scope.searchParam['operator' + i].name;
			}
			if ($scope.searchParam['paramLeft' + i]) {
				if ($scope.searchParam['paramLeft' + i] !== null && typeof $scope.searchParam['paramLeft' + i] === 'object') {
					if ($.isArray($scope.searchParam['paramLeft' + i])) {
						searchSent['paramLeft' + i] = $scope.searchParam['paramLeft' + i];
					} else {
						searchSent['paramLeft' + i] = {};
						searchSent['paramLeft' + i]['_id'] = $scope.searchParam['paramLeft' + i]['_id'];
					}
				} else {
					searchSent['paramLeft' + i] = $scope.searchParam['paramLeft' + i];
				}
			}
			if ($scope.searchParam['paramRight' + i]) {
				if ($scope.searchParam['paramRight' + i] !== null && typeof $scope.searchParam['paramRight' + i] === 'object') {
					if ($.isArray($scope.searchParam['paramRight' + i])) {
						searchSent['paramRight' + i] = $scope.searchParam['paramRight' + i];
					} else {
						searchSent['paramRight' + i] = {};
						searchSent['paramRight' + i]['_id'] = $scope.searchParam['paramRight' + i]['_id'];
					}
				} else {
					searchSent['paramRight' + i] = $scope.searchParam['paramRight' + i];
				}
			}
			if ($scope.searchParam['paramLeft' + i + '_1']) {
				searchSent['paramLeft' + i + '_1'] = $scope.searchParam['paramLeft' + i + '_1'];
			}
			if ($scope.searchParam['paramLeft' + i + '_2']) {
				searchSent['paramLeft' + i + '_2'] = $scope.searchParam['paramLeft' + i + '_2'];
			}
			if ($scope.searchParam['paramLeft' + i + '_3']) {
				searchSent['paramLeft' + i + '_3'] = $scope.searchParam['paramLeft' + i + '_3'];
			}
			if ($scope.searchParam['paramLeft' + i + '_4']) {
				searchSent['paramLeft' + i + '_4'] = $scope.searchParam['paramLeft' + i + '_4'];
			}
			if ($scope.searchParam['paramLeft' + i + '_5']) {
				searchSent['paramLeft' + i + '_5'] = $scope.searchParam['paramLeft' + i + '_5'];
			}
		}
		// set column picked
		searchSent['columns'] = [];
		for (var i = 0 ; i < $scope.columns.length; i++) {
			var column = {};
			column['countVar'] = $scope.columns[i]['countVar'];
			column['title'] = $scope.columns[i]['title'];
			column['type'] = $scope.columns[i]['type'];
			column['variable'] = $scope.columns[i]['variable'];
			searchSent['columns'].push(column);
		}
		window.open(getJobQueryCsvURL + "?" + $.param(searchSent), "_self");
	}
	
	$scope.changeField = function(num) {
		if ($scope.searchParam['operator' + num]) { delete $scope.searchParam['operator' + num]; }
		if ($scope.searchParam['paramLeft' + num]) { delete $scope.searchParam['paramLeft' + num]; }
		if ($scope.searchParam['paramRight' + num]) { delete $scope.searchParam['paramRight' + num]; }
		// select first item in droplist operator
		if ($scope.searchParam['field' + num]) {
			if ($scope.searchParam['field' + num].isEqualOnly) {
				$scope.searchParam['operator' + num] = $scope.operatorEqualList[0];
			} else {
				$scope.searchParam['operator' + num] = $scope.operatorList[0];
			}
		}
	}
	
	$scope.changeOperator = function(num) {
		if ($scope.searchParam['paramLeft' + num]) { delete $scope.searchParam['paramLeft' + num]; }
		if ($scope.searchParam['paramRight' + num]) { delete $scope.searchParam['paramRight' + num]; }
		// also delete for the well condition special case
		if ($scope.searchParam['paramLeft' + num + '_1']) { delete $scope.searchParam['paramLeft' + num + '_1']; }
		if ($scope.searchParam['paramLeft' + num + '_2']) { delete $scope.searchParam['paramLeft' + num + '_2']; }
		if ($scope.searchParam['paramLeft' + num + '_3']) { delete $scope.searchParam['paramLeft' + num + '_3']; }
		if ($scope.searchParam['paramLeft' + num + '_4']) { delete $scope.searchParam['paramLeft' + num + '_4']; }
		if ($scope.searchParam['paramLeft' + num + '_5']) { delete $scope.searchParam['paramLeft' + num + '_5']; }
	}
	
	$scope.columns = [];
	$scope.pickColumn = function(column) {
		switch (column) {
		// Rig Info
		case 'isRigName': // 1
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'rigName') { idx = i; } }
			if ($scope.isRigName) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Rig Name', variable: 'rigName', type: 'string'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isPlatform': // 2
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'rigType.name') { idx = i; } }
			if ($scope.isPlatform) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Platform', variable: 'rigType.name', type: 'string'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		// Job Info
		case 'isDjrNo': // 3 NEW(1)
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'ticketNo') { idx = i; } }
			if ($scope.isDjrNo) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'DJR #', variable: 'ticketNo', type: 'string'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isStartDate': // 4
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'fromDate') { idx = i; } }
			if ($scope.isStartDate) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Start Date', variable: 'fromDate', type: 'date'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isEndDate': // 5
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'toDate') { idx = i; } }
			if ($scope.isEndDate) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'End Date', variable: 'toDate', type: 'date'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isJobStatus': // 6
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'status.name') { idx = i; } }
			if ($scope.isJobStatus) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Job Status', variable: 'status.name', type: 'string'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isOilCompany': // 7
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'oilCompany.name') { idx = i; } }
			if ($scope.isOilCompany) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Oil & Gas Company', variable: 'oilCompany.name', type: 'string'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isServiceCompany': // 8
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'serviceCompany.name') { idx = i; } }
			if ($scope.isServiceCompany) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Service Company', variable: 'serviceCompany.name', type: 'string'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isJobType': // 9
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'environment') { idx = i; } }
			if ($scope.isJobType) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Job Type', variable: 'environment', type: 'JobType'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isRevenue': // 10
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'revenue') { idx = i; } }
			if ($scope.isRevenue) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Revenue', variable: 'revenue', type: 'int'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isPo': // 11 NEW(2)
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'po') { idx = i; } }
			if ($scope.isPo) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'PO #', variable: 'po', type: 'string'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isApi': // 12 NEW(3)
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'api') { idx = i; } }
			if ($scope.isApi) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'API', variable: 'api', type: 'string'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isCostCenter': // 13 NEW(4)
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'costCenter') { idx = i; } }
			if ($scope.isCostCenter) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Cost Center #', variable: 'costCenter', type: 'string'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isAfe': // 14 NEW(5)
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'afe') { idx = i; } }
			if ($scope.isAfe) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'AFE #', variable: 'afe', type: 'string'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isOcsg': // 15 NEW(6)
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'ocsg') { idx = i; } }
			if ($scope.isOcsg) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'OCSG', variable: 'ocsg', type: 'string'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isStateLease': // 16 NEW(7)
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'stateLease') { idx = i; } }
			if ($scope.isStateLease) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'State Lease #', variable: 'stateLease', type: 'string'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isEnvironment': // 17 NEW(8)
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'jobEnv') { idx = i; } }
			if ($scope.isEnvironment) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Environment', variable: 'jobEnv', type: 'JobEnv'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		// Well Info
		case 'isTemp': // 18
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'temp') { idx = i; } }
			if ($scope.isTemp) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Temperature', variable: 'temp', type: 'int'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isWellCondition': // 19
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'wellCondition') { idx = i; } }
			if ($scope.isWellCondition) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Well Condition', variable: 'wellCondition', type: 'WellCondition'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isWellType': // 20
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'wellType') { idx = i; } }
			if ($scope.isWellType) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Well Type', variable: 'wellType', type: 'WellType'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		
		case 'isWellName': // 21
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'wellName') { idx = i; } }
			if ($scope.isWellName) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Well Name', variable: 'wellName', type: 'string'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isBlock': // 22
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'block') { idx = i; } }
			if ($scope.isBlock) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Block', variable: 'block', type: 'string'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isLease': // 23
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'lease') { idx = i; } }
			if ($scope.isLease) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Lease', variable: 'lease', type: 'string'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isField': // 24
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'field') { idx = i; } }
			if ($scope.isField) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Field', variable: 'field', type: 'string'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isDeviation': // 25
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'deviation') { idx = i; } }
			if ($scope.isDeviation) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Deviation (deg)', variable: 'deviation', type: 'int'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isWaterDepth': // 26
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'waterDepth') { idx = i; } }
			if ($scope.isWaterDepth) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Water Depth (ft)', variable: 'waterDepth', type: 'int'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isHoleSize': // 27
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'holeSize') { idx = i; } }
			if ($scope.isHoleSize) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Hole Size (in)', variable: 'holeSize', type: 'int'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isBHP': // 28
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'bhp') { idx = i; } }
			if ($scope.isBHP) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Bottom Hole Pressure (psi)', variable: 'bhp', type: 'int'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isTD': // 29
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'td') { idx = i; } }
			if ($scope.isTD) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Total Well Depth (ft)', variable: 'td', type: 'int'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isMudWt': // 30
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'mudWt') { idx = i; } }
			if ($scope.isMudWt) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Mud Weight (lb/gal)', variable: 'mudWt', type: 'int'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		// Tool Info
		case 'isJarType': // 31
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'toolType') { idx = i; } }
			if ($scope.isJarType) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Tool Type', variable: 'toolType', type: 'JarType'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isJarSerial': // 32
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'jarSerial_') { idx = i; } }
			if ($scope.isJarSerial) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Tool Serial on Run', variable: 'jarSerial_', countVar: 'itemCount', type: 'string'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isJarSerialJob': // 33 NEW(9)
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'serial') { idx = i; } }
			if ($scope.isJarSerialJob) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Tool Serial on Job', variable: 'serial', type: 'JarSerialJob'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		// Run Info
		case 'isRun': // 34
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'run_') { idx = i; } }
			if ($scope.isRun) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Run #', variable: 'run_', countVar: 'itemCount', type: 'string'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isTotalRun': // 35
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'itemCount') { idx = i; } }
			if ($scope.isTotalRun) { // add
				if (idx == -1) {
					$scope.columns.push({title: '# of Total Runs', variable: 'itemCount', type: 'string'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isTotalActivation': // 36
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'totalCountActivation') { idx = i; } }
			if ($scope.isTotalActivation) { // add
				if (idx == -1) {
					$scope.columns.push({title: '# of Activation', variable: 'totalCountActivation', type: 'int'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		
		case 'isActivation': // 37
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'activation_') { idx = i; } }
			if ($scope.isActivation) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Activation', variable: 'activation_', countVar: 'itemCount', type: 'YesNo'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isJarSetting': // 38
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'actualJar_') { idx = i; } }
			if ($scope.isJarSetting) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Jar Setting', variable: 'actualJar_', countVar: 'itemCount', type: 'int'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isImpactPro': // 39
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'impactPro') { idx = i; } }
			if ($scope.isImpactPro) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Impact Pro on Job', variable: 'impactPro', type: 'ImpactPro'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isImpactProRun': // 40 NEW(10)
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'impactPro_') { idx = i; } }
			if ($scope.isImpactProRun) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Impact Pro per Run', variable: 'impactPro_', countVar: 'itemCount', type: 'YesNo'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isImpactProSlotSize': // 41 NEW(11)
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'impactProSlotSize_') { idx = i; } }
			if ($scope.isImpactProSlotSize) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Impact Pro Slot Size', variable: 'impactProSlotSize_', countVar: 'itemCount', type: 'ImpactProSlotSize'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isFishing': // 42
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'fishing_') { idx = i; } }
			if ($scope.isFishing) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Fishing', variable: 'fishing_', countVar: 'itemCount', type: 'YesNo'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		
		case 'isMSP': // 43
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'msp_') { idx = i; } }
			if ($scope.isMSP) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Max Safe Pull (lb)', variable: 'msp_', countVar: 'itemCount', type: 'int'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isWIF': // 44
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'wif_') { idx = i; } }
			if ($scope.isWIF) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Tool Weight in Fluid (lb)', variable: 'wif_', countVar: 'itemCount', type: 'int'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isWIA': // 45
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'wia_') { idx = i; } }
			if ($scope.isWIA) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Tool Weight in Air (lb)', variable: 'wia_', countVar: 'itemCount', type: 'int'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isWOB': // 46
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'wob_') { idx = i; } }
			if ($scope.isWOB) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Weight on Bottom (lb)', variable: 'wob_', countVar: 'itemCount', type: 'int'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isToolstringName': // 47
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'toolstringName_') { idx = i; } }
			if ($scope.isToolstringName) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Toolstring Name', variable: 'toolstringName_', countVar: 'itemCount', type: 'array'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isToolstringLength': // 48
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'toolstringLength_') { idx = i; } }
			if ($scope.isToolstringLength) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Toolstring Length (ft)', variable: 'toolstringLength_', countVar: 'itemCount', type: 'int'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isCableSize': // 49
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'cableSize') { idx = i; } }
			if ($scope.isCableSize) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Cable Size (in)', variable: 'cableSize', type: 'int'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isCableWeight': // 50
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'cableWeight') { idx = i; } }
			if ($scope.isCableWeight) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Cable Weight per 1,000 ft (lb/ft)', variable: 'cableWeight', type: 'int'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isRunDate': // 51 NEW(12)
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'fromDate_') { idx = i; } }
			if ($scope.isRunDate) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Run Date', variable: 'fromDate_', countVar: 'itemCount', type: 'date'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isTotalRunTime': // 52 NEW(13)
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'totalHour_') { idx = i; } }
			if ($scope.isTotalRunTime) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Total Run Time (hrs)', variable: 'totalHour_', countVar: 'itemCount', type: 'int'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isToolsFreed': // 53 NEW(14)
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'toolsFreed_') { idx = i; } }
			if ($scope.isToolsFreed) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Tools Freed', variable: 'toolsFreed_', countVar: 'itemCount', type: 'YesNoNA'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isFormulaUsed': // 54
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'actualJar_') { idx = i; } }
			if ($scope.isFormulaUsed) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Formula Used', variable: 'actualJar_', countVar: 'itemCount', type: 'int'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isWP': // 55
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'wp_') { idx = i; } }
			if ($scope.isWP) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Weak Point (lb)', variable: 'wp_', countVar: 'itemCount', type: 'int'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		// Location
		case 'isCountry': // 56
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'country') { idx = i; } }
			if ($scope.isCountry) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Country', variable: 'country', type: 'string'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isCounty': // 57
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'county') { idx = i; } }
			if ($scope.isCounty) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'County', variable: 'county', type: 'string'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isParish': // 58
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'parish') { idx = i; } }
			if ($scope.isParish) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Parish', variable: 'parish', type: 'string'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isState': // 59
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'state') { idx = i; } }
			if ($scope.isState) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'State', variable: 'state', type: 'string'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isCity': // 60 NEW(15)
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'city') { idx = i; } }
			if ($scope.isCity) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'City', variable: 'city', type: 'string'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isLatLon': // 61 NEW(16)
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'latLon') { idx = i; } }
			if ($scope.isLatLon) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Latitude - Longitude', variable: 'latLon', type: 'LatLon'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		// Personnel
		case 'isTechnician': // 62
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'technician') { idx = i; } }
			if ($scope.isTechnician) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Technician', variable: 'technician', type: 'Technician'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isWirelineEngineer': // 63
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === ' +wirelineEngineer.titleName+wirelineEngineer.firstName+wirelineEngineer.lastName') { idx = i; } }
			if ($scope.isWirelineEngineer) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Wireline Engineer', variable: ' +wirelineEngineer.titleName+wirelineEngineer.firstName+wirelineEngineer.lastName', type: 'string'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isCompanyMan': // 64 NEW(17)
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === ' +companyMan.titleName+companyMan.firstName+companyMan.lastName') { idx = i; } }
			if ($scope.isCompanyMan) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Company Man', variable: ' +companyMan.titleName+companyMan.firstName+companyMan.lastName', type: 'string'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isSales': // 65 NEW(18)
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'sales.employeeName') { idx = i; } }
			if ($scope.isSales) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Sales', variable: 'sales.employeeName', type: 'string'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		// Contact Info
		case 'isRigPhone': // 66 NEW(19)
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'rigPhone') { idx = i; } }
			if ($scope.isRigPhone) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Rig Phone #', variable: 'rigPhone', type: 'string'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isRigFax': // 67 NEW(20)
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'rigFax') { idx = i; } }
			if ($scope.isRigFax) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Rig Fax #', variable: 'rigFax', type: 'string'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isRigEmail': // 68 NEW(21)
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'rigEmail') { idx = i; } }
			if ($scope.isRigEmail) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Rig Email', variable: 'rigEmail', type: 'string'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		$scope.isEngineerPhone = false; $scope.pickColumn('isEngineerPhone'); // 69 -- NEW --22
		case 'isEngineerPhone': // 69 NEW(22)
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'engineerPhone') { idx = i; } }
			if ($scope.isEngineerPhone) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Engineer Phone #', variable: 'engineerPhone', type: 'string'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		case 'isEngineerEmail': // 70 NEW(23)
			var idx = -1;
			for (var i = 0; i < $scope.columns.length; i++) { if ($scope.columns[i].variable === 'engineerEmail') { idx = i; } }
			if ($scope.isEngineerEmail) { // add
				if (idx == -1) {
					$scope.columns.push({title: 'Engineer Email', variable: 'engineerEmail', type: 'string'});
				}
			} else { // remove
				if (idx != -1) {
					$scope.columns.splice(idx, 1);
				}
			}
			break;
		}
	}
	
	$scope.fieldList = [
//Rig Info
{id: 1, name: "Rig Name", type: "string", isEqualOnly: true, variable: "rigName"}, // 1
{id: 2, name: "Platform", type: "TypeRig", isEqualOnly: true, variable: "rigType"}, // 2
// Job Info
{id: 3, name: "RTA", type: "string", isEqualOnly: true, variable: "uid"}, // special 0
{id: 4, name: "DJR #", type: "string", isEqualOnly: true, variable: "ticketNo"}, // 3 -- NEW --1
{id: 5, name: "Start Date", type: "date", isEqualOnly: false, variable: "fromDate"}, // 4
{id: 6, name: "End Date", type: "date", isEqualOnly: false, variable: "toDate"}, // 5
{id: 7, name: "Job Status", type: "StatusJob", isEqualOnly: true, variable: "status"}, // 6
{id: 8, name: "Operator (Oil&Gas Company)", type: "OilCompany", isEqualOnly: true, variable: "oilCompany"}, // 7
{id: 9, name: "Service Company", type: "ServiceCompany", isEqualOnly: true, variable: "serviceCompany"}, // 8
{id: 10, name: "Job Type", type: "Environment", isEqualOnly: true, variable: "environment"}, // 9
{id: 11, name: "Revenue", type: "int", isEqualOnly: false, variable: "revenue"}, // 10
{id: 12, name: "PO #", type: "string", isEqualOnly: true, variable: "po"}, // 11 -- NEW --2
{id: 13, name: "API", type: "string", isEqualOnly: true, variable: "api"}, // 12 -- NEW --3
{id: 14, name: "Cost Center #", type: "string", isEqualOnly: true, variable: "costCenter"}, // 13 -- NEW --4
{id: 15, name: "AFE #", type: "string", isEqualOnly: true, variable: "afe"}, // 14 -- NEW --5
{id: 16, name: "OCSG", type: "string", isEqualOnly: true, variable: "ocsg"}, // 15 -- NEW --6
{id: 17, name: "State Lease", type: "string", isEqualOnly: true, variable: "stateLease"}, // 16 -- NEW --7
{id: 18, name: "Environment", type: "JobEnv", isEqualOnly: true, variable: "jobEnv"}, // 17 -- NEW --8
// Well Info
{id: 19, name: "Temperature", type: "int", isEqualOnly: false, variable: "temp"}, // 18
{id: 20, name: "Well Condition", type: "WellCondition", isEqualOnly: true, variable: "wellCondition"}, // 19
{id: 21, name: "Well Type", type: "WellType", isEqualOnly: true, variable: "wellType"}, // 20
{id: 22, name: "Well Name", type: "string", isEqualOnly: true, variable: "wellName"}, // 21
{id: 23, name: "Block", type: "string", isEqualOnly: true, variable: "block"}, // 22
{id: 24, name: "Lease", type: "string", isEqualOnly: true, variable: "lease"}, // 23
{id: 25, name: "Field", type: "string", isEqualOnly: true, variable: "field"}, // 24
{id: 26, name: "Deviation (deg)", type: "int", isEqualOnly: false, variable: "deviation"}, // 25
{id: 27, name: "Water Depth (ft)", type: "int", isEqualOnly: false, variable: "waterDepth"}, // 26
{id: 28, name: "Hole Size (in)", type: "int", isEqualOnly: false, variable: "holeSize"}, // 27
{id: 29, name: "Bottom Hole Pressure (psi)", type: "int", isEqualOnly: false, variable: "bhp"}, // 28
{id: 30, name: "Total Well Depth (ft)", type: "int", isEqualOnly: false, variable: "td"}, // 29
{id: 31, name: "Mud Weight (lb/gal)", type: "int", isEqualOnly: false, variable: "mudWt"}, // 30
// Tool Info
{id: 32, name: "Tool Type", type: "JarType", isEqualOnly: true, variable: "toolType"}, // 31
{id: 33, name: "Tool Serial on Run", type: "string", isEqualOnly: true, variable: "jarSerial_x"}, // 32
{id: 34, name: "Tool Serial on Job", type: "JarSerialJob", isEqualOnly: true, variable: "serial"}, // 33 -- NEW --9
// Run Info
{id: 35, name: "Run #", type: "string", isEqualOnly: true, variable: "run_x"}, // 34
{id: 36, name: "# of Total Runs", type: "int", isEqualOnly: false, variable: "itemCount"}, // 35
{id: 37, name: "# of Activations", type: "int", isEqualOnly: false, variable: "totalCountActivation"}, // 36
{id: 38, name: "Activation", type: "YesNo", isEqualOnly: true, variable: "activation_x"}, // 37
{id: 39, name: "Jar Setting", type: "int", isEqualOnly: false, variable: "actualJar_x"}, // 38
{id: 40, name: "Impact Pro per Job", type: "YesNo", isEqualOnly: true, variable: "impactPro"}, // 39
{id: 41, name: "Impact Pro Per Run", type: "YesNo", isEqualOnly: true, variable: "impactPro_x"}, // 40 -- NEW --10
{id: 42, name: "Impact Pro Slot Size", type: "ImpactProSlotSize", isEqualOnly: true, variable: "impactProSlotSize_x"}, // 41 -- NEW --11
{id: 43, name: "Fishing", type: "YesNo", isEqualOnly: true, variable: "fishing_x"}, // 42
{id: 44, name: "Max Safe Pull (lb)", type: "int", isEqualOnly: false, variable: "msp_x"}, // 43
{id: 45, name: "Tool Weight in Fluid (lb)", type: "int", isEqualOnly: false, variable: "wif_x"}, // 44
{id: 46, name: "Tool Weight in Air (lb)", type: "int", isEqualOnly: false, variable: "wia_x"}, // 45
{id: 47, name: "Weight on Bottom (lb)", type: "int", isEqualOnly: false, variable: "wob_x"}, // 46
{id: 48, name: "Tool string name", type: "Toolstring", isEqualOnly: true, variable: "toolstringName_x"}, // 47
{id: 49, name: "Tool String Length (ft)", type: "int", isEqualOnly: false, variable: "toolstringLength_x"}, // 48
{id: 50, name: "Cable Size (in)", type: "int", isEqualOnly: false, variable: "cableSize"}, // 49
{id: 51, name: "Cable Weight per 1,000 ft (lb/ft)", type: "int", isEqualOnly: false, variable: "cableWeight"}, // 50
{id: 52, name: "Run Date", type: "date", isEqualOnly: false, variable: "fromDate_x"}, // 51 -- NEW --12
{id: 53, name: "Total Run Time", type: "int", isEqualOnly: false, variable: "totalHour_x"}, // 52 -- NEW --13
{id: 54, name: "Tools Freed", type: "YesNoNA", isEqualOnly: true, variable: "toolsFreed_x"}, // 37 // 53 -- NEW --14
{id: 55, name: "Formula used", type: "int", isEqualOnly: false, variable: "actualJar_x"}, // 54
{id: 56, name: "Weak Point (lb)", type: "int", isEqualOnly: false, variable: "wp_x"}, // 55
// Location
{id: 57, name: "Country", type: "string", isEqualOnly: true, variable: "country"}, // 56
{id: 58, name: "County", type: "string", isEqualOnly: true, variable: "county"}, // 57
{id: 59, name: "Parish", type: "string", isEqualOnly: true, variable: "parish"}, // 58
{id: 60, name: "State", type: "string", isEqualOnly: true, variable: "state"}, // 59
{id: 61, name: "City", type: "string", isEqualOnly: true, variable: "city"}, // 60 -- NEW --15
{id: 62, name: "Latitude - Longitude", type: "LatLon", isEqualOnly: true, variable: "latLon"}, // 61 -- NEW --16
// Personnel
{id: 63, name: "Technician", type: "Technician", isEqualOnly: true, variable: "technician"}, // 62
{id: 64, name: "Wireline Engineer", type: "Contact", isEqualOnly: true, variable: "wirelineEngineer"}, // 63
{id: 65, name: "Company Man", type: "Contact", isEqualOnly: true, variable: "companyMan"}, // 64 -- NEW --17
{id: 66, name: "Sales", type: "Sales", isEqualOnly: true, variable: "sales"}, // 65 -- NEW --18
// Contact Info
{id: 67, name: "Rig Phone #", type: "string", isEqualOnly: true, variable: "rigPhone"}, // 66 -- NEW --19
{id: 68, name: "Rig Fax #", type: "string", isEqualOnly: true, variable: "rigFax"}, // 67 -- NEW --20
{id: 69, name: "Rig Email", type: "string", isEqualOnly: true, variable: "rigEmail"}, // 68 -- NEW --21
{id: 70, name: "Engineer Phone #", type: "string", isEqualOnly: true, variable: "engineerPhone"}, // 69 -- NEW --22
{id: 71, name: "Engineer Email", type: "string", isEqualOnly: true, variable: "engineerEmail"}, // 70 -- NEW --23
	                    ];
	$scope.operatorEqualList = [
		                    {id: 1, name: "Equals"}
		                    ];
	$scope.operatorList = [
	                    {id: 1, name: "Equals"},
	                    {id: 2, name: "Less Than"},
	                    {id: 3, name: "Less Than or Equal"},
	                    {id: 4, name: "More Than"},
	                    {id: 5, name: "More Than or Equal"},
	                    {id: 6, name: "Between"}
	                    ];
	$scope.criteriaNum = [1, 2, 3, 4, 5];
	
	$scope.item_count = function(itemCount) {
    	var arr = [];
		for (var i = 1; i <= itemCount; i++) {
			arr.push(i);
		}
		return arr;
    }

});