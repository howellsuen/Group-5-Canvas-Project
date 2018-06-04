let brushSlider = document.getElementById("brushSlider");
let brushSize = 5;

let canvasBrush = document.getElementById('show-brush');
let ctxBrush = canvasBrush.getContext('2d');
ctxBrush.width = canvasBrush.width;
ctxBrush.height = canvasBrush.height;

function changeSize() {
    ctxBrush.clearRect(0,0,ctxBrush.width,ctxBrush.height);
    ctxBrush.fillStyle = rgbaColorStroke;
    ctxBrush.beginPath();
    ctxBrush.arc(21, 20, brushSize/2, 0, 2 * Math.PI, false);
    ctxBrush.fill();
    ctxBrush.closePath();
}

brushSlider.addEventListener("change", function() {
    brushSize = brushSlider.value;
    changeSize();
});

changeSize();// [REVIEW] initial setup
