import Boot from "./boot.js";
import Button from "../gameobjects/button.js";

export default class Start extends Phaser.Scene {
    constructor() {
        super({ key: "start" })
    }

    create() {
        console.log("Scene started:", this.scene.key);

        // Function to continue to the dialog box and then to baseline scene
        const showDialogBox = () => {
            this.scene.start("dialogbox", {
                textKey: "start_message", 
                buttonText: "uitleg", 
                sceneKey: "baseline"
            });
        }

        // Display START assets, continue to dialog box when button pressed
        this.title = this.add.image(Boot.canvasCenterX, 0.15 * Boot.canvasHeight, "guiAtlas", "title");
        this.startImage = this.add.image(Boot.canvasCenterX, Boot.canvasCenterY, "guiAtlas", "start_image");
        this.startButton = new Button(this, Boot.canvasCenterX, 0.85 * Boot.canvasHeight, 
            "guiAtlas", "button_up", "button_down", "start", 0.4, this.lightColor, true, 
            showDialogBox
        );
    }
}