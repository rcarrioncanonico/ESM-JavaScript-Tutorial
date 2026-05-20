import GameUI from "../gameobjects/gameUI.js";
import GameInstructions from "../gameobjects/gameInstructions.js";
import Countdown from "../gameobjects/countdown.js";
import Boot from "./boot.js";
import TrialHandler from "../gameobjects/trialHandler.js";

export default class Practice extends Phaser.Scene {
    constructor() {
        super({ key: "practice" })

    }

    create () {
        console.log("Scene started:", this.scene.key);
        
        //==============================//
        //==== PARAMETERS FOR TRIAL ====//
        this.trialType = "run";
        this.instructionText = "practice_instruction";
        this.numTrials = 9;
        this.numBlocks = 1;
        this.symbolSet = "p"
        this.stimuli = ["p01", "p02", "p03", "p04", "p05", "p06", "p07", "p08", "p09"];
        this.delayBeforeStart = 500; // Wait 500 ms and before starting trials
        //==============================//
        //==============================//

        //==== SETUP TRIAL ====//
        this.trial = new TrialHandler({ 
            scene: this, 
            numTrials: this.numTrials, 
            numBlocks: this.numBlocks,
            randomize: true,
            randomType: "shuffle", 
            stimuli: this.stimuli, 
            stimulusType: "image",
            atlas: "symbolAtlas",
            x: Boot.canvasCenterX, 
            y:  0.15 * Boot.canvasHeight,
            debug: true 
        });

        //==== OBJECTS TO INCLUDE ====//
        this.gameUI = new GameUI({ scene: this , symbolSet: this.symbolSet });
        this.countdown = new Countdown({ scene: this, duration: 3, animate: false });
        this.gameInstructions = new GameInstructions({ scene: this, textKey: this.instructionText});
        
        //==== SCENE FLOW ====//
        this.configInstructions();
        this.gameUI.show({trial: this.trialType});
        this.gameInstructions.show(this.instructionSteps);
        this.gameInstructions.event.once("complete", () => {
            this.gameUI.hide();
            this.countdown.run();
        });

        this.countdown.event.once("complete", () => {
            this.gameUI.show({trial: this.trialType});
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
                textKey: "run_message",
                buttonText: "start",
                sceneKey: "run"
            });
        });
    }

    configInstructions() {
        const responseIndex = Math.floor(Math.random() * 9);

        this.instructionStimulus = this.add.image(Boot.canvasCenterX, 0.15 * Boot.canvasHeight , "symbolAtlas", this.stimuli[responseIndex]).setOrigin(0.5);
        this.instructionStimulus.setAlpha(0);

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
                appearWithText: [this.paper, this.gridContainer],
                onTextComplete: () => {
                    this.gridContainer.setToBack();
                    this.paper.setToBack();
                }
            },
            {
                textIndex: 2,
                textPosition: { x: Boot.canvasCenterX, y: Boot.canvasHeight * 0.27 },
                textDuration: 1500,
                appearWithText: [this.buttons],
                target: this.buttons.getAt(responseIndex),
                targetAlpha: { start: 1 },
                targetDuration: 1000,
                onTargetStart: () => {
                    this.buttons.getAt(responseIndex).first.setTint(0xD4AA55);
                },
                onTargetComplete: () => {
                    this.buttons.getAt(responseIndex).first.clearTint();
                    this.instructionStimulus.destroy();
                }
            }
        ];
    }
}