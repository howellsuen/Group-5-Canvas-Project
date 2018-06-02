class DrawingCircle extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;            
    }
    
    onMouseDown(coord,event){
        
        this.contextReal.beginPath();
        this.origX = coord[0];
        this.origY = coord[1];
    }
    onDragging(coord,event){
        this.contextDraft.fillStyle = rgbaColor;
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextDraft.beginPath();
        this.contextDraft.arc(this.origX, this.origY, Math.abs(coord[0]- this.origX), 0, 2 * Math.PI, false);
        this.contextDraft.closePath();
        contextDraft.fill();
        //this.contextReal.stroke(); 
    }

    onMouseMove(){}
    onMouseUp(coord){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextReal.arc(this.origX, this.origY, Math.abs(coord[0]- this.origX), 0, 2 * Math.PI, false);
        this.contextReal.fillStyle = rgbaColor;
        this.contextReal.closePath();
        this.contextReal.fill();
        
    }
    onMouseLeave(){}
    onMouseEnter(){}
}

// outline
class DrawingCircleOutline extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;            
    }
    
    onMouseDown(coord,event){
        this.contextReal.strokeStyle = rgbaColorStroke;
        this.origX = coord[0];
        this.origY = coord[1];
    }
    onDragging(coord,event){
        this.contextDraft.strokeStyle = rgbaColorStroke;
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextDraft.beginPath();
        this.contextDraft.arc(this.origX, this.origY, Math.abs(coord[0]- this.origX), 0, 2 * Math.PI, false);
        this.contextDraft.closePath();
        this.contextDraft.stroke();
    }

    onMouseMove(){}
    onMouseUp(coord){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextReal.beginPath();
        this.contextReal.arc(this.origX, this.origY, Math.abs(coord[0]- this.origX), 0, 2 * Math.PI, false);
        this.contextReal.closePath();
        this.contextReal.stroke();
    }
    onMouseLeave(){}
    onMouseEnter(){}
}