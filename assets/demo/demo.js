// -------------------------------
// Demos
// -------------------------------
$(document).ready(
  function() {
    $('.popovers').popover({container: 'body', trigger: 'hover', placement: 'top'}); //bootstrap's popover
    $('.tooltips').tooltip(); //bootstrap's tooltip

    $(".chathistory").niceScroll({horizrailenabled:false});  //chathistory scroll

    try {
        //Set nicescroll on notifications
        $(".scrollthis").niceScroll({horizrailenabled:false});
        $('.dropdown').on('shown.bs.dropdown', function () {
            $(".scrollthis").getNiceScroll().resize();
            $(".scrollthis").getNiceScroll().show();
        });
        $('.dropdown').on('hide.bs.dropdown', function ()  {
            $(".scrollthis").getNiceScroll().hide();
        });

        $(window).scroll(function(){
            $(".scrollthis").getNiceScroll().resize();
        });
    } catch(e) {}

    prettyPrint(); //Apply Code Prettifier

    $('.toggle').toggles({on:true});

});


// -------------------------------
// Demo: Chatbar.
// -------------------------------




// Toggle buttons

$("a#hidechatbtn").click(function () {
    $("#widgetarea").toggle();
    $("#chatarea").toggle();
});

$("#chatbar li a").click(function () {
    $("#widgetarea").toggle();
    $("#chatarea").toggle();
});




// -------------------------------
// Show Theme Settings
// -------------------------------
$('#slideitout').click(function() {
    $('#demo-theme-settings').toggleClass('shown');
    return false;
});


// -------------------------------
// Demo: Theme Settings
// -------------------------------

// Demo Fixed Header

if($.cookie('fixed-header') === 'navbar-static-top') {
    $('#fixedheader').toggles();
} else {
    $('#fixedheader').toggles({on:true});
}

$('.dropdown-menu').on('click', function(e){
    if($(this).hasClass('dropdown-menu-form')){
        e.stopPropagation();
    }
});


$('#fixedheader').on('toggle', function (e, active) {
    $('header').toggleClass('navbar-fixed-top navbar-static-top');
    $('body').toggleClass('static-header');
    rightbarTopPos();
    if (active) {
        $.removeCookie('fixed-header');
    } else {
        $.cookie('fixed-header', 'navbar-static-top');
    }
});

// Demo Color Variation
// Read the CSS files from data attributes

$("#demo-color-variations a").click(function(){
    $("head link#styleswitcher").attr("href", assetsURL + 'demo/variations/' + $(this).data("theme"));
    $.cookie('theme',$(this).data("theme"));
    return false;
});

$("#demo-header-variations a").click(function(){
    $("head link#headerswitcher").attr("href", assetsURL + 'demo/variations/' + $(this).data("headertheme"));
    $.cookie('headertheme',$(this).data("headertheme"));
    return false;
});

//Demo Background Pattern

$(".demo-blocks").click(function(){
    $('.fixed-layout').css('background',$(this).css('background'));
    return false;
});