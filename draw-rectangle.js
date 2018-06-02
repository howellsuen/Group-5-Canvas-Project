// filled
class DrawingRectangle extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;            
    }
    
    onMouseDown(coord,event){
        this.contextReal.fillStyle = rgbaColor;
        this.contextReal.strokeStyle = rgbaColorStroke;
        this.contextReal.lineWidth = brushSize;
        this.origX = coord[0];
        this.origY = coord[1];
    }
    onDragging(coord,event){
        this.contextDraft.fillStyle = rgbaColor;
        this.contextDraft.strokeStyle = rgbaColorStroke;
        this.contextDraft.lineWidth = brushSize;
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextDraft.fillRect(this.origX, this.origY, coord[0]- this.origX, coord[1] - this.origY)
        this.contextDraft.strokeRect(this.origX, this.origY, coord[0]- this.origX, coord[1] - this.origY)
    }

    onMouseMove(){}
    onMouseUp(coord){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextReal.fillRect(this.origX, this.origY, coord[0]- this.origX, coord[1] - this.origY);
        this.contextReal.strokeRect(this.origX, this.origY, coord[0]- this.origX, coord[1] - this.origY)
        this.contextReal.strokeRect(this.origX, this.origY, coord[0]- this.origX, coord[1] - this.origY)
    }
    onMouseLeave(){}
    onMouseEnter(){}
}

// outline
class DrawingRectangleOutline extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;            
    }
    
    onMouseDown(coord,event){
        this.contextReal.strokeStyle = rgbaColorStroke;
        this.contextReal.lineWidth = brushSize;
        this.origX = coord[0];
        this.origY = coord[1];
    }
    onDragging(coord,event){
        this.contextDraft.strokeStyle = rgbaColorStroke;
        this.contextDraft.lineWidth = brushSize;
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextDraft.strokeRect(this.origX, this.origY, coord[0]- this.origX, coord[1] - this.origY)
    }

    onMouseMove(){}
    onMouseUp(coord){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextReal.strokeRect(this.origX, this.origY, coord[0]- this.origX, coord[1] - this.origY)
    }
    onMouseLeave(){}
    onMouseEnter(){}
}