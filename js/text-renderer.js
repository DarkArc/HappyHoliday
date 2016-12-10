(function() {
  var renderer = PIXI.autoDetectRenderer(256, 256, {antialias: true, transparent: true, resolution: 1});
  renderer.autoResize = true;


  document.getElementById('text-renderer').appendChild(renderer.view);

  var stage = new PIXI.Container();

  var targetString = "Merry Christmas!\n\nWishing you a happy holiday,\n\nWyatt";
  var fontSize = 50;
  var lineHeight = 50 * 1.3;
  var basicText = new PIXI.Text('', {dropShadow: true, dropShadowBlur: 1, dropShadowDistance: 1, fontFamily: 'Arizonia', fill: 'white', fontSize: fontSize, lineHeight: lineHeight, wordWrap: true});

  var updateDrawingArea = () => {
    var pageUnit = window.innerWidth / 8;

    basicText.style.wordWrapWidth = pageUnit * 6
    basicText.x = pageUnit * 1;
    basicText.y = 90;
  };
  updateDrawingArea();

  window.addEventListener("resize", function() {
    renderer.resize(window.innerWidth, window.innerHeight);

    updateDrawingArea();
  });

  stage.addChild(basicText);

  var counter = 0;
  var textWritingLoop = () => {
    basicText.text = basicText.text + targetString[counter];

    if (++counter < targetString.length) {
      setTimeout(() => {
        textWritingLoop();
      }, 1000 / 60);
    }
  };

  var render = () => {
    requestAnimationFrame(render);

    renderer.render(stage);
  }

  var begin = () => {
    textWritingLoop();

    renderer.resize(window.innerWidth, window.innerHeight);

    render();
  };

  begin();
})();
