import scaleSize from "../main.js";

export default class Boot extends Phaser.Scene {
    constructor() {
        super({ key: "boot"})
    }

    //==== STATICS USED IN OTHER SCENES ====//
    // Allocate variables for display information for x and y positions
    static canvasWidth;
    static canvasHeight;
    static canvasCenterX;
    static canvasCenterY;
    static assetSize = scaleSize();

    // Read variables from CSS and import into js to use e.g. colors, font sizes etc. 
    static getStyle(variable) {
        return getComputedStyle(document.documentElement).getPropertyValue(variable);
    }

    static addImage(scene, x, y, atlas = "", frame) {
        //return scene.add.image(x, y, atlas, frame).setScale(1 / this.assetSize);
        return scene.add.image(x, y, atlas, frame);
    }

    // Get styles from the CSS file
    static headerFontSize = parseInt(this.getStyle("--header-font-size")) * this.assetSize;
    static bodyFontSize = parseInt(this.getStyle("--body-font-size")) * this.assetSize;
    static lightColor = this.getStyle("--text-light-color");
    static darkColor = this.getStyle("--text-dark-color");
    static primaryColor = this.getStyle("--primary-color");
    static secondaryColor = this.getStyle("--secondary-color");

    //==== LOAD ASSESTS ====//
    preload() {
        // Set display size from game config
        this.constructor.canvasWidth = this.sys.game.config.width;
        this.constructor.canvasHeight = this.sys.game.config.height;
        this.constructor.canvasCenterX = this.constructor.canvasWidth * 0.5;
        this.constructor.canvasCenterY = this.constructor.canvasHeight * 0.5;
        
        // Load correct assets according to device pixel ratio 
        // TEXTURES
        this.load.atlas("guiAtlas",
            `assets/textures/atlas_gui_${this.constructor.assetSize}x.png`, 
            `assets/textures/atlas_gui_${this.constructor.assetSize}x.json`
        );
        this.load.atlas("symbolAtlas",
            `assets/textures/atlas_symbols_${this.constructor.assetSize}x.png`, 
            `assets/textures/atlas_symbols_${this.constructor.assetSize}x.json`
        );
 
        // TEXT in NED or ENG
        // TODO: change button labels to read from json file as well
        this.load.json("text", "assets/text/NED_text.json");

        // Show info in console
        this.deviceInfo();
        this.assetProgress();
    }

    //==== START NEW SCENE ====//
    create() {
        // Once all is loaded at setup, exit bootloader and start next scene;
        this.scene.start("start");
    }

    //==== DISPLAY INFO ====//
    deviceInfo() {
        console.log("__DEVICE INFO__");
        console.log("| Orientation:", screen.orientation.type);
        console.log("| Pixel ratio:", window.devicePixelRatio);
        console.log("| Browser and OS:", navigator.userAgent);
        console.log("| Language:", navigator.language);
        console.log("| Online:", navigator.onLine);
    }

    //==== PROGRESS BAR ====//
    assetProgress() {
        console.log("__LOADING ASSETS__")
        
        const me = this.constructor;
        // Progress bar visual on screen        
        if (me.canvasCenterY > me.canvasCenterX) {
            this.boxWidth = me.canvasCenterX * 0.8;
            this.boxHeight = me.canvasCenterX * 0.12;
        } else {
            this.boxWidth = me.canvasCenterY * 0.8
            this.boxHeight = me.canvasCenterY * 0.12;
        }

        const barWidth = this.boxWidth * 0.9;
        const barHeight = this.boxHeight * 0.5;
        const secondaryColor = Phaser.Display.Color.HexStringToColor(me.secondaryColor)._color;
        const lightColor = Phaser.Display.Color.HexStringToColor(me.lightColor)._color;

        this.progressBox = this.add.rectangle(me.canvasCenterX, me.canvasCenterY, this.boxWidth, this.boxHeight, secondaryColor);
        this.progressBar = this.add.rectangle(me.canvasCenterX, me.canvasCenterY, barWidth, barHeight, lightColor);
        this.progressBox.setRounded(20 * me.assetSize);
        this.progressBar.setRounded(2 * me.assetSize);

        this.add.text(me.canvasCenterX, me.canvasCenterY * 0.88, "Laden...", {
            fontFamily: "header",
            fontSize: me.headerFontSize,
            color: me.lightColor
        }).setOrigin(0.5);

        this.load.on("progress", (value) => {
            console.log("| progress:", value * 100, "%");
            this.progressBar.setSize(barWidth * value, barHeight);
        });
        this.load.on("fileprogress", (file) => {
            console.log("|   > src:", file.src);
        });
        this.load.on("complete", () => {
            console.log("|__loading complete!__");
        });
    }
}