import Vue from 'vue'
import Map from './components/map.vue'
import YearControlBefore from './components/yearcontrolbefore.vue'
import YearControlAfter from './components/yearcontrolafter.vue'
import Effects from './components/effects.vue'
import { years, aerials } from './js/layers'
import './main.css'

Vue.config.productionTip = false

let sharedState = {
  aerials: aerials,
  years: years,
  beforeYear: years[years.length - 1],
  afterYear: years[0],
  effects: {
    brightness: 0,
    contrast: 0,
    huerotate: 0,
    saturate: 0,
  },
}

// navbar
document.querySelector('.btnSidebar').addEventListener('click', function() {
  document.querySelector('.content').classList.toggle('isOpen')
  document.querySelector('.btnSidebar').classList.toggle('active')
})

Map.data = function() {
  return {
    privateState: {
      map: null,
      center: [-80.843, 35.227],
      zoom: 15,
      beforeMap: null,
      afterMap: null
    },
    sharedState: sharedState
  }
}
new Vue({
  el: 'sc-map',
  render: h => h(Map)
})

YearControlBefore.data = function() {
  return {
    sharedState: sharedState,
    atStart: true,
    atEnd: false
  }
}
new Vue({
  el: 'sc-yearmain',
  render: h => h(YearControlBefore)
})

YearControlAfter.data = function() {
  return {
    sharedState: sharedState,
    atStart: false,
    atEnd: true
  }
}
new Vue({
  el: 'sc-yearoverlay',
  render: h => h(YearControlAfter)
})

Effects.data = function() {
  return {
    sharedState: sharedState
  }
}
new Vue({
  el: 'sc-effects',
  render: h => h(Effects)
})
