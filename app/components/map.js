import L from "leaflet";
require("leaflet-easyprint");
require("leaflet-measure/dist/leaflet-measure.js");
require("leaflet-search");

// format search results into something the control likes
function formatJSON(rawjson) {
  let results = {};
  for (var i in rawjson) {
    results[rawjson[i].label] = L.latLng(rawjson[i].lat, rawjson[i].lng);
  }
  return results;
}

const template = `
<div class="mapcontainer">
<div id="map"></div>
<input id='swipe' class='range' type='range' min='0' max='1.0' value='0' step='any' style="z-index: 10" v-model="privateState.clip" @input='moveYears' />
</div>
`;

export default {
  name: "themap",
  template: template,
  mounted: function() {
    this.initMap();
  },
  watch: {
    "sharedState.basemap": "changeBasemap",
    "sharedState.overlay": "changeOverlay",
    "privateState.clip": "clip"
  },
  methods: {
    initMap: function() {
      let _this = this;
      let map = L.map("map", {
        maxZoom: 17
      }).setView(_this.privateState.center, _this.privateState.zoom);

      // add starting layers
      _this.sharedState.basemap.addTo(map);
      _this.sharedState.swipemap.addTo(map);

      // map controls
      map.addControl(
        new L.Control.Search({
          url:
            "http://maps.co.mecklenburg.nc.us/api/search/v1/{s}?tables=address,pid",
          formatData: formatJSON,
          zoom: 16,
          minLength: 4,
          position: "topright"
        })
      );
      L.easyPrint({
        title: "Download Image",
        exportOnly: true,
        position: "topleft",
        sizeModes: ["Current", "A4Portrait", "A4Landscape"]
      }).addTo(map);
      L.easyPrint({
        title: "Print",
        position: "topleft",
        sizeModes: ["Current", "A4Portrait", "A4Landscape"]
      }).addTo(map);
      var measureControl = new L.Control.Measure({ position: "topleft" });
      measureControl.addTo(map);

      _this.privateState.map = map;

      // swipe
      map.on("move", _this.clip);
      map.on("resize", _this.moveYears);
      _this.clip();
    },
    clip: function() {
      let _this = this;
      var nw = _this.privateState.map.containerPointToLayerPoint([0, 0]),
        se = _this.privateState.map.containerPointToLayerPoint(
          _this.privateState.map.getSize()
        ),
        clipX = nw.x + (se.x - nw.x) * _this.privateState.clip;

      this.sharedState.swipemap.getContainer().style.clip =
        "rect(" + [nw.y, clipX, se.y, nw.x].join("px,") + "px)";
    },
    moveYears: function(e) {
      let _this = this;
      let val;
      if (e.srcElement) {
        val = e.srcElement.value;
      } else {
        val = document.querySelector("#swipe").value;
      }
      let width = _this.privateState.map.getSize().x;
      let pos = val * width;
      let yearMain = document.querySelector(".year-control.year-main");
      let yearSwipe = document.querySelector(".year-control.year-swipe");
      yearMain.style.left = pos + 30 + "px";
      yearSwipe.style.left = pos - 130 + "px";

      if (pos < 150) {
        yearSwipe.style.display = "none";
      } else {
        yearSwipe.style.display = "block";
      }
    },
    changeBasemap: function() {},
    changeOverlay: function() {}
  }
};
