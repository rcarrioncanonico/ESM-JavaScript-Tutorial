import Message from "../gameobjects/message.js";

export default class DialogBox extends Phaser.Scene {
    constructor() {
        super({ key: "dialogbox" })

    }

    init (config) {
        console.log("Dialogbox config:", config);

        // The dialog box will always transition to a new scene
        // This is based on the provided scene parameter
        this.textKey = config.textKey;
        this.buttonText = config.buttonText;
        this.sceneKey = config.sceneKey;
    }

    create() {
        // Setup button callback based on scene key parameter
        const callback = () => {
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once("camerafadeoutcomplete", () => {
                this.scene.start(this.sceneKey);
            });
        }
        
        // Setup message
        this.message = new Message({ 
            scene: this, 
            textKey: this.textKey, 
            buttonText: this.buttonText, 
            callback: callback 
        });

        this.message.show({ message: true, button: true });
    }
}