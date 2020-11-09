import {animations} from './spritesheets.js';

export function fireMax(material) {
    var imageObjMax = new Image();

    imageObjMax.onload = function () {
        var blob = new Konva.Sprite({
            x: 568,
            y: 290,
            image: imageObjMax,
            animation: 'firelongMax',
            animations: animations,
            frameRate: 7,
            frameIndex: 0,

        });
        stage.add(spritelayer)
        // add the shape to the layer
        spritelayer.add(blob);

        // add the layer to the stage



        // start sprite animation
        blob.start();

        // zastopowanie spritea

        function stopFire() {
        //tu jakiś conditional żeby wyeliminować za wczesne wygaszenie
            blob.stop();
            blob.opacity(0);
            spritelayer.remove();
            stage.add(tempLayer);
            openedtempLayer.remove();
            stage.add(layer);
        }

        setTimeout(function () {
            stopFire();
            if (cdDone && psDone && peDone && ppDone && pvcDone && petDone) {
                finalSceneCall();
            }

        }, 3000);

    }
    imageObjMax.src = 'assets/'+material+'spritesheet.png';
}