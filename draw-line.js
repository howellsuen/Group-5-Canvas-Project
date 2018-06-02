class DrawingLine extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
    }
    onMouseDown(coord, event) {
        this.origX = coord[0];
        this.origY = coord[1];
    }
    onDragging(coord, event) {
        this.draw(this.contextDraft, coord);
    }
    onMouseMove() {}
    onMouseUp(coord, event) {
        this.draw(this.contextReal, coord);
    }
    onMouseLeave() {}
    onMouseEnter() {}
    onDblClick() {}

    draw(context, coord) {
        contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        context.strokeStyle = rgbaColorStroke;
        context.lineJoin = "round";
        context.lineWidth = brushSize;
        context.beginPath();
        context.moveTo(this.origX, this.origY);
        context.lineTo(coord[0], coord[1]);
        context.stroke();
        context.closePath();
    }
}