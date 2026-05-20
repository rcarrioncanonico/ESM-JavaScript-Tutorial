import scaleSize from "../main.js";

export default class Border extends Phaser.Scene {
  constructor() {
    // This is a scens that stays active for all other scenes and shows the border image
    super({ key: 'border', active: true }); // starts automatically
  }

  preload() {
    const assetSize = scaleSize();
    this.load.image("border", `assets/images/${assetSize}x/border.png`);
  }

  create() {
    this.add.image(0, 0, 'border').setOrigin(0).setScrollFactor(0); // stays fixed on screen

    this.scene.launch('border');
    this.scene.bringToTop('border');
  }
}