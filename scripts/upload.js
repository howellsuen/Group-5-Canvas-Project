var imageLoader = document.getElementById('upload'); // Get Upload Button
        imageLoader.addEventListener('change', handleImage, false); // Get Upload Button Change
        var canvas = document.getElementById('canvas-real'); // Get Canvas Real
        var ctx = canvas.getContext('2d'); // Get Context Real

        initCanvas();

        function handleImage(e) {
            var reader = new FileReader();
            reader.onload = function(event) {
                var img = new Image();
                img.onload = function() {
                    ctx.drawImage(img, canvas.width * 0.5 - img.width * 0.5, canvas.height * 0.5 - img.height * 0.5);
                }
                img.src = event.target.result;
            }
            reader.readAsDataURL(e.target.files[0]);
            console.log('e: ' + e);
        }
