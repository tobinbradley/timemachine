<template>
<div>
  <a v-if="year !== years[sharedState.years.length - 1]"  href="#" v-on:click="changeYear(1)" >&lt;</a>
  <select v-model="year">
    <option v-for="el in years" :selected="el === year">
       {{ year }}
    </option>
  </select>
  <a v-if="year !== years[0]" href="#" v-on:click="changeYear(-1)" >&gt;</a>
</div>
</template>

<script>
export default {
  name: "yearcontrol",
  methods: {
    changeYear: function(inc) {
      const idx = this.years.indexOf(this.year)
      this.year = this.years[idx + inc]
    }
  }
};
</script>
