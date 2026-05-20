import Boot from "../scenes/boot.js";

export default class Countdown {
    constructor({ scene, duration = 3, animate = false }) {
        this.scene = scene;
        this.duration = duration;
        this.animate = animate;

        this.fontSize = Boot.headerFontSize * 4;
        this.event = new Phaser.Events.EventEmitter();
    }

    run() {
        this.scene.cameras.main.fadeIn(500, 0, 0, 0);

        this.scene.cameras.main.once("camerafadeincomplete", () => {
            // Create text in the center
            const countdownText = this.scene.add.text(Boot.canvasCenterX, Boot.canvasCenterY, this.duration,{ 
                fontFamily: "header",
                fontSize: this.fontSize, 
                color: Boot.lightColor
            }).setOrigin(0.5);

            // Add timed event (runs every 1 second)
            this.scene.time.addEvent({
                delay: 1000, // 1 second
                repeat: 2,   // run 3 times total (3,2,1)
                callback: () => {
                    this.duration--;
                    if (this.duration > 0) {
                        countdownText.setText(this.duration);
                    } else {
                        this.event.emit("complete");
                        countdownText.setText("");
                    }
                },
            });

            // Add nice animation 
            if (this.animate) {
                this.scene.tweens.addCounter({
                    from: -1,
                    to: 1,
                    duration: 1000,
                    ease: "Sine.easeInOut",
                    yoyo: true,
                    repeat: 2,
                    onUpdate: (tween) => {
                        const factor = tween.getValue()
                        countdownText.setFontSize(this.fontSize += factor);
                    }
                });
            }
        });
    }

    reset(duration) {
        this.duration = duration;
    }
}