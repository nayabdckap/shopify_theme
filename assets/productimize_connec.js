function convert_to_json(string) {
    if (string == "" || typeof string === "undefined") {
        return {};
    }
    return JSON.parse(string);
}
/**
 * validate the Required field
 * and through the error message
 *
 * @returns {boolean}
 */
function validate_productimize_option() {
    var tab_label = "Canvastab";
    var error = false;
    var required = [];
    var custompricing = convert_to_json($("#custompricing").val());
    var tab_details_obj;
    var text_details_obj;
    var index;
    var text_index;
    var text = false;
    var tab_type_string = 2;
    $('div[tab-detail]').each(function () {
        tab_details_obj = convert_to_json($(this).attr("tab-detail"));
        index = tab_label + tab_details_obj["tab_id"];
        if (tab_details_obj["tab_required"]){
          if(tab_details_obj['display_setting'] == tab_type_string){
            $(this).find('div[text-detail]').each(function () {
              text_details_obj = convert_to_json($(this).attr("text-detail")); 
              text_index = index + "_" + text_details_obj['text_setting_id'];
              if (typeof custompricing[text_index] != "undefined" && custompricing[text_index]['value'] != "") {
                 text = true;
              }
            });
             if(!text){
               error = true;
               required.push(tab_details_obj["tab_name"]);
             }
          }
          else{
            if (typeof custompricing[index] === "undefined" || typeof custompricing[index]['value'] === "undefined" || custompricing[index]['value'] === "") {
                error = true;
                required.push(tab_details_obj["tab_name"]);
            }
          } 
        }
    });
    if (error) {
        $(required).each(function (index, value) {
            message_popup(value, "error");
        });
        return false;
    }
    return true;
}
/**
 * send popup message
 *
 * @param value
 * @param status
 */
function message_popup(value, status) {
  alert(value + " is required");
}
// ******************************************************** Enable and Disable Add to Cart Button *********************************************************\\
$(document).on('click',"input[name='approvetocart']", function() {   
  if ($(this).is(':checked')) {
    $(".add-to-cart").prop("disabled", false);
  }
  else {
    $(".add-to-cart").prop("disabled", true);
  }
});

// ******************************************************** Change Active Element *********************************************************\\
$(document).on('click',".main-menus>li>a", function() {    
  selectCurrentProcess($(this));
})
// ******************************************************** Submenu CLick Function *********************************************************\\
$(document).on('click',".submenu-ul>li>a", function() {   
  submenuActive($(this));
})
// ******************************************************** Change Active Element from footer button *********************************************************\\
$(document).on('click',".process-prev-next button", function() {   
  var getProcessName = $(this).attr("data-processname");
  nextPrevFunction(getProcessName);
})
/*$(document).on('click',".cover-upload input", function() { 
  $('.cover-upload p').text(this.files.length + " file(s) selected");
});
*/
$(document).on('click','.optionempty',function()  {
  if ($(this).parent().hasClass("optiondefault")) {
    $(this).parents('ul').find('.fa-check').remove();
    var img1 = $('<i class="fa fa-check" aria-hidden="true"></i>');
    img1.appendTo($(this));
  }
  var optionclass = $(this).find('input').attr('class');
  var text_length = $(".addtext").val().length;
});

// Click color option
$(document).on('click','.optioncolor',function() {       
  var promizeTab = $(this).closest("[tab-detail]").attr("tab-detail");
  passOptionValues($(this),1,promizeTab);
});

// Click image option
$(document).on('click','.optionimage',function() {   
  var promizeTab = $(this).closest("[tab-detail]").attr("tab-detail");
  passOptionValues($(this),2,promizeTab);
});

