/* update 6 Sep 2017 */
var xmlHttp;
var sketchCode;
var codeFlag = false;
var defaultsketch = "rotationofcircle";

/* Event */
//$(document).ready(function(){
  //document.getElementById("infopanel").style.display = "none";
  //document.getElementById("sketchlist").style.display = "none";
//});
$(window).on('load', function(){
  initP5sketch(defaultsketch);
});
$("#controls>a:eq(1)").on('click', function(){
  showElement('#infopanel');
});
$("#controls>a:eq(2)").on('click', function(){
  showCode(this);
});
$("#controls>a:eq(3)").on('click', function(){
  var now = new Date();
  var now_str = now.getFullYear()+'-'+now.getMonth()+'-'+now.getDate()+'-'+now.getHours()+'-'+now.getMinutes()+'-'+now.getSeconds();
  saveCanvas('sketch_'+now_str,'png');
});
$("#controls>a:eq(4)").on('click', function(){
  showElement('#sketchlist');
});

function initP5sketch(p5path){
  var get = GetQueryString();
  if (get["p5"]) p5path = get["p5"];
  p5path = "./snapshots/" + p5path + ".js";
  loadP5sketch(p5path);
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
    $("#p5code").html("<span class='codetext'>" + sketchCode + "</span>");
    if (sketchCode.indexOf('new p5()') === -1) {
      sketchCode += '\nnew p5();';
    }
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

function touchMoved() {
  if(!codeFlag) return false;
}

function showCode(obj) {
  codeFlag = !codeFlag;
  if(codeFlag) {
    obj.innerHTML = "<i class=\"fa fa-code\" aria-hidden=\"true\"></i> Code";
    $("#p5content").css("display", "block");
  } else {
    obj.innerHTML = "<i class=\"fa fa-code\" aria-hidden=\"true\"></i> Code";
    $("#p5content").css("display", "none");
  }
}

function showElement(id) {
  if ($(id).css("display") == "block") {
    $(id).css("display", "none");
  } else {
    $("#infopanel").css("display", "none");
    $("#sketchlist").css("display", "none");
    $(id).css("display", "block");
  }
}
