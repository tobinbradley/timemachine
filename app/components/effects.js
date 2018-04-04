// document.querySelector('.leaflet-tile-container').style.filter = "magic";
// brightness()
// contrast()
// grayscale()
// hue-rotate()
// invert()
// saturate()
// sepia()

let template = `
<div class="mapeffects">
  <h3>Map Effects</h3>
  <label for="brightness">Brightness</label>
  <input name="brightness" class='range' type='range' min='0' max='2' step='any' v-model="privateState.brightness" @input='effectMap' />
  <label for="contrast">Contrast</label>
  <input name="contrast" class='range' type='range' min='0' max='2' step='any' v-model="privateState.contrast" @input='effectMap' />
  <label for="grayscale">Grayscale</label>
  <input name="grayscale" class='range' type='range' min='0' max='1' step='any' v-model="privateState.grayscale" @input='effectMap' />
  <label for="huerotate">Hue Rotate</label>
  <input name="huerotate" class='range' type='range' min='0' max='360' step='any' v-model="privateState.huerotate" @input='effectMap' />
  <label for="saturate">Color Saturation</label>
  <input name="saturate" class='range' type='range' min='0' max='2' step='any' v-model="privateState.saturate" @input='effectMap' />
  <label for="sepia">Sepia</label>
  <input name="sepia" class='range' type='range' min='0' max='1' step='any' v-model="privateState.sepia" @input='effectMap' />
  <div class="text-right">
    <button class="button" @click='resetMap'>Reset</button>
  </div>
</div>
`;

export default {
  name: "map-effects",
  template: template,
  methods: {
    effectMap: function() {
      let _this = this;
      let tiles = document.querySelectorAll(".leaflet-tile-container");
      Array.from(tiles).forEach((element, index) => {
        element.style.filter = `brightness(${
          _this.privateState.brightness
        }) contrast(${_this.privateState.contrast}) grayscale(${
          _this.privateState.grayscale
        }) hue-rotate(${_this.privateState.huerotate}deg)  saturate(${
          _this.privateState.saturate
        }) sepia(${_this.privateState.sepia})`;
      });
    },
    resetMap: function() {
      this.privateState.brightness = "1";
      this.privateState.contrast = "1";
      this.privateState.grayscale = "0";
      this.privateState.huerotate = "0";
      this.privateState.saturate = "1";
      this.privateState.sepia = "0";
      this.effectMap();
    }
  }
};