$(document).on('change', '.uploadedImg', function(e) {
  var thisattribute = $(this); 
  var image_details = $.parseJSON(thisattribute.closest(".image_details").attr("image-detail"));  
  var tabid = image_details.tab_id;
  var image_setting_id = image_details.image_setting_id;  
  var boundary_pos = image_details.boundary_position;
  var position_val = boundary_pos.split(",");
  var x1 = position_val[0].replace('x1:',''); var y1 = position_val[1].replace('y1:','');
  var x2 = position_val[2].replace('x2:',''); var y2 = position_val[3].replace('y2:','');
  customcoordinates = '{'+x1+','+y1+','+x2+','+y2+'}';
  var y_pos = parseFloat(y1);
  var x_pos = parseFloat(x1);  
  var file = e.target.files[0];
  var reader = new FileReader();
  reader.onload = function (f) {
    var data = f.target.result;
    $.ajax({
      type: "POST", 
      async:false,   
      url: "https://devcloud.productimize.com/prokapchn/imageconvert.php?&isAjax=true",
      data: { 
        imgBase64: data, "customwidth": custbound.width, "customheight" : custbound.height,"ext": ext, "uploaded_size_format": uploaded_size_format, "min_uploaded_size": min_uploaded_size, "max_upload_size": max_upload_size
      },
      success:function(data1) {
        if(data1 < 300 && uploaded_size_format == 'dpi') {
          thisattribute.parents('.boundaryimagearea').find('.error_msg').text('Please upload png, jpeg image with atleast 300 dpi or an eps file.');
          $('.error_msg').fadeIn().delay(3500).fadeOut(function() {
            $('.error_msg').remove();
            $('.uploadedImg').val("");
          });
          return false;
        } else {
          var aaa = $('.imgsettingdiv').text();  
          var imgdiv = $.parseJSON(aaa); 
          var imgObj1 = new Image();
          imgObj1.src =  'https://devcloud.productimize.com/kapchn165/'+data1;
          fabric.Image.fromURL(imgObj1.src, function (img) {
            var oImg = img.set({left: 0, top: 0, angle: 00,width:100, height:100}).scale(0.9);
            canvasside.add(oImg).renderAll();
            var a = canvasside.setActiveObject(oImg);
            var dataURL = canvasside.toDataURL({format: 'png', quality: 0.8});
          });
        }
      }
    });   
  };
  reader.readAsDataURL(file);
});

function passOptionValues(optionDetail, optColorImage,promizeTab) {
  var tabClosest = $(optionDetail).closest("[tab-detail]");
  tabClosest.find('.active').removeClass('active');  
  $(optionDetail).addClass('active');
  var promizeOption = $(optionDetail).closest("[option-detail]").attr("option-detail");   
  tabClosest.find('.fa-check').remove();
  var img1 = $('<i class="fa fa-spinner" aria-hidden="true"></i>');
  img1.appendTo($(optionDetail));
  var parsePromizeOption = $.parseJSON(promizeOption);
  var parsePromizeTab = $.parseJSON(promizeTab);
  var optionTitle = tabClosest.find('.action-title').text().replace(tabClosest.find('.action-title').text().split(':')[1],parsePromizeOption['option_name']);
  tabClosest.find('.action-title').text(optionTitle);
  tabLayerNo = parsePromizeTab['tab_layer_no'];
  imageColorSettings = parsePromizeTab['image_color_settings'];
  if(optColorImage == 1)  {
    tabPosition = parsePromizeTab['tab_position'];
    optionColor = '#'+parsePromizeOption['option_color'];
    tabImage = parsePromizeTab['tab_image'];
    imgpath = 'tabimage';
    promizeColorOption('Canvastab'+parsePromizeOption['tab_id'],tabImage,optionColor,tabPosition,imageColorSettings,alpha,optColorImage,'', "", tabLayerNo);
  } else {
    tabPosition = parsePromizeOption['option_position'];
    tabImage = parsePromizeOption['option_image'];
    optionColor = '';
    imgpath = 'optionimage';
    promizeImageOption('Canvastab'+parsePromizeOption['tab_id'],tabImage,optionColor,tabPosition,imageColorSettings,alpha,optColorImage,imgpath, "", tabLayerNo);
  }
  promizeObjectOption('Canvastab'+parsePromizeOption['tab_id'],tabImage,optionColor,tabPosition,imageColorSettings,alpha,optColorImage, imgpath, tabLayerNo);
  if(parsePromizeOption['modelimage_replace'] == 1) {
    replaceModelImage(tabImage);
  }
  customPrice('Canvastab'+parsePromizeOption['tab_id'], parsePromizeTab['tab_name'], parsePromizeOption['option_id'], parsePromizeOption['option_name'], parsePromizeOption['option_price'])
}

function customPrice(tabId, tabName, optionId, optionName, optionPrice)  {
  var customPricing = {};
  customPricing[tabId] = {};
  customPricing[tabId]['name'] = tabName;
  customPricing[tabId]['id'] = optionId;
  customPricing[tabId]['value'] = optionName;
  customPricing[tabId]['price'] = optionPrice;
  var customPricingItems = $('#custompricing').val();
  var priceTotal = parseFloat(Shopify.formatMoney($("#basepricing").val(), "{{amount}}"));
  if(optionPrice != undefined)    {
    if(customPricingItems){
      var parsecustomPricingItems = jQuery.parseJSON(customPricingItems);
      $.each( parsecustomPricingItems, function( itemkey, itemValue ){
        if (itemkey === tabId) {
          parsecustomPricingItems[itemkey]= customPricing[tabId];
        } else {
          parsecustomPricingItems[tabId] = customPricing[tabId];
        }
        if(parsecustomPricingItems[itemkey]['price']){
         priceTotal += parseFloat(parsecustomPricingItems[itemkey]['price']);
        }
      });
      $('#custompricing').val(JSON.stringify(parsecustomPricingItems));
    } else {
      $('#custompricing').val(JSON.stringify(customPricing));
      priceTotal += parseFloat(customPricing[tabId]['price']);
    }
  }
  $('.price').text('$ ' + priceTotal.toFixed(2));
}

