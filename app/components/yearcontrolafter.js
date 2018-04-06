let template = `
<div>
  <a href="#" v-on:click="changeYear(-1)" v-bind:class="{ inactive: atStart }">&lt;</a>
  <span class="year">{{sharedState.afterYear}}</span>
  <a href="#" v-on:click="changeYear(1)" v-bind:class="{ inactive: atEnd }">&gt;</a>
</div>
`;

export default {
  name: "yearcontrol",
  template: template,
  watch: {
    "sharedState.afterYear": "fixArrows"
  },
  methods: {
    changeYear: function(inc) {
      let _this = this;
      let loc = _this.sharedState.years.indexOf(_this.sharedState.afterYear);
      if (loc + inc >= 0 && loc + inc <= _this.sharedState.years.length - 1) {
        _this.sharedState.afterYear = _this.sharedState.years[loc + inc];
      }
    },
    fixArrows: function() {
      let _this = this;
      _this.sharedState.years.indexOf(_this.sharedState.afterYear) === 0
        ? (_this.atStart = true)
        : (this.atStart = false);
      _this.sharedState.years.indexOf(_this.sharedState.afterYear) ===
      _this.sharedState.years.length - 1
        ? (_this.atEnd = true)
        : (this.atEnd = false);
    }
  }
};
