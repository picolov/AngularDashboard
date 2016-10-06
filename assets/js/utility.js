function isObject(val) {
    if (val === null) { return false;}
    return ( (typeof val === 'function') || (typeof val === 'object') );
}

function setUndefinedAsNull(obj, depth_limit) {
	for (var key in obj) {
    	if (obj[key] == undefined) {
    		obj[key] = null;
    	} else if (isObject(obj[key]) && depth_limit > 0) {
    		setUndefinedAsNull(obj[key], depth_limit - 1);
    	}
    }
}

function getHiddenDimensions(item, includeMargin) {
    var $item = item,
        props = { position: 'absolute', visibility: 'hidden', display: 'block' },
        dim = { width:0, height:0, innerWidth: 0, innerHeight: 0,outerWidth: 0,outerHeight: 0 },
        $hiddenParents = $item.parents().andSelf().not(':visible'),
        includeMargin = (includeMargin == null)? false : includeMargin;

    var oldProps = [];
    $hiddenParents.each(function() {
        var old = {};

        for ( var name in props ) {
            old[ name ] = this.style[ name ];
            this.style[ name ] = props[ name ];
        }

        oldProps.push(old);
    });

    dim.width = $item.width();
    dim.outerWidth = $item.outerWidth(includeMargin);
    dim.innerWidth = $item.innerWidth();
    dim.height = $item.height();
    dim.innerHeight = $item.innerHeight();
    dim.outerHeight = $item.outerHeight(includeMargin);

    $hiddenParents.each(function(i) {
        var old = oldProps[i];
        for ( var name in props ) {
            this.style[ name ] = old[ name ];
        }
    });

    return dim;
}

