        import Konva from 'konva';
        import {sources} from './sources.js'
        import {animations} from './spritesheets.js'

        var stageWidth = 1240;
        var stageHeight = 720;

        // pisanie komunikatów tekstowych
        function writeMessage(message) {
            text.text(message);
            layer.draw();
        }

        // ładowanie assetów
        function loadImages(sources, callback) {
            var images = {};
            var loadedImages = 0;
            var numImages = 0;
            for (var src in sources) {
                numImages++;
            }
            for (var src in sources) {
                images[src] = new Image();
                images[src].onload = function () {
                    if (++loadedImages >= numImages) {
                        callback(images);
                    }
                };
                images[src].src = sources[src];
            }
        }

        // określenie jak blisko docelowego punktu, obiekt wg. programu znajdue się na "nad" tym punktem
        function isNearOutline(object) {
            var a = object;
            //var o = outline;
            var ax = a.x();
            var ay = a.y();

            //ax porównywane do celu 'drag'
            if (ax > 520 - 180 && ax < 520 + 180 && ay > 380 - 180 && ay < 380 + 180) {
                return true;
            } else {
                return false;
            }
        }

        // odpowiada za budowę sceny i umieszczenie wszystkich obiektów na niej oraz określa właściwości obiektów
        function buildStage(images) {
            // tworzenie tła


            var backgroundImage = new Konva.Image({
                image: images.backImg,
                x: 1,
                y: 1
            })

            // tworzenie finałowego tła
            var finalbackground = new Konva.Image({
                image: images.finalBackImage,
                x: 1,
                y: 1
            })

            // tworzenie sprite'a-ogień==========================
            var imageObj = new Image();
            imageObj.onload = function () {
                var blob = new Konva.Sprite({
                    x: 568,
                    y: 292,
                    image: imageObj,
                    animation: 'idle',
                    animations: animations,
                    frameRate: 7,
                    frameIndex: 0,
                });

                // add the shape to the layer
                backgroundlayer.add(blob);

                // add the layer to the stage


                // start sprite animation
                blob.start();
            }
            imageObj.src = 'assets/ogien.png';

            //===============sprite ogień max funkcja
            function fireMax(material) {
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


            //======================== funkcja fireGif
            function fireGif(material) {

                var canvas = document.createElement('canvas');
                // use external library to parse and draw gif animation
                function onDrawFrame(ctx, frame) {
                    // update canvas size
                    canvas.width = frame.width;
                    canvas.height = frame.height;
                    // update canvas that we are using for Konva.Image
                    ctx.drawImage(frame.buffer, 0, 0);
                    // redraw the layer
                    spritelayer.draw();

                }

                gifler('/assets/' + material + '.gif').frames(canvas, onDrawFrame);

                // draw resulted canvas into the stage as Konva.Image
                var image = new Konva.Image({
                    image: canvas,
                    x: 566,
                    y: 289,
                    //scaleX: 1.1,
                    scaleY: 1.1,
                });
                spritelayer.add(image);
                setTimeout(function () {
                    image.remove();
                    //spritelayer.remove();
                    stage.add(tempLayer);
                    openedtempLayer.remove();
                    stage.add(layer);



                    if (cdDone && psDone && peDone && ppDone && pvcDone && petDone) {
                        finalSceneCall();
                    }

                }, 3000);
            }
            //=================wywołanie startowej sceny
            var isBegining = true;
            function startSceneCall() {
                stage.add(startLayer);
                isBegining = false;
            }
            //================================================================================

            //=================wywołanie finałowej sceny
            var finalFirstTime = true;
            function finalSceneCall() {

                stage.add(finalLayer);

                // sprite - dym
                var imageObjDym = new Image();
                imageObjDym.onload = function () {
                    var blob = new Konva.Sprite({
                        x: 1,
                        y: 1,
                        image: imageObjDym,
                        animation: 'dym3',
                        animations: animations,
                        frameRate: 7,
                        frameIndex: 0,
                    });

                    if (finalFirstTime) {
                        finalFirstTime = false;
                        // add the shape to the layer
                        finalLayer.add(blob);
                        // start sprite animation                        
                    }


                    blob.start();

                    setTimeout(function () {
                        blob.stop();
                        blob.remove();
                        //dymBialy()
                    }, 25740)

                }
                imageObjDym.src = 'assets/dym_spritesheet.png';

            }
            //==============================================================================
            //===============dym biały docelowo=====================
            var bialyDymfirst = true;
            function dymBialy() {
                stage.add(finalLayer);
                // sprite - dym
                var imageObjDymB = new Image();
                imageObjDymB.onload = function () {
                    var blob = new Konva.Sprite({
                        x: 1,
                        y: 1,
                        image: imageObjDymB,
                        animation: 'dym',
                        animations: animations,
                        frameRate: 3,
                        frameIndex: 0,
                    });

                    if (bialyDymfirst) {
                        bialyDymfirst = false;
                        // add the shape to the layer
                        finalLayer.add(blob);

                        // add the layer to the stage


                        // start sprite animation
                        blob.start();
                    }

                }
                imageObjDymB.src = 'assets/dym_szary.png';
            }
            //=======================================================

            // tworzenie obiektów sceny
            var komora = new Konva.Image({
                image: images.komora,
                x: 562,
                y: 286,
                opacity: 1,
                scaleX: 1.1,
                scaleY: 1.1,
            });

            var cd = new Konva.Image({
                image: images.cd,
                x: 1095,
                y: 570,

            });
            var cdvisible = true;

            var ps = new Konva.Image({
                image: images.ps,
                x: 990,
                y: 575,
            });
            var psvisible = true;

            var pe = new Konva.Image({
                image: images.pe,
                x: 809,
                y: 575,
            });
            var pevisible = true;

            var pp = new Konva.Image({
                image: images.pp,
                x: 405,
                y: 575,
                scaleX: 0.7,
                scaleY: 0.7
            });
            var ppvisible = true;

            var pvc = new Konva.Image({
                image: images.pvc,
                x: 219,
                y: 610,
            });
            var pvcvisible = true;

            var pet = new Konva.Image({
                image: images.pet,
                x: 50,
                y: 575,
            });
            var petvisible = true;

            var doorClosed = new Konva.Image({
                image: images.doorClosed,
                x: 552,
                y: 283,
            });

            var doorOpened = new Konva.Image({
                image: images.doorOpened,
                x: 468,
                y: 283,
                opacity: 1
            });

            var pcpop = new Konva.Image({
                image: images.pcpop,
                x: 925,
                y: 405,
                // tu ewentualnie wygodniej operować layer.add
                opacity: 0,
            });

            var pspop = new Konva.Image({
                image: images.pspop,
                x: 720,
                y: 412,
                opacity: 0,
            });

            var pepop = new Konva.Image({
                image: images.pepop,
                x: 832,
                y: 406,
                opacity: 0
            });

            var pppop = new Konva.Image({
                image: images.pppop,
                x: 80,
                y: 341,
                opacity: 0
            })

            var pvcpop = new Konva.Image({
                image: images.pvcpop,
                x: 96,
                y: 405,
                opacity: 0
            })

            var petpop = new Konva.Image({
                image: images.petpop,
                x: 60,
                y: 403,
                opacity: 0,
            })

            var resetButtonEnd = new Konva.Image({
                image: images.resetButtonEndImage,
                x: 200,
                y: 300,
            })

            var startBackground = new Konva.Image({
                image: images.startBackImage,
                x: 1,
                y: 1,
            })

            var startButton = new Konva.Image({
                image: images.startButtonImage,
                x: 565,
                y: 300,
            })

            // eventy związane z poszczególnymi obiektami



            //cd===========================
            var cddraged = false;
            cd.on('mouseover', function () {
                if (cdvisible) {
                    cd.moveToTop();
                    console.log("warunek")
                }
                document.body.style.cursor = 'pointer';
                if (!cddraged) {
                    pcpop.opacity(1);
                }


                // próba zmknięcia na podniesioną rękę
                //stage.add(tempLayer);
                //openedtempLayer.remove();
                stage.add(layer);
                layer.draw();
            });

            cd.on('mouseout', function () {
                document.body.style.cursor = 'default';
                pcpop.opacity(0);
                layer.draw();
            });

            cd.on('dragstart', function () {
                pcpop.opacity(0);
                layer.draw();
                cddraged = true;
            })



            cd.on('dragend', function () {
                //var outline = monkey;


                if (isNearOutline(cd)) {

                    cd.position({
                        //x: komora.x(),
                        //y: komora.y(),
                        x: 600,
                        y: 310
                    });



                    //animal.inRightPlace = true;
                    cd.opacity(0);
                    cdvisible = false;
                    //doorOpened.opacity(1);
                    stage.add(openedtempLayer);
                    tempLayer.remove();
                    cdDone = true;
                    fireMax('CD')
                    //fireGif('pc-Animated');
                    //doorClosed.opacity(0);

                    cd.moveToBottom();
                    layer.draw();


                    // disable drag and drop
                    setTimeout(function () {
                        cd.draggable(false);
                    }, 50);
                }
            });
            //============================

            //ps===========================
            var psdraged = false;
            ps.on('mouseover', function () {
                if (psvisible) {
                    ps.moveToTop();
                }
                document.body.style.cursor = 'pointer';
                if (!psdraged) {
                    pspop.opacity(1);
                }


                // próba zmknięcia na podniesioną rękę
                //stage.add(tempLayer);
                //openedtempLayer.remove();
                stage.add(layer);
                layer.draw();
            });

            ps.on('mouseout', function () {
                document.body.style.cursor = 'default';
                pspop.opacity(0);
                layer.draw();
            });

            ps.on('dragstart', function () {
                pspop.opacity(0);
                layer.draw();
                psdraged = true;
            })

            ps.on('dragend', function () {
                //var outline = monkey;


                if (isNearOutline(ps)) {

                    ps.position({
                        //x: komora.x(),
                        //y: komora.y(),
                        x: 600,
                        y: 310
                    });


                    //animal.inRightPlace = true;
                    ps.opacity(0);
                    psvisible = false;
                    stage.add(openedtempLayer);
                    tempLayer.remove();
                    psDone = true;
                    fireMax('PS');
                    //fireGif('ps-Animated');
                    ps.moveToBottom()
                    layer.draw();

                    // disable drag and drop
                    setTimeout(function () {
                        ps.draggable(false);
                    }, 50);
                }
            });
            //============================

            //pe===========================
            var pedraged = false;
            pe.on('mouseover', function () {
                if (pevisible) {
                    pe.moveToTop();
                }
                document.body.style.cursor = 'pointer';
                if (!pedraged) {
                    pepop.opacity(1);
                }

                //stage.add(tempLayer);
                //openedtempLayer.remove();
                stage.add(layer);
                layer.draw();
            });

            pe.on('mouseout', function () {
                document.body.style.cursor = 'default';
                pepop.opacity(0);
                layer.draw();
            });

            pe.on('dragstart', function () {
                pepop.opacity(0);
                layer.draw();
                pedraged = true;
            })

            pe.on('dragend', function () {
                //var outline = monkey;


                if (isNearOutline(pe)) {

                    pe.position({
                        //x: komora.x(),
                        //y: komora.y(),
                        x: 570,
                        y: 310
                    });


                    //animal.inRightPlace = true;
                    pe.opacity(0);
                    petvisible = false;
                    stage.add(openedtempLayer);
                    tempLayer.remove();
                    peDone = true;
                    fireMax('PE')
                    //fireGif('pe-Animated');
                    pe.moveToBottom()
                    layer.draw();

                    // disable drag and drop
                    setTimeout(function () {
                        pe.draggable(false);
                    }, 50);
                }
            });
            //============================

            //pp===========================
            var ppdraged = false;
            pp.on('mouseover', function () {
                if (ppvisible) {
                    pp.moveToTop();
                }
                document.body.style.cursor = 'pointer';
                if (!ppdraged) {
                    pppop.opacity(1);
                }


                //stage.add(tempLayer);
                //openedtempLayer.remove();
                stage.add(layer);
                layer.draw();
            });

            pp.on('mouseout', function () {
                document.body.style.cursor = 'default';
                pppop.opacity(0);
                layer.draw();
            });

            pp.on('dragstart', function () {
                pppop.opacity(0);
                layer.draw();
                ppdraged = true;
            })

            pp.on('dragend', function () {
                //var outline = monkey;


                if (isNearOutline(pp)) {

                    pp.position({
                        //x: komora.x(),
                        //y: komora.y(),
                        x: 620,
                        y: 310
                    });


                    //animal.inRightPlace = true;
                    pp.opacity(0);
                    ppvisible = false;
                    stage.add(openedtempLayer);
                    tempLayer.remove();
                    ppDone = true;
                    fireMax('PP');
                    //fireGif('pp-Animated');
                    pp.moveToBottom()
                    layer.draw();

                    // disable drag and drop
                    setTimeout(function () {
                        pp.draggable(false);
                    }, 50);
                }
            });
            //============================

            //pvc===========================
            var pvcdraged = false;
            pvc.on('mouseover', function () {
                if (pvcvisible) {
                    pvc.moveToTop();
                }
                document.body.style.cursor = 'pointer';
                if (!pvcdraged) {
                    pvcpop.opacity(1);
                }


                //stage.add(tempLayer);
                //openedtempLayer.remove();
                stage.add(layer);
                layer.draw();
            });

            pvc.on('mouseout', function () {
                document.body.style.cursor = 'default';
                pvcpop.opacity(0);
                layer.draw();
            });

            pvc.on('dragstart', function () {
                pvcpop.opacity(0);
                layer.draw();
                pvcdraged = true;
            })

            pvc.on('dragend', function () {
                //var outline = monkey;


                if (isNearOutline(pvc)) {

                    pvc.position({
                        //x: komora.x(),
                        //y: komora.y(),
                        x: 580,
                        y: 310
                    });


                    //animal.inRightPlace = true;
                    pvc.opacity(0);
                    pvcvisible = false;
                    stage.add(openedtempLayer);
                    tempLayer.remove();
                    pvcDone = true;
                    fireMax('PVC');
                    //fireGif('pvc-Animated');
                    pvc.moveToBottom()
                    layer.draw();

                    // disable drag and drop
                    setTimeout(function () {
                        pvc.draggable(false);
                    }, 50);
                }
            });
            //============================

            //pet===========================
            var petdraged = false;
            pet.on('mouseover', function () {
                if (petvisible) {
                    pet.moveToTop();
                }
                document.body.style.cursor = 'pointer';
                if (!petdraged) {
                    petpop.opacity(1);
                }


                //stage.add(tempLayer);
                //openedtempLayer.remove();
                stage.add(layer);
                layer.draw();
            });

            pet.on('mouseout', function () {
                document.body.style.cursor = 'default';
                petpop.opacity(0);
                layer.draw();
            });

            pet.on('dragstart', function () {
                petpop.opacity(0);
                layer.draw();
                petdraged = true;
            })

            pet.on('dragend', function () {
                //var outline = monkey;


                if (isNearOutline(pet)) {

                    pet.position({
                        //x: komora.x(),
                        //y: komora.y(),
                        x: 600,
                        y: 310
                    });


                    //animal.inRightPlace = true;
                    pet.opacity(0);
                    petvisible = false;
                    stage.add(openedtempLayer);
                    tempLayer.remove();
                    petDone = true;
                    fireMax('PET');
                    //fireGif('pet-Animated');
                    pet.moveToBottom()
                    layer.draw();

                    // disable drag and drop
                    setTimeout(function () {
                        pet.draggable(false);
                    }, 50);
                }
            });
            //============================


            //startButton event========================
            startButton.on('click', function (evt) {
                startLayer.remove();
            })
            startButton.on('mouseover', function () {
                document.body.style.cursor = 'pointer';
            });
            startButton.on('mouseout', function () {
                document.body.style.cursor = 'default';
            });
            //=========================================

            //resetButton event========================
            resetButtonEnd.on('mouseover', function () {
                document.body.style.cursor = 'pointer';
            });
            resetButtonEnd.on('mouseout', function () {
                document.body.style.cursor = 'default';
            });
            resetButtonEnd.on('click', function (evt) {

                finalLayer.remove();
                cd.opacity(1);
                cd.x(1095);
                cd.y(575);
                cd.draggable(true);
                cdDone = false;
                cddraged = false;
                ps.opacity(1);
                ps.x(990);
                ps.y(575);
                ps.draggable(true);
                pe.opacity(1);
                psDone = false;
                psdraged = false;
                pe.x(809);
                pe.y(575);
                pe.draggable(true);
                peDone = true;
                pedraged = false;
                pp.opacity(1);
                pp.x(405);
                pp.y(575);
                pp.draggable(true);
                ppDone = false;
                ppdraged = false;
                pvc.opacity(1);
                pvc.x(219);
                pvc.y(610);
                pvc.draggable(true);
                pvcDone = false
                pvcdraged = false;
                pet.opacity(1);
                pet.x(50);
                pet.y(575);
                pet.draggable(true);
                petDone = false;
                petdraged = false;
                layer.draw();
                finalFirstTime = true;




            });

            //=====================================
            // podpięcie obiektów do warst
            //komoralayer.add(komora);
            backgroundlayer.add(backgroundImage);
            finalLayer.add(finalbackground);
            finalLayer.add(resetButtonEnd);
            startLayer.add(startBackground);
            startLayer.add(startButton);
            //layer.add(komora);
            layer.add(cd);
            layer.add(ps);
            layer.add(pe);
            layer.add(pp);
            layer.add(pvc);
            layer.add(pet);
            tempLayer.add(doorClosed);
            openedtempLayer.add(doorOpened);
            layer.add(pcpop);
            layer.add(pspop);
            layer.add(pepop);
            layer.add(pppop);
            layer.add(pvcpop);
            layer.add(petpop);
            layer.add(text);

            // podpięcie warstw do sceny
            //stage.add(komoralayer)
            stage.add(spritelayer);
            stage.add(backgroundlayer);
            stage.add(layer);
            //stage.add(openedtempLayer);
            stage.add(tempLayer);


            cd.draggable(true);
            ps.draggable(true);
            pe.draggable(true);
            pp.draggable(true);
            pvc.draggable(true);
            pet.draggable(true);

            //monkey.draggable(true);

            if (isBegining) {
                startSceneCall();
            }
        }
        // utworzenie sceny, zdefiniowanie wymiarów sceny (canvas)
        var stage = new Konva.Stage({
            container: 'container',
            width: stageWidth,
            height: stageHeight,
        });

        // uwtworzenie warstw
        var komoralayer = new Konva.Layer();
        var layer = new Konva.Layer();
        var backgroundlayer = new Konva.Layer();
        var spritelayer = new Konva.Layer();
        var tempLayer = new Konva.Layer();
        var openedtempLayer = new Konva.Layer();
        var finalLayer = new Konva.Layer();
        var startLayer = new Konva.Layer();


        //zdefiniowanie parametrów textu
        var text = new Konva.Text({
            x: 10,
            y: 10,
            fontFamily: 'Calibri',
            fontSize: 24,
            text: '',
            fill: 'black',
        });

        

        // kontrola wykonania zadań obiektów
        var cdDone = false;
        var psDone = false;
        var peDone = false;
        var ppDone = false;
        var pvcDone = false;
        var petDone = false;

        

        loadImages(sources, buildStage);

        //==============skalowanie responsywne
        function fitStageIntoParentContainer() {
            var container = document.querySelector('#stage-parent');

            // now we need to fit stage into parent
            var containerWidth = container.offsetWidth;
            // to do this we need to scale the stage
            var scale = containerWidth / stageWidth;

            stage.width(stageWidth * scale);
            stage.height(stageHeight * scale);
            stage.scale({ x: scale, y: scale });
            stage.draw();
        }

        fitStageIntoParentContainer();
        // adapt the stage on any window resize
        window.addEventListener('resize', fitStageIntoParentContainer);