function replaceModelImage(optionDetail)  {
  var optImage = JSON.parse(optionDetail);
  var modelImage = optImage['side_'+currentCanvasView];
  if(obj = canvasside.getItemByName('modelimage'))    {  
    var optionImg      = domainpath+'/optionimage/side_'+currentCanvasView+'image/'+modelImage; 
    var img = new Image();  
    img.onload = function() {  
      imgWidth = this.width;
      imgHeight = this.height;     
      canvasside.setHeight(imgHeight);
      canvasside.setWidth(imgWidth);   
      canvasside.renderAll();        
      obj.setSrc(optionImg, function()    {
        canvasside.renderAll();
        canvasside.setHeight(imgHeight);
      canvasside.setWidth(imgWidth);
      });
      $.each(optImage,function(index,value)  {
        var defaultimage = new Image();
        defaultimage.src = domainpath+'/optionimage/'+index+'image/'+value;  
        defaultimage.onload = function() {
          canvasObjectCollection['current'+index]['modelimage'].src = defaultimage.src;
          canvasObjectCollection['current'+index]['modelimage'].width = this.width
          canvasObjectCollection['current'+index]['modelimage'].height = this.height
          thumbCanvas(index);
        }
      });
    }
    img.src = optionImg;
  }
}

jQuery(document).on('input', ".text-field-appv1", function () {
  var textVal = jQuery(this).val();
  promizeText = jQuery(this).closest("[text-detail]").attr("text-detail");
  var parsePromizeText = jQuery.parseJSON(promizeText);
  textPosition = parsePromizeText['boundary_position']; 
  textTabId = parsePromizeText['tab_id'];  
  var promizeTab = $(this).closest("[tab-detail]").attr("tab-detail");
  var parsePromizeTab = $.parseJSON(promizeTab);
  tabLayerNo = parsePromizeTab['tab_layer_no'];  
  var textProperty = textProperties($(this),0);
  var width=50, height=50,stroke = null, strokeWidth = 0, strokeDashArray = null, angle = 0, selectStatus = false, controlStatus = false, borderStatus = false;
  var bound_posi = textPosition.split(",");
  var maxwidth = bound_posi[2]; 
  var maxheight = bound_posi[3], fontFamily = textProperty['fontFamily'], fontSize = textProperty['fontSize'];
  textVal = wrapCanvasText(textVal,canvasside,parseInt(maxwidth)-10,parseInt(maxheight),fontFamily,fontSize);    
  applyText('Canvastab'+textTabId+'_'+parsePromizeText['text_setting_id'], textVal, textPosition, fontSize, fontFamily, textProperty['textAlign'], textProperty['boldtext'], textProperty['italictext'], textProperty['underlinetext'], textProperty['fontColor'],tabLayerNo);
  promizeObjectText('Canvastab'+textTabId+'_'+parsePromizeText['text_setting_id'], textVal, textPosition, width, height, fontSize, fontFamily, textProperty['textAlign'], textProperty['boldtext'], textProperty['italictext'], textProperty['underlinetext'], textProperty['fontColor'],stroke, strokeWidth, strokeDashArray, angle, selectStatus, controlStatus, borderStatus,tabLayerNo);
  text_tab_name =parsePromizeTab['tab_name']+':'+ parsePromizeText['text_name'];
  customPrice('Canvastab'+textTabId+'_'+parsePromizeText['text_setting_id'],text_tab_name, parsePromizeText['text_setting_id'],textVal, parsePromizeText['text_price'])
});

jQuery(document).on('change', "select[name^='fontfam']", function () {   
  textProperty = textProperties($(this),1);  
});

