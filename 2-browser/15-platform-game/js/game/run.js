const trackKeys = require('../draw/trackKeys');
const pressed = trackKeys();

const Level = require('./level');
const constants = require('../data/constants');

function runAnimation(frameFunc) {
  let lastTime = null;
  function frame(time) {
    let stop = false;
    if (lastTime != null) {
      let timeStep = Math.min(time - lastTime, 100) / 1000;
      stop = frameFunc(timeStep) === false;
    }
    lastTime = time;
    if (!stop)
      requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function runLevel(level, display, andThen) {
  display.setLevel(level);

  let pause = false;

  const step = function(step) {
    level.animate(step, pressed);
    display.drawFrame(step);
    if (pause) return false;
    if (level.isFinished()) {
      display.clear();
      if (andThen)
        andThen(level.status);
      return false;
    }
  }

  addEventListener('keydown', e => {
    if (e.keyCode == 27) {
      pause = !pause;

      if (!pause) runAnimation(step);
    }
  })

  runAnimation(step);
}

function runGame(plans, Display) {
  let lives = constants.player.startLivesCount;
  let display = new Display(document.body);
  display.showLives(lives);
  trackKeys.listen();

  function startLevel(n) {
    display.showLevel(n);
    display.showLives(lives);
    runLevel(new Level(plans[n]), display, function(status) {
      if (status == constants.statuses.lost) {
        lives--;
        if (lives == 0) {
          console.log("You lose!");
          lives = constants.player.startLivesCount;
          startLevel(0);
          return;
        } 
        startLevel(n);
      } else if (n < plans.length - 1)
        startLevel(n + 1);
      else
        console.log("You win!");
        trackKeys.stop();
    });
  }
  startLevel(0);
}

module.exports = runGame;