let canvasReal = document.getElementById('canvas-real');
let contextReal = canvasReal.getContext('2d');
canvasReal.width = window.innerWidth;
canvasReal.height = window.innerHeight;

let canvasDraft = document.getElementById('canvas-draft');
let contextDraft = canvasDraft.getContext('2d');
canvasDraft.width = window.innerWidth;
canvasDraft.height = window.innerHeight;

let currentFunction;

let savehistory = [];
let currentIndex = 0;

let dragging = false;

$('#canvas-draft').mousedown(function(e){
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    currentFunction.onMouseDown([mouseX,mouseY],e);
    dragging = true;
});

$('#canvas-draft').mousemove(function(e){
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    if(dragging){
        currentFunction.onDragging([mouseX,mouseY],e);
    }
    currentFunction.onMouseMove([mouseX,mouseY],e);
});

$('#canvas-draft').mouseup(function(e){
    dragging = false;
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    currentFunction.onMouseUp([mouseX,mouseY],e);
    snap();
});

$('#canvas-draft').mouseleave(function(e){
    dragging = false;
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    currentFunction.onMouseLeave([mouseX,mouseY],e);
});

$('#canvas-draft').mouseenter(function(e){
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;
    currentFunction.onMouseEnter([mouseX,mouseY],e);
});

function snap() {
    var snap = document.getElementById('canvas-real').toDataURL();
    savehistory.push(snap);
    currentIndex = savehistory.length - 1;
    console.log('snap');
    console.log('HISTORY: ' + savehistory.length);
}

function redo(link, canvas) {
    currentIndex++;
    link.href = savehistory[currentIndex];
    link.download = 'watch_history_lastTwo.png';

    var img = new Image();
    img.src = savehistory[currentIndex];
    img.onload = function () {
        contextReal.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        contextReal.drawImage(img, 0, 0, canvasDraft.width, canvasDraft.height);
    };
}

function undo(link, canvas) {
    currentIndex--;
    link.href = savehistory[currentIndex];
    link.download = 'watch_history_lastTwo.png';

    var img = new Image();
    img.src = savehistory[currentIndex];
    img.onload = function () {
        contextReal.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        contextReal.drawImage(img, 0, 0, canvasDraft.width, canvasDraft.height);
    };
}

class PaintFunction{
    constructor(){}
    onMouseDown(){}
    onDragging(){}
    onMouseMove(){}
    onMouseUp(){}
    onMouseLeave(){}
    onMouseEnter(){}
}    