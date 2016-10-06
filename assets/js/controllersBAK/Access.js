function deleteRole(roleId) {
	var dataToSend = {"_id": roleId};
	var output = angular.injector(['ng', 'dashboardApp']).get("sharedService").callAjax(deleteRoleURL, "post", dataToSend);
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

function fillChildRole(roles, parentNode, id) {
	var output = [];
	if (parentNode == null) {
		for (var i = 0; i < roles.length; i++) {
			if (roles[i].parent == undefined || roles[i].parent == null) {
				output.push(roles[i]);
				$("#" + id).append('<li id=' + roles[i]._id + '><span><i class="fa fa-minus-square-o"></i> ' + roles[i].name + '</span>&nbsp;&nbsp;&nbsp; <a href="#/accessDetail/' + roles[i]._id + '">Edit</a>&nbsp;</li>');
				var child = fillChildRole(roles, roles[i], roles[i]._id);
				if (child.length > 0) {
					roles[i].child = child;
				} else {
					$("#" + roles[i]._id).append('<a href="javascript:deleteRole(\'' + roles[i]._id + '\')">Delete</a>');
					$("#" + roles[i]._id + " > span > i").removeClass("fa-minus-square-o").removeClass("fa-plus-square-o");
					
				}
			}
		}
	} else {
		for (var i = 0; i < roles.length; i++) {
			if (roles[i].parent == parentNode._id) {
				if (output.length == 0) {
					$("#" + id).append('<ul></ul>');
				}
				$("#" + id + " > ul").append('<li id=' + roles[i]._id + '><span><i class="fa fa-minus-square-o"></i> ' + roles[i].name + '</span>&nbsp;&nbsp;&nbsp; <a href="#/accessDetail/' + roles[i]._id + '">Edit</a>&nbsp;</li>');
				output.push(roles[i]);
				var child = fillChildRole(roles, roles[i], roles[i]._id);
				if (child.length > 0) {
					roles[i].child = child;
				} else {
					$("#" + roles[i]._id).append('<a href="javascript:deleteRole(\'' + roles[i]._id + '\')">Delete</a>');
					$("#" + roles[i]._id + " > span > i").removeClass("fa-minus-square-o").removeClass("fa-plus-square-o");
				}
			}
		}
	}
	return output;
}

dashboardControllers.controller('AccessController', function($scope, $controller, sharedService, $route) {
	$controller('_ListController', { 
		$scope: $scope, 
		$menu: "access",
		$title: "Access Management",
		$listObjURL: getAllRoleURL
		});
	// constructing array of nested role parent-child relations
	function compareRoleIdx(a,b) {
		if (a.idx < b.idx) {
			return -1;
		}
		if (a.idx > b.idx) {
			return 1;
		}
		return 0;
	}
	$scope.obj.sort(compareRoleIdx);
	$scope.roles = fillChildRole($scope.obj, null, "tree");
	
	//console.log("roles : " + dumpObject(roles, 5));
	// first open default to collapsed
	$('.tree > ul').attr('role', 'tree').find('ul').attr('role', 'group');
	$('.tree').find('li:has(ul)').addClass('parent_li').attr('role', 'treeitem').find(' > span').attr('title', 'Collapse this branch').on('click', function (e) {
        var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(':visible')) {
    		children.hide('fast');
    		$(this).attr('title', 'Expand this branch').find(' > i').addClass('fa-plus-square-o').removeClass('fa-minus-square-o');
        }
        else {
    		children.show('fast');
    		$(this).attr('title', 'Collapse this branch').find(' > i').addClass('fa-minus-square-o').removeClass('fa-plus-square-o');
        }
        e.stopPropagation();
	});
	//$("ul[role='group'] > li").hide();
	
});

dashboardControllers.controller('AccessDetailController', function($scope, $controller, sharedService) {
	$controller('_DetailController', {
		$scope: $scope, 
		$menu: "access",
		$title: "Access Management",
		$detailObjURL: getRoleDetailURL, 
		$deleteObjURL: deleteRoleURL,
		$successDeletePath: "#/access"
		});
	var output = sharedService.getDataFromServer(getAllRoleURL);
	var 
	output = sharedService.getDataFromServer(getAllAccessByRoleURL + "/_id/" + $scope._id);
    $scope.roleAccess = output.data;
    output = sharedService.getDataFromServer(getAllAccessURL);
    for (var i = 0; i < output.data.length; i++) {
    	output.data[i].checked = false;
    	for (var j = 0; j < $scope.roleAccess.length; j++) {
    		if (output.data[i]._id == $scope.roleAccess[j]._id) {
    			output.data[i].checked = true;
    			break;
    		}
    	}
    }
    $scope.accessLeft = output.data;
    $scope.accessRight = [];
    var indexToSplit = Math.ceil(output.data.length / 2);
    if (indexToSplit > 0) {
    	$scope.accessLeft = output.data.slice(0, indexToSplit);
    	$scope.accessRight = output.data.slice(indexToSplit);
    }
    
    $scope.addRole = function(accessId, roleId) {
		var dataToSend = {"_id": accessId, "role": roleId};
        var output = sharedService.callAjax(addRoleAccessURL, "post", dataToSend);
        if (output && output.status) {
        	// QUIET UPDATE ON CHANGE
            ////alert (output.message);
            if (output.status == 1) {
            	//alert("success delete");
            	//location.href = $successDeletePath;
            }
        } else {
            alert ("Failed to add");
        }
	};
	
	$scope.removeRole = function(accessId, roleId) {
		var dataToSend = {"_id": accessId, "role": roleId};
        var output = sharedService.callAjax(removeRoleAccessURL, "post", dataToSend);
        if (output && output.status) {
        	// QUIET UPDATE ON CHANGE
            ////alert (output.message);
            if (output.status == 1) {
            	//alert("success delete");
            	//location.href = $successDeletePath;
            }
        } else {
            alert ("Failed to remove");
        }
	};
});

dashboardControllers.controller('AccessNewController', function($rootScope, $scope, sharedService, $controller) {
	$controller('_NewController', { 
		$scope: $scope, 
		$menu: "access",
		$title: "Access Management",
		$saveObjURL: saveRoleURL,
		$successSavePath: "#/access"
	});
	var output = sharedService.getDataFromServer(getAllRoleURL);
    $scope.roles = output.data;
});

dashboardControllers.controller('AccessEditController', function($rootScope, $scope, sharedService, $controller) {
	$controller('_EditController', {
		$scope: $scope, 
		$menu: "access",
		$title: "Access Management",
		$detailObjURL: getRoleDetailURL, 
		$updateObjURL: updateRoleURL, 
		$successUpdatePath: "#/accessDetail/"
	});
	var output = sharedService.getDataFromServer(getAllRoleURL);
    $scope.roles = output.data;
    for (var i = 0; i < $scope.roles.length; i++) {
    	if ($scope.roles[i]._id == $scope.obj.parent) {
    		$scope.obj.parent = $scope.roles[i];
    		break;
    	}
    }
});