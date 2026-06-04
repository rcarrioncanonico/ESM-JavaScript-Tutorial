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
        if (LANG === "nl") {
            this.load.json("text", "assets/text/NED_text.json");
        } else if (LANG === "en") {
            this.load.json("text", "assets/text/ENG_text.json");
        }
        
        // Show progress bar
        this.assetProgress();
    }

    //==== START NEW SCENE ====//
    create() {
        // Show inf about device in console and add to data file
        this.deviceInfo();

        // Once all is loaded at setup, exit bootloader and start next scene;
        this.scene.start("start");
    }

    //==== DISPLAY INFO ====//
    deviceInfo() {
        // Get measured frame rate
        const fps = this.game.loop.actualFps;

        // Set device and experiment info and add to jsPsych.data as meta properties
        const info = { 
            "sys.orientation": screen.orientation.type,
            "sys.pixel_ratio": window.devicePixelRatio,
            "sys.browser_os": navigator.platform,
            "sys.language": navigator.language,
            "sys.fps": fps,
            "module.jsPsych.version": jsPsych.version(),
            "module.Phaser.version": Phaser.VERSION,
            "participant_id": PARTICIPANT_ID,
            "session.beepnum": BEEPNUM,
            "session.testday": TESTDAY
        }

        // Show data on console and save as jsPsych meta data property
        console.log("__ DEVICE INFO __");
        Object.entries(info).forEach(elm => console.log("| ", `${elm[0]}:`, elm[1]));
        console.log("|____");

        console.log("__ TIMING __");
        console.log("| setTimeout, 'Date.now()':", this.game.loop.raf.isSetTimeOut); // Check if higprecision timing is used
        console.log("| High precision timing, 'performance.now()':", this.game.loop.raf.isRunning,"\n|____");

        jsPsych.data.addProperties(info); // Add all meta data to all trial rows in data file
    }

    //==== PROGRESS BAR ====//
    assetProgress() {
        console.log("__ LOADING ASSETS __")
        
        // Just a quicker way to access the static variables from Bootloader
        const me = this.constructor;
        // Progress bar visual on screen, change with width and height change        
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
        this.progressBar = this.add.rectangle(me.canvasCenterX - 0.5 * barWidth, me.canvasCenterY, barWidth, barHeight, lightColor);
        this.progressBox.setRounded(20 * me.assetSize);
        this.progressBar.setRounded(2 * me.assetSize).setOrigin(0,0.5);

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
            console.log("|__ loading complete! __");
        });
    }
}