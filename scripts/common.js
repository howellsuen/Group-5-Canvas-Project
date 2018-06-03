$('#drawing-rectangle').click(() => {
    currentFunction = new DrawingRectangle(contextReal, contextDraft);
});
$('#drawing-rectangle-outline').click(() => {
    currentFunction = new DrawingRectangleOutline(contextReal, contextDraft);
});
$('#drawing-pencil').click(() => {
    currentFunction = new DrawingPencil(contextReal, contextDraft);
});
$('#drawing-line').click(() => {
    currentFunction = new DrawingLine(contextReal, contextDraft);
});
$('#quadratic-curve').click(() => {
    currentFunction = new QuadraticCurve(contextReal, contextDraft);
});
$('#bezier-curve').click(() => {
    currentFunction = new BezierCurve(contextReal, contextDraft);
});
$('#drawing-circle').click(() => {
    currentFunction = new DrawingCircle(contextReal, contextDraft);
    console.log('draw circle');
});
$('#drawing-circle-outline').click(() => {
    currentFunction = new DrawingCircleOutline(contextReal, contextDraft);
    console.log('draw circle stroke');
});
$('#eraser').click(() => {
    currentFunction = new Eraser(contextReal, contextDraft);
});
$('#reset').click(() => {
    contextReal.clearRect(0, 0, canvasReal.width, canvasReal.height);
    contextDraft.clearRect(0, 0, canvasReal.width, canvasReal.height);
    savehistory = [];
    initCanvas();
});
$('#download').click(function() {
    currentFunction = new Download(contextReal);
    currentFunction.downloadCanvas(this, 'canvas-real', 'test.png');
    console.log(this);
});
$('#undo').click(function() {
    currentFunction = new DrawHistory(contextReal);
    currentFunction.undo();
});
$('#redo').click(function() {
    currentFunction = new DrawHistory(contextReal);
    currentFunction.redo();
});
$('#paint-bucket').click(() => {
    currentFunction = new PaintBucket(contextReal, contextDraft);
});

currentFunction = new DrawingPencil(contextReal, contextDraft);

// prompt when reload or exit page
$(window).bind('beforeunload', function(){
return 'Are you sure you want to leave?';
});
