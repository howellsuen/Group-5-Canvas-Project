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



 // draw circles: ctx.arc(x, y, radius, startAngle, endAngle [, anticlockwise]);
        // Pythagorean Theorem: a**2 + b**2 = c**2
        // let w = coord[0]- this.origX;
        // let h = coord[1] - this.origY;
        // let radius = Math.sqrt(w**2 + h**2);
        // this.contextDraft.arc(this.origX, this.origY, radius/2, 0, 2 * Math.PI, false);