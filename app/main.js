import Vue from "vue/dist/vue.js";
import Map from "./components/map";
import YearControlBefore from "./components/yearcontrolbefore";
import YearControlAfter from "./components/yearcontrolafter";
import Effects from "./components/effects";
import { years, aerials } from "./js/layers";

let sharedState = {
  aerials: aerials,
  years: years,
  afterYear: years[years.length - 1],
  beforeYear: years[0],
  effects: {
    brightness: 0,
    contrast: 0,
    huerotate: 0,
    saturate: 0
  }
};

// navbar
document.querySelector(".btnSidebar").addEventListener("click", function() {
  document.querySelector(".content").classList.toggle("isOpen");
  document.querySelector(".btnSidebar").classList.toggle("active");
});

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
  };
};
new Vue({
  el: "sc-map",
  render: h => h(Map)
});

YearControlBefore.data = function() {
  return {
    sharedState: sharedState,
    atStart: true,
    atEnd: false
  };
};
new Vue({
  el: "sc-yearmain",
  render: h => h(YearControlBefore)
});

YearControlAfter.data = function() {
  return {
    sharedState: sharedState,
    atStart: false,
    atEnd: true
  };
};
new Vue({
  el: "sc-yearoverlay",
  render: h => h(YearControlAfter)
});

Effects.data = function() {
  return {
    sharedState: sharedState
  };
};
new Vue({
  el: "sc-effects",
  render: h => h(Effects)
});
