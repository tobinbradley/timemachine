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

// initialize map
// let map = L.map("map").setView([35.227, -80.843], 15);

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

//YearControlSwipe.data = function() {
//  return {
//    year: sharedState.years[0],
//    atStart: true,
//    atEnd: false,
//    layer: sharedState.swipemap,
//    sharedState: sharedState
//  };
//};
//new Vue({
//  el: "sc-yearoverlay",
//  render: h => h(YearControlSwipe)
//});

Effects.data = function() {
  return {
    sharedState: sharedState
  };
};
new Vue({
  el: "sc-effects",
  render: h => h(Effects)
});

// add initial layers
//sharedState.basemap = aerials[years[years.length - 1]].addTo(map);
//sharedState.overlay = aerials[years[0]].addTo(map);

// overlay map clip effect
// function clip(val = 0) {
//   var nw = map.containerPointToLayerPoint([0, 0]),
//     se = map.containerPointToLayerPoint(map.getSize()),
//     clipX = nw.x + (se.x - nw.x) * val + (0.5 - val) * 30;
//   if (val === 0) {
//     clipX = 0;
//   }
//   overlay.getContainer().style.clip =
//     "rect(" + [nw.y, clipX, se.y, nw.x].join("px,") + "px)";
// }
// map.on("move", clip);

// swipe control - moves year controls around the screen with it
// console.log(Dragdealer);
// let swipe = new Dragdealer("demo-simple-slider", {
//   animationCallback: function(x, y) {
//     let pos = x * document.body.clientWidth;
//     let yearMain = document.querySelector(".year-control.year-main");
//     let yearSwipe = document.querySelector(".year-control.year-swipe");
//     yearMain.style.left = 50 + pos - 30 * x + "px";
//     yearSwipe.style.left = -145 + pos - 30 * x + "px";
//     clip(x);
//   }
// });

// year controls
// new Vue({
//   el: "#yearMain",
//   data: {
//     year: 2017,
//     years: years,
//     layer: sharedState.basemap,
//     atStart: false,
//     atEnd: true
//   },
//   watch: {
//     year: "fixArrows"
//   },
//   methods: {
//     changeYear: function(inc) {
//       let _this = this;
//       let loc = _this.years.indexOf(_this.year);
//       if (loc + inc >= 0 && loc + inc <= _this.years.length - 1) {
//         _this.year = _this.years[loc + inc];
//         _this.layer.setUrl(
//           `http://mapserver.mecklenburgcountync.gov/image_tiles/3857/${
//             _this.year
//           }/{z}/{x}/{${_this.getY()}}.png`
//         );
//       }
//     },
//     getY: function() {
//       return "y";
//     },
//     fixArrows: function() {
//       let _this = this;
//       _this.years.indexOf(_this.year) === 0
//         ? (_this.atStart = true)
//         : (this.atStart = false);
//       _this.years.indexOf(_this.year) === _this.years.length - 1
//         ? (_this.atEnd = true)
//         : (this.atEnd = false);
//     }
//   }
// });

// new Vue({
//   el: "#yearOverlay",
//   data: {
//     year: 2006,
//     years: years,
//     layer: sharedState.overlay,
//     atStart: false,
//     atEnd: false
//   },
//   watch: {
//     year: "fixArrows"
//   },
//   methods: {
//     changeYear: function(inc) {
//       let _this = this;
//       let loc = _this.years.indexOf(_this.year);
//       if (loc + inc >= 0 && loc + inc <= _this.years.length - 1) {
//         _this.year = _this.years[loc + inc];
//         _this.layer.setUrl(
//           `http://mapserver.mecklenburgcountync.gov/image_tiles/3857/${
//             _this.year
//           }/{z}/{x}/{${_this.getY()}}.png`
//         );
//       }
//     },
//     getY: function() {
//       return "y";
//     },
//     fixArrows: function() {
//       let _this = this;
//       _this.years.indexOf(_this.year) === 0
//         ? (_this.atStart = true)
//         : (this.atStart = false);
//       _this.years.indexOf(_this.year) === _this.years.length - 1
//         ? (_this.atEnd = true)
//         : (this.atEnd = false);
//     }
//   }
// });
