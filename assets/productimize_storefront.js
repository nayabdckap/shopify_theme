var modelimagearray = [];
imgURL = "https://devcloud.productimize.com/kapchn165/images/";
cloudURL = "https://devcloud.productimize.com/kapchn165";


// var styleUrlPair = jQuery.parseJSON("<%= $font_pair %>");

styleUrlPair = {
      "Arial Bold": "url(https://devcloud.productimize.com/kapchn165/fonts/Arial_Bold.ttf)",
      "Bedas": "url(https://devcloud.productimize.com/kapchn165/fonts/BEBAS.ttf)",
      "Nexa Script": "url(https://devcloud.productimize.com/kapchn165/fonts/NexaScript-Free.otf), url(https://devcloud.productimize.com/kapchn165/fonts/NexaScript-Free.eot)",
      "Script MT Bold": "url(https://devcloud.productimize.com/kapchn165/fonts/SCRIPTBL.TTF), url(https://devcloud.productimize.com/kapchn165/fonts/SCRIPTBL.eot)",
      "Sackers Gothic": "url(https://devcloud.productimize.com/kapchn165/fonts/SackersGothicStd-Medium.otf),url(https://devcloud.productimize.com/kapchn165/fonts/SackersGothicStd-Medium.eot)",
      "ITC Avant Garde": "url(https://devcloud.productimize.com/kapchn165/fonts/AVANTN.ttf),url(https://devcloud.productimize.com/kapchn165/fonts/AVANTN.eot)",
      "Rockwell Bold": "url(https://devcloud.productimize.com/kapchn165/fonts/rockwell-bold-59f9961846f7f.ttf)",
      "Black Jack": "url(https://devcloud.productimize.com/kapchn165/fonts/blackjack.otf)",
      "James_Fajardo": "url(https://devcloud.productimize.com/kapchn165/fonts/James_Fajardo.ttf)",
      "Angelina": "url(https://devcloud.productimize.com/kapchn165/fonts/angelina.TTF)",
      "ArialNarrow": "url(https://devcloud.productimize.com/kapchn165/fonts/ArialNarrow2.ttf)",
      "BebasNeue": "url(https://devcloud.productimize.com/kapchn165/fonts/BebasNeue.otf)",
      "BrothersAlternates": "url(https://devcloud.productimize.com/kapchn165/fonts/BrothersAlternates-Bold.ttf),url(https://devcloud.productimize.com/kapchn165/fonts/BrothersAlternates_Bold.ttf)",
      "Brush Script": "url(https://devcloud.productimize.com/kapchn165/fonts/Brush%20Script.ttf)",
      "Pacifico": "url(https://devcloud.productimize.com/kapchn165/fonts/Pacifico.ttf)",
      "Saddlebag": "url(https://devcloud.productimize.com/kapchn165/fonts/Saddlebag.ttf)",
      "SportsWorld": "url(https://devcloud.productimize.com/kapchn165/fonts/SportsWorld.ttf)",
      "StencilStd": "url(https://devcloud.productimize.com/kapchn165/fonts/StencilStd.otf)",
      "Allura Regular": "url(https://devcloud.productimize.com/kapchn165/fonts/Allura-Regular.otf)",
      "Cedarville Cursive": "url(https://devcloud.productimize.com/kapchn165/fonts/Cedarville-Cursive.ttf)",
      "GreatVibes Regular": "url(https://devcloud.productimize.com/kapchn165/fonts/GreatVibes-Regular.otf)",
      "HomemadeApple": "url(https://devcloud.productimize.com/kapchn165/fonts/HomemadeApple.ttf)",
      "KaushanScript Regular": "url(https://devcloud.productimize.com/kapchn165/fonts/KaushanScript-Regular.otf)",
      "NothingYouCouldDo": "url(https://devcloud.productimize.com/kapchn165/fonts/NothingYouCouldDo.ttf)",
      "Pacifico": "url(https://devcloud.productimize.com/kapchn165/fonts/Pacifico.ttf)",
      "Sacramento Regular": "url(https://devcloud.productimize.com/kapchn165/fonts/Sacramento-Regular.ttf)",
      "Incarnat": "url(https://devcloud.productimize.com/kapchn165/fonts/incarnat.ttf)",
      "Quikhand": "url(https://devcloud.productimize.com/kapchn165/fonts/Quikhand.ttf)",
      "Hannahs Messy Handwriting Regular": "url(https://devcloud.productimize.com/kapchn165/fonts/Hannahs_Messy_Handwriting_Regular.ttf)",
      "Bradley Hand Itc": "url(https://devcloud.productimize.com/kapchn165/fonts/Bradley_Hand_Itc.ttf)",
      "Love Story Rough": "url(https://devcloud.productimize.com/kapchn165/fonts/Love_Story_Rough.ttf)",
      "Futura_Condensed_Medium": "url(https://devcloud.productimize.com/kapchn165/fonts/Futura_Condensed_Medium.otf)",
      "LimelightRegular": "url(https://devcloud.productimize.com/kapchn165/fonts/Limelight-Regular.ttf)",
      "AmaticaSCRegular": "url(https://devcloud.productimize.com/kapchn165/fonts/AmaticSC-Regular.ttf)",
      "BlackJackRegular": "url(https://devcloud.productimize.com/kapchn165/fonts/Black_Jar.ttf)",
      "canelabarkbold": "url(https://devcloud.productimize.com/kapchn165/fonts/CanelaBarkBold_PERSONAL.ttf)",
      "Constantine": "url(https://devcloud.productimize.com/kapchn165/fonts/Constantine.ttf)",
      "FirstTake": "url(https://devcloud.productimize.com/kapchn165/fonts/First_Take%20-%20Demo.ttf)"
    }

