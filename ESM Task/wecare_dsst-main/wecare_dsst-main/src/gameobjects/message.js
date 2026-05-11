import Boot from "../scenes/boot.js";
import Button from "./button.js";

export default class Message {
    constructor({ scene, textKey, buttonText, callback}) {
        this.scene = scene;
        this.textKey = textKey;
        this.buttonText = buttonText;
        this.callback = callback;
    } 

    show({ message = true, button = true }) {
        this.scene.cameras.main.fadeOut(500, 0, 0, 0);
        
        this.scene.cameras.main.once("camerafadeoutcomplete", () => {
            if (button) {
                // Add button
                this.messageButton = new Button(this.scene, Boot.canvasCenterX, 0.85 * Boot.canvasHeight, 
                    "guiAtlas", "button_up", "button_down", this.buttonText, 0.4, this.lightColor, true, 
                    this.callback
                );
            }; 
            
            if (message) {
                // Add message and textbox
                this.scene.textBox = Boot.addImage(this.scene, Boot.canvasCenterX, 0.4 * Boot.canvasHeight, "guiAtlas", "text_box");
                const getText = this.scene.cache.json.get("text", this.textKey);
                const content = getText[this.textKey];
                this.text = this.scene.add.text(this.scene.textBox.getTopCenter().x, this.scene.textBox.getTopCenter().y, content, {
                    fontFamily: "body",
                    fontSize: Boot.bodyFontSize,
                    color: Boot.darkColor,
                    wordWrap: { width: 0.85 * this.scene.textBox.displayWidth },
                    align: "left"
                }).setOrigin(0.5, -0.1);
            };
            this.scene.cameras.main.fadeIn(500, 0, 0, 0);
        });
    }
}