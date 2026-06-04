import Boot from "../scenes/boot.js";
/**
 * Example structure for the `instructionSteps` array used to build game instructions.
 *
 * const instructionSteps = [
 *   {
 *     // Required: Index of the instruction text inside this.content[]
 *     textIndex: 0,
 *
 *     // Required: Position where the instruction text should appear
 *     textPosition: { x: 400, y: 300 },
 *
 *     // Optional: how long the text tween lasts (default: 1000 ms)
 *     textDuration: 1500,
 *
 *     // Optional: array of GameObjects that should appear together with the text
 *     // (they will be brought to the top of the display list)
 *     appearWithText: [highlightCircle, arrowSprite],
 *
 *     // Optional: GameObject to tween after the text animation
 *     target: buttonSprite,
 *
 *     // Optional: alpha tween config for the target (default: { start: 1 })
 *     targetAlpha: { start: 0, from: 0, to: 1 },
 *
 *     // Optional: duration of the target tween (default: 1000 ms)
 *     targetDuration: 800,
 *
 *     // Optional: callback fired when the target tween starts
 *     onTargetStart: () => {
 *       console.log("Target tween started");
 *     },
 *
 *     // Optional: callback fired when the target tween completes
 *     onTargetComplete: () => {
 *       console.log("Target tween finished");
 *     }
 *   },
 *
 *   {
 *     textIndex: 1,
 *     textPosition: { x: 500, y: 200 },
 *     textDuration: 1200,
 *
 *     // This step only shows text (no target object)
 *     appearWithText: [pointerIcon]
 *   }
 * ];
 */

export default class GameInstructions {
    constructor({ scene, textKey }) {
        this.scene = scene;
        this.textKey = textKey;

        // Setup the instruction text parameters for style
        this.textConfig = { 
            fontFamily: "body",
            fontSize: Boot.bodyFontSize,
            color: Boot.lightColor,
        };

        // Array to destroy instruction objects once instruction is finished.
        this.instructionObjects = [];
        // Event emitter to signal when the instruction is finished. 
        this.event = new Phaser.Events.EventEmitter();
    }

    show(instructionSteps) {
        this.scene.cameras.main.fadeIn(1000, 0, 0, 0);

        // Semi transparent overlay on top of the gameUI
        this.overlay = this.scene.add.rectangle(0, 0, Boot.canvasWidth, Boot.canvasHeight, 0x7A7B7A, 0.5).setOrigin(0);

        this.scene.cameras.main.once("camerafadeincomplete", () => {

            // this.content reads the instruction text and separates it.
            const getText = this.scene.cache.json.get("text", this.textKey);
            this.content = getText[this.textKey].split(",");

            this.text = this.scene.add.text(0, 0, "", this.textConfig).setOrigin(0.5);

            let tweens = [];

            instructionSteps.forEach((step) => {

                // Show instruction text and any gameobject set to appear with text
                tweens.push({
                    targets: this.text,
                    alpha: { start: 0, from: 0, to: 1 },
                    duration: step.textDuration ? step.textDuration : 1000,
                    ease: "Sine.easeInOut",
                    yoyo: true,
                    onStart: () => {
                        this.text.setPosition(step.textPosition.x, step.textPosition.y);
                        this.text.setText(this.content[step.textIndex]);

                        if (step.appearWithText) {
                            step.appearWithText.forEach(obj => obj.setToTop());
                        }

                        if (step.onTextStart) step.onTextStart();
                    },
                    onComplete: () => {
                        if (step.onTextComplete) step.onTextComplete();
                    }
                });

                // Show additional game object after instruction text
                if (step.target) {
                    tweens.push({
                        targets: step.target,
                        alpha: step.targetAlpha ? step.targetAlpha : { start: 1 },
                        duration: step.targetDuration ? step.targetDuration : 1000,
                        yoyo: false,
                        onStart: () => {
                            if (step.onTargetStart) step.onTargetStart();
                        },
                        onComplete: () => {
                            if (step.onTargetComplete) step.onTargetComplete();
                        }
                    });
                }
            });

            this.instructionsChain = this.scene.tweens.chain({
                tweens: tweens
            });

            this.instructionObjects.push(this.overlay, this.text);

            this.instructionsChain.on("complete", () => {
                this.instructionObjects.forEach((obj) => obj.destroy());
                this.scene.cameras.main.fadeOut(1000, 0, 0, 0);
                this.scene.cameras.main.once("camerafadeoutcomplete", () => this.event.emit("complete"));
            });
        });
    }
}