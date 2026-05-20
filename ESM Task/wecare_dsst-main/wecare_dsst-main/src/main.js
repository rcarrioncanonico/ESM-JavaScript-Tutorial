// Import scenes
import Boot from "./scenes/boot.js";
import Border from "./scenes/border.js";
import DialogBox from "./scenes/dialogbox.js";
import Baseline from "./scenes/baseline.js";
import Start from "./scenes/start.js";
import Practice from "./scenes/practice.js";
import Run from "./scenes/run.js";

/** 
* This is the main configuration file for the game.
*
* Note. the width and height parameter in config specify 
*       the CSS canvas size of the game within the div
*       the game has a fixed canvas width and height, 
*       which is fitted to the div automatically. 
*/

const assetSize = scaleSize();

const config = {
  type: Phaser.AUTO,
  width: 360 * assetSize,
  height: 640 * assetSize,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: "game-container"
  },
  autoRound: true,
  antialias: true,
  antialiasGL: true,
  backgroundColor: Boot.primaryColor,
  audio: {
    noAudio: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 350 },
      debug: false,
    },
  },
  inputTouch: true,
  inputTouchCapture: true,
  seed: [42],
  scene: [Boot, Border, DialogBox, Start, Baseline, Practice, Run],
};

const game = new Phaser.Game(config);

//==== ORIENTATION CHECK ====//
// Orientation check once at start
checkOrientation();
// Listen to any changes after start
window.addEventListener("resize", () => {
  // Run orientation check every time window fires resize event
    checkOrientation();
});

function checkOrientation() {
  // Get the currently running scene
  const scene = game.scene.getScenes();
    if (window.innerWidth > window.innerHeight) {
        // Pause the scene when window changes to landscape
        game.scene.pause(scene[0]);
        console.log("PAUSED | scene:", scene);
        // Resume once person clicks 'OK' or 'CANCEL'
        if (confirm("Please hold your phone in portrait mode.")) {
          game.scene.resume(scene[0]);
          console.log("RESUMED | scene:", scene);
        } else {
          game.scene.resume(scene[0]);
          console.log("RESUMED | scene:", scene);
        }
    } else {
      game.scene.resume(scene[0]);
    }
}

//==== SCALE ASSETS ====//
// Compute the scale size for different phones
export default function scaleSize() {
  const dpr = window.devicePixelRatio;
  let assetSize = 1;

  if (dpr >= 3) {
    assetSize = 3;            
  } else if (dpr >= 2 && dpr < 3) {
    assetSize = 2;
  };

  return assetSize;
}

// const openWindow = () => {
//     const newWindow = window.open();
//     if (newWindow) {
//         getUrlFromServer().then((targetUrl) => {
//             newWindow.location.href = targetUrl;
//         }).catch(() => {
//             newWindow.close();
//         });
//     }
// }

