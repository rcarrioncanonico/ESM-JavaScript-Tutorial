import Boot from "../scenes/boot.js";
import Button from "./button.js";

export default class GameUI {
    constructor({ scene, symbolSet = "p", symbolOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9], debug = false }) {
        this.scene = scene;
        this.symbolSet = symbolSet;
        this.symbolOrder = symbolOrder
        this.debug = debug;

        // Setup the stimulus box and symbol key image, attatch to scene
        this.scene.stimulusBox = this.scene.add.image(Boot.canvasCenterX, 0.15 * Boot.canvasHeight, "guiAtlas", "stimulus_box");
        this.scene.paper = this.scene.add.image(Boot.canvasCenterX, Boot.canvasHeight, "guiAtlas", "paper").setOrigin(0.5,1);
        this.scene.buttons = this.scene.add.container();
        this.grid = this.scene.add.image(0, 0, "guiAtlas", "grid");

        // Setup other objects, attatch to gameUI
        this.symbols = [];
        this.numbers = [];

        // y for the grid of symbols and numbers, relative to grid
        // The position numbers are a bit hardcoded, but the gridContainer in which the grid, numbers and symbols are placed can be 
        // changed dynamically. The x and y coordinates of these assets are relative to the gridContainer. 
        const gridY = this.grid.displayHeight * 0.25;
        const gridX = [];
        // scale the numbers and symbols
        const size = this.grid.displayWidth * 0.08;

        for (let i = 1; i <= 9; i++) {
            // Change the x for the symbols and numbers for each position, starting most left of grid and ending most right. 
            const x = (this.grid.displayWidth * -0.55) + (this.grid.displayWidth / 9.1) * i;
            gridX.push(x);
            // setup the numpad buttons and add to container
            this.scene.buttons.add(new Button(this.scene, 0, 0, "guiAtlas", "key_up", "key_down", `${i}`, 0.6, Boot.darkColor, false));
            this.numbers.push(this.scene.add.text(x, - gridY, `${i}`, { fontFamily: "header", fontSize: size, color: Boot.darkColor}).setOrigin(0.5));

            if (i === 9) {
                // sort the symbols array according to specific sort order, copy the oridingal gridX
                const newGridX = this.symbolOrder.map((index) => gridX[index - 1]);
                if (this.debug) console.log("__SYMBOLS__");
                for (let i = 1; i <= 9; i++) {
                    // Setup symbols and add to array
                    this.symbols.push(this.scene.add.image(newGridX[i - 1], gridY,"symbolAtlas",`${symbolSet}0` + `${i}`));
                    // add the numbers and symbols
                    this.symbols[i - 1].setScale(size / this.symbols[i - 1].width);
                    if (this.debug) console.log(`${this.symbols[i - 1].frame.name} | correct key: ${this.symbolOrder[i - 1]}`);
                }
            }
        }

        // Position all buttons in a grid of 3x3
        const cellWidth = Boot.canvasWidth / 4;

        Phaser.Actions.GridAlign(this.scene.buttons.getAll(), {
            width: 3,
            height: 3,
            cellWidth: cellWidth,
            cellHeight: cellWidth,
            x: Boot.canvasCenterX - cellWidth,
            y: Boot.canvasCenterY - cellWidth
        });

        this.scene.gridContainer = this.scene.add.container(Boot.canvasCenterX, 0.85 * Boot.canvasHeight);
        this.scene.gridContainer.add(this.grid).add(this.numbers).add(this.symbols);
    }

    show({trial = "run"}) {
        this.scene.cameras.main.setBackgroundColor("#4f4d4c");
        if (trial === "baseline") {
            this.scene.buttons.setVisible(true);
            this.scene.stimulusBox.setVisible(true);
            this.scene.gridContainer.setVisible(false);
            this.scene.paper.setVisible(false);
        } else if (trial === "run") {
            this.scene.buttons.setVisible(true);
            this.scene.stimulusBox.setVisible(true);
            this.scene.gridContainer.setVisible(true);
            this.scene.paper.setVisible(true);
        }
    }

    hide() {
        this.scene.cameras.main.setBackgroundColor(Boot.primaryColor);
        this.scene.buttons.setVisible(false);
        this.scene.stimulusBox.setVisible(false);
        this.scene.gridContainer.setVisible(false);
        this.scene.paper.setVisible(false);
    }

    recordResponse(activate = true) {
        if (activate) {
            console.log("recording responses | ON");
            for (let i = 0; i < this.scene.buttons.length; i++) {
                const button = this.scene.buttons.getAt(i);
                button.setActive(true);
                button.callback = () => {
                    console.log("button pressed:", button.labelText);
                    if (this.debug) console.log(this.scene.events);
                    this.scene.events.emit("playerResponse");
                }
            }
        } else if (!activate) {
            console.log("recording responses | OFF");
            for (let i = 0; i < this.scene.buttons.length; i++) {
                const button = this.scene.buttons.getAt(i);
                button.setActive(true);
            }
        };
    }
}