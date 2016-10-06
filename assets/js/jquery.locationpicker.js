

(function( $ ){

  $.fn.locationPicker = function( options ) {  
	
	if( !this.length ){
		return this;
	}
	
    var settings = $.extend( {
		'lat': 29.760427,
        'lng': -95.369803 
    }, options);
    
    var $current;
    
    var $lp = $("<div class='lp-container'/>");
    
    var $map = $("<div class='lp-map'/>");
    $lp.append($map);
    
    var $helpText = $("<div class='lp-help'>Loading</div>");
    $lp.append($helpText);
    
    var $searchInput = $("<input class='lp-search' type='text' />");
    $lp.append($searchInput);
    
    var $submit = $("<input class='lp-submit' type='submit' value='Search' />");
    $lp.append($submit);
    
    $('body').append($lp);
    
    $searchInput.css({
    	'width': ($map.width() - $submit.outerWidth(true) - 7) + 'px'
    });
    
    $lp.hide();
    
    var geocoder = new google.maps.Geocoder();
    
    var currentLatlng = new google.maps.LatLng(settings.lat, settings.lng);
    var myOptions = {
        zoom: 5,
        center: currentLatlng,
        mapTypeControl: false,
        disableDoubleClickZoom: true,
        streetViewControl: false
    }
    var map = new google.maps.Map($map.get(0), myOptions);
    
    var marker = new google.maps.Marker({
        position: currentLatlng, 
        map: map, 
        title: "Drag Me",
        draggable: true
    });
    
    var RoundDecimal = function(num, decimals){
        var mag = Math.pow(10, decimals);
        return Math.round(num * mag)/mag;
    };
    
    function isLngLat(val){
        var lngLatArr = val.split(",");
        if(lngLatArr.length == 2){
            if(isNaN(lngLatArr[0]) || isNaN(lngLatArr[1])){
                return false;
            }else{
                return true;
            }
        }
        return false;
    }
    
    
    
    var getLocation = function(latlng){
		
		$current.data('address', '');
		
		geocoder.geocode({'latLng': latlng}, function(results, status) {
	        
	        if (status == google.maps.GeocoderStatus.OK) {
	          if (results[1]) {
	          	  var address = results[1].formatted_address;
	          	  $current.address = address;
	              return $helpText.html(address);
	          }
	        }
	        
	        var address = 'Unknown location.';
	      	$current.address = address;
	        return $helpText.html(address);
	      
	    });
	}
	
	function findAddress(){
    	var address = $searchInput.val();
        if(address == ""){
            $helpText.html('Enter your location search');
        }else{
        	if (isLngLat(address)) {
        		var latLngArr = address.split(",");
        		var latlng = new google.maps.LatLng(latLngArr[0].trim(), latLngArr[1].trim());
        		setPosition(latlng);
        	} else {
	            geocoder.geocode( {'address': address, 'region': 'uk'}, function(results, status) {
	                if (status == google.maps.GeocoderStatus.OK) {
	                    setPosition(
	                        results[0].geometry.location,
	                        results[0].geometry.viewport
	                    );
	                } else {
	                    $helpText.html('Could not find that address');
	                }
	            });
        	}
        }
    }
    
    $submit.click(function(event){
        findAddress();
        event.stopPropagation();
    });
    
    $searchInput.keydown(function(event) {
        if (event.keyCode == '13') { // enter
            findAddress();
        }
    });
    
    google.maps.event.addListener(map, 'dblclick', function(event) {
        setPosition(event.latLng);
    });
    
    google.maps.event.addListener(marker, 'dragend', function(event) {
        setPosition(marker.position);
    });
	
	var setPosition = function(latLng, viewport){
		
		google.maps.event.trigger(map, 'resize');
		
		if(typeof($current.address) == 'undefined' || !$current.latLng.equals(latLng)){
			
			getLocation(latLng);
	        
		}else{
			$helpText.html($current.address);
		}
		
		$current.latLng = latLng;
		var lat = RoundDecimal(latLng.lat(), 6);
        var lng = RoundDecimal(latLng.lng(), 6);
        $current.latLng = latLng;
        $current.val(lat + "," + lng);
        
        marker.setPosition(latLng);
        if(viewport){
            map.fitBounds(viewport);
        }else{
            map.panTo(latLng);
            //map.setZoom(15);
        }
        
    }
	
	$("input").focus(function(){
        if($(this).is($current)){
            return;
        }
        if($lp.children(this).length > 0){
        	return;
        }
        $lp.fadeOut('fast');
    });

    return this.each(function() {        

		var $this = $(this);
		
		$this.addClass('lp-input');
		$this.latLng = $.fn.locationPicker.getLatLng($this.val()) || currentLatlng;
		
		$this.focus(function(){
			
			$current = $this;
			var $inputOffset = $this.offset();
			$lp.css({
				left: $inputOffset.left,
				top: $inputOffset.top + $this.outerHeight()
			});
			$lp.fadeIn('fast');
			setPosition($this.latLng);
			
		});
		
		$('html').click(function() {
            $lp.fadeOut('fast');
        });
        
        $lp.click(function(event){
            event.stopPropagation();
        });
        
        $this.click(function(event){
            event.stopPropagation();
        });

    });

  };
  
  
  $.fn.locationPicker.getLatLng = function(val){
        var latLngArr = val.split(",");
        if(latLngArr.length == 2){
            if(!isNaN(latLngArr[0]) && !isNaN(latLngArr[1])){
                return new google.maps.LatLng(latLngArr[0], latLngArr[1]);
            }
        }
        return false;
   };
  
  
})( jQuery );