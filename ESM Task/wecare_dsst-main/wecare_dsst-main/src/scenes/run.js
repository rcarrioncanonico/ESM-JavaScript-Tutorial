import GameUI from "../gameobjects/gameUI.js";
import Countdown from "../gameobjects/countdown.js";
import Boot from "./boot.js";
import TrialHandler from "../gameobjects/trialHandler.js";

export default class Run extends Phaser.Scene {
    constructor() {
        super({ key: "run" })

    }

    create () {
        console.log("Scene started:", this.scene.key);
        
        //==============================//
        //==== PARAMETERS FOR TRIAL ====//
        this.trialType = "run";
        this.numTrials = 180;
        this.numBlocks = 1;
        this.delayBeforeStart = 500; // Wait 500 ms and before starting trials
        //==============================//
        this.setStimuli(); // dynamically set stimulus order and set
        //==============================//

        //==== SETUP TRIAL ====//
        this.trial = new TrialHandler({ 
            scene: this, 
            numTrials: this.numTrials, 
            numBlocks: this.numBlocks,
            blockDuration: 60,
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
        this.gameUI = new GameUI({ scene: this , symbolSet: this.symbolSet, symbolOrder: this.symbolOrder });
        this.countdown = new Countdown({ scene: this, duration: 3, animate: false });
        
        //==== SCENE FLOW ====//
        this.gameUI.hide();
        this.countdown.run();

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
            this.scene.start("start");
        });
    }

    setStimuli() {
        const dateTime = new Date();
        let day = dateTime.getDay();
        let hour = dateTime.getHours();
        const symbolSets = ["s01", "s02", "s03", "s04", "s05"];

        const orderPerDay = [
            [ day === 0, [4,5,6,7,8,9,1,2,3] ], // sunday
            [ day === 1, [6,7,8,9,1,2,3,4,5] ], // monday
            [ day === 2, [8,9,1,2,3,4,5,6,7] ], // tuesday
            [ day === 3, [1,2,3,4,5,6,7,8,9] ], // wednesday
            [ day === 4, [7,8,9,1,2,3,4,5,6] ], // thursday
            [ day === 5, [5,6,7,8,9,1,2,3,4] ], // friday
            [ day === 6, [9,1,2,3,4,5,6,7,8] ], // saturday
        ];

        const order = orderPerDay.find(([condition]) => condition);
        this.symbolOrder = order[1];

        const setPerHour = [
            [ hour >= 7 && hour <= 9, symbolSets[0] ],
            [ hour >= 10 && hour <= 12, symbolSets[1] ],
            [ hour >= 13 && hour <= 15, symbolSets[2] ],
            [ hour >= 16 && hour <= 18, symbolSets[3] ],
            [ hour >= 19 && hour <= 21, symbolSets[4] ],
        ]

        const set = setPerHour.find(([condition]) => condition);
        if (set[0]) {
            this.symbolSet = set[1];
        } else {
            this.symbolSet = "p" // default set at night
        }

        this.stimuli = [];
        for (let i = 1; i <= 9; i++) {
            this.stimuli.push(`${this.symbolSet}0${i}`);
        }
    }
}