var imgurl=imgURL;
var sections = '', data_modelimage = '', numItems = '', totalviews = '', domain_id = '';
var sectionDetails = [], tabDetails = {};
var tab_details = {};
var canvasObjectCollection = {}; 
var alpha = 1;
var textFontDetail = '';
var url_string = window.location.search;
var urlParams = url_string.split("?")[1];
var modelOptionDetail = '';
var image_count = 1;
base_url = "http://productimize.com/demo";
var taburls = {};
if(urlParams) {
  var urlParameters = urlParams.split("&");
  $.each(urlParameters,function(urlindex, urlValue) {
    var urlValues = urlValue.split('=');
    taburls[urlValues[0]] = urlValues[1];
  })
}
jQuery(document).ready(function($){
  if(license_key){
  //Get Product Details 
  $.post("https://devcloud.productimize.com/dcprocld/promize/customproductdetail", {"0":shop_domain,"1":license_key, "2":product_id})
  .done(function(response) {
    var cloudResponse = response[0];
    domain_id = cloudResponse['domain_id'];
    modelFrontImage = cloudResponse['model_image'];
    var viewName  = cloudResponse['view_name'];
    data_modelimage = jQuery.parseJSON(modelFrontImage, true);
    totalviews = Object.keys(data_modelimage).length;
    numItems = totalviews;
    for(var canObj = 1; canObj <= numItems; canObj++) {
      canvasObjectCollection['currentside_'+canObj] = {}; 
    }
    displayModelImage();
    modelImageCollection();
    if(cloudResponse){
      sections = cloudResponse.pps;
      if (sections){
        var ppsjson = [];
        $.each(sections, function(index, section_details){
          var tabsteps = 1;
          tab_details["sectiontab_"+section_details["product_section_id"]] = {};
          $.each(section_details["ppt"], function(index, tab_det){
            tab_details["sectiontab_"+section_details["product_section_id"]][tab_det["tab_id"]] = {};
            tab_details["sectiontab_"+section_details["product_section_id"]][tab_det["tab_id"]] = tab_det;
            customheadernavigation(tabsteps, tab_det['tab_name']); // call header navigation
            tabnavigation(tabsteps, tab_det['tab_name']); // call sidebar navigation
            tabOptions(tabsteps, tab_det); // Display tab options
            tabsteps++;
          });
          $(".header-navigation li:first").addClass("active");
          $(".sidebar-navigation li:first").addClass("active");
          var step_name = $(".sidebar-navigation li:first").find('a').attr('data-stepname');
          $(".tab-content div#"+step_name+"_selection").removeClass("tab-pane-hide").addClass("current-active-section");
//           $(".tab-content li:first").addClass("active");
        });        
      }
      headerSelectHighlight();
    }
  })
  .fail(function() {
    console.log( "error" );
  });
 }
 
});

