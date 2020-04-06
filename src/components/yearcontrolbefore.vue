<template>
<div>
  <a v-if="sharedState.beforeYear !== sharedState.years[sharedState.years.length - 1]"  href="#" v-on:click="changeYear(1)" >&lt;</a>
  <select v-model="sharedState.beforeYear">
  <option v-for="year in sharedState.years" :selected="sharedState.beforeYear === year">
     {{ year }}
  </option>
</select>
  <a v-if="sharedState.beforeYear !== sharedState.years[0]" href="#" v-on:click="changeYear(-1)" >&gt;</a>
</div>
</template>

<script>
export default {
  name: "yearcontrol",
  methods: {
    changeYear: function(inc) {
      let _this = this;
      let loc = _this.sharedState.years.indexOf(_this.sharedState.beforeYear);
      if (loc + inc >= 0 && loc + inc <= _this.sharedState.years.length - 1) {
        _this.sharedState.beforeYear = _this.sharedState.years[loc + inc];
      }
    }
  }
};
</script>