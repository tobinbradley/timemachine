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
  <input name="brightness" class='range' type='range' min='0' max='1' step='any' v-model="sharedState.effects.brightness" />
  <label for="contrast">Contrast</label>
  <input name="contrast" class='range' type='range' min='-1' max='1' step='any' v-model="sharedState.effects.contrast" />
  <label for="huerotate">Hue Rotate</label>
  <input name="huerotate" class='range' type='range' min='0' max='360' step='any' v-model="sharedState.effects.huerotate" />
  <label for="saturate">Color Saturation</label>
  <input name="saturate" class='range' type='range' min='-1' max='1' step='any' v-model="sharedState.effects.saturate" />
  <div class="text-right">
    <button class="button" @click='resetMap'>Reset</button>
  </div>
</div>
`;

export default {
  name: 'map-effects',
  template: template,
  methods: {
    resetMap: function() {
      this.sharedState.effects.brightness = '0';
      this.sharedState.effects.contrast = '0';
      this.sharedState.effects.huerotate = '0';
      this.sharedState.effects.saturate = '0';
    }
  }
};
