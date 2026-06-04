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
            if (urlParams.get("skipp")) { // Check if skip practice is provided in the url, else run with practice rounds
                this.scene.start("dialogbox", {
                    textKey: "run_message",
                    buttonText: "start",
                    sceneKey: "run"
                });
            } else {
                this.scene.start("dialogbox", {
                    textKey: "start_message", 
                    buttonText: this.cache.json.get("text")["next_button"], 
                    sceneKey: "baseline"
                });
            }
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