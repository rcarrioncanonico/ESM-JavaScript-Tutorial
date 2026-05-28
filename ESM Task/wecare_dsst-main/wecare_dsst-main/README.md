# Digit Symbol Substitution Test
Place all instructions about configuring and using the task here. 

# Digit Symbol Substitution Test (DSST)

This repository contains the DSST task built with Phaser.js. Below are the instructions for configuring and using the task, separated by domain. These variables are primarily found inside the `create()` methods of `src/scenes/practice.js` and `src/scenes/run.js`, and are handled by the `TrialHandler` class (`src/gameobjects/trialHandler.js`).

## 1. Timing Configuration

You can control various time-related parameters during the trials:

*   **`blockDuration`**: The total duration per block in seconds (e.g., `60` in `run.js`). If set to `0`, the block does not end by time; instead, the user's response advances the trials.
*   **`delayBeforeStart`**: Delay in milliseconds before starting a block of trials after the countdown ends (e.g., `500` ms).
*   **`stimulusDuration`**: The duration a single stimulus is shown on screen, in milliseconds. If set to `0`, the stimulus remains until the participant responds.
*   **`interStimulusInterval`**: The gap, or interval, in milliseconds between the end of one stimulus and the presentation of the next.

## 2. Trials and Blocks

These parameterize the breadth and flow of the experiment:

*   **`numTrials`**: Number of trials (stimuli presentations) per block. For instance, `9` in practice, `180` in the actual run.
*   **`numBlocks`**: Number of blocks to run.
*   **`randomize`**: A boolean flag (`true`/`false`) toggling pseudorandomization of the `stimuli` array.
*   **`randomType`**: Specifies the randomization method. Use `"shuffle"` for standard arrays (it performs a Fisher-Yates shuffle), and `"pick"` for two-choice or specific selection randomizations.

## 3. Stimuli and Appearance

The visual aspects of the targets can be configured here:

*   **`stimulusType`**: Specifies what kind of object the stimulus is. Can be configured to `"text"`, `"image"`, or `"sprite"`.
*   **`stimuli`**: An array containing the keys of the stimuli to show (e.g., `["p01", "p02", ...]`).
*   **`atlas`**: If `stimulusType` is `"image"`, this specifies the texture atlas to use (e.g., `"guiAtlas"` or `"symbolAtlas"`).
*   **`symbolSet` & `symbolOrder`**: In the `run.js` scene (`setStimuli()` method), the order of symbols and the symbol sets (`s01` - `s05`) to be used are dynamically calculated based on the *day of the week* and *hour of the day*. If you wish to change the cyclic nature of the stimulus sets, edit the `orderPerDay` and `setPerHour` properties in `run.js`.
*   **Positioning (`x`, `y`)**: Coordinates of the stimulus on the canvas. Usually dependent on screen canvas boundaries (e.g., `Boot.canvasCenterX`, `0.15 * Boot.canvasHeight`).

## 4. General Setup and Debugging

*   **Debug Mode (`debug`)**: If you set `debug: true` when instantiating `TrialHandler`, it logs responses, trial progression, and shown stimuli in the browser's developer console.
*   **Game Canvas & Orientation**: Setup can be found in `src/main.js`. 
    *   The app's main resolution is effectively `360x640` (scaled dynamically based on Device Pixel Ratio using `assetSize`).
    *   The game automatically listens for orientation changes and will pause with an alert prompt if rotated to landscape mode.
*   **Scene Order**: Defined in `src/main.js` under the `scene: []` property inside the Phaser config. By default, it follows `Boot -> Border -> DialogBox -> Start -> Baseline -> Practice -> Run`. 