// Custom Header Menu Navigation
function customheadernavigation(tabstep, tabName) {
  var lowertabName = tabName.replace(/\s+/g, '').toLowerCase();
  $('.header-navigation').append('<li><a data-stepName="'+lowertabName+'" href="javascript:void(0);" class="c-button">'+tabName+'</a></li>');   
}

function loadFont(){
  $.each(styleUrlPair, function(fontFamily,url){
    var new_font = new FontFace(fontFamily,url);
    document.fonts.add(new_font);
    newdiv = document.createElement('div');
    newdiv.style.cssText = "display: inline-block;font-family: " + fontFamily
    $(".fontfamilies").append(newdiv)
  })
}

//Right Side Tab Navigation
function tabnavigation(tabstep, tabName) {
  var lowertabName = tabName.replace(/\s+/g, '').toLowerCase();
  $('.sidebar-navigation').append('<li class="main-items empty-submenu"><a data-stepName="'+lowertabName+'" href="javascript:void(0);">'+tabstep+' - '+tabName+'</a></li>')
}

function omitKeys(obj, keys) {
  var dup = {};
  for (var key in obj) {
    if (keys.indexOf(key) == -1) {
      dup[key] = obj[key];
    }
  }
  return dup;
}
//Tab Option Display
function tabOptions(tabstep, tabDet) {
  var tabName = tabDet['tab_name'].replace(/\s+/g, '').toLowerCase();
  var tabSplitName = tabDet['tab_name'].replace(/\s+/g, '_').toLowerCase();
  var optionloop = "<div tab-detail='"+JSON.stringify(omitKeys(tabDet, ['ppo', 'pcs', 'pts']))+"' id='"+tabName+"_selection' data-sectionCount='"+tabstep+"' data-tabs='"+tabName+"' class='tab-pane tab-pane-hide'>"+
//       '<br>'+
//       '<br>'+
      '<br>';
  var optionVal = '';
  if(taburls[tabSplitName]) {
    optionVal = taburls[tabSplitName];
  }
  if(tabDet['ppo']) {
    optionloop += '<div class="action-items-list">'+
      '<ul>';
    optionloop += productimize_option(tabDet['ppo'], optionVal, tabDet);
    optionloop += '</ul>'+
      '</div>'+
      '</div>';
    $('.tab-content').append(optionloop);
  }
  if(tabDet['pcs']) {
    optionloop += '<div class="action-items-list">'+
      '<ul>';
    optionloop += productimize_image(tabDet['pcs'], optionVal, tabDet);
    optionloop += '</ul>'+
      '</div>'+
      '</div>';
    $('.tab-content').append(optionloop);
  }
  if(tabDet['pts']) {
    $.get("https://devcloud.productimize.com/dcprocld/promize/productDomainTextDetail/"+domain_id).done(function(textresponse) {
      optionloop += productimize_text(tabDet['pts'], textresponse);
      optionloop += '</div>';
      $('.tab-content').append(optionloop);
    });

    $.getScript("https://devcloud.productimize.com/prokapchn/lib/colorpicker/jscolor.js").done(function(){
      jscolor.installByClassName("jscolor");
    });   
  }
  $.getScript("https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js").done(function(){});
}

function productimize_option(taboptdetail, optionValue, tabDet)  {
  var tabOption = '';
  $.each(taboptdetail,function(optionIndex, optionDetail){
    var optColor = 'FFFFFF';
    var optionurl = '';
    var optionClass = 'optioncolor';
    var optionType = 1;
    var optImage = JSON.parse(optionDetail['option_image']);  
    if(optionDetail['option_color'])  {
      optColor = optionDetail['option_color'];
    }
    if(optionDetail['option_thumbnail_image'])  {
      optionurl = domainpath+'/thumbnailimage/'+optionDetail['option_thumbnail_image'];
    }
    if(optImage['side_1'])  {
      optionClass = 'optionimage';
      optionType = 2;
    }
    tabOption += "<li option-detail='"+JSON.stringify(optionDetail)+"' class='"+optionClass+"'><div class='optionDetails' style='background:#"+optColor+" url("+optionurl+") no-repeat scroll center center / 100% auto;width:50px;height:50px'></div><div class='option-text'>"+optionDetail['option_name']+"</div></li>";
    if((optionValue == optionDetail['option_name'].toLowerCase()) || (optionDetail['default_option'] == 1) ) {
      passOptionValues("<li option-detail='"+JSON.stringify(optionDetail)+"' class='"+optionClass+"'><div class='optionDetails' style='background:#"+optColor+" url("+optionurl+") no-repeat scroll center center / 100% auto;width:50px;height:50px'></div><div class='option-text'>"+optionDetail['option_name']+"</div></li>",optionType,JSON.stringify(omitKeys(tabDet, ['ppo'])));
    }
  })
  return tabOption;
}

