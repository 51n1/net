/* update 1 Oct 2017 */
var xmlHttp;
var helpFlag = 0;
var soundFlagMain = false;
var soundFlagSub = false;

/* Load Event  */
$(window).on('load', function(){
  // Initialize
  var p5name;
  var get = GetQueryString();
  if (!get["p5"]) {
    var randnum = Math.floor( Math.random() * $("#sketchlist a").length );
    var p5href = $("#sketchlist a:eq("+randnum+")").attr('href');
    var get = GetQueryString(p5href);
    //alert(get["p5"]);
  }
  p5name = get["p5"];
  helpFlag = get["h"];
  var p5path = "snapshots/" + p5name + ".js";
  loadP5sketch(p5path);

  var nowsketch = $('#sketchlist a[href*="'+p5name+'"]').html();
  nowsketch = nowsketch + ' <i class="fa fa-arrow-left" aria-hidden="true"></i>';
  $('#sketchlist a[href*="'+p5name+'"]').html(nowsketch);

  var codelink = "https://github.com/51n1/net/blob/master/" + p5path;
  $('#codepanel>p>a').attr('href', codelink);

  //if($("#p5help").html() == "") $("#controls>a:eq(3)").addClass("nonactive");
  if(helpFlag == 0) $("#controls>a:eq(3)").addClass("nonactive");

});

/* Click Event */
$("#controls>a:eq(1)").on('click', function(){ // Info Button
  showElement('#infopanel',this);
});
$("#controls>a:eq(2)").on('click', function(){ // Code Button
  showElement('#codepanel',this);
});
$("#controls>a:eq(3)").on('click', function(){ // Help Button
  if (helpFlag == 1) showElement('#helppanel',this);
});
$("#controls>a:eq(4)").on('click', function(){ // Save Button
  var now = new Date();
  var now_str = now.getFullYear()+'-'+now.getMonth()+'-'+now.getDate()+'-'+now.getHours()+'-'+now.getMinutes()+'-'+now.getSeconds();
  saveCanvas('sketch_'+now_str,'png');
});
$("#controls>a:eq(5)").on('click', function(){ // Sound Button
  if( typeof(mysound) != "undefined" ) {
    if( soundFlagMain ) {
      if(mysound.isPlaying()) mysound.stop();
      soundFlagMain = false;
      $(this).html('<i class="fa fa-volume-off" aria-hidden="true"></i> Off');
    } else {
      if(soundFlagSub && !mysound.isPlaying()) mysound.play();
      soundFlagMain = true;
      $(this).html('<i class="fa fa-volume-up" aria-hidden="true"></i> On');
    }
    $(this).toggleClass("onbutton");
  } else {
    return false;
  }
});
$("#controls>a:eq(6)").on('click', function(){ // Sketch List Button
  showElement('#sketchlist',this);
});

// Load p5.js Sketch
function loadP5sketch(p5path_) {
  if (p5path_) {
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
    xmlHttp.open("GET", p5path_, true);
    xmlHttp.send(null);
  }
}

function checkStatus(){
  if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
    var sketchCode = xmlHttp.responseText;
    if (sketchCode.indexOf('new p5()') === -1) sketchCode += '\nnew p5();';
    var userScript = document.createElement('script');
    userScript.type = 'text/javascript';
    userScript.text = sketchCode;
    //userScript.src = p5path_;
    userScript.async = false;
    document.body.appendChild(userScript);

    // mysound is loaded after p5.js sketch loaded
    if( typeof(mysound) == "undefined" ) {
      $("#controls>a:eq(5)").addClass("nonactive");
    }
  }
}

function GetQueryString(str_) {
  var targetstr = typeof(str_) != "undefined" ? str_ : window.location.search;
  var result = {};
  if( 1 < targetstr.length ) {
    var query = targetstr.substring(1);
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

/*function touchMoved() {
  if(!codeFlag) return false;
}*/

function showElement(target,obj) {
  if ($(target).css("display") == "block") {
    $(target).css("display", "none");
    $(obj).removeClass("onbutton");
  } else {
    $("#infopanel").css("display", "none");
    $("#codepanel").css("display", "none");
    $("#sketchlist").css("display", "none");
    $("#helppanel").css("display", "none");
    $("#controls>a:eq(1)").removeClass("onbutton");
    $("#controls>a:eq(2)").removeClass("onbutton");
    $("#controls>a:eq(3)").removeClass("onbutton");
    $("#controls>a:eq(6)").removeClass("onbutton");
    $(target).css("display", "block");
    $(obj).addClass("onbutton");
  }
}
function checkOnCanvas(event) {
  //console.log(event.target);
  if (event.target.tagName.toLowerCase() == "canvas") return true;
  else return false;
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