function textProperties(thisText, returnProperty) {
  var properties = [];
  var closestTextDetail = jQuery(thisText).closest("[text-detail]");
  promizeText = closestTextDetail.attr("text-detail");
  var parsePromizeText = jQuery.parseJSON(promizeText);
  textTabId = parsePromizeText['tab_id'];
  properties['fontFamily'] = closestTextDetail.find("select[name='fontfam']").val();
  properties['fontSize'] = 14;
  var textGlobalDetail = closestTextDetail.attr("text-global-detail");
  if(textGlobalDetail)  {
    var parsetextGlobalDetail = jQuery.parseJSON(textGlobalDetail);
    if(parsetextGlobalDetail.font_size_ids) {
      properties['fontSize'] = parsetextGlobalDetail.font_size_ids.split(',')[0];
    }
  }
  var width=50, height=50,stroke = null, strokeWidth = 0, strokeDashArray = null, angle = 0, selectStatus = false, controlStatus = false, borderStatus = false;
  properties['textAlign'] = 'left';
  properties['boldtext'] = 'bold';
  properties['italictext'] = 'italic';
  properties['underlinetext'] = true;
  properties['fontColor'] = '#'+closestTextDetail.find('.jscolor').val();
  if(returnProperty == 1) {
    textVal =closestTextDetail.find('.text-field-appv1').val();
    applyTextStyle('Canvastab'+textTabId+'_'+parsePromizeText['text_setting_id'],properties['fontSize'],properties['fontFamily'], properties['textAlign'], properties['boldtext'], properties['italictext'], properties['underlinetext'], properties['fontColor']);
    promizeObjectText('Canvastab'+textTabId+'_'+parsePromizeText['text_setting_id'], textVal, '', '', '', properties['fontSize'], properties['fontFamily'], properties['textAlign'], properties['boldtext'], properties['italictext'], properties['underlinetext'], properties['fontColor'],'', '', '', '', '', '', '','');
  } else {
    return properties;
  }
}

function update(jscolor, jsthis) {
  textProperties($(jsthis),1);
}


var funcs = [];
$('.btn-productimizecart').click(function() {   
  var tabnameloop = 1;
  var tab_names = '';
  var tabsstatus = 'is';
  $('.tabvalue').each(function() {
    if(($(this).attr('tabreq') == 1) && !($(this).find('.rate').hasClass('price_highlight'))) {
      if(tabnameloop > 1) {
        tab_names += ', ';
        tabsstatus = 'are';
      }
      tab_names += $(this).find('p').attr('title');
      tabnameloop++;
    }
  });        
  if(tab_names != '') {
    if($('.add_cart_btn').find( '#tab_required_error').length)  {
      $('.add_cart_btn').find( '#tab_required_error').remove();
    }
    tab_names = '<div id="tab_required_error" >'+ tab_names+' '+ tabsstatus +'  required! </div>';
    $('.btn-cart123').before(tab_names);
    totalviews = $('.modeltotalview').length;
    return false;
  }
  $("#AddToCartText").html("Adding To Cart");
//   totalviews = $('.modeltotalview').length;
  var img = $('<div class="cart_load" ><img class="dynamic1123" src="'+imgurl+'loading-icon.gif"/></div>');
  dataURL = [];
  var modimgg = 0;
  var cartincre = 0;
  var textImageProperties = {};
  for (var i = 1; i <= totalviews; i++) {
    funcs[i] = function(x) {
      var iview = 'currentside_'+x;          
      textImageProperties[iview] = {}; 
      canvasobjectcurrentview = canvasObjectCollection[iview];
//       canvasside.clear();
      var canvasobj = Object.keys(canvasobjectcurrentview).map(function(key) {
        return canvasobjectcurrentview[key];
      });

      fabric.util.enlivenObjects(canvasobj, function(objects) {
//         canvasside.clear();
        for(var k in objects) {
          if((objects[k].name.indexOf('eachtextarea') !== -1) || (objects[k].name.indexOf('eachimagearea') !== -1)) {
            var textImageProp = objects[k]
            textImageProperties[iview][k] =  canvasObjectCollection[iview][objects[k].name];
          }
          var objBoundcheck = objects[k].name
          if(objBoundcheck.indexOf('customboundary_') == -1)  {
//             canvasside.add(objects[k]);
          }
        }
//         layering(iview);
//         dataURL[x-1]= canvasside.toDataURL("image/png", 0.5);
        var image_url = document.getElementById("thumbviewimageside_1");
        dataURL[x-1] = image_url.toDataURL("image/png", 0.5);
//         var imgBase64;
//         cartincre++;
//         if(cartincre == totalviews) {
//           if (typeof dataURL[0] !== 'undefined' && dataURL[0] !== null) {
            var textImagePropertyValues = JSON.stringify(textImageProperties);
            var ajaxsaveimgUrl = $('#saveimgurl').val();
            addToCart(dataURL, canvasside, textImagePropertyValues);
//           }
//         }
      });
    }.bind(this, i);
  }
  for (var j = 1; j <= totalviews; j++) {
    funcs[j]();
  }
  return false;
});