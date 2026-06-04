import Boot from "../scenes/boot.js";

/**
 * A simple container to show a popup if a response was correct or wrong
 */
export default class FeedbackHandler {
    constructor({ scene, x = 0, y = 0, displayDuration = 1000, animate = false }) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.displayDuration = displayDuration;
        this.animate = animate;
        
        this.event = new Phaser.Events.EventEmitter(); // Init feedbackHandler instance events to signal when popup is finished
    }

    show({ response = "correct", message = ""}) {
        // Constants used
        const popupWidth = 0.35 * Boot.canvasHeight;
        const popupHeight = 0.1 * Boot.canvasHeight;

        // Setup container, all other graphics have a relative position to the container
        this.container = this.scene.add.container(this.x, this.y).setVisible(false);
        const removeContainer = () => {
            this.scene.time.addEvent({
                delay: this.displayDuration,
                callback: () => {
                    this.event.emit("complete"); // Signal that showing the message is complete
                    this.container.setVisible(false); // Reset the containr to not be visible
                }
            });
        };

        // Add the graphics to the container
        this.popup = this.scene.add.rectangle(0, 0, popupWidth, popupHeight, 0xc5c5c5);
        this.popup.setRounded(20 * Boot.assetSize);
        this.response = this.scene.add.image(popupWidth * 0.25, 0, "guiAtlas", response);
        this.message = this.scene.add.text(popupWidth * -0.15, 0, message, {
            fontFamily: "header",
            fontSize: Boot.headerFontSize * 1.2,
            color: Boot.lightColor
        }).setOrigin(0.5);

        // Add container for all elements in feedback message and set to top of redering que
        this.container.add([ this.popup, this.response, this.message ]).setDepth(100);

        // Animate the message
        if (this.animate) {
            const animate = this.scene.tweens.add({
                targets: this.container,
                duration: this.displayDuration * 0.1,
                scale: { from: 0, to: 1},
                ease: "Back.easeOut",
                onStart: () => this.container.setVisible(true), // show popup
                onComplete: () => removeContainer() // remove popup after animation has ended and delay is finished
            });
        } else {
            this.container.setVisible(true); // Show popup
            removeContainer(); // Remove popup after delay
        }
    }
}