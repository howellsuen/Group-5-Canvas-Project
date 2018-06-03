let colorBlockFill = document.getElementById('color-block-fill');
let ctx1 = colorBlockFill.getContext('2d');
let width1 = colorBlockFill.width;
let height1 = colorBlockFill.height;

let colorStripFill = document.getElementById('color-strip-fill');
let ctx2 = colorStripFill.getContext('2d');
let width2 = colorStripFill.width;
let height2 = colorStripFill.height;

let tool = document.getElementsByClassName('tool-panel');
let fillLabel = document.getElementById('fill');
let colorPickerFill = document.getElementById('color-picker-fill');
let rgbField = document.getElementsByClassName('rgb-field');
let rgbInput = document.getElementsByClassName('input');
let R = document.getElementById('fill-r');
let G = document.getElementById('fill-g');
let B = document.getElementById('fill-b');

//show and hide color
function show(e) {
  if (e.target == fillLabel) {
    colorPickerFill.style.display = "block";
  } else if (e.target == canvasReal || e.target == canvasDraft || e.target == tool[0]) {
    colorPickerFill.style.display = "none";
  }
}
document.addEventListener("click", show, false);

let x = 0;
let y = 0;
let drag = false;

let rgbaColor = 'rgba(120, 220, 240, 1)';
let matchColors = /rgba\((\d{1,3}), (\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
let match = rgbaColor.match(matchColors);
R.value = match[1];
G.value = match[2];
B.value = match[3];

ctx1.rect(0, 0, width1, height1);
fillGradient();

ctx2.rect(0, 0, width2, height2);
let grd1 = ctx2.createLinearGradient(0, 0, 0, height1);
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
  let imageData = ctx2.getImageData(x, y, 1, 1).data;
  rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
  fillGradient();
}

function fillGradient() {
  ctx1.fillStyle = rgbaColor;
  ctx1.fillRect(0, 0, width1, height1);

  let grdWhite = ctx2.createLinearGradient(0, 0, width1, 0);
  grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
  grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
  ctx1.fillStyle = grdWhite;
  ctx1.fillRect(0, 0, width1, height1);

  let grdBlack = ctx2.createLinearGradient(0, 0, 0, height1);
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
  let imageData = ctx1.getImageData(x, y, 1, 1).data;
  rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
  fillLabel.style.backgroundColor = rgbaColor;
  R.value = imageData[0];
  G.value = imageData[1];
  B.value = imageData[2];
}

colorStripFill.addEventListener("click", click, false);

colorBlockFill.addEventListener("mousedown", mousedown, false);
colorBlockFill.addEventListener("mouseup", mouseup, false);
colorBlockFill.addEventListener("mousemove", mousemove, false);


// input rgb by text
function typeColor(e) {
  if (isNaN(this.value) || this.value >255 || this.value <0) {
    this.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
  } else {
    rgbaColor = 'rgba(' + R.value + ',' + G.value + ',' + B.value + ',1)';
    fillLabel.style.backgroundColor = rgbaColor;
    fillGradient();
    this.style.backgroundColor = "";
  }
}

R.addEventListener("input", typeColor, false);
G.addEventListener("input", typeColor, false);
B.addEventListener("input", typeColor, false);