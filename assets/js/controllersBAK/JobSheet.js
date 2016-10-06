var CONST_ALL = "\0-ALL-";
var CONST_EMPTY = "\0-EMPTY-";
dashboardControllers.controller('JobSheetController', function($scope, $controller, sharedService, NgTableParams, $sce) {
	$controller('_ListController', {
		$scope: $scope, 
		$menu: "jobSheet",
		$title: "Job DataSheet",
		$listObjURL: getAllJobSheetURL
		});

	// overwrite objTableParams, because we want multi selected filter
	$scope.filteredData = $scope.obj;
	$scope.objTableParams = new NgTableParams({
		page: 1,
		count: 25
	}, {
		filterOptions: { filterFn: customMultiSelectFilter },
		counts: [],
		total: $scope.obj.length, // length of data
		dataset: $scope.obj
	});


	function customMultiSelectFilter(data, filterValues/*, comparator*/){
		$scope.filteredData = data.filter(function(item){
			var matchAllFilter = true;
			for (var prop in filterValues) {
				if (filterValues.hasOwnProperty(prop)) {
					var matchOneOfCriteria = false;
					if (filterValues[prop] instanceof Array) {
						for (var i = 0; i < filterValues[prop].length; i++) {
							var filterString = filterValues[prop][i];
							if (filterString === CONST_EMPTY && item[prop] === "") {
								matchOneOfCriteria = true;
							} else if (filterString === CONST_ALL || item[prop] === filterString) {
								matchOneOfCriteria = true;
							}
						}
					} else if (filterValues[prop] instanceof String) {
						if (filterString === CONST_EMPTY && item[prop] === "") {
							matchOneOfCriteria = true;
						} else if (filterValues[prop] === CONST_ALL || item[prop] === filterValues[prop]) {
							matchOneOfCriteria = true;
						}
					}
					// if one of filter don't match then the item is filtered out
					if (matchOneOfCriteria == false) {
						matchAllFilter = false;
						break;
					}
				}
			}
			return matchAllFilter;
		});
		return $scope.filteredData;
	}
	function asLinkHtml($scope, row) {
		var value = row[this.field];
		var html = "<a href='#/jobSheetDetail/" + row.A + "'>" + value + "</a>";
		return $sce.trustAsHtml(html);
	}

	function asText($scope, row) {
		var value = row[this.field] + "";
		return value;
	}

	$scope.showColumnPicker = false;
	var shownColumns = ["C", "D", "B", "AU", "AV", "AZ", "P", "R", "S", "CO", "CP"];
	$scope.cols = [];
	$scope.columns = _JOB_SHEET_COLUMNS;
	var valuesUniquePerColumn = {};
	for (var i=0; i < $scope.obj.length; i++) {
		for ( var column in $scope.obj[i]) {
			if ($scope.obj[i].hasOwnProperty(column)) {
				if (valuesUniquePerColumn[column]) {
					valuesUniquePerColumn[column][$scope.obj[i][column]] = $scope.obj[i][column]
				} else {
					valuesUniquePerColumn[column] = {};
					valuesUniquePerColumn[column][CONST_ALL] = CONST_ALL;
					valuesUniquePerColumn[column][CONST_EMPTY] = CONST_EMPTY;
					valuesUniquePerColumn[column][$scope.obj[i][column]] = $scope.obj[i][column]
				}
			}
		}
	}
	for (var i = 0; i < $scope.columns.length; i++) {
		var isShown = false;
		if (shownColumns.indexOf($scope.columns[i].column) > 0) {
			isShown = true;
		}
		var filter = {};
		filter[$scope.columns[i].column] = 'customFilter/select.html';
		// if column is Job Number than make it a link
		if ($scope.columns[i].column == "B") {
			$scope.cols.push({
				title: $scope.columns[i].title,
				sortable: $scope.columns[i].column,
				filter: filter,
				filterData: valuesUniquePerColumn[$scope.columns[i].column],
				getValue: asLinkHtml,
				show: isShown,
				field: $scope.columns[i].column
			});
		} else {
			$scope.cols.push({
				title: $scope.columns[i].title,
				sortable: $scope.columns[i].column,
				filter: filter,
				filterData: valuesUniquePerColumn[$scope.columns[i].column],
				getValue: asText,
				show: isShown,
				field: $scope.columns[i].column
			});
		}

	}
	// total 15, 15/4 = 3.5
	$scope.colsLength = Math.ceil($scope.cols.length / 4);
	$scope.colsLengthLast = $scope.cols.length - (3 * Math.ceil($scope.cols.length / 4));
	$scope.start1 = 0;
	$scope.start2 = $scope.start1 + $scope.colsLength;
	$scope.start3 = $scope.start2 + $scope.colsLength;
	$scope.start4 = $scope.start3 + $scope.colsLength;
	$scope.end1 = $scope.colsLength;
	$scope.end2 = $scope.end1 + $scope.colsLength;
	$scope.end3 = $scope.end2 + $scope.colsLength;
	$scope.end4 = $scope.end3 + $scope.colsLengthLast;

	$scope.uploadFile = function() {
		var file = $('#upload')[0].files[0];
		if (file) {
			var type = file.type;
			var reader = new FileReader();
			var name = file.name;
			reader.onload = function (e) {
				var data = e.target.result;
				var workbook = XLSX.read(data, {type: 'binary', cellDates:true});
				var isDate1904 = workbook.Workbook.WBProps.date1904;
				var worksheet = workbook.Sheets[workbook.SheetNames[0]];
				var rangeRef = worksheet['!ref'];
				var rangeCell = rangeRef.split(":");
				var startCell = XLSX.utils.decode_cell(rangeCell[0]);
				var endCell = XLSX.utils.decode_cell(rangeCell[1]);
				var values = [];
				for  (var r = 3; r < endCell.r; r++) {
                    var rowNumber = worksheet[XLSX.utils.encode_cell({c: 0, r: r})];
					var jobNumber = worksheet[XLSX.utils.encode_cell({c: 1, r: r})];
					if (rowNumber && rowNumber.v && jobNumber && jobNumber.v) {
						// _id set as line number, so line number must be unique
						var jobRow = {_id: worksheet["A" + XLSX.utils.encode_row(r)].w};
						for (var col = 0; col < $scope.columns.length; col++) {
							var column = $scope.columns[col];
							var valueObj = worksheet[column.column + XLSX.utils.encode_row(r)];
							if (valueObj) {
								switch (column.type) {
									case "date" :
									case "string" :
									default :
										if (valueObj.w && valueObj.w.trim().length > 0) {
											jobRow[column.column] = valueObj.w.trim();
										} else {
											jobRow[column.column] = "";
										}
								}
							} else {
								jobRow[column.column] = "";
							}
						}
						jobRow['A'] = worksheet["A" + XLSX.utils.encode_row(r)].w - 0;
						values.push(jobRow);
					}
				}
                var output = sharedService.callAjax(saveMultiJobSheetURL, "post", values);
                if (output && output.status) {
                    if (output.status == 1) {
                        alert("successfully saved");
						location.reload();
                    } else {
						alert(output.message);
					}
                } else {
                    alert ("Failed to save");
                }
			};
			reader.readAsBinaryString(file);
		}
	};
	function datenum(v, date1904) {
		if(date1904) v+=1462;
		var epoch = Date.parse(v);
		return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
	}

	function sheet_from_array_of_arrays(data, opts) {
		var ws = {};
		var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
		for(var R = 0; R != data.length; ++R) {
			for(var C = 0; C != data[R].length; ++C) {
				if(range.s.r > R) range.s.r = R;
				if(range.s.c > C) range.s.c = C;
				if(range.e.r < R) range.e.r = R;
				if(range.e.c < C) range.e.c = C;
				var cell = {v: data[R][C] };
				if(cell.v == null) continue;
				var cell_ref = XLSX.utils.encode_cell({c:C,r:R});

				if(typeof cell.v === 'number') cell.t = 'n';
				else if(typeof cell.v === 'boolean') cell.t = 'b';
				else if(cell.v instanceof Date) {
					cell.t = 'n'; cell.z = XLSX.SSF._table[14];
					cell.v = datenum(cell.v);
				}
				else cell.t = 's';

				ws[cell_ref] = cell;
			}
		}
		if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
		return ws;
	}
	function Workbook() {
		if(!(this instanceof Workbook)) return new Workbook();
		this.SheetNames = [];
		this.Sheets = {};
	}
	function s2ab(s) {
		var buf = new ArrayBuffer(s.length);
		var view = new Uint8Array(buf);
		for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
		return buf;
	}
	$scope.downloadFile = function() {
		var data = [];
		// write header
		var columnName,value;
		var rowValues = [];
		for (var j = 0; j < $scope.cols.length; j++) {
			if ($scope.cols[j].show) {
				rowValues.push($scope.cols[j].title);
			}
		}
		data.push(rowValues);
		for (var i = 0; i < $scope.filteredData.length; i++) {
			rowValues = [];
			for (var j = 0; j < $scope.cols.length; j++) {
				if ($scope.cols[j].show) {
					columnName = $scope.cols[j].field;
					value = $scope.filteredData[i][columnName];
					rowValues.push(value);
				}
			}
			data.push(rowValues);
		}
		/* original data */
		//var data = [[1,2,3],[true, false, null, "sheetjs"],["foo","bar",new Date("2014-02-19T14:30Z"), "0.3"], ["baz", null, "qux"]]
		var ws_name = "Job DataSheet";
		var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);
		/* add worksheet to workbook */
		wb.SheetNames.push(ws_name);
		wb.Sheets[ws_name] = ws;
		var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});
		saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), "jobDataSheet.xlsx")
	}
});

