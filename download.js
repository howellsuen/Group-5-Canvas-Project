class Download extends PaintFunction {
    constructor(contextReal) {
        super();
        this.contextReal = contextReal;
    }

    downloadCanvas(link, canvasId, filename) {
        link.href = document.getElementById(canvasId).toDataURL();
        link.download = filename;
    }
}