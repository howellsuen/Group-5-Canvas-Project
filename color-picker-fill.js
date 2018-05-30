var colorBlock = document.getElementById('color-block-fill');
var ctx1 = colorBlock.getContext('2d');
var width1 = colorBlock.width;
var height1 = colorBlock.height;

var colorStrip = document.getElementById('color-strip-fill');
var ctx2 = colorStrip.getContext('2d');
var width2 = colorStrip.width;
var height2 = colorStrip.height;


var tool = document.getElementsByClassName('tool-panel');
var colorLabel = document.getElementById('fill');
var colorPicker = document.getElementById('color-picker-fill');
var rgbField = document.getElementsByClassName('rgb-field');
var rgbInput = document.getElementsByClassName('input');
var R = document.getElementById('fill-r');
var G = document.getElementById('fill-g');
var B = document.getElementById('fill-b');

//show and hide color
window.onclick = function(e) {
  
  if (e.target == colorLabel) {
    colorPicker.style.display = "block";
  } 
  if (e.target == canvasReal || e.target == canvasDraft || e.target == tool[0]) {
    colorPicker.style.display = "none";
  }
}

var x = 0;
var y = 0;
var drag = false;

var rgbaColor = 'rgba(255, 0, 0, 1)';
var matchColors = /rgba\((\d{1,3}), (\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
var match = rgbaColor.match(matchColors);
R.value = match[1];
G.value = match[2];
B.value = match[3];

ctx1.rect(0, 0, width1, height1);
fillGradient();

ctx2.rect(0, 0, width2, height2);
var grd1 = ctx2.createLinearGradient(0, 0, 0, height1);
grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
ctx2.fillStyle = grd1;
ctx2.fill();

function click(e) {
  x = e.offsetX;
  y = e.offsetY;
  var imageData = ctx2.getImageData(x, y, 1, 1).data;
  rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
  fillGradient();
}

function fillGradient() {
  ctx1.fillStyle = rgbaColor;
  ctx1.fillRect(0, 0, width1, height1);

  var grdWhite = ctx2.createLinearGradient(0, 0, width1, 0);
  grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
  grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
  ctx1.fillStyle = grdWhite;
  ctx1.fillRect(0, 0, width1, height1);

  var grdBlack = ctx2.createLinearGradient(0, 0, 0, height1);
  grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
  grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
  ctx1.fillStyle = grdBlack;
  ctx1.fillRect(0, 0, width1, height1);
}

function mousedown(e) {
  drag = true;
  changeColor(e);
}

function mousemove(e) {
  if (drag) {
    changeColor(e);
  }
}

function mouseup(e) {
  drag = false;
}

function changeColor(e) {
  x = e.offsetX;
  y = e.offsetY;
  var imageData = ctx1.getImageData(x, y, 1, 1).data;
  rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
  colorLabel.style.backgroundColor = rgbaColor;
  R.value = imageData[0];
  G.value = imageData[1];
  B.value = imageData[2];
}

colorStrip.addEventListener("click", click, false);

colorBlock.addEventListener("mousedown", mousedown, false);
colorBlock.addEventListener("mouseup", mouseup, false);
colorBlock.addEventListener("mousemove", mousemove, false);


// input rgb by text
function typeColor() {
  R.value = R.value;
  G.value = G.value;
  B.value = B.value;

  rgbaColor = 'rgba(' + R.value + ',' + G.value + ',' + B.value + ',1)';
  colorLabel.style.backgroundColor = rgbaColor;
}

R.addEventListener("keyup", mousedown, false);

