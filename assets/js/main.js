//var searchLocCount = 0;
// create google map
//function GoogleMap(position) {
//    var location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
//
//    var map = new google.maps.Map(document.getElementById('whereAmIMap'), {
//        zoom: 20,
//        disableDefaultUI: true,
//        mapTypeId: google.maps.MapTypeId.TERRAIN
//    });
//
//    var marker = new google.maps.Marker({
//        map: map,
//        position: location,
//        animation: google.maps.Animation.DROP,
//        title: "This is your location"
//    });
//
//    map.setCenter(location);
//}
// show error if location can't be found
//function showError() {
//    if (searchLocCount < 5) {
//        $('#whereAmIMap').text("Keep Searching");
//        setTimeout(checkGeoLocation, 500);
//    } else {
//        $('#whereAmIMap').text("Sorry, Cannot found your location");
//    }
//}
//function checkGeoLocation() {
//    //execute geolocation
//    if (navigator.geolocation) {
//        navigator.geolocation.getCurrentPosition(GoogleMap, showError);
//        searchLocCount++;
//    }
//    else {
//        alert("Your browser does not support Geolocation.");
//    }
//}
//checkGeoLocation();

function disconnect() {
    //Gab.disconnect();
    $.ajax({
        type: "POST",
        url: serverURL + "login/invalidate",
        dataType:"json",
        data: {},
        success: function(result) {
            //alert("success login " + dumpObject(result, 5));
            if (result.status == 1) {
            	sessionStorage.removeItem("tokenKey");
            	window.location.href = logoutURL;
            }
        },
        error: function (x, status, error) {
        	alert("error logout " + dumpObject(x, 5));
        },
        beforeSend: function(xhr) {
        	if (sessionStorage.tokenKey) {
            	xhr.setRequestHeader('X-TOKEN-KEY', sessionStorage.tokenKey);
        	}
        }
    });
    
}

