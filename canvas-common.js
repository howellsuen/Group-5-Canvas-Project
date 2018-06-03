let canvasReal = document.getElementById('canvas-real');
let contextReal = canvasReal.getContext('2d');
canvasReal.width = window.innerWidth;
canvasReal.height = window.innerHeight;

let canvasDraft = document.getElementById('canvas-draft');
let contextDraft = canvasDraft.getContext('2d');
canvasDraft.width = window.innerWidth;
canvasDraft.height = window.innerHeight;

let currentFunction;
let onFinish = false;
let savehistory = [];
// let currentIndex = 0;

let dragging = false;

//brushsize
let brushSlider = document.getElementById("brushSlider");
let brushSize = 5;

function initCanvas(){
    snap();
}

brushSlider.addEventListener("change", function() {
    brushSize = brushSlider.value;
});

$('#canvas-draft').mousedown(function(e) {
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    currentFunction.onMouseDown([mouseX, mouseY], e);
    dragging = true;
});

$('#canvas-draft').mousemove(function(e) {
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    if (dragging) {
        currentFunction.onDragging([mouseX, mouseY], e);
    }
    currentFunction.onMouseMove([mouseX, mouseY], e);
});

$('#canvas-draft').mouseup(function(e) {
    dragging = false;
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    currentFunction.onMouseUp([mouseX, mouseY], e);
    if(onFinish === true){
        snap();
        onFinish = false;
    }else{
        console.log('Action not finish');
    }
});

$('#canvas-draft').mouseleave(function(e) {
    dragging = false;
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    currentFunction.onMouseLeave([mouseX, mouseY], e);
});

$('#canvas-draft').mouseenter(function(e) {
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    currentFunction.onMouseEnter([mouseX, mouseY], e);
});

$('#canvas-draft').dblclick(function(e) {
    dragging = false;
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    currentFunction.onDblClick([mouseX, mouseY], e);
    if(onFinish === true){
        snap();
        onFinish = false;
    }else{
        console.log('Action not finish');
    }
});

function snap() {
    var snap = document.getElementById('canvas-real').toDataURL();
    savehistory.push(snap);
    currentIndex = savehistory.length - 1;
    console.log('snap');
    console.log('HISTORY: ' + savehistory.length);
}

class PaintFunction {
    constructor() {}
    onMouseDown() {}
    onDragging() {}
    onMouseMove() {}
    onMouseUp() {}
    onMouseLeave() {}
    onMouseEnter() {}
    onDblClick() {}
}