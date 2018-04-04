let template = `
<div>
  <a href="#" v-on:click="changeYear(-1)" v-bind:class="{ inactive: atStart }">&lt;</a>
  <span class="year">{{year}}</span>
  <a href="#" v-on:click="changeYear(1)" v-bind:class="{ inactive: atEnd }">&gt;</a>
</div>
`;

export default {
  name: "yearcontrol",
  template: template,
  watch: {
    year: "fixArrows"
  },
  methods: {
    changeYear: function(inc) {
      let _this = this;
      let loc = _this.sharedState.years.indexOf(_this.year);
      if (loc + inc >= 0 && loc + inc <= _this.sharedState.years.length - 1) {
        _this.year = _this.sharedState.years[loc + inc];
        _this.layer.setUrl(_this.sharedState.aerials[_this.year]);
      }
    },
    fixArrows: function() {
      let _this = this;
      _this.sharedState.years.indexOf(_this.year) === 0
        ? (_this.atStart = true)
        : (this.atStart = false);
      _this.sharedState.years.indexOf(_this.year) ===
      _this.sharedState.years.length - 1
        ? (_this.atEnd = true)
        : (this.atEnd = false);
    }
  }
};
