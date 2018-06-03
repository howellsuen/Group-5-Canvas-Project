let colorBlockBg = document.getElementById('color-block-bg');
let ctx1bg = colorBlockBg.getContext('2d');
let width1bg = colorBlockBg.width;
let height1bg = colorBlockBg.height;

let colorStripBg = document.getElementById('color-strip-bg');
let ctx2bg = colorStripBg.getContext('2d');
let width2bg = colorStripBg.width;
let height2bg = colorStripBg.height;

let bgLabel = document.getElementById('bg');
let colorPickerBg = document.getElementById('color-picker-bg');
let Rbg = document.getElementById('bg-r');
let Gbg = document.getElementById('bg-g');
let Bbg = document.getElementById('bg-b');

//show and hide color
function show(e) {
  if (e.target == bgLabel) {
    colorPickerBg.style.display = "block";
  } else if (e.target == canvasReal || e.target == canvasDraft || e.target == tool[0]) {
    colorPickerBg.style.display = "none";
  }
}
document.addEventListener("click", show, false);

let xb = 0;
let yb = 0;
let dragb = false;

let rgbaColorBg = 'rgba(255, 255, 255, 1)';

let matchBg = rgbaColorBg.match(matchColors);
Rbg.value = matchBg[1];
Gbg.value = matchBg[2];
Bbg.value = matchBg[3];

ctx1bg.rect(0, 0, width1bg, height1bg);
fillGradientBg();

ctx2bg.rect(0, 0, width2bg, height2bg);
let grdbg = ctx2bg.createLinearGradient(0, 0, 0, height1bg);
grdbg.addColorStop(0, 'rgba(255, 0, 0, 1)');
grdbg.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
grdbg.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
grdbg.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
grdbg.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
grdbg.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
grdbg.addColorStop(1, 'rgba(255, 0, 0, 1)');
ctx2bg.fillStyle = grdbg;
ctx2bg.fill();

function click(e) {
  xb = e.offsetX;
  yb = e.offsetY;
  let imageData = ctx2bg.getImageData(xb, yb, 1, 1).data;
  rgbaColorBg = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
  fillGradientBg();
}

function fillGradientBg() {
  ctx1bg.fillStyle = rgbaColorBg;
  ctx1bg.fillRect(0, 0, width1bg, height1bg);

  let grdbgWhite = ctx2bg.createLinearGradient(0, 0, width1bg, 0);
  grdbgWhite.addColorStop(0, 'rgba(255,255,255,1)');
  grdbgWhite.addColorStop(1, 'rgba(255,255,255,0)');
  ctx1bg.fillStyle = grdbgWhite;
  ctx1bg.fillRect(0, 0, width1bg, height1bg);

  let grdbgBlack = ctx2bg.createLinearGradient(0, 0, 0, height1bg);
  grdbgBlack.addColorStop(0, 'rgba(0,0,0,0)');
  grdbgBlack.addColorStop(1, 'rgba(0,0,0,1)');
  ctx1bg.fillStyle = grdbgBlack;
  ctx1bg.fillRect(0, 0, width1bg, height1bg);
}

function mousedown(e) {
  dragb = true;
  changeColorBg(e);
}

function mousemove(e) {
  if (dragb) {
    changeColorBg(e);
  }
}

function mouseup(e) {
  dragb = false;
}

function changeColorBg(e) {
  xb = e.offsetX;
  yb = e.offsetY;
  let imageData = ctx1bg.getImageData(xb, yb, 1, 1).data;
  rgbaColorBg = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
  bgLabel.style.backgroundColor = rgbaColorBg;
  Rbg.value = imageData[0];
  Gbg.value = imageData[1];
  Bbg.value = imageData[2];
  contextReal.fillStyle = rgbaColorBg;
  contextReal.fillRect(0,0,canvasDraft.width,canvasDraft.height);
  onFinish = true;
}

colorStripBg.addEventListener("click", click, false);

colorBlockBg.addEventListener("mousedown", mousedown, false);
colorBlockBg.addEventListener("mouseup", mouseup, false);
colorBlockBg.addEventListener("mousemove", mousemove, false);


// input rgb by text
function typeColor(e) {
  if (isNaN(this.value) || this.value >255 || this.value <0) {
    this.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
  } else {
    rgbaColorBg = 'rgba(' + Rbg.value + ',' + Gbg.value + ',' + Bbg.value + ',1)';
    bgLabel.style.backgroundColor = rgbaColorBg; 
    fillGradientBg();
    this.style.backgroundColor = "";
  }
}

Rbg.addEventListener("input", typeColor, false);
Gbg.addEventListener("input", typeColor, false);
Bbg.addEventListener("input", typeColor, false);