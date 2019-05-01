<template>
<div>
  <a href="#" v-on:click="changeYear(-1)" v-bind:class="{ inactive: atStart }">&lt;</a>
  <select v-model="sharedState.beforeYear">
  <option v-for="year in sharedState.years" :selected="sharedState.beforeYear === year">
     {{ year }}
  </option>
</select>
  <a href="#" v-on:click="changeYear(1)" v-bind:class="{ inactive: atEnd }">&gt;</a>
</div>
</template>

<script>
export default {
  name: "yearcontrol",
  watch: {
    "sharedState.beforeYear": "fixArrows"
  },
  methods: {
    changeYear: function(inc) {
      let _this = this;
      let loc = _this.sharedState.years.indexOf(_this.sharedState.beforeYear);
      if (loc + inc >= 0 && loc + inc <= _this.sharedState.years.length - 1) {
        _this.sharedState.beforeYear = _this.sharedState.years[loc + inc];
      }
    },
    fixArrows: function() {
      let _this = this;
      _this.sharedState.years.indexOf(_this.sharedState.beforeYear) === 0
        ? (_this.atStart = true)
        : (this.atStart = false);
      _this.sharedState.years.indexOf(_this.sharedState.beforeYear) ===
      _this.sharedState.years.length - 1
        ? (_this.atEnd = true)
        : (this.atEnd = false);
    }
  }
};
</script>