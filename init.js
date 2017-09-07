/* update 6 Sep 2017 */
var xmlHttp;
var sketchCode;
var codeFlag = false;
var defaultsketch = "rotationofcircle";

//$(document).ready(function(){
  //document.getElementById("infopanel").style.display = "none";
  //document.getElementById("sketchlist").style.display = "none";
//});

$(window).on('load', function(){
  initP5sketch(defaultsketch);
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
    document.getElementById("p5code").innerHTML = "<span class='codetext'>" + sketchCode + "</span>";
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
    document.getElementById("p5content").style.display = "block";
  } else {
    obj.innerHTML = "<i class=\"fa fa-code\" aria-hidden=\"true\"></i> Code";
    document.getElementById("p5content").style.display = "none";
  }
}

function showElement(id) {
  if (document.getElementById(id).style.display == "block") {
    document.getElementById(id).style.display = "none";
  } else {
    document.getElementById("infopanel").style.display = "none";
    document.getElementById("sketchlist").style.display = "none";
    document.getElementById(id).style.display = "block";
  }
}
