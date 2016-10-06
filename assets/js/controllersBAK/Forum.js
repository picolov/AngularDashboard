dashboardControllers.controller('ForumController', function($scope, $controller) {
	$controller('_ListController', { 
		$scope: $scope, 
		$menu: "forum",
		$title: "Forum",
		$listObjURL: getAllForumTopicURL
		});
});

dashboardControllers.controller('ForumTopicNewController', function($rootScope, $scope, sharedService, $controller) {
	$rootScope.selectedMenu = "forum";
	//$rootScope.breadcrumbs = sharedService.addBreadcrumb('New Company', $location.path());
	$rootScope.menuTitle = "Forum";
	$scope.obj = {};
	
	$scope.save = function() {
		$scope.obj.desc = desc.nicInstances[0].getContent();
	    var output = sharedService.callAjax(saveForumTopicURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = "#/forum";
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
	var desc = new nicEditor().panelInstance('desc');
});

dashboardControllers.controller('ForumTopicDetailController', function($scope, $controller, sharedService, ngTableParams, $filter) {
	$controller('_DetailController', { 
		$scope: $scope, 
		$menu: "forum",
		$title: "Forum",
		$detailObjURL: getForumTopicDetailURL, 
		$deleteObjURL: deleteForumTopicURL,
		$successDeletePath: "#/forum"
		});
	
	var output = sharedService.getDataFromServer(getForumPostByTopicURL + "/_id/" + $scope._id);
	var data = output.data;
	$scope.objTableParams = $scope.getTableParam(data);
	var postArr = [];
	$("#topicDesc").text($scope.obj.desc);
	var replyDesc = new nicEditor().panelInstance('replyDesc');
	var topicDesc = new nicEditor().panelInstance('topicDesc');
	var topicDescPanel = $("#topicDesc").parent().find('.nicEdit-main');
	topicDescPanel.attr('contenteditable','false');
	topicDescPanel.parent().css("border", "none");
	$("#topicDesc").parent().find('.nicEdit-panelContain').hide();
	
	$scope.addReply = function() {
		var reply = {
				"title" : $scope.title,
				"desc" : replyDesc.nicInstances[0].getContent(),
				"topic" : $scope._id
		}
	    var output = sharedService.callAjax(saveForumPostURL, "post", reply);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	        	//alert("success saved");
	            //sharedService.setToBreadcrumb(sharedService.getBreadcrumb().length-1);
	            location.reload();
	        }
	    } else {
	        alert ("Failed to add replay");
	    }
	};
	
	$scope.$on('onRepeatLast', function(scope, element, attrs){	
		var postContent = document.getElementsByClassName("postContent");
		for (var i = 0; i < postContent.length; i++) {
			postArr.push(new nicEditor().panelInstance(postContent[i]));
			var contentPanel = $(postContent[i]).parent().find('.nicEdit-main');
			contentPanel.attr('contenteditable','false');
			contentPanel.parent().css("border", "none");
			$(postContent[i]).parent().find('.nicEdit-panelContain').hide();
		}
    });
	
	$scope.deletePost = function(id) {
		if (confirm("Are You Sure Want To Delete ?")) {
			var dataToSend = {"_id": id};
	        var output = sharedService.callAjax(deleteForumPostURL, "post", dataToSend);
	        if (output && output.status) {
	            //alert (output.message);
	            if (output.status == 1) {
	            	//alert("success delete");
	            	location.href = "#/forum";
	            }
	        } else {
	            alert ("Failed to delete");
	        }
		}
	};
	
});

dashboardControllers.controller('ForumTopicEditController', function($rootScope, $scope, sharedService, $controller, $routeParams) {
	$rootScope.selectedMenu = "forum";
	//$rootScope.breadcrumbs = sharedService.addBreadcrumb('New Company', $location.path());
	$rootScope.menuTitle = "Forum";
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getForumTopicDetailURL + "?_id=" + $scope._id);
    $scope.obj = output.data[0];
	
	$scope.save = function() {
		$scope.obj.desc = desc.nicInstances[0].getContent();
	    var output = sharedService.callAjax(updateForumTopicURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = "#/forum";
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
	if ($scope.obj && $scope.obj.desc) {
		$("#desc").text($scope.obj.desc);
	}
	var desc = new nicEditor().panelInstance('desc');
});

dashboardControllers.controller('ForumPostEditController', function($rootScope, $scope, sharedService, $controller, $routeParams) {
	$rootScope.selectedMenu = "forum";
	//$rootScope.breadcrumbs = sharedService.addBreadcrumb('New Company', $location.path());
	$rootScope.menuTitle = "Forum";
	$scope._id = $routeParams._id;
    output = sharedService.getDataFromServer(getForumPostDetailURL + "?_id=" + $scope._id);
    $scope.obj = output.data[0];
	
	$scope.save = function() {
		$scope.obj.desc = desc.nicInstances[0].getContent();
	    var output = sharedService.callAjax(updateForumPostURL, "post", $scope.obj);
	    if (output && output.status) {
	        //alert (output.message);
	        if (output.status == 1) {
	            location.href = "#/forum";
	        }
	    } else {
	        alert ("Failed to save");
	    }
	}
	if ($scope.obj && $scope.obj.desc) {
		$("#desc").text($scope.obj.desc);
	}
	var desc = new nicEditor().panelInstance('desc');
});