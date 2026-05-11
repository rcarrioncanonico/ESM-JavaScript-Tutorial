import GameUI from "../gameobjects/gameUI.js";
import GameInstructions from "../gameobjects/gameInstructions.js";
import Countdown from "../gameobjects/countdown.js";
import Boot from "./boot.js";
import TrialHandler from "../gameobjects/trialHandler.js";

export default class Baseline extends Phaser.Scene {
    constructor() {
        super({ key: "baseline" })
    }
    
    create () {
        console.log("Scene started:", this.scene.key);
        
        //==============================//
        //==== PARAMETERS FOR TRIAL ====//
        this.trialType = "baseline";
        this.instructionText = "baseline_instruction";
        this.numTrials = 9;
        this.numBlocks = 1;
        this.stimuli = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
        this.delayBeforeStart = 500; // Wait 500 ms and before starting trials
        //==============================//
        //==============================//

        //==== SETUP TRIAL ====//
        this.trial = new TrialHandler({ 
            scene: this, 
            numTrials: this.numTrials, 
            numBlocks: this.numBlocks, 
            stimuli: this.stimuli, 
            stimulusType: "text",
            x: Boot.canvasCenterX, 
            y:  0.15 * Boot.canvasHeight,
            debug: false 
        });

        //==== OBJECTS TO INCLUDE ====//
        this.gameUI = new GameUI({ scene: this });
        this.countdown = new Countdown({ scene: this, duration: 3, animate: false });
        this.gameInstructions = new GameInstructions({ scene: this, textKey: this.instructionText });
        
        //==== SCENE FLOW ====//
        this.configInstructions();
        this.gameUI.show({ trial: this.trialType });
        this.gameInstructions.show(this.instructionSteps);
        this.gameInstructions.event.once("complete", () => {
            this.gameUI.hide();
            this.countdown.run();
        });

        this.countdown.event.once("complete", () => {
            this.gameUI.show({ trial: this.trialType });
            this.gameUI.recordResponse(true);
            this.time.addEvent({
                delay: this.delayBeforeStart, 
                callback: () => {
                    this.trial.runBlocks();
                }
            });
        });

        this.trial.event.once("complete", () => {
            this.scene.start("dialogbox", {
                textKey: "practice_message",
                buttonText: "uitleg",
                sceneKey: "practice"
            });
        });
    }

    configInstructions() {
        const responseIndex = Math.floor(Math.random() * 9 + 1);

        this.instructionStimulus = this.add.text(Boot.canvasCenterX, 0.15 * Boot.canvasHeight , responseIndex.toString(), this.trial.textConfig).setOrigin(0.5);
        this.instructionStimulus.setAlpha(0);

        // TODO: getal laten staan
        this.instructionSteps = [
            {
                textIndex: 0,
                textPosition: { x: Boot.canvasCenterX, y: Boot.canvasHeight * 0.27 },
                textDuration: 1500,
                appearWithText: [this.stimulusBox, this.instructionStimulus],
                target: this.instructionStimulus,
                targetAlpha: { from: 0, to: 1 },
                onTargetComplete: () => {
                    this.stimulusBox.setToBack();
                }
            },
            {
                textIndex: 1,
                textPosition: { x: Boot.canvasCenterX, y: Boot.canvasHeight * 0.27 },
                textDuration: 1500,
                appearWithText: [this.buttons],
                target: this.buttons.getAt(responseIndex - 1),
                targetAlpha: { start: 1 },
                targetDuration: 1000,
                onTargetStart: () => {
                    this.buttons.getAt(responseIndex - 1).first.setTint(0xD4AA55);
                },
                onTargetComplete: () => {
                    this.buttons.getAt(responseIndex - 1).first.clearTint();
                    this.instructionStimulus.destroy();
                }
            }
        ];
    }
}