function productimize_text(tabptsdetail, textresponse)  {
  var textOption = '';
  var pdcts = '';
  
  $.each(tabptsdetail,function(textIndex, textDetail){
    if(textDetail['pdcts']) {
      pdcts = JSON.stringify(textDetail['pdcts']);
    }
    var text_details = JSON.stringify(textDetail);
    textOption += "<div class='' text-detail='"+text_details+"' text-global-detail='"+pdcts+"'>"+
      "<div class='col-md-12'>"+
      "<h3 class='headerv2'>"+textDetail["text_name"]+"</h3>"+
      "<input type='text' class='form-control text-field-appv1' maxlength="+JSON.parse(text_details).max_text_char+" placeholder='Enter Your Custom Cover Text Here...''>"+
      "</div>"+
      "<div class='col-md-6 col-sm-6'>"+
      "<select name='fontfam' class='form-control select-field-appv1'>";
      if(textDetail['pdcts']) {
        if(textDetail['pdcts']['font_ids']) {
          var fontIds = textDetail['pdcts']['font_ids'].split(",");
          var fontName = textresponse[0]['font_name'].split(",");
          $.each(fontName, function(index, fontvalue){
            var fontval = fontvalue.split("-");
            if (fontIds.indexOf(fontval[1]) !== -1) {
              textOption += '<option title="'+fontval[0]+'" value="'+fontval[0]+'">'+fontval[0]+'</option>';
            }
          });
        }
      }
    textOption += '</select>'+
      '</div>'+
      '<div class="col-md-12">'+
      '<h3 class="headerv3">Select Line 1 Font Color</h3>'+
      '<div class="color-picker-button-div">'+
      '<input class="jscolor" onchange="update(this.jscolor, this)" value="cc66ff">'+
      '</div>'+                                        
      '</div>'+
      '</div>'+
      '<div class="clearfix"></div>'+
      '<hr>';
  });
  return textOption;
}


// Thumb images
function displaythumbnailImage(index)  {
  $('.multi-image-slide ul').append('<li><canvas id="thumbviewimage'+index+'" width="100" height="100" class="img-responsive"></li>');
  thumbCanvas(index);
  actionareaHeight();
}
//Displaying model image
function displayModelImage() {  
  var value = data_modelimage['side_1'];              
  var downloadingImage      = new Image();
  downloadingImage      = domainpath+'/baseimage/side_1image/'+value;
  fabric.Image.fromURL(downloadingImage, function(img) {
    var oImg = img.set({ left: 0, top: 0, name: "modelimage", "selectable": false, "hasControls": false, "hasBorders": false,"crossOrigin": "anonymous","src":downloadingImage, "current_view_id": "side_1","layerno": -1});   
    var canvasWidth       = img.width;
    var cavasheight       = img.height;          
    canvasside.setHeight(cavasheight);
    canvasside.setWidth(canvasWidth); 
    canvasside.add(oImg);
  },{"crossOrigin":"anonymous","allowTouchScrolling":true});
}


// Adding model image values in object collection
function modelImageCollection() {
  $.each(data_modelimage,function(index,value)  {
    var downloadingImage      = new Image();
    downloadingImage.src      = domainpath+'/baseimage/'+index+'image/'+value;         
    downloadingImage.onload = function(){
      var canvasObjectArray ={"type": "image","name": "modelimage","left": 0,"selectable": false,"top": 0,"hasControls": false,"src":downloadingImage.src,"current_view_id": index,"crossOrigin": "anonymous","width":this.width,"height":this.height,"layerno": -1};
      canvasObjectCollection['current'+index]['modelimage'] =  canvasObjectArray;
      displaythumbnailImage(index);
    }
  });
}

