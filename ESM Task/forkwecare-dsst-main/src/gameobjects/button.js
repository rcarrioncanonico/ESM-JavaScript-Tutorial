export default class Button extends Phaser.GameObjects.Container {
    constructor(scene, x, y, texture, frameUp, frameDown, labelText = "", labelSize = 0.4, labelColor = "#ffffff", active = true, callback) {
        super(scene, x, y);
        this.texture = texture;
        this.frameUp = frameUp;
        this.frameDown = frameDown;
        this.labelText = labelText;
        this.labelSize = labelSize;
        this.labelColor = labelColor;
        this.active = active;
        this.callback = callback;

        // Add the game object to the scene
        scene.add.existing(this);  

        // Add sprite relative to the container to hold button images
        this.sprite = this.scene.add.sprite(0, 0, this.texture, this.frameUp);

        // Position of text label on button
        // pressOffset is how far the button sprite animation goes 'down'. Used to displace any child attached to the button
        this.pressOffset = this.sprite.height * 0.06
        this.labelPosition = { x: 0, y: 0 - this.pressOffset };

        // Text component to write on the button, if no text is provided text object remains empty
        this.label = this.scene.add.text(this.labelPosition.x, this.labelPosition.y, this.labelText, {
            fontFamily: "header",
            fontSize: this.sprite.height * this.labelSize,
            color: this.labelColor
        }).setOrigin(0.5); 

        // Add objects to the container, remember that 'this.' references the class, which is a container
        this.add([ this.sprite, this.label ]);

        if (this.active) {
            this.setActive();
        }
    }

    setActive(activate = true) {
        if (activate) {
            this.sprite.setInteractive()
            .on("pointerdown", () => {
                this.sprite.setFrame(this.frameDown);
                // Make text label move down with button animation when pressed.
                // Also applies to any child added to this container in future.
                for (let childIndex = 1; childIndex <= this.getAll().length - 1; childIndex++) {
                    let child = this.getAt(childIndex);
                    child.setPosition(child.x, child.y + this.pressOffset);
                }
                this.pointerDown = true;
            })
            .on("pointerup", () => this.resetButton())
            .on("pointerout", () => {
                if (this.pointerDown == true) {
                    this.resetButton();
                }
            });
        } else if (!activate) {
            this.sprite.setInteractive(false);
        };
    }

    // Change default label text
    setLabelText(text = this.labelText) {
        this.label.text = text;
    }

    // Change default label color
    setLabelColor(color = this.labelColor) {
        this.label.style.setColor(color);
    }

    // Change default label size
    setLabelSize(size = this.LabelSize) {
        this.label.style.setFontSize(this.sprite.height * size);
    }

    // Change default label font
    setLabelFont(font = "header") {
        this.label.style.setFontFamily(font);
    }

    // Change image to 'pressed down'. Reset positions/variables. Then run callback function
    resetButton() {
        this.sprite.setFrame(this.frameUp);
        for (let childIndex = 1; childIndex <= this.getAll().length - 1; childIndex++) {
            let child = this.getAt(childIndex);
            child.setPosition(child.x, child.y - this.pressOffset);
        }
        this.label.setPosition(this.labelPosition.x, this.labelPosition.y);
        this.pointerDown = false;

        try {
            this.callback();
        } catch {
            return;
        }
    }
}