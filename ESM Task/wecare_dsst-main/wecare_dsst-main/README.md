# Digit Symbol Substitution Test
Place all instructions about configuring and using the task here. 

# Digit Symbol Substitution Test (DSST)

This repository contains the DSST task built with Phaser.js. Below are the instructions for configuring and using the task, separated by domain. These variables are primarily found inside the `create()` methods of `src/scenes/practice.js` and `src/scenes/run.js`, and are handled by the `TrialHandler` class (`src/gameobjects/trialHandler.js`).

## Editing workflow (local development)

- Recommended preview: use the Live Server extension (VS Code). Open the project and use "Open with Live Server" on index.html — no manual server required.
- Alternative static server (optional): from the repository root run `python -m http.server 8000` and open `http://localhost:8000/index.html`.
- Where to edit:
  - Entry: `src/main.js`
  - Scenes: `src/scenes/` (e.g., `practice.js`, `run.js`)
  - Trial logic: `src/gameobjects/trialHandler.js`
  - Libraries bundled in: `src/libs/`
  - Static assets: `assets/` and `index.html`
- Workflow: edit files in `src/` or `assets/`, save, then refresh the browser. Use browser DevTools (Console) to view logs and errors.
- Debugging: enable `debug: true` when instantiating `TrialHandler` to log responses, progression and stimuli to the console.
- Build / tooling: there is no package.json or build step in this repo — Phaser and jsPsych are included as static files in `src/libs/`.
- Testing: there are no automated tests included; verify changes manually by exercising Practice and Run scenes and checking the console for errors.
- Committing: follow repository git conventions. If you add external dependencies or a build system, add clear instructions here.

## Project structure

```
.
├─ index.html
├─ assets/
│  ├─ css/
│  ├─ fonts/
│  ├─ images/
│  ├─ text/        (e.g., NED_text.json)
│  └─ textures/
└─ src/
   ├─ main.js
   ├─ scenes/
   ├─ gameobjects/
   └─ libs/
```

## Configuration map

| What to change | Where to edit |
| --- | --- |
| Trial counts, timing, and randomization | `src/scenes/baseline.js`, `src/scenes/practice.js`, `src/scenes/run.js` (top of `create()` methods) |
| Stimulus set and order by day/hour | `src/scenes/run.js` → `setStimuli()` (`orderPerDay`, `setPerHour`) |
| Stimulus type, atlas, and positions | TrialHandler params in `practice.js` / `run.js` plus layout in `src/gameobjects/gameUI.js` |
| Instruction text content | `assets/text/NED_text.json` (keys like `baseline_instruction`, `practice_instruction`, `run_message`) |
| Instruction flow/animations | `configInstructions()` in `baseline.js` / `practice.js`, implemented by `src/gameobjects/gameInstructions.js` |
| Canvas size, scaling, scene order | `src/main.js` (Phaser config + scene list) and `src/scenes/boot.js` (asset scale + CSS variables) |

## Data / output

This project does not persist task responses by default. Button presses only emit the `playerResponse` event (`src/gameobjects/gameUI.js`) and debug logging goes to the browser console when `debug: true`. A Pavlovia/jsPsych upload stub exists in `src/gameobjects/sendData.js`, but it is not wired into any scene. If you need stored/exported data, add your own response collection and call that helper (or integrate jsPsych) at the end of a block or scene.


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

## 5. Changing Symbols
to change the symbols or add a new symbol set, they will need to work with sprite atlases, which are single image files that contain all the symbols alongside a JSON file that maps out each symbol's exact coordinates. These atlases are stored in the  folder in three different resolutions (1x, 2x, and 3x).
assets/textures/
  To do so:
  - Create the images: Design 9 new symbols and export them as individual PNG files

  - Pack the atlas: Use a free tool such as TexturePacker or ShoeBox to pack these individual PNGs into a single atlas image and generate the corresponding JSON descriptor. Ensure the frames are named consistently, such as  through .
  s0601s0609

  - Save the files: Save the new atlas image and JSON files in the assets/textures/ folder. While the project expects three resolutions (1x, 2x, 3x), you can use the same file for all three during the development phase.

  - Load the assets: Open src/scenes/boot.js and load the new atlas using the command this.load.atlas("newAtlas", "path/to/image.png", "path/to/atlas.json"), or alternatively, add your new frames into the existing atlas files.

  - Activate the symbols in the game: Open src/scenes/run.js and add a new entry in the `setPerHour` table so the set is assigned to a specific time window. For example, to use the new symbols from 12 PM to 1 PM, you could add:
  ```
  setPerHour[12] = "s06"; // Assign the new symbol set to the 12 PM hour
  ```
