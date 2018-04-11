import mapboxgl from "mapbox-gl";
import Compare from "mapbox-gl-compare";
import MapboxGeocoder from "mapbox-gl-geocoder";
//import MapboxDraw from "mapbox-gl-draw";
import GLImage from "../js/gl-image";

const template = `
<div class="mapcontainer">
  <div id='beforeMap' class='map'></div>
  <div id='afterMap' class='map'></div>
</div>
`;

export default {
  name: "themap",
  template: template,
  mounted: function() {
    this.initMap();
  },
  watch: {
    "sharedState.beforeYear": "setBeforeLayer",
    "sharedState.afterYear": "setAfterLayer",
    "sharedState.effects.huerotate": "setAllEffects",
    "sharedState.effects.brightness": "setAllEffects",
    "sharedState.effects.contrast": "setAllEffects",
    "sharedState.effects.saturate": "setAllEffects"
  },
  methods: {
    initMap: function() {
      let _this = this;
      let beforeMap = new mapboxgl.Map({
        container: "beforeMap",
        style: { version: 8, sources: {}, layers: [] },
        attributionControl: false,
        center: _this.privateState.center,
        zoom: _this.privateState.zoom,
        minZoom: 8,
        maxZoom: 18,
        preserveDrawingBuffer: true
      });
      let afterMap = new mapboxgl.Map({
        container: "afterMap",
        style: { version: 8, sources: {}, layers: [] },
        attributionControl: false,
        center: _this.privateState.center,
        zoom: _this.privateState.zoom,
        minZoom: 8,
        maxZoom: 18,
        preserveDrawingBuffer: true
      });

      // set map state
      beforeMap.on("load", function() {
        _this.privateState.beforeMap = beforeMap;
        _this.setBeforeLayer();
      });

      afterMap.on("load", function() {
        _this.privateState.afterMap = afterMap;
        _this.setAfterLayer();
      });

      // swipe control
      let map = new Compare(beforeMap, afterMap, {});
      beforeMap.addControl(new mapboxgl.NavigationControl(), "top-left");

      // geocoder control
      let geocoder = new MapboxGeocoder({
        accessToken:
          "pk.eyJ1IjoiZnV6enl0b2xlcmFuY2UiLCJhIjoiWk5SS2NqRSJ9.pt08fCnJBVi8GhH4wYhyiQ",
        bbox: [
          -81.0581540000000018,
          35.0016219999999976,
          -80.5503640000000019,
          35.515197999999998
        ]
      });
      geocoder.on("result", function(ev) {
        console.log(ev.result);
      });
      afterMap.addControl(geocoder, "top-right");

      // attribution
      //afterMap.addControl(new mapboxgl.AttributionControl({}), "top-right");

      // draw control
      // var draw = new MapboxDraw({
      //   displayControlsDefault: false,
      //   controls: {
      //     polygon: true,
      //     trash: true
      //   }
      // });
      // beforeMap.addControl(draw, "top-left");
      // beforeMap.on("draw.create", _this.updateArea);
      // beforeMap.on("draw.delete", _this.updateArea);
      //beforeMap.on("draw.update", _this.updateArea);

      // download maps control
      //afterMap.addControl(new GLImage({}), "top-right");
      //beforeMap.addControl(new GLImage({}), "top-left");
    },
    updateArea: function(e) {},
    setAfterLayer: function() {
      this.setLayer(this.privateState.afterMap, this.sharedState.afterYear);
    },
    setBeforeLayer: function() {
      let _this = this;
      this.setLayer(_this.privateState.beforeMap, _this.sharedState.beforeYear);
    },
    setAllEffects: function() {
      this.setEffects(this.privateState.beforeMap);
      this.setEffects(this.privateState.afterMap);
    },
    setEffects: function(map) {
      let _this = this;

      map.setPaintProperty(
        "basemap",
        "raster-hue-rotate",
        Number(_this.sharedState.effects.huerotate)
      );
      map.setPaintProperty(
        "basemap",
        "raster-brightness-min",
        Number(_this.sharedState.effects.brightness)
      );
      map.setPaintProperty(
        "basemap",
        "raster-saturation",
        Number(_this.sharedState.effects.saturate)
      );
      map.setPaintProperty(
        "basemap",
        "raster-contrast",
        Number(_this.sharedState.effects.contrast)
      );
    },
    removeLayer: function(map) {
      // remove any overlays
      if (map.getLayer("basemap")) {
        map.removeLayer("basemap");
        map.removeSource("basemap");
      }
    },
    setLayer: function(map, year) {
      let _this = this;
      // remove old stuff
      _this.removeLayer(map);

      map.addLayer({
        id: "basemap",
        type: "raster",
        source: {
          type: "raster",
          tiles: [_this.sharedState.aerials[year].url],
          tileSize: 256,
          maxzoom: _this.sharedState.aerials[year].maxZoom,
          minzoom: _this.sharedState.aerials[year].minZoom,
          attribution:
            "<a href='http://emaps.charmeck.org/' target='_blank'>Mecklenburg County GIS</a>"
        },
        minzoom: 8,
        maxzoom: 19,
        paint: {
          "raster-opacity": 1
        }
      });

      // set effects
      _this.setEffects(map);
    }
  }
};