dashboardControllers.controller('JobSheetDetailController', function($scope, $controller) {
	$controller('_DetailController', { 
		$scope: $scope, 
		$menu: "jobSheet",
		$title: "Job DataSheet",
		$detailObjURL: getJobSheetDetailURL,
		$deleteObjURL: deleteJobSheetURL,
		$successDeletePath: "#/jobSheet"
		});
	$scope.columns = _JOB_SHEET_COLUMNS;
});

dashboardControllers.controller('JobSheetNewController', function($rootScope, $scope, sharedService, $controller) {
	$controller('_NewController', { 
		$scope: $scope, 
		$menu: "jobSheet",
		$title: "Job DataSheet",
		$saveObjURL: saveJobSheetURL,
		$successSavePath: "#/jobSheet"
	});
	// get max jobsheet line number from server
	var output = sharedService.getDataFromServer(getJobSheetMaxLineURL);
	$scope.obj.A = output.data[0].A + 1;
	$scope.columns = _JOB_SHEET_COLUMNS;
	$scope.save = function() {
		$scope.obj._id = $scope.obj.A + "";
		for (var i = 0; i < $scope.columns.length; i++) {
			if (!$scope.obj.hasOwnProperty($scope.columns[i].column)) {
				$scope.obj[$scope.columns[i].column] = "";
			}
		}
		var output = sharedService.callAjax(saveJobSheetURL, "post", $scope.obj);
		if (output && output.status) {
			if (output.status == 1) {
				location.href = "#/jobSheet";
			} else {
				alert(output.message);
			}
		} else {
			alert ("Failed to save");
		}
	}
});

