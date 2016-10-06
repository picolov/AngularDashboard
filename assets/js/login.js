$(function () {
    $("#username").focus();
});

function doLogin() {
	var username = $("#username").val();
	var password = $("#password").val();
	
    $.ajax({
        type: "POST",
        url: serverURL + "login/auth",
        dataType:"json",
        data: {username: username, password: password},
        success: function(result) {
            //alert("success login " + dumpObject(result, 5));
            if (result.data && result.data.token) {
            	sessionStorage.tokenKey = result.data.token;
                window.location.href = "main.html";
            } else {
            	alert(result.message);
                window.location.href = "login.html";
            }
        },
        error: function (x, status, error) {
        	alert("error login " + x.responseText);
            if (x.status == 401) {
                window.location.href = "login.html";
            } else {
                window.location.href = "login.html";
            }
        },
        beforeSend: function(xhr) {
        	if (sessionStorage.tokenKey) {
            	xhr.setRequestHeader('X-TOKEN-KEY', sessionStorage.tokenKey);
        	}
        }
    });
}