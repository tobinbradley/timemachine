<template>
<div>
  <a v-if="sharedState.afterYear !== sharedState.years[sharedState.years.length - 1]"  href="#" v-on:click="changeYear(1)" >&lt;</a>
  <select v-model="sharedState.afterYear">
    <option v-for="year in sharedState.years" :selected="sharedState.afterYear === year">
       {{ year }}
    </option>
  </select>
  <a v-if="sharedState.afterYear !== sharedState.years[0]" href="#" v-on:click="changeYear(-1)" >&gt;</a>
</div>
</template>

<script>
export default {
  name: "yearcontrol",
  methods: {
    changeYear: function(inc) {
      let _this = this;
      let loc = _this.sharedState.years.indexOf(_this.sharedState.afterYear);
      if (loc + inc >= 0 && loc + inc <= _this.sharedState.years.length - 1) {
        _this.sharedState.afterYear = _this.sharedState.years[loc + inc];
      }
    }
  }
};
</script>