function getStaticMap(opts) {
			  var src = "http://maps.googleapis.com/maps/api/staticmap?",
			      params = $.extend({
			        center: 'New York, NY',
			        zoom: 5,
			        size: '200x200',
			        maptype: 'terrain',
			        sensor: false
			      }, opts),
			      query = [];

			  $.each(params, function(k, v) {
			    query.push(k + '=' + encodeURIComponent(v));
			  });

			  src += query.join('&');
			  var latitudeLongitude = params.center.split(',');
			  return '<div>Latitude : ' + latitudeLongitude[0] + '</div><div>Longitude : ' + latitudeLongitude[1] + '</div><img src="' + src + '" />';
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function dumpObject(obj, maxDepth) {
    var dump = function(obj, name, depth, tab){
        if (depth > maxDepth) {
            return name + ' - Max depth\n';
        }

        if (typeof(obj) == 'object') {
            var child = null;
            var output = tab + name + '\n';
            tab += '\t';
            for(var item in obj){
                child = obj[item];
                if (typeof(child) == 'object') {
                    output += dump(child, item, depth + 1, tab);
                } else {
                    output += tab + item + ': ' + child + '\n';
                }
            }
        }
        return output;
    }

    return dump(obj, '', 0, '');
}

function timeDiff(earlierDate,laterDate)
{
    var nTotalDiff = laterDate.getTime() - earlierDate.getTime();
    var oDiff = new Object();

    oDiff.days = Math.floor(nTotalDiff/1000/60/60/24);
    nTotalDiff -= oDiff.days*1000*60*60*24;

    oDiff.hours = Math.floor(nTotalDiff/1000/60/60);
    nTotalDiff -= oDiff.hours*1000*60*60;

    oDiff.minutes = Math.floor(nTotalDiff/1000/60);
    nTotalDiff -= oDiff.minutes*1000*60;

    oDiff.seconds = Math.floor(nTotalDiff/1000);

    return oDiff;

}

function timeDiffString(earlierDate,laterDate)
{
    var oDiff = timeDiff(earlierDate, laterDate)

    return (oDiff.days > 0 ? oDiff.days + " day " : "") + (oDiff.hours > 0 ? oDiff.hours + " hour " : "") + (oDiff.minutes > 0 ? oDiff.minutes + " minute " : "") + (oDiff.seconds > 0 ? oDiff.seconds + " second " : "") + " ago";

}

function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function replaceAll(find, replace, str) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function UUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

function parseDateWithClientTimeZone(date) {
    var utcOffset = Date.today().getUTCOffset();
    var offsetInMillis = (utcOffset/100) * 60 * 60 * 1000;
    var newDate = new Date(date.getTime() + (offsetInMillis));

    return newDate;
}

function resizeBase64Image(base64Image, maxWidth, maxHeight, targetId) {
    var tempImage = new Image();
    tempImage.onload = function() {
        var height = tempImage.height;
        var width = tempImage.width;
        if (height > maxHeight) { // max height for our purposes is 100 pixels
            width = width / (height / maxHeight);
            height = maxHeight;
        }
        if (width > maxWidth) { // max width for our purposes is 150 pixels
            height = height / (width / maxWidth);
            width = maxWidth;
        }
        var c = document.createElement('canvas');
        c.width = width;
        c.height = height;
        var ctx = c.getContext("2d");
        ctx.drawImage(tempImage, 0, 0, width, height);
        $(targetId).attr('src', c.toDataURL());
    };
    tempImage.src = base64Image; // to get the base64 result
}

function loadDomCollab(linkSave, linkDelete){
    //custom for edit delete
    $(function(){
        var saveBtn = $('.btn-goSave');
        var deltBtn = $('.btn-goDelete');

        saveBtn.unbind("click");
        deltBtn.unbind("click");
        $('.isi-page').unbind("click");

        $('.btn-goEdit').click(function(e){
            e.preventDefault();
            var ths = $(this);

            ths.parent().parent().parent().find(".faq-show").fadeOut(300, function(){
                ths.parent().parent().parent().find(".faq-edit").fadeIn();
            });
        });

        $('.btn-goBack').click(function(e){
            e.preventDefault();
            var ths = $(this);

            ths.parent().parent().parent().find(".faq-edit").fadeOut(300, function(){
                ths.parent().parent().parent().find(".faq-show").fadeIn();
            });
        });

        saveBtn.on('click', function(e){
            e.preventDefault();
            var ths = $(this);
            var datas = {};
            var ids = ths.parent().children("input[name=_id]").val();
            var que = ths.parent().children("input[name=question]").val();
            var ans = ths.parent().children("textarea[name=answer]").val();

            if(ths.attr("data-mode") == "faq"){
                console.log("FAQ");
                datas = {_id: ids, question: que, answer: ans};
            } else{
                console.log("Glossss");
                datas = {_id: ids, name: que, description: ans};
            }

            $.ajax({
                type: "POST",
                url: linkSave,
                data: datas,
                dataType: 'json',
                async:false,
                cache: false,
                beforeSend: function(xhr) {
                    if (sessionStorage.tokenKey) {
                        xhr.setRequestHeader('X-TOKEN-KEY', sessionStorage.tokenKey);
                    }
                }
            }).done(function(data) {
                if(data.status == 1){
                    alert("Successfully Executed");
                    location.reload();
                }
            }).error(function(e){
                alert("[ERRR] Update Data Error : " + JSON.parse(e));
            });
        });


        // Action for delete
        deltBtn.on('click', function(e){
            e.preventDefault();
            var ths = $(this);
            var ids = ths.parent().children("input[name=_id]").val();

            $.ajax({
                type: "POST",
                url: linkDelete,
                data: {_id: ids},
                dataType: 'json',
                async:false,
                cache: false,
                beforeSend: function(xhr) {
                    if (sessionStorage.tokenKey) {
                        xhr.setRequestHeader('X-TOKEN-KEY', sessionStorage.tokenKey);
                    }
                }
            }).done(function(data) {
                if(data.status == 1){
                    alert("Successfully Deleted");
                    location.reload();
                }
            }).error(function(e){
                alert("[ERRR] Update Data Error : " + JSON.parse(e));
            });
        });

        $('.isi-page').on('click',function(e){
            e.preventDefault();
            var goPage = $(this).attr("data-page");
            sessionStorage.setItem('pageNum', goPage);
            location.reload();
        });
    });
}

var STATE_LIST = [
                  {
                      "name": "Alabama",
                      "code": "AL"
                  },
                  {
                      "name": "Alaska",
                      "code": "AK"
                  },
                  {
                      "name": "Arizona",
                      "code": "AZ"
                  },
                  {
                      "name": "Arkansas",
                      "code": "AR"
                  },
                  {
                      "name": "California",
                      "code": "CA"
                  },
                  {
                      "name": "Colorado",
                      "code": "CO"
                  },
                  {
                      "name": "Connecticut",
                      "code": "CT"
                  },
                  {
                      "name": "Delaware",
                      "code": "DE"
                  },
                  {
                      "name": "Florida",
                      "code": "FL"
                  },
                  {
                      "name": "Georgia",
                      "code": "GA"
                  },
                  {
                      "name": "Hawaii",
                      "code": "HI"
                  },
                  {
                      "name": "Idaho",
                      "code": "ID"
                  },
                  {
                      "name": "Illinois",
                      "code": "IL"
                  },
                  {
                      "name": "Indiana",
                      "code": "IN"
                  },
                  {
                      "name": "Iowa",
                      "code": "IA"
                  },
                  {
                      "name": "Kansas",
                      "code": "KS"
                  },
                  {
                      "name": "Kentucky",
                      "code": "KY"
                  },
                  {
                      "name": "Louisiana",
                      "code": "LA"
                  },
                  {
                      "name": "Maine",
                      "code": "ME"
                  },
                  {
                      "name": "Maryland",
                      "code": "MD"
                  },
                  {
                      "name": "Massachusetts",
                      "code": "MA"
                  },
                  {
                      "name": "Michigan",
                      "code": "MI"
                  },
                  {
                      "name": "Minnesota",
                      "code": "MN"
                  },
                  {
                      "name": "Mississippi",
                      "code": "MS"
                  },
                  {
                      "name": "Missouri",
                      "code": "MO"
                  },
                  {
                      "name": "Montana",
                      "code": "MT"
                  },
                  {
                      "name": "Nebraska",
                      "code": "NE"
                  },
                  {
                      "name": "Nevada",
                      "code": "NV"
                  },
                  {
                      "name": "New Hampshire",
                      "code": "NH"
                  },
                  {
                      "name": "New Jersey",
                      "code": "NJ"
                  },
                  {
                      "name": "New Mexico",
                      "code": "NM"
                  },
                  {
                      "name": "New York",
                      "code": "NY"
                  },
                  {
                      "name": "North Carolina",
                      "code": "NC"
                  },
                  {
                      "name": "North Dakota",
                      "code": "ND"
                  },
                  {
                      "name": "Ohio",
                      "code": "OH"
                  },
                  {
                      "name": "Oklahoma",
                      "code": "OK"
                  },
                  {
                      "name": "Oregon",
                      "code": "OR"
                  },
                  {
                      "name": "Pennsylvania",
                      "code": "PA"
                  },
                  {
                      "name": "Rhode Island",
                      "code": "RI"
                  },
                  {
                      "name": "South Carolina",
                      "code": "SC"
                  },
                  {
                      "name": "San Diego",
                      "code": "SD"
                  },
                  {
                      "name": "Tennessee",
                      "code": "TN"
                  },
                  {
                      "name": "Texas",
                      "code": "TX"
                  },
                  {
                      "name": "Utah",
                      "code": "UT"
                  },
                  {
                      "name": "Vermont",
                      "code": "VT"
                  },
                  {
                      "name": "Virginia",
                      "code": "VA"
                  },
                  {
                      "name": "Washington",
                      "code": "WA"
                  },
                  {
                      "name": "West Virginia",
                      "code": "WV"
                  },
                  {
                      "name": "Wisconsin",
                      "code": "WI"
                  },
                  {
                      "name": "Wyoming",
                      "code": "WY"
                  }
              ];
var COUNTRY_LIST = [
                    {
                        "name": "Afghanistan",
                        "code": "AF"
                    },
                    {
                        "name": "Åland Islands",
                        "code": "AX"
                    },
                    {
                        "name": "Albania",
                        "code": "AL"
                    },
                    {
                        "name": "Algeria",
                        "code": "DZ"
                    },
                    {
                        "name": "American Samoa",
                        "code": "AS"
                    },
                    {
                        "name": "AndorrA",
                        "code": "AD"
                    },
                    {
                        "name": "Angola",
                        "code": "AO"
                    },
                    {
                        "name": "Anguilla",
                        "code": "AI"
                    },
                    {
                        "name": "Antarctica",
                        "code": "AQ"
                    },
                    {
                        "name": "Antigua and Barbuda",
                        "code": "AG"
                    },
                    {
                        "name": "Argentina",
                        "code": "AR"
                    },
                    {
                        "name": "Armenia",
                        "code": "AM"
                    },
                    {
                        "name": "Aruba",
                        "code": "AW"
                    },
                    {
                        "name": "Australia",
                        "code": "AU"
                    },
                    {
                        "name": "Austria",
                        "code": "AT"
                    },
                    {
                        "name": "Azerbaijan",
                        "code": "AZ"
                    },
                    {
                        "name": "Bahamas",
                        "code": "BS"
                    },
                    {
                        "name": "Bahrain",
                        "code": "BH"
                    },
                    {
                        "name": "Bangladesh",
                        "code": "BD"
                    },
                    {
                        "name": "Barbados",
                        "code": "BB"
                    },
                    {
                        "name": "Belarus",
                        "code": "BY"
                    },
                    {
                        "name": "Belgium",
                        "code": "BE"
                    },
                    {
                        "name": "Belize",
                        "code": "BZ"
                    },
                    {
                        "name": "Benin",
                        "code": "BJ"
                    },
                    {
                        "name": "Bermuda",
                        "code": "BM"
                    },
                    {
                        "name": "Bhutan",
                        "code": "BT"
                    },
                    {
                        "name": "Bolivia",
                        "code": "BO"
                    },
                    {
                        "name": "Bosnia and Herzegovina",
                        "code": "BA"
                    },
                    {
                        "name": "Botswana",
                        "code": "BW"
                    },
                    {
                        "name": "Bouvet Island",
                        "code": "BV"
                    },
                    {
                        "name": "Brazil",
                        "code": "BR"
                    },
                    {
                        "name": "British Indian Ocean Territory",
                        "code": "IO"
                    },
                    {
                        "name": "Brunei Darussalam",
                        "code": "BN"
                    },
                    {
                        "name": "Bulgaria",
                        "code": "BG"
                    },
                    {
                        "name": "Burkina Faso",
                        "code": "BF"
                    },
                    {
                        "name": "Burundi",
                        "code": "BI"
                    },
                    {
                        "name": "Cambodia",
                        "code": "KH"
                    },
                    {
                        "name": "Cameroon",
                        "code": "CM"
                    },
                    {
                        "name": "Canada",
                        "code": "CA"
                    },
                    {
                        "name": "Cape Verde",
                        "code": "CV"
                    },
                    {
                        "name": "Cayman Islands",
                        "code": "KY"
                    },
                    {
                        "name": "Central African Republic",
                        "code": "CF"
                    },
                    {
                        "name": "Chad",
                        "code": "TD"
                    },
                    {
                        "name": "Chile",
                        "code": "CL"
                    },
                    {
                        "name": "China",
                        "code": "CN"
                    },
                    {
                        "name": "Christmas Island",
                        "code": "CX"
                    },
                    {
                        "name": "Cocos (Keeling) Islands",
                        "code": "CC"
                    },
                    {
                        "name": "Colombia",
                        "code": "CO"
                    },
                    {
                        "name": "Comoros",
                        "code": "KM"
                    },
                    {
                        "name": "Congo",
                        "code": "CG"
                    },
                    {
                        "name": "Congo, Democratic Republic",
                        "code": "CD"
                    },
                    {
                        "name": "Cook Islands",
                        "code": "CK"
                    },
                    {
                        "name": "Costa Rica",
                        "code": "CR"
                    },
                    {
                        "name": "Cote D\"Ivoire",
                        "code": "CI"
                    },
                    {
                        "name": "Croatia",
                        "code": "HR"
                    },
                    {
                        "name": "Cuba",
                        "code": "CU"
                    },
                    {
                        "name": "Cyprus",
                        "code": "CY"
                    },
                    {
                        "name": "Czech Republic",
                        "code": "CZ"
                    },
                    {
                        "name": "Denmark",
                        "code": "DK"
                    },
                    {
                        "name": "Djibouti",
                        "code": "DJ"
                    },
                    {
                        "name": "Dominica",
                        "code": "DM"
                    },
                    {
                        "name": "Dominican Republic",
                        "code": "DO"
                    },
                    {
                        "name": "Ecuador",
                        "code": "EC"
                    },
                    {
                        "name": "Egypt",
                        "code": "EG"
                    },
                    {
                        "name": "El Salvador",
                        "code": "SV"
                    },
                    {
                        "name": "Equatorial Guinea",
                        "code": "GQ"
                    },
                    {
                        "name": "Eritrea",
                        "code": "ER"
                    },
                    {
                        "name": "Estonia",
                        "code": "EE"
                    },
                    {
                        "name": "Ethiopia",
                        "code": "ET"
                    },
                    {
                        "name": "Falkland Islands (Malvinas)",
                        "code": "FK"
                    },
                    {
                        "name": "Faroe Islands",
                        "code": "FO"
                    },
                    {
                        "name": "Fiji",
                        "code": "FJ"
                    },
                    {
                        "name": "Finland",
                        "code": "FI"
                    },
                    {
                        "name": "France",
                        "code": "FR"
                    },
                    {
                        "name": "French Guiana",
                        "code": "GF"
                    },
                    {
                        "name": "French Polynesia",
                        "code": "PF"
                    },
                    {
                        "name": "French Southern Territories",
                        "code": "TF"
                    },
                    {
                        "name": "Gabon",
                        "code": "GA"
                    },
                    {
                        "name": "Gambia",
                        "code": "GM"
                    },
                    {
                        "name": "Georgia",
                        "code": "GE"
                    },
                    {
                        "name": "Germany",
                        "code": "DE"
                    },
                    {
                        "name": "Ghana",
                        "code": "GH"
                    },
                    {
                        "name": "Gibraltar",
                        "code": "GI"
                    },
                    {
                        "name": "Greece",
                        "code": "GR"
                    },
                    {
                        "name": "Greenland",
                        "code": "GL"
                    },
                    {
                        "name": "Grenada",
                        "code": "GD"
                    },
                    {
                        "name": "Guadeloupe",
                        "code": "GP"
                    },
                    {
                        "name": "Guam",
                        "code": "GU"
                    },
                    {
                        "name": "Guatemala",
                        "code": "GT"
                    },
                    {
                        "name": "Guernsey",
                        "code": "GG"
                    },
                    {
                        "name": "Guinea",
                        "code": "GN"
                    },
                    {
                        "name": "Guinea-Bissau",
                        "code": "GW"
                    },
                    {
                        "name": "Guyana",
                        "code": "GY"
                    },
                    {
                        "name": "Haiti",
                        "code": "HT"
                    },
                    {
                        "name": "Heard Island and Mcdonald Islands",
                        "code": "HM"
                    },
                    {
                        "name": "Holy See (Vatican City State)",
                        "code": "VA"
                    },
                    {
                        "name": "Honduras",
                        "code": "HN"
                    },
                    {
                        "name": "Hong Kong",
                        "code": "HK"
                    },
                    {
                        "name": "Hungary",
                        "code": "HU"
                    },
                    {
                        "name": "Iceland",
                        "code": "IS"
                    },
                    {
                        "name": "India",
                        "code": "IN"
                    },
                    {
                        "name": "Indonesia",
                        "code": "ID"
                    },
                    {
                        "name": "Iran",
                        "code": "IR"
                    },
                    {
                        "name": "Iraq",
                        "code": "IQ"
                    },
                    {
                        "name": "Ireland",
                        "code": "IE"
                    },
                    {
                        "name": "Isle of Man",
                        "code": "IM"
                    },
                    {
                        "name": "Israel",
                        "code": "IL"
                    },
                    {
                        "name": "Italy",
                        "code": "IT"
                    },
                    {
                        "name": "Jamaica",
                        "code": "JM"
                    },
                    {
                        "name": "Japan",
                        "code": "JP"
                    },
                    {
                        "name": "Jersey",
                        "code": "JE"
                    },
                    {
                        "name": "Jordan",
                        "code": "JO"
                    },
                    {
                        "name": "Kazakhstan",
                        "code": "KZ"
                    },
                    {
                        "name": "Kenya",
                        "code": "KE"
                    },
                    {
                        "name": "Kiribati",
                        "code": "KI"
                    },
                    {
                        "name": "Korea (North)",
                        "code": "KP"
                    },
                    {
                        "name": "Korea (South)",
                        "code": "KR"
                    },
                    {
                        "name": "Kosovo",
                        "code": "XK"
                    },
                    {
                        "name": "Kuwait",
                        "code": "KW"
                    },
                    {
                        "name": "Kyrgyzstan",
                        "code": "KG"
                    },
                    {
                        "name": "Laos",
                        "code": "LA"
                    },
                    {
                        "name": "Latvia",
                        "code": "LV"
                    },
                    {
                        "name": "Lebanon",
                        "code": "LB"
                    },
                    {
                        "name": "Lesotho",
                        "code": "LS"
                    },
                    {
                        "name": "Liberia",
                        "code": "LR"
                    },
                    {
                        "name": "Libyan Arab Jamahiriya",
                        "code": "LY"
                    },
                    {
                        "name": "Liechtenstein",
                        "code": "LI"
                    },
                    {
                        "name": "Lithuania",
                        "code": "LT"
                    },
                    {
                        "name": "Luxembourg",
                        "code": "LU"
                    },
                    {
                        "name": "Macao",
                        "code": "MO"
                    },
                    {
                        "name": "Macedonia",
                        "code": "MK"
                    },
                    {
                        "name": "Madagascar",
                        "code": "MG"
                    },
                    {
                        "name": "Malawi",
                        "code": "MW"
                    },
                    {
                        "name": "Malaysia",
                        "code": "MY"
                    },
                    {
                        "name": "Maldives",
                        "code": "MV"
                    },
                    {
                        "name": "Mali",
                        "code": "ML"
                    },
                    {
                        "name": "Malta",
                        "code": "MT"
                    },
                    {
                        "name": "Marshall Islands",
                        "code": "MH"
                    },
                    {
                        "name": "Martinique",
                        "code": "MQ"
                    },
                    {
                        "name": "Mauritania",
                        "code": "MR"
                    },
                    {
                        "name": "Mauritius",
                        "code": "MU"
                    },
                    {
                        "name": "Mayotte",
                        "code": "YT"
                    },
                    {
                        "name": "Mexico",
                        "code": "MX"
                    },
                    {
                        "name": "Micronesia",
                        "code": "FM"
                    },
                    {
                        "name": "Moldova",
                        "code": "MD"
                    },
                    {
                        "name": "Monaco",
                        "code": "MC"
                    },
                    {
                        "name": "Mongolia",
                        "code": "MN"
                    },
                    {
                        "name": "Montserrat",
                        "code": "MS"
                    },
                    {
                        "name": "Morocco",
                        "code": "MA"
                    },
                    {
                        "name": "Mozambique",
                        "code": "MZ"
                    },
                    {
                        "name": "Myanmar",
                        "code": "MM"
                    },
                    {
                        "name": "Namibia",
                        "code": "NA"
                    },
                    {
                        "name": "Nauru",
                        "code": "NR"
                    },
                    {
                        "name": "Nepal",
                        "code": "NP"
                    },
                    {
                        "name": "Netherlands",
                        "code": "NL"
                    },
                    {
                        "name": "Netherlands Antilles",
                        "code": "AN"
                    },
                    {
                        "name": "New Caledonia",
                        "code": "NC"
                    },
                    {
                        "name": "New Zealand",
                        "code": "NZ"
                    },
                    {
                        "name": "Nicaragua",
                        "code": "NI"
                    },
                    {
                        "name": "Niger",
                        "code": "NE"
                    },
                    {
                        "name": "Nigeria",
                        "code": "NG"
                    },
                    {
                        "name": "Niue",
                        "code": "NU"
                    },
                    {
                        "name": "Norfolk Island",
                        "code": "NF"
                    },
                    {
                        "name": "Northern Mariana Islands",
                        "code": "MP"
                    },
                    {
                        "name": "Norway",
                        "code": "NO"
                    },
                    {
                        "name": "Oman",
                        "code": "OM"
                    },
                    {
                        "name": "Pakistan",
                        "code": "PK"
                    },
                    {
                        "name": "Palau",
                        "code": "PW"
                    },
                    {
                        "name": "Palestinian Territory, Occupied",
                        "code": "PS"
                    },
                    {
                        "name": "Panama",
                        "code": "PA"
                    },
                    {
                        "name": "Papua New Guinea",
                        "code": "PG"
                    },
                    {
                        "name": "Paraguay",
                        "code": "PY"
                    },
                    {
                        "name": "Peru",
                        "code": "PE"
                    },
                    {
                        "name": "Philippines",
                        "code": "PH"
                    },
                    {
                        "name": "Pitcairn",
                        "code": "PN"
                    },
                    {
                        "name": "Poland",
                        "code": "PL"
                    },
                    {
                        "name": "Portugal",
                        "code": "PT"
                    },
                    {
                        "name": "Puerto Rico",
                        "code": "PR"
                    },
                    {
                        "name": "Qatar",
                        "code": "QA"
                    },
                    {
                        "name": "Reunion",
                        "code": "RE"
                    },
                    {
                        "name": "Romania",
                        "code": "RO"
                    },
                    {
                        "name": "Russian Federation",
                        "code": "RU"
                    },
                    {
                        "name": "Rwanda",
                        "code": "RW"
                    },
                    {
                        "name": "Saint Helena",
                        "code": "SH"
                    },
                    {
                        "name": "Saint Kitts and Nevis",
                        "code": "KN"
                    },
                    {
                        "name": "Saint Lucia",
                        "code": "LC"
                    },
                    {
                        "name": "Saint Pierre and Miquelon",
                        "code": "PM"
                    },
                    {
                        "name": "Saint Vincent and the Grenadines",
                        "code": "VC"
                    },
                    {
                        "name": "Samoa",
                        "code": "WS"
                    },
                    {
                        "name": "San Marino",
                        "code": "SM"
                    },
                    {
                        "name": "Sao Tome and Principe",
                        "code": "ST"
                    },
                    {
                        "name": "Saudi Arabia",
                        "code": "SA"
                    },
                    {
                        "name": "Senegal",
                        "code": "SN"
                    },
                    {
                        "name": "Serbia",
                        "code": "RS"
                    },
                        {
                        "name": "Montenegro",
                        "code": "ME"
                    },
                    {
                        "name": "Seychelles",
                        "code": "SC"
                    },
                    {
                        "name": "Sierra Leone",
                        "code": "SL"
                    },
                    {
                        "name": "Singapore",
                        "code": "SG"
                    },
                    {
                        "name": "Slovakia",
                        "code": "SK"
                    },
                    {
                        "name": "Slovenia",
                        "code": "SI"
                    },
                    {
                        "name": "Solomon Islands",
                        "code": "SB"
                    },
                    {
                        "name": "Somalia",
                        "code": "SO"
                    },
                    {
                        "name": "South Africa",
                        "code": "ZA"
                    },
                    {
                        "name": "South Georgia and the South Sandwich Islands",
                        "code": "GS"
                    },
                    {
                        "name": "Spain",
                        "code": "ES"
                    },
                    {
                        "name": "Sri Lanka",
                        "code": "LK"
                    },
                    {
                        "name": "Sudan",
                        "code": "SD"
                    },
                    {
                        "name": "Suriname",
                        "code": "SR"
                    },
                    {
                        "name": "Svalbard and Jan Mayen",
                        "code": "SJ"
                    },
                    {
                        "name": "Swaziland",
                        "code": "SZ"
                    },
                    {
                        "name": "Sweden",
                        "code": "SE"
                    },
                    {
                        "name": "Switzerland",
                        "code": "CH"
                    },
                    {
                        "name": "Syrian Arab Republic",
                        "code": "SY"
                    },
                    {
                        "name": "Taiwan, Province of China",
                        "code": "TW"
                    },
                    {
                        "name": "Tajikistan",
                        "code": "TJ"
                    },
                    {
                        "name": "Tanzania",
                        "code": "TZ"
                    },
                    {
                        "name": "Thailand",
                        "code": "TH"
                    },
                    {
                        "name": "Timor-Leste",
                        "code": "TL"
                    },
                    {
                        "name": "Togo",
                        "code": "TG"
                    },
                    {
                        "name": "Tokelau",
                        "code": "TK"
                    },
                    {
                        "name": "Tonga",
                        "code": "TO"
                    },
                    {
                        "name": "Trinidad and Tobago",
                        "code": "TT"
                    },
                    {
                        "name": "Tunisia",
                        "code": "TN"
                    },
                    {
                        "name": "Turkey",
                        "code": "TR"
                    },
                    {
                        "name": "Turkmenistan",
                        "code": "TM"
                    },
                    {
                        "name": "Turks and Caicos Islands",
                        "code": "TC"
                    },
                    {
                        "name": "Tuvalu",
                        "code": "TV"
                    },
                    {
                        "name": "Uganda",
                        "code": "UG"
                    },
                    {
                        "name": "Ukraine",
                        "code": "UA"
                    },
                    {
                        "name": "United Arab Emirates",
                        "code": "AE"
                    },
                    {
                        "name": "United Kingdom",
                        "code": "GB"
                    },
                    {
                        "name": "United States",
                        "code": "US"
                    },
                    {
                        "name": "United States Minor Outlying Islands",
                        "code": "UM"
                    },
                    {
                        "name": "Uruguay",
                        "code": "UY"
                    },
                    {
                        "name": "Uzbekistan",
                        "code": "UZ"
                    },
                    {
                        "name": "Vanuatu",
                        "code": "VU"
                    },
                    {
                        "name": "Venezuela",
                        "code": "VE"
                    },
                    {
                        "name": "Viet Nam",
                        "code": "VN"
                    },
                    {
                        "name": "Virgin Islands, British",
                        "code": "VG"
                    },
                    {
                        "name": "Virgin Islands, U.S.",
                        "code": "VI"
                    },
                    {
                        "name": "Wallis and Futuna",
                        "code": "WF"
                    },
                    {
                        "name": "Western Sahara",
                        "code": "EH"
                    },
                    {
                        "name": "Yemen",
                        "code": "YE"
                    },
                    {
                        "name": "Zambia",
                        "code": "ZM"
                    },
                    {
                        "name": "Zimbabwe",
                        "code": "ZW"
                    }
                ];