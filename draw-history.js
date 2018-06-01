class DrawHistory extends PaintFunction {
    constructor() {
        super();
        let currentIndex = 0;
    }

    redo(link, canvas) {
        currentIndex++;
        var img = new Image();
        img.src = savehistory[currentIndex];
        img.onload = function () {
            contextReal.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            contextReal.drawImage(img, 0, 0, canvasDraft.width, canvasDraft.height);
        };
    }

    undo(link, canvas) {
        currentIndex--;
        var img = new Image();
        img.src = savehistory[currentIndex];
        img.onload = function () {
            contextReal.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            contextReal.drawImage(img, 0, 0, canvasDraft.width, canvasDraft.height);
        };
    }
}