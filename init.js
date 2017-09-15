/* update 14 Sep 2017 */
var xmlHttp;
var sketchCode;
var codeFlag = false;
var defaultsketch = "drawingmotion3d";
var helpFlag = 1;

/* Event */
$(window).on('load', function(){ initP5sketch(defaultsketch); });
$("#controls>a:eq(0)").on('click', function(){ // Info
  showElement('#infopanel',this);
});
$("#controls>a:eq(1)").on('click', function(){ // Code
  showCode(this);
  $(this).toggleClass("onbutton");
});
$("#controls>a:eq(2)").on('click', function(){ // Save
  var now = new Date();
  var now_str = now.getFullYear()+'-'+now.getMonth()+'-'+now.getDate()+'-'+now.getHours()+'-'+now.getMinutes()+'-'+now.getSeconds();
  saveCanvas('sketch_'+now_str,'png');
});
$("#controls>a:eq(3)").on('click', function(){ // Help
  if($("#p5help").html() != "") {
    if ($("#p5help").css("display") == "block") $("#p5help").css("display", "none");
    else $("#p5help").css("display", "block");
    $(this).toggleClass("onbutton");
  } else {
    return false;
  }
});
$("#controls>a:eq(4)").on('click', function(){ // Sketch List
  showElement('#sketchlist',this);
});

/* Initialize */
function initP5sketch(p5name){
  var get = GetQueryString();
  if (get["p5"]) {
    p5name = get["p5"];
    helpFlag = get["h"];
  }
  p5path = "./snapshots/" + p5name + ".js";
  loadP5sketch(p5path);

  var tname = $('#sketchlist>p>a[href*="'+p5name+'"]').html();
  tname = '<i class="fa fa-hand-o-right" aria-hidden="true"></i> ' + tname;
  $('#sketchlist>p>a[href*="'+p5name+'"]').html(tname);

  //if($("#p5help").html() == "") $("#controls>a:eq(3)").addClass("nohelp");
  if(helpFlag == 0) $("#controls>a:eq(3)").addClass("nohelp");
}

function loadP5sketch(p5path) {
  if (p5path) {
    if (window.XMLHttpRequest){
      xmlHttp = new XMLHttpRequest();
    } else {
        if (window.ActiveXObject){
          xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        } else {
          xmlHttp = null;
        }
    }
    xmlHttp.onreadystatechange = checkStatus;
    xmlHttp.open("GET", p5path, true);
    xmlHttp.send(null);
  }
}

function checkStatus(){
  if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
    sketchCode = xmlHttp.responseText;
    var escapeHTML = sketchCode.replace(/&/g, '&amp;');
    escapeHTML = escapeHTML.replace(/</g, '&lt;');
    escapeHTML = escapeHTML.replace(/>/g, '&gt;');
    escapeHTML = escapeHTML.replace(/"/g, '&quot;');
    escapeHTML = escapeHTML.replace(/'/g, '&#39;');
    
    $("#p5code").html("<span class='codetext'>" + escapeHTML + "</span>");
    if (sketchCode.indexOf('new p5()') === -1) sketchCode += '\nnew p5();';
    var userScript = document.createElement('script');
    userScript.type = 'text/javascript';
    userScript.text = sketchCode;
    //userScript.src = p5path;
    userScript.async = false;
    document.body.appendChild(userScript);
  }
}

function GetQueryString() {
  var result = {};
  if( 1 < window.location.search.length ) {
    var query = window.location.search.substring(1);
    var parameters = query.split('&');
    for( var i = 0; i < parameters.length; i++ ) {
      var element = parameters[i].split('=');
      var paramName = decodeURIComponent(element[0]);
      var paramValue = decodeURIComponent(element[1]);
      result[paramName] = paramValue;
    }
  }
  return result;
}

//function touchMoved() {
  //if(!codeFlag) return false;
//}

function showCode(obj) {
  codeFlag = !codeFlag;
  if(codeFlag) {
    //obj.innerHTML = "<i class=\"fa fa-code\" aria-hidden=\"true\"></i> Code";
    $("#p5content").css("display", "block");
  } else {
    //obj.innerHTML = "<i class=\"fa fa-code\" aria-hidden=\"true\"></i> Code";
    $("#p5content").css("display", "none");
  }
}

function showElement(target,obj) {
  if ($(target).css("display") == "block") {
    $(target).css("display", "none");
    $(obj).removeClass("onbutton");
  } else {
    $("#infopanel").css("display", "none");
    $("#sketchlist").css("display", "none");
    $("#controls>a:eq(0)").removeClass("onbutton");
    $("#controls>a:eq(4)").removeClass("onbutton");
    $(target).css("display", "block");
    $(obj).addClass("onbutton");
  }
}

function stopDefault(event) {
  if (event.target.tagName.toLowerCase() == "a") {return;}
  if (event.target.tagName.toLowerCase() == "i") {return;}
  if (event.target.tagName.toLowerCase() == "span") {return;}
  if (event.target.tagName.toLowerCase() == "pre") {return;}
  //if (event.target.id == "p5help") {return;}
  event.preventDefault();
}

document.addEventListener("touchstart", stopDefault, false);
document.addEventListener("touchmove", stopDefault, false);
document.addEventListener("touchend", stopDefault, false);

document.addEventListener("gesturestart", stopDefault, false);
document.addEventListener("gesturechange", stopDefault, false);
document.addEventListener("gestureend", stopDefault, false);