// Adding thumb iamge based on object collection
function thumbCanvas(sideview) {
  var thumbcanvas = new fabric.StaticCanvas('thumbviewimage'+sideview, {renderOnAddRemove: true});
  var jsonObject = [] ;
  canvasobjectcurrentview = canvasObjectCollection['current'+sideview];
  for(var kk in canvasobjectcurrentview) {
    jsonObject.push(canvasobjectcurrentview[kk]);
    if(canvasobjectcurrentview[kk].name == 'modelimage')    {
      thumbcanvas.setHeight(canvasobjectcurrentview[kk].height);
      thumbcanvas.setWidth(canvasobjectcurrentview[kk].width);
    }
  }
  var json = '{"objects":'+JSON.stringify(jsonObject)+'}';
  thumbcanvas.loadFromJSON(json,  function() {
    thumbcanvas.renderAll.bind(thumbcanvas);                
  });
}
//************************ Height Setting Fuctions
function actionareaHeight() {
  var getheight = $(".imagedetail-section").height();
  $(".section-actionarea,.selection-detail-options").css("height", getheight);
}
// ************************Header Highlight
function headerSelectHighlight() {
  var actWidth = $(".header-navigation .active").width();
  var actPosition = $(".header-navigation .active").position();
  $(".slider").css({ left: +actPosition.left, width: actWidth });
}
//************************Change from Header

