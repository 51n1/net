/* update 15 Oct 2017 */
var xmlHttp;
var helpFlag = 0;
var soundFlag = 0;
var selectsound;
var mysound;
var analyzer = new p5.Amplitude(); // create a new Amplitude analyzer
var defaultsound = "./sounds/20170924.wav";

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
  soundFlag = get["s"];
  var p5path = "snapshots/" + p5name + ".js";
  loadP5sketch(p5path);

  var nowsketch = $('#sketchlist a[href*="'+p5name+'"]').html();
  nowsketch = nowsketch + ' <i class="fa fa-arrow-left" aria-hidden="true"></i>';
  $('#sketchlist a[href*="'+p5name+'"]').html(nowsketch);

  var codelink = "https://github.com/51n1/net/blob/master/" + p5path;
  $('#codepanel>p>a').attr('href', codelink);

  //if($("#p5help").html() == "") $("#controls>a:eq(3)").addClass("nonactive");
  if(helpFlag == 0) $("#controls>a:eq(2)").addClass("nonactive");
  if(soundFlag == 0) $("#controls>a:eq(4)").addClass("nonactive");

});

/* Main Controls Click Event */
$("#controls>a:eq(0)").on('click', function(){ // Info Button
  showElement('#infopanel',this);
});
$("#controls>a:eq(1)").on('click', function(){ // Code Button
  showElement('#codepanel',this);
});
$("#controls>a:eq(2)").on('click', function(){ // Help Button
  if (helpFlag == 1) showElement('#helppanel',this);
});
$("#controls>a:eq(3)").on('click', function(){ // Save Button
  var now = new Date();
  var now_str = now.getFullYear()+'-'+now.getMonth()+'-'+now.getDate()+'-'+now.getHours()+'-'+now.getMinutes()+'-'+now.getSeconds();
  saveCanvas('sketch_'+now_str,'png');
});
$("#controls>a:eq(4)").on('click', function(){ // Sound Button
  if (soundFlag == 1) showElement('#soundpanel',this);
});
$("#controls>a:eq(5)").on('click', function(){ // Tool Bar Open Button
  if ($("#controls>a:eq(0)").css("display") == "block") { // Hide Tool Bar
    $("#infopanel,#codepanel,#helppanel,#sketchlist,#soundpanel").css("display", "none");
    $("#sidebar").css("width", "min-content");
    $(this).html("<i class='fa fa-chevron-right' aria-hidden='true'></i>");
    $("#controls>a:eq(0),#controls>a:eq(1),#controls>a:eq(2),#controls>a:eq(4),#controls>a:eq(6)").removeClass("onbutton");
  } else { // Show Tool Bar
    if ( windowWidth > 480 ) $("#sidebar").css("width", "350px");
    else $("#sidebar").css("width", "100%");
    $(this).html("<i class='fa fa-chevron-left' aria-hidden='true'></i>");
  }
  $("#controls>a:eq(0),#controls>a:eq(1),#controls>a:eq(2),#controls>a:eq(3),#controls>a:eq(4),#controls>a:eq(6)").toggleClass("ondisplay");
});
$("#controls>a:eq(6)").on('click', function(){ // Sketch List Button
  showElement('#sketchlist',this);
});

/* Sound Controls Click Event */
$("#soundpanel>p>a:eq(0)").on('click', function(){ // Sound Play & Pause Button
  if( mysound && mysound.isPlaying() ) {
    mysound.pause();
    $("#controls>a:eq(4)").html('<i class="fa fa-volume-off" aria-hidden="true"></i> Sound');
    $("#soundpanel>p>a:eq(0)").html('<i class="fa fa-play" aria-hidden="true"></i> Play');
  } else {
    playSound();
  }
});
$("#soundpanel>p>a:eq(1)").on('click', function(){ // Sound Stop Button
  stopSound();
});
$("#soundpanel>p>a:eq(2)").on('click', function(){ // Sound Select Button
  $('#inputfile').click();
});

/* Load p5.js Sketch */
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
  }
}

// Function of Sound Player
function initSound() {
  mysound.loop();
  mysound.stop();
  analyzer.setInput(mysound); // Patch the input to an volume analyzer
  $("#soundpanel>p>a:eq(0),#soundpanel>p>a:eq(1)").removeClass("onloading");
  if ( selectsound.length > 15 ) selectsound = selectsound.substr(0, 12) + "..." + selectsound.substr(-3);
  $('#soundname').html(selectsound);
}
function playSound() {
  if ( mysound && !mysound.isPlaying() ) {
    mysound.play();
  } else if ( !mysound && defaultsound  ) {
    console.log(defaultsound);
    selectsound = defaultsound;
    $('#soundname').html("Loading...");
    $("#soundpanel>p>a:eq(0),#soundpanel>p>a:eq(1)").addClass("onloading");
    mysound = loadSound(defaultsound, function() { initSound(); mysound.play(); });
  }
  $("#controls>a:eq(4)").html('<i class="fa fa-volume-up" aria-hidden="true"></i> Sound');
  $("#soundpanel>p>a:eq(0)").html('<i class="fa fa-pause" aria-hidden="true"></i> Pause');
}
function stopSound() {
  if( mysound && mysound.isPlaying() ) {
    mysound.stop();
    $("#controls>a:eq(4)").html('<i class="fa fa-volume-off" aria-hidden="true"></i> Sound');
    $("#soundpanel>p>a:eq(0)").html('<i class="fa fa-play" aria-hidden="true"></i> Play');
  }
}
function soundLoading() {
  $('body').append('<p>Loading</p>');
}
// When change select input file, show file name to console.log.
$("#inputfile").change(function(){
  if (this.files.length > 0) {
    // Get selected file object
    var file = this.files[0];
    selectsound = file.name;
    $('#soundname').html("Loading...");
    $("#soundpanel>p>a:eq(0),#soundpanel>p>a:eq(1)").addClass("onloading");
    console.log(file.name);
    // Ready of reading file
    var reader = new FileReader();
    // If success of reading file, use it as audio source.
    reader.addEventListener('load', function(e) {
      if(mysound) {
        $("#controls>a:eq(4)").html('<i class="fa fa-volume-off" aria-hidden="true"></i> Sound');
        mysound.disconnect();
      }
      mysound = loadSound(reader.result, initSound);
    }, true);
    // Get file data as Data URL format
    reader.readAsDataURL(file);
  }
});

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
    $("#infopanel,#codepanel,#helppanel,#soundpanel,#sketchlist").css("display", "none");
    $("#controls>a:eq(0),#controls>a:eq(1),#controls>a:eq(2),#controls>a:eq(4),#controls>a:eq(6)").removeClass("onbutton");
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
