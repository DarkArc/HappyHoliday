var renderer = PIXI.autoDetectRenderer(256, 256, {antialias: true, transparent: true, resolution: 1});
renderer.autoResize = true;

window.onresize = () => {
  renderer.resize(window.innerWidth, window.innerHeight);
};

document.body.appendChild(renderer.view);

var stage = new PIXI.Container();

var render = () => {
  requestAnimationFrame(render);

  renderer.render(stage);
};

var resetSnowflake = (snowflake) => {
  snowflake.rotateLeft = Math.random() > .5;
  snowflake.counter = 20 * Math.random();

  snowflake.position.x = window.innerWidth * Math.random();
  snowflake.position.y = -200;

  var scaleModifier = .05 * Math.random();
  snowflake.scale.x = .025 + scaleModifier;
  snowflake.scale.y = .025 + scaleModifier;
};

var snowflakeLoop = () => {
  snowflakes.forEach((snowflake) => {
    snowflake.counter += .01;

    snowflake.position.x += Math.sin(snowflake.counter) * 2;
    snowflake.position.y += Math.cos(snowflake.counter) + 2;

    if (snowflake.rotateLeft) {
      snowflake.rotation += 0.01;
    } else {
      snowflake.rotation -= 0.01;
    }

    if (snowflake.position.y > window.innerHeight) {
      resetSnowflake(snowflake);
    }
  });

  setTimeout(() => {
    snowflakeLoop();
  }, 1000 / 60);
};

var snowflakes = [];

var addSnowflake = () => {
  var snowflake = new PIXI.Sprite(
    PIXI.loader.resources["sprite.png"].texture
  );

  resetSnowflake(snowflake);

  snowflakes.push(snowflake);

  stage.addChild(snowflake);
};

var begin = () => {
  const SNOWFLAKE_COUNT = 100;
  for (var i = 0; i < SNOWFLAKE_COUNT; ++i) {
    setTimeout(() => {
      addSnowflake();
    }, i * 110);
  }

  snowflakeLoop();

  renderer.resize(window.innerWidth, window.innerHeight);

  render();
};

PIXI.loader.add("sprite.png").load(begin);