function selectCurrentProcess(currentElement) {
  var currentStepName = currentElement.attr("data-stepName");
  var currentProcessHead= currentElement.parents('ul.main-menus').attr('data-mainMenuName');

  var section_countOld=$(".selection-detail-options>.tab-content>.current-active-section").attr("data-sectionCount");
  var section_countCurrent=$('.tab-content .tab-pane[data-tabs = ' + currentStepName + ']').attr("data-sectionCount");
if ($(window).width() > 481) {
   if(section_countOld > section_countCurrent){
    $(".selection-detail-options>.tab-content>.current-active-section").removeClass("current-active-section").toggle("slide", {direction: "right"}, 500);
    $('.tab-content .tab-pane[data-tabs = ' + currentStepName + ']').addClass("current-active-section").toggle("slide", {direction: "left"}, 500);
  }
  else
  {
    $(".selection-detail-options>.tab-content>.current-active-section").removeClass("current-active-section").toggle("slide", {direction: "left"}, 500);
    $('.tab-content .tab-pane[data-tabs = ' + currentStepName + ']').addClass("current-active-section").toggle("slide", {direction: "right"}, 500);
  }
}
else {
   if(section_countOld > section_countCurrent){
    $(".selection-detail-options>.tab-content>.current-active-section").removeClass("current-active-section").addClass("tab-pane-hide");
    $('.tab-content .tab-pane[data-tabs = ' + currentStepName + ']').removeClass("tab-pane-hide").addClass("current-active-section");
  }
  else
  {
    $(".selection-detail-options>.tab-content>.current-active-section").removeClass("current-active-section").addClass("tab-pane-hide");
    $('.tab-content .tab-pane[data-tabs = ' + currentStepName + ']').removeClass("tab-pane-hide").addClass("current-active-section");
  }
}
  
  $(".header-navigation li").removeClass("active");
  $('.header-navigation li a[data-stepName = ' + currentStepName + ']').parent().addClass('active');
  $(".sidebar-navigation li.main-items").removeClass("active");
  $('.sidebar-navigation li a[data-stepName = ' + currentStepName + ']').parent().addClass('active');
  $(".submenu-ul li").removeClass("active");
  $('.submenu-ul li a[data-stepName = ' + currentStepName + ']').parent().addClass('active');
  $('.sidebar-navigation li.submenu ul').hide(200);
  $('.sidebar-navigation li.submenu.active ul').slideToggle(500);
  processNextFuntion(currentStepName);
  headerHighlightChange();
}
function headerHighlightChange() {
  var position = $('.header-navigation li.active a').parent().position();
  var width = $('.header-navigation li.active a').parent().width();
  if (position){
    $(".slider").css({ "left": + position.left, "width": width });
  }
}
// ************************Submenu CLick Function
function submenuActive(currentElement){
  var currentStepName = currentElement.attr("data-stepName");
  var section_countOld=$(".selection-detail-options>.tab-content>.current-active-section").attr("data-sectionCount");
  var section_countCurrent=$('.tab-content .tab-pane[data-tabs = ' + currentStepName + ']').attr("data-sectionCount");
  if(section_countOld > section_countCurrent){
    $(".selection-detail-options>.tab-content>.current-active-section").removeClass("current-active-section").toggle("slide", {direction: "right"}, 500);
    $('.tab-content .tab-pane[data-tabs = ' + currentStepName + ']').addClass("current-active-section").toggle("slide", {direction: "left"}, 500);
  }
  else
  {
    $(".selection-detail-options>.tab-content>.current-active-section").removeClass("current-active-section").toggle("slide", {direction: "left"}, 500);
    $('.tab-content .tab-pane[data-tabs = ' + currentStepName + ']').addClass("current-active-section").toggle("slide", {direction: "right"}, 500);
  }
  $(".submenu-ul li").removeClass("active");
  $('.submenu-ul li a[data-stepName = ' + currentStepName + ']').parent().addClass('active');
}
// ************************Previous and Next button show and hide
function processNextFuntion(currentProc) {
  $('.process-prev-next .pr-btns').css('display', 'none');
  $('.process-prev-next .pr-btns[data-stepName = ' + currentProc + ']').css('display', 'block');
}
// ************************Previous and Next Action
function nextPrevFunction(currentProcName) {
  var section_countOld=$(".selection-detail-options>.tab-content>.current-active-section").attr("data-sectionCount");
  var section_countCurrent=$('.tab-content .tab-pane[data-tabs = ' + currentProcName + ']').attr("data-sectionCount");

  if(section_countOld > section_countCurrent){
    $(".selection-detail-options>.tab-content>.current-active-section").removeClass("current-active-section").toggle("slide", {direction: "right"}, 500);
    $('.tab-content .tab-pane[data-tabs = ' + currentProcName + ']').addClass("current-active-section").toggle("slide", {direction: "left"}, 500);
  }
  else
  {
    $(".selection-detail-options>.tab-content>.current-active-section").removeClass("current-active-section").toggle("slide", {direction: "left"}, 500);
    $('.tab-content .tab-pane[data-tabs = ' + currentProcName + ']').addClass("current-active-section").toggle("slide", {direction: "right"}, 500);
  }
  $(".header-navigation li").removeClass("active");
  $('.header-navigation li a[data-stepName = ' + currentProcName + ']').parent().addClass('active');
  $(".sidebar-navigation li.main-items").removeClass("active");
  $('.sidebar-navigation li a[data-stepName = ' + currentProcName + ']').parent().addClass('active');
  $(".submenu-ul li").removeClass("active");
  $('.submenu-ul li a[data-stepName = ' + currentProcName + ']').parent().addClass('active');
  $('.sidebar-navigation li.submenu ul').hide(200);
  $('.sidebar-navigation li.submenu.active ul').slideToggle(500);
  headerHighlightChange();
  processNextFuntion(currentProcName);
}

function titleize(name){
  var words = name.split(' ');
  $.each(words, function(index, word){
    words[index] = word.charAt(0).toUpperCase() + word.slice(1);
  });
  return words.join(' ');
}

function productimize_image(imageDetail, optionValue, tabDet)  {
  var promize_image_view = {};
  var image_data = '';
  image_data += '<div class="col-md-offset-1 col-md-10 upload-new-design">'+
                '<p class="upload-new-text">Upload Your Own Cover Image</p>'+
        '<p class="upload-text-char">'+
        'The Customer can move the image around within the nameframe to fit to their preference.'+
                 '</p>';
  $.each(imageDetail, function(index, imageData){
    image_data += "<div class='image_details' image-detail='"+JSON.stringify(imageData)+"'>";
    image_data += '<form method="POST" class="cover-upload">'+
        '<input type="file" multiple="" class="uploadedImg">'+
          '<p>'+
        '<img src="https://devcloud.productimize.com/kapchn165/images/picture.png"> &nbsp;&nbsp;'+
        '<b>Choose an image</b>'+
                '</p>'+
                '</form>'+
            '</div>';
  });
  image_data += '</div>';
    return image_data;  
}

$(window).load(function(){
  loadFont();
});