dashboardControllers.controller('JobSheetEditController', function($rootScope, $scope, sharedService, $controller) {
	$controller('_EditController', {
		$scope: $scope, 
		$menu: "jobSheet",
		$title: "Job DataSheet",
		$detailObjURL: getJobSheetDetailURL,
		$updateObjURL: updateJobSheetURL,
		$successUpdatePath: "#/jobSheetDetail/"
	});
	$scope.columns = _JOB_SHEET_COLUMNS;
	$scope.save = function() {
		for (var i = 0; i < $scope.columns.length; i++) {
			if (!$scope.obj.hasOwnProperty($scope.columns[i].column)) {
				$scope.obj[$scope.columns[i].column] = "";
			}
		}
		var output = sharedService.callAjax(updateJobSheetURL, "post", $scope.obj);
		if (output && output.status) {
			if (output.status == 1) {
				location.href = "#/jobSheetDetail/" + $scope._id;
			} else {
				alert(output.message);
			}
		} else {
			alert ("Failed to update");
		}
	}
});

var _JOB_SHEET_COLUMNS = [
	{type: "string", title: "Line", column: "A"},
	{type: "string", title: "Job Number", column: "B"},
	{type: "date", title: "Date Tools Out", column: "C"},
	{type: "date", title: "Date Tools In", column: "D"},
	{type: "string", title: "Tools Used", column: "E"},
	{type: "money", title: "Flat Rate", column: "F"},
	//{type: "money", title: "Add Days", column: "G"},
	//{type: "number", title: "Qty of Standby Days", column: "H"},
	//{type: "money", title: "Net Standby Charge", column: "I"},
	//{type: "number", title: "Qty of Use Days", column: "J"},
	//{type: "money", title: "Net Use Charge", column: "K"},
	{type: "money", title: "Invoice Total", column: "L"},
	{type: "string", title: "Country (End User)", column: "M"},
	{type: "string", title: "Tools", column: "N"},
	{type: "string", title: "E-Line, S-Line, Other", column: "O"},
	{type: "string", title: "Tool Type", column: "P"},
	{type: "string", title: "Requested Service", column: "Q"},
	{type: "string", title: "Tools Size", column: "R"},
	{type: "number", title: "Quantity", column: "S"},
	{type: "string", title: "Tool String Size", column: "T"},
	{type: "string", title: "Unknown", column: "U"},
	{type: "string", title: "PLT", column: "V"},
	{type: "string", title: "Perforate", column: "W"},
	{type: "string", title: "CBL", column: "X"},
	{type: "string", title: "Gamma Ray", column: "Y"},
	{type: "string", title: "PNL LOG", column: "Z"},
	{type: "string", title: "Cut", column: "AA"},
	{type: "string", title: "Dir. Survey/Gyro", column: "AB"},
	{type: "string", title: "BHP", column: "AC"},
	{type: "string", title: "Bailer/Dump Cement", column: "AD"},
	{type: "string", title: "Leak Test", column: "AE"},
	{type: "string", title: "Tractor", column: "AF"},
	{type: "string", title: "Temperature", column: "AG"},
	{type: "string", title: "Memory", column: "AH"},
	{type: "string", title: "Dummy Run", column: "AI"},
	{type: "string", title: "Multi Service", column: "AJ"},
	{type: "string", title: "Plug or Packer", column: "AK"},
	{type: "string", title: "Shift Sleeve", column: "AL"},
	{type: "string", title: "Gauge Run", column: "AM"},
	{type: "string", title: "KOT/GLV", column: "AN"},
	{type: "string", title: "Fishing", column: "AO"},
	{type: "string", title: "Other", column: "AP"},
	{type: "string", title: "Notes & Comments", column: "AQ"},
	{type: "string", title: "Planned Sale Type", column: "AR"},
	{type: "string", title: "LIH?", column: "AS"},
	{type: "string", title: "Customer (Billed To)", column: "AT"},
	{type: "string", title: "Wireline Company", column: "AU"},
	{type: "string", title: "Oil Company", column: "AV"},
	{type: "string", title: "Platform / Division", column: "AW"},
	{type: "string", title: "Area", column: "AX"},
	{type: "string", title: "Block", column: "AY"},
	{type: "string", title: "Well Name", column: "AZ"},
	//{type: "string", title: "H2S%", column: "BA"},
	//{type: "string", title: "CO2%", column: "BB"},
	//{type: "string", title: "Max F", column: "BC"},
	{type: "string", title: "Max Inc", column: "BD"},
	{type: "string", title: "Max Depth", column: "BE"},
	{type: "string", title: "Restriction", column: "BF"},
	//{type: "string", title: "", column: "BG"},
	//{type: "string", title: "", column: "BH"},
	//{type: "string", title: "", column: "BI"},
	//{type: "string", title: "", column: "BJ"},
	//{type: "string", title: "", column: "BK"},
	//{type: "string", title: "", column: "BL"},
	//{type: "string", title: "", column: "BM"},
	//{type: "string", title: "", column: "BN"},
	//{type: "string", title: "", column: "BO"},
	//{type: "string", title: "", column: "BP"},
	//{type: "string", title: "", column: "BQ"},
	//{type: "string", title: "", column: "BR"},
	//{type: "string", title: "", column: "BS"},
	//{type: "string", title: "", column: "BT"},
	//{type: "string", title: "", column: "BU"},
	//{type: "string", title: "", column: "BV"},
	//{type: "string", title: "", column: "BW"},
	//{type: "string", title: "", column: "BX"},
	//{type: "string", title: "", column: "BY"},
	//{type: "string", title: "", column: "BZ"},
	//{type: "string", title: "", column: "CA"},
	//{type: "string", title: "", column: "CB"},
	//{type: "string", title: "", column: "CC"},
	//{type: "string", title: "", column: "CD"},
	//{type: "string", title: "", column: "CE"},
	//{type: "string", title: "", column: "CF"},
	//{type: "string", title: "", column: "CG"},
	{type: "string", title: "Job#", column: "CH"},
	{type: "date", title: "Date Out", column: "CI"},
	{type: "string", title: "Wire Co", column: "CJ"},
	{type: "string", title: "Op Co", column: "CK"},
	{type: "string", title: "Platform/Division", column: "CL"},
	{type: "string", title: "Area", column: "CM"},
	{type: "string", title: "Size", column: "CN"},
	{type: "string", title: "Objective", column: "CO"},
	{type: "string", title: "Max", column: "CP"}
];