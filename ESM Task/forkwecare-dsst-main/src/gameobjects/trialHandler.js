import Boot from "../scenes/boot.js";
/**
 * Makes trial and block. Use TrialHandler.runBlocks() to start after creating instance = new TrialHandler({params})
 * @param scene The scene to which the stimuli are rendered
 * @param numTrials The number of trials per block
 * @param numBlocks The number of blocks
 * @param blockDuration The duration per block (s). Set blockDuration: 0 if user response should advance trials
 * @param randomize Toggle to pseudorandomize the 'stimuli' array
 * @param randomType Use "shuffle" for an array, use "pick" for two-choice stimuli.
 * @param stimulusDuration Duration of stimuli[index] in (ms)
 * @param interStimulusInterval Interval between stimuli[index] after stimulusDuration is reached in (ms)
 * @param stimuli Array of stimuli to show, or to randomize and then show if randomize: true, with specific randomType
 * @param stimulusType Set to "text", "image", or "sprite" if desired
 * @param atlas Texture atlas to use if stimulusType: "image"
 * @param x Coordinate of stimulus in game
 * @param y Coordinate of stimulus in game
 * @param debug Log responses and shown stimuli in console
 * 
 * @method runBlocks() Runs all blocks set in numBlocks inmediately after calling. Returns event "complete" when finished
 * @method runTrials() Invoked by runBlocks. Runs trials set by numTrials
 * @method setStimulus() Shows stimulus when invoked
 * @method stopStimulus() Removes stimulus from rendering when invoked
 * @method setPresentationRate() Randmoizes stimuli if randomize: true and returns array this.trialStimuli
 */


export default class TrialHandler {
    constructor({ scene, numTrials = 1, numBlocks = 1, blockDuration = 0, randomize = true, randomType = "shuffle", stimulusDuration = 0, interStimulusInterval = 0, stimuli, stimulusType, atlas = "guiAtlas", x, y, debug = false }) {
        this.scene = scene;
        this.numTrials = numTrials;
        this.numBlocks = numBlocks;
        this.blockDuration = blockDuration;
        this.randomize = randomize;
        this.randomType = randomType;
        this.stimulusDuration = stimulusDuration;
        this.interStimulusInterval = interStimulusInterval;
        this.stimuli = stimuli;
        this.stimulusType = stimulusType;
        this.atlas = atlas
        this.x = x;
        this.y = y;
        this.debug = debug;

        this.textConfig = {
            fontFamily: "header",
            fontSize: Boot.headerFontSize * 4,
            color: Boot.darkColor
        };

        this.trialIndex = 0;
        this.blockIndex = 0;

        this.event = new Phaser.Events.EventEmitter();
        this.randomNumber = Phaser.Math.RND;
    }

    runBlocks() {
        if (this.blockDuration > 0) {
            this.scene.time.addEvent({
                delay: this.blockDuration * 1000,
                callback: () => {
                    this.stimulus.destroy(); // Remove any stimulus still shown
                    this.event.emit("complete");
                    return;
                }
            });
        } else if (this.blockIndex >= this.numBlocks) {
            if (this.debug) console.log("Blocks finished");
            // Signal that blocks are complete
            this.event.emit("complete");
            return;
        }

        if (this.debug) console.log("Starting block: ", this.blockIndex + 1);
        
        // reset trials for new block
        this.trialIndex = 0;
        this.setPresentationRate();
        this.runTrials();
    }

    runTrials() {
        if (this.trialIndex >= this.numTrials) {
            if (this.debug) {
                console.log("temp data:", jsPsych.data.get());
                console.log("Trials finished");
            }

            this.blockIndex++;      // move to next block
            this.runBlocks();       // start next block
            return;
        }

        const stimulusKey = this.trialStimuli[this.trialIndex];
        if (this.debug) console.log("   index:", this.trialIndex + 1, " | Stimulus:", stimulusKey);

        // ==== ADD to data file ====
        const UTCdate = new Date().toISOString();
        this.scene.data.set("trial.index", this.trialIndex + 1); // Start the trial at 1 and continue counting
        this.scene.data.set("trial.UTCdate", UTCdate); // Add UTC date
        this.scene.data.set("trial.type", this.scene.scene.key) // Add the scene for which the data is saved
        this.scene.data.set("stim.type", stimulusKey); // Add stimulus key
        
        // ==== Set the stimulus
        if (this.interStimulusInterval > 0) {            
            this.scene.time.addEvent({
                delay: this.interStimulusInterval,
                callback: () => {
                    this.setStimulus(stimulusKey);
                    this.stopStimulus();
                }
            })
        } else {
            this.scene.input.enabled = true;
            this.setStimulus(stimulusKey);
            this.stopStimulus();
        }
    }

    setStimulus(stimulusKey) {
        if (this.stimulusType === "text") {
            this.stimulus = this.scene.add.text(this.x, this.y, stimulusKey, this.textConfig).setOrigin(0.5);
        } else if (this.stimulusType === "image") {
            this.stimulus = this.scene.add.image(this.x, this.y, this.atlas, stimulusKey);
        } else if (this.stimulusType === "sprite") {
            // TODO: Add option for sprite
            console.log("no sprite option yet")
        }

        // Add accurate stimulus onset time to data file
        this.scene.data.set("stim.onset", Math.round(this.scene.time.now));
    }

    stopStimulus() {
        if (this.stimulusDuration > 0) {
            this.scene.time.addEvent({
                delay: this.stimulusDuration,
                callback: () => {
                    this.stimulus.destroy();
                    this.trialIndex++;
                    if (this.debug) console.log(this.scene.data.getAll());
                    jsPsych.data.get().push(this.scene.data.getAll()); // Push the data to the trial 
                    this.runTrials(); // next trial
                }
            })
        } else {
            this.scene.events.once("playerResponse", () => {
                this.stimulus.destroy();
                this.trialIndex++;
                if (this.debug) console.log(this.scene.data.getAll());
                jsPsych.data.get().push(this.scene.data.getAll()); // Push the data to the trial
                this.runTrials();   // next trial
            });
        }
    }

    setPresentationRate() {
        // Set a new seed each time presentationRate is called
        this.trialStimuli = [];

        if (this.randomize) {
            if (this.randomType === "shuffle") {
                // Fisher-Yates shuffle of array, with equal possibility for each permutation, 
                // i.e. each shuffled version of the array.

                const stimulusFreq = Math.round(this.numTrials / this.stimuli.length);
                let tempStimuli = [];

                for (let i = 0; i < stimulusFreq; i++) {
                    tempStimuli.push(...this.stimuli);
                } 
 
                this.trialStimuli = this.randomNumber.shuffle(tempStimuli);
            } else if (this.randomType === "pick") {
                for (let i = 1; i <= this.numTrials; i++) {
                    const element = this.randomNumber.pick(this.stimuli);
                    this.trialStimuli.push(element);
                    if (this.trialStimuli.length > 3) {
                        if (this.trialStimuli[i] !== this.trialStimuli[i - 1] && this.trialStimuli[i] !== this.trialStimuli[i - 2]) {
                            continue;
                        } else {
                            i--;
                        }
                    }
                }
            }
        } else {
            this.trialStimuli = [...this.stimuli];
        }

        // TODO: ensure that first and last item do not match
        // if (this.stimuli[this.stimuli.length - 1] === this.trialStimuli[0]) {
        //     console.log("last and first item are the same");
        //     increase++;
        //     this.setPresentationRate();
        // }
    }
}