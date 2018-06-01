class DrawHistory extends PaintFunction {
    constructor() {
        super();
        let currentIndex = 0;
    }

    redo(link, canvas) {
        if (currentIndex < savehistory.length - 1) {
            currentIndex++;
            var img = new Image();
            img.src = savehistory[currentIndex];
            img.onload = function () {
                contextReal.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
                contextReal.drawImage(img, 0, 0, canvasDraft.width, canvasDraft.height);
            };
            console.log('You can redo!');
        } else {
            console.log("You can't redo!");
            console.log(currentIndex);
        }
    }

    undo(link, canvas) {
        if (currentIndex > 0) {
            currentIndex--;
            var img = new Image();
            img.src = savehistory[currentIndex];
            img.onload = function () {
                contextReal.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
                contextReal.drawImage(img, 0, 0, canvasDraft.width, canvasDraft.height);
            };
            console.log('You can undo!');
        }
        else {
            console.log("You can't undo!");
            console.log(currentIndex);
        }
    }
}