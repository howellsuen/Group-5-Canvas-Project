let colorBlockStroke = document.getElementById('color-block-stroke');
let ctx1stroke = colorBlockStroke.getContext('2d');
let width1stroke = colorBlockStroke.width;
let height1stroke = colorBlockStroke.height;

let colorStripStroke = document.getElementById('color-strip-stroke');
let ctx2stroke = colorStripStroke.getContext('2d');
let width2stroke = colorStripStroke.width;
let height2stroke = colorStripStroke.height;

let strokeLabel = document.getElementById('stroke');
let colorPickerStroke = document.getElementById('color-picker-stroke');
let Rstroke = document.getElementById('stroke-r');
let Gstroke = document.getElementById('stroke-g');
let Bstroke = document.getElementById('stroke-b');

//show and hide color
function show(e) {
    if (e.target == strokeLabel) {
        colorPickerStroke.style.display = "block";
    } else if (e.target == canvasReal || e.target == canvasDraft || e.target == tool[0]) {
        colorPickerStroke.style.display = "none";
    }
}
document.addEventListener("click", show, false);

let xs = 0;
let ys = 0;
let drags = false;

let rgbaColorStroke = 'rgba(15, 150, 150, 1)';

let matchStroke = rgbaColorStroke.match(matchColors);
Rstroke.value = matchStroke[1];
Gstroke.value = matchStroke[2];
Bstroke.value = matchStroke[3];

ctx1stroke.rect(0, 0, width1stroke, height1stroke);
fillGradientStroke();

ctx2stroke.rect(0, 0, width2stroke, height2stroke);
let grdstroke = ctx2stroke.createLinearGradient(0, 0, 0, height1stroke);
grdstroke.addColorStop(0, 'rgba(255, 0, 0, 1)');
grdstroke.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
grdstroke.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
grdstroke.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
grdstroke.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
grdstroke.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
grdstroke.addColorStop(1, 'rgba(255, 0, 0, 1)');
ctx2stroke.fillStyle = grdstroke;
ctx2stroke.fill();

function click(e) {
    xs = e.offsetX;
    ys = e.offsetY;
    let imageData = ctx2stroke.getImageData(xs, ys, 1, 1).data;
    rgbaColorStroke = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
    fillGradientStroke();
}

function fillGradientStroke() {
    ctx1stroke.fillStyle = rgbaColorStroke;
    ctx1stroke.fillRect(0, 0, width1stroke, height1stroke);

    let grdstrokeWhite = ctx2stroke.createLinearGradient(0, 0, width1stroke, 0);
    grdstrokeWhite.addColorStop(0, 'rgba(255,255,255,1)');
    grdstrokeWhite.addColorStop(1, 'rgba(255,255,255,0)');
    ctx1stroke.fillStyle = grdstrokeWhite;
    ctx1stroke.fillRect(0, 0, width1stroke, height1stroke);

    let grdstrokeBlack = ctx2stroke.createLinearGradient(0, 0, 0, height1stroke);
    grdstrokeBlack.addColorStop(0, 'rgba(0,0,0,0)');
    grdstrokeBlack.addColorStop(1, 'rgba(0,0,0,1)');
    ctx1stroke.fillStyle = grdstrokeBlack;
    ctx1stroke.fillRect(0, 0, width1stroke, height1stroke);
}

function mousedown(e) {
    drags = true;
    changeColorStroke(e);
}

function mousemove(e) {
    if (drags) {
        changeColorStroke(e);
    }
}

function mouseup(e) {
    drags = false;
}

function changeColorStroke(e) {
    xs = e.offsetX;
    ys = e.offsetY;
    let imageData = ctx1stroke.getImageData(xs, ys, 1, 1).data;
    rgbaColorStroke = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
    strokeLabel.style.backgroundColor = rgbaColorStroke;
    Rstroke.value = imageData[0];
    Gstroke.value = imageData[1];
    Bstroke.value = imageData[2];
}

colorStripStroke.addEventListener("click", click, false);

colorBlockStroke.addEventListener("mousedown", mousedown, false);
colorBlockStroke.addEventListener("mouseup", mouseup, false);
colorBlockStroke.addEventListener("mousemove", mousemove, false);


// input rgb by text
function typeColor(e) {
    if (isNaN(this.value) || this.value > 255 || this.value < 0) {
        this.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    } else {
        rgbaColorStroke = 'rgba(' + Rstroke.value + ',' + Gstroke.value + ',' + Bstroke.value + ',1)';
        strokeLabel.style.backgroundColor = rgbaColorStroke;
        fillGradientStroke();
        this.style.backgroundColor = "";
    }
}

Rstroke.addEventListener("input", typeColor, false);
Gstroke.addEventListener("input", typeColor, false);
Bstroke.addEventListener("input", typeColor, false);