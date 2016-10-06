dashboardControllers.controller("MainController", function($rootScope, $scope, $location, sharedService, ngDialog, NgTableParams, $filter) {
	//$rootScope.breadcrumbs = sharedService.getBreadcrumb();
	var out = sharedService.getDataFromServer(getMyInfoURL);
	$rootScope.currentUser = out.data;
	var output = sharedService.getDataFromServer(getMyProfileURL);
	$rootScope.currentProfile = null;
	if (output && output.data) {
		$rootScope.currentProfile = output.data;
		if (output.data.photo) {
			$("#myPhoto").attr("src", output.data.photo);
		}
	}

	var recentActivitiesOut = sharedService.getDataFromServer(getMyRecentActivityURL);
	$rootScope.recentActivities = recentActivitiesOut.data;
	var accessListOut = sharedService.getDataFromServer(getMyAccessURL);
	$rootScope.accessList = accessListOut.data;

	$scope.myJob = function(theJob) {
		var match = false;
		if ($rootScope.currentProfile && (theJob.technician == $rootScope.currentProfile.employeeName || theJob.technician2 == $rootScope.currentProfile.employeeName)) {
			match = true;
		}
		return match;
	};
	$scope.getNestedVar = function(obj, varName) {
		if (varName.indexOf("+") != -1) {
			var result = "";
			var mergeVars = varName.split("+");
			var separator = mergeVars[0];
			for (var i = 1; i < mergeVars.length; i++) {
				var properties = mergeVars[i].split(".");
				var value = obj;
				angular.forEach(properties, function(property) {
					if (value) {
						value = value[property];
					}
				});
				if (value) {
					result += (value.trim() + separator);
				} else {
					return "";
				}
			}
			return result.substring(0, result.length - separator.length);
		} else {
			var properties = varName.split(".");
			var value = obj;
			angular.forEach(properties, function(property) {
				if (value) {
					value = value[property];
				}
			});
			return value;
		}
	}
	$scope.array_contains = function(a, obj) {
		var i = a.length;
		while (i--) {
			if (a[i] === obj) {
				return true;
			}
		}
		return false;
	}
	$scope.haveAllAccess = function() {
		var allMatch = true;
		for (var i = 0; i < arguments.length; i++) {
			if ($rootScope.accessList.indexOf(arguments[i]) == -1) {
				allMatch = false;
				break;
			}
		}
		return allMatch;
	};
	$scope.haveOneOrMoreAccess = function() {
		var oneMatch = false;
		for (var i = 0; i < arguments.length; i++) {
			if ($rootScope.accessList.indexOf(arguments[i]) > -1) {
				oneMatch = true;
				break;
			}
		}
		return oneMatch;
	};
	$scope.menuClass = function(page) {
		var current = $rootScope.selectedMenu;
		var result = "";
		if (current) {
			var menus = current.split(':');
			var theMenu = null;
			for (var i = 0; i < menus.length; i++) {
				if (theMenu == null) {
					theMenu = menus[i];
				} else {
					theMenu = theMenu + ":" + menus[i];
				}
				if (page === theMenu) {
					result = "active";
					break;
				}
			}
		}
		return result;
	};

	$scope.getToolType = function(serial) {
		if (serial) {
			var tooltype = "";
			if (serial.indexOf(" - ") != -1) {
				tooltype = serial.split(" - ")[0];
			}
			return tooltype;
		} else {
			return null;
		}
	}

	$scope.uncheck = function (event, obj, modelName) {
		if (!$scope.radioButtonVar) {
			$scope.radioButtonVar = {};
		}
		if ($scope.radioButtonVar[modelName] && $scope.radioButtonVar[modelName] === event.target.value) {
			delete $scope.radioButtonVar[modelName];
			delete obj[modelName];
		} else {
			$scope.radioButtonVar[modelName] = event.target.value;
		}

	}

	$scope.repeatBy=function(n){
		return new Array(n);
	};

	$scope.get_item_count = function(scope, itemCount) {
		var arr = [];
		if (!scope.obj[itemCount]) {
			scope.obj[itemCount] = 0;
		}
		for (var i = 1; i <= scope.obj[itemCount]; i++) {
			arr.push(i);
		}
		return arr;
	}

	$scope.add_item = function() {

		var scope = arguments[0];
		var itemCount = arguments[1];
		if (!scope.obj[itemCount]) {
			scope.obj[itemCount] = 0;
		}
		scope.obj[itemCount] = scope.obj[itemCount] + 1;
		for (var i = 2; i < arguments.length; i++) {
			if (scope[arguments[i]]) {
				scope.obj[arguments[i] + '_' + scope.obj[itemCount]] = scope[arguments[i]];
			} else {
				scope.obj[arguments[i] + '_' + scope.obj[itemCount]] = "";
			}
		}

	};

	$scope.delete_item = function() {
		if (confirm("Are You Sure Want To Delete ?")) {
			var obj = arguments[0];
			var idx = arguments[1];
			var itemCount = arguments[2];

			for (var i = 3; i < arguments.length; i++) {
				for (var j = idx; j < obj[itemCount] ; j++) {
					obj[arguments[i] + '_' + (j)] = obj[arguments[i] + '_' + (j + 1)];
				}
			}
			for (var i = 3; i < arguments.length; i++) {
				delete obj[arguments[i] + '_' + obj[itemCount]];
			}
			obj[itemCount]--;
		}
	};

	$scope.getTableParam = function(data) {
    	return new NgTableParams({
			page: 1,
			count: 10
		}, {
			counts: [],
			total: data.length, // length of data
    	    dataset: data
		});
	};

	$scope.setToBreadcrumb = function(index) {
		var breadcrumb = //$rootScope.breadcrumbs[index];
			//sharedService.setToBreadcrumb(index);
			$location.path(breadcrumb.url);
	};

	$scope.$on('$locationChangeStart', function(event) {
		$(":nicescroll").each(function( index ) {
			if ($(this).hasClass("scrollthis") || $(this).hasClass("chathistory") || $(this).attr("id") == "widgetarea") {
				// don't delete the main layout nicescroll
			} else {
				// delete others nicescroll from page dynamic content
				$(this).getNiceScroll().remove();
			}
		});
	});

	/**
	 * Custom REGEX for use in ng-pattern
	 */
	$rootScope.REGEX_NUMBER = /^\d+$/;
	$rootScope.REGEX_USERNAME = /^[a-zA-Z0-9_-]{3,16}$/;
	$rootScope.REGEX_PASSWORD = /^[a-zA-Z0-9_-]{6,18}$/;
	$rootScope.REGEX_CURRENCY = /^(\d*\.\d{1,2}|\d+)$/;
	$rootScope.REGEX_HEX = /^#?([a-f0-9]{6}|[a-f0-9]{3})$/;
	$rootScope.REGEX_EMAIL = /^([a-zA-Z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})$/;
	$rootScope.REGEX_URL = /^(https?:\/\/)?([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})([\/\w \.-]*)*\/?$/;
	//$rootScope.REGEX_PHONE = /^\+?[0-9 ]+$/;
	$rootScope.REGEX_PHONE = /^([0-9\(\)\/\+ \-]*)$/;
	$rootScope.REGEX_IP = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
	/**
	 * Custom function for directive to use in template view
	 */
	$rootScope.stringUtil = function() {
		if (arguments.length < 1) {
			return null;
		}
		var fn = arguments[0];
		var params = [];
		for (var i = 1; i < arguments.length; i++) {
			params.push(arguments[i]);
		}
		return _.str[fn].apply(this, params);
	}

	$rootScope.addNotNull = function(scope, varName, idxStart, idxEnd) {
		var result = 0;
		for (var i = idxStart; i <= idxEnd; i++) {
			if (scope.obj[varName + i]) {
				result += (1*scope.obj[varName + i]);
			}
		}
		return result;
	}

	$rootScope.mergeString = function() {
		if (arguments.length < 2) {
			return null;
		}
		var separator = arguments[0];
		var result = "";
		if ($.isArray(arguments[1])) {
			for (var i = 0; i < arguments[1].length; i++) {
				if (arguments[1][i] && arguments[1][i].trim().length > 0) {
					result += (arguments[1][i].trim() + separator);
				}
			}
		} else {
			for (var i = 1; i < arguments.length; i++) {
				if (arguments[i] && arguments[i].trim().length > 0) {
					result += (arguments[i].trim() + separator);
				}
			}
		}
		return result.substring(0, result.length - separator.length);
	}

	$rootScope.mergeStringNoDup = function() {
		if (arguments.length < 2) {
			return null;
		}
		var separator = arguments[0];
		var result = "";
		var paramArgument = [];
		if ($.isArray(arguments[1])) {
			paramArgument = arguments[1];
		} else {
			for (var i = 1; i < arguments.length; i++) {
				paramArgument.push(arguments[i]);
			}
		}
		var noDupArgument = [];
		$.each(paramArgument, function(i, el){
			if($.inArray(el, noDupArgument) === -1) noDupArgument.push(el);
		});
		for (var i = 0; i < noDupArgument.length; i++) {
			if (noDupArgument[i] && noDupArgument[i].trim().length > 0) {
				result += (noDupArgument[i].trim() + separator);
			}
		}
		return result.substring(0, result.length - separator.length);
	}

	$rootScope.formatTime = function(time, format) {
		if (time == null || time == 0) {
			return "";
		}
		/*
		 if (format == null) {
		 format = "MM/dd/yy, h:mm:ss";
		 }
		 return new Date(time * 1000).toString(format);
		 */
		var dates = new Date(time * 1000);
		var month = (dates.getUTCMonth() + 1);
		var monthStr = "";
		if (month < 10) { monthStr = '0' + month; } else { monthStr = "" + month; }
		var date = dates.getUTCDate();
		var dateStr = "";
		if (date < 10) { dateStr = '0' + date; } else { dateStr = "" + date; }

		return monthStr + "/" + dateStr + "/" + (dates.getUTCFullYear() % 100);
	}

	$rootScope.minimum = function() {
		var minimum = Number.MAX_VALUE;
		var result = "";
		for (var i = 0; i < arguments.length; i++) {
			if ($.isArray(arguments[i])) {
				if (arguments[i][0] < minimum) {
					minimum = arguments[i][0];
					result = arguments[i][1];
				}
			} else {
				if (arguments[i] < minimum) {
					minimum = arguments[i];
					result = arguments[i];
				}
			}
		}
		return result;
	}

	$rootScope.maximum = function() {
		var maximum = Number.MIN_VALUE;
		var result = "";
		for (var i = 0; i < arguments.length; i++) {
			if ($.isArray(arguments[i])) {
				if (arguments[i][0] > maximum) {
					maximum = arguments[i][0];
					result = arguments[i][1];
				}
			} else {
				if (arguments[i] > maximum) {
					maximum = arguments[i];
					result = arguments[i];
				}
			}
		}
		return maximum;
	}

	$rootScope.addNewCompany = function(callbackName) {
		var dialog = ngDialog.open({
			template: 'partials/company/formPopup.html',
			controller: 'CompanyNewPopupController'
		});
		if (callbackName) {
			dialog.closePromise.then(function (data) {
				$rootScope.$broadcast(callbackName, data);
			});
		}
	}

	$rootScope.addNewOilCompany = function(callbackName) {
		var dialog = ngDialog.open({
			template: 'partials/company/formPopup.html',
			controller: 'CompanyNewOilPopupController'
		});
		if (callbackName) {
			dialog.closePromise.then(function (data) {
				$rootScope.$broadcast(callbackName, data);
			});
		}
	}

	$rootScope.addNewServiceCompany = function(callbackName) {
		var dialog = ngDialog.open({
			template: 'partials/company/formPopup.html',
			controller: 'CompanyNewServicePopupController'
		});
		if (callbackName) {
			dialog.closePromise.then(function (data) {
				$rootScope.$broadcast(callbackName, data);
			});
		}
	}

	$rootScope.addNewContact = function(callbackName) {
		var dialog = ngDialog.open({
			template: 'partials/contact/formPopup.html',
			controller: 'ContactNewPopupController'
		});
		if (callbackName) {
			dialog.closePromise.then(function (data) {
				$rootScope.$broadcast(callbackName, data);
			});
		}
	};

	$rootScope.addNewContact = function(callbackName, param) {
		var dialog = ngDialog.open({
			template: 'partials/contact/formPopup.html',
			controller: 'ContactNewPopupController'
		});
		if (callbackName) {
			dialog.closePromise.then(function (data) {
				data.param = param;
				$rootScope.$broadcast(callbackName, data);
			});
		}
	};

	$rootScope.isEmpty = function(input) {
		if (angular.isUndefined(input) || input === null || ((typeof input === 'string' || input instanceof String) && input.trim() === '') ) {
			return true;
		}
		return false;
	}

	/**
	 * Pre Startup javascript code taken from application.js,
	 * because it need to access scope variable in angularJS
	 */

		// On click of right menu
	$("a#rightmenu-trigger").click(function () {
		$("body").toggleClass("show-rightbar");
		//widgetheight();

		if($.cookie('admin_rightbar_show') === 'show-rightbar')
			$.cookie('admin_rightbar_show', '');
		else
			$.cookie('admin_rightbar_show', 'show-rightbar');
		if (!chatLoaded) {
			/**
			 * Chat Integration using Candy, Load chat.html in IFrame right bar.
			 * WARNING : This will error in case User click chat button before the Main.js angular finish getting the username
			 */
			var nameOfUser = "";
			if ($rootScope.currentUser.titleName) {
				nameOfUser += $rootScope.currentUser.titleName + " ";
			}
			if ($rootScope.currentUser.firstName) {
				nameOfUser += $rootScope.currentUser.firstName + " ";
			}
			if ($rootScope.currentUser.middleName) {
				nameOfUser += $rootScope.currentUser.middleName + " ";
			}
			if ($rootScope.currentUser.lastName) {
				nameOfUser += $rootScope.currentUser.lastName + " ";
			}
			nameOfUser = nameOfUser.trim();
			var user = $rootScope.currentUser.username.replace("@", "_");
			var chatConfig = {user: user, nickName: nameOfUser};
			$("#chatFrame").attr("src", "chat.html?" + $.param(chatConfig));
			chatLoaded = true;
		}
	});
});