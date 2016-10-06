dashboardControllers.factory('sharedService', function($rootScope) {
    var sharedService = {};

    sharedService.getDataFromServer = function(url) {
        var jsonVal = null;
        if (url) {
            $.ajax({
                type: 'GET',
                url: url,
                data: {},
                dataType: 'json',
                async:false,
                cache: false,
                beforeSend: function(xhr) {
                	if (sessionStorage.tokenKey) {
                		xhr.setRequestHeader('X-TOKEN-KEY', sessionStorage.tokenKey);
                	}
                },
                error: function (x, status, error) {
                	console.log("error x " + dumpObject(x, 5));
                    if (x.status == 401) {
                    	alert(x.responseJSON.message);
                        window.location.href = "login.html";
                    } else {
                        //window.location.href = "login.html";
                    }
                },
            })
                .success(function(jsonReturn) {
                    jsonVal =  jsonReturn;
                    //console.log("returned getDataFromServer : " + dumpObject(jsonReturn, 5));
                });

                
        } else {
            alert("URL is not valid");
        }

        return jsonVal;
    }

    sharedService.validateInput = function(input, regex) {
        var regexExpression = new RegExp(regex);
        return regexExpression.test(input);
    };

    sharedService.logout = function() {
        $.ajax({
            type: 'GET',
            url: serverURL + "logout",
            cache: false,
            async:false
        }).success(function(jsonReturn) {
                window.location.href = "index.html";
            }).fail(function() {
                alert("Log Out Failed");
            });
    };

    sharedService.callAjax = function (url, method, data) {
        var returnData = null;
        setUndefinedAsNull(data, 4);
        $.ajax({
            type: method,
            url: url,
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            data: JSON.stringify(data),
            async:false,
            cache: false,
            success: function(data){
                //console.debug("method" + method);
                returnData = data;
            },
            fail: function(msg) {
                console.debug("== Failed Send Data cause " + msg);
                var err = {};
                err.code = "007";
                err.message = "Failed Send Data cause " + msg;
                returnData = err;
            },
            error: function (x, status, error) {
            	console.log("error x " + dumpObject(x, 5));
                if (x.status == 401) {
                    window.location.href = "login.html";
                } else {
                    //window.location.href = "login.html";
                }
            },
            beforeSend: function(xhr) {
            	if (sessionStorage.tokenKey) {
            		xhr.setRequestHeader('X-TOKEN-KEY', sessionStorage.tokenKey);
            	}
            }
        });
        /**
         * Update recent activities
         */
        var recentActivitiesOut = sharedService.getDataFromServer(getMyRecentActivityURL);
    	$rootScope.recentActivities = recentActivitiesOut.data;
    	
        return returnData;
    }

    sharedService.getBreadcrumb = function () {
        return this.getDataFromServer(getBreadcrumbURL);
    }
    sharedService.newBreadcrumb = function (name, url) {
        return this.getDataFromServer(newBreadcrumbURL + "?name=" + name + "&url=" + url);
    }
    sharedService.addBreadcrumb = function (name, url) {
        return this.getDataFromServer(addBreadcrumbURL + "?name=" + name + "&url=" + url);
    }
    sharedService.setToBreadcrumb = function (idx) {
        return this.getDataFromServer(setToBreadcrumbURL + "?idx=" + idx);
    }

    return sharedService;
});