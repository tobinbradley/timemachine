

<template>
<div id="mapcontainer" class="mapcontainer">
  <div id='beforeMap' class='map'></div>
  <div id='afterMap' class='map'></div>
</div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import Compare from "mapbox-gl-compare";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import GLImage from "../js/gl-image";

export default {
  name: "themap",
  mounted: function () {
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
    initMap: function () {
      let _this = this;
      let beforeMap = new mapboxgl.Map({
        container: "beforeMap",
        style: {
          version: 8,
          sources: {},
          layers: []
        },
        attributionControl: false,
        center: _this.privateState.center,
        zoom: _this.privateState.zoom,
        minZoom: 8,
        maxZoom: 18,
        preserveDrawingBuffer: true,
        hash: true
      });
      let afterMap = new mapboxgl.Map({
        container: "afterMap",
        style: {
          version: 8,
          sources: {},
          layers: []
        },
        attributionControl: false,
        center: _this.privateState.center,
        zoom: _this.privateState.zoom,
        minZoom: 8,
        maxZoom: 18,
        preserveDrawingBuffer: true,
        hash: true
      });

      // set map state
      beforeMap.on("load", function () {
        _this.privateState.beforeMap = beforeMap;
        _this.setBeforeLayer();
      });

      afterMap.on("load", function () {
        _this.privateState.afterMap = afterMap;
        _this.setAfterLayer();
      });

      // swipe control
      let map = new Compare(beforeMap, afterMap, '#mapcontainer', {});
      beforeMap.addControl(new mapboxgl.NavigationControl(), "top-left");

      // geocoder control
      let geocoder = new MapboxGeocoder({});
      geocoder.on("result", function (ev) {
        console.log(ev.result);
      });
      afterMap.addControl(geocoder, "top-right");

      // download maps control
      afterMap.addControl(
        new GLImage({
          state: _this.sharedState
        }),
        "top-right"
      );
      beforeMap.addControl(
        new GLImage({
          state: _this.sharedState
        }),
        "top-left"
      );
    },
    updateArea: function (e) {},
    setAfterLayer: function () {
      this.setLayer(this.privateState.afterMap, this.sharedState.afterYear);
    },
    setBeforeLayer: function () {
      let _this = this;
      this.setLayer(_this.privateState.beforeMap, _this.sharedState.beforeYear);
    },
    setAllEffects: function () {
      this.setEffects(this.privateState.beforeMap);
      this.setEffects(this.privateState.afterMap);
    },
    setEffects: function (map) {
      let _this = this;
      const layers = map.getStyle().layers
      const layerID = layers[layers.length - 1].id

      map.setPaintProperty(
        layerID,
        "raster-hue-rotate",
        Number(_this.sharedState.effects.huerotate)
      );
      map.setPaintProperty(
        layerID,
        "raster-brightness-min",
        Number(_this.sharedState.effects.brightness)
      );
      map.setPaintProperty(
        layerID,
        "raster-saturation",
        Number(_this.sharedState.effects.saturate)
      );
      map.setPaintProperty(
        layerID,
        "raster-contrast",
        Number(_this.sharedState.effects.contrast)
      );
    },
    removeLayer: function (map) {
      map.getStyle().layers.forEach(lyr => {
        map.removeLayer(lyr.id)
        map.removeSource(lyr.source)
      })
    },
    setLayer: function (map, year) {
      let _this = this;
      // remove old stuff
      _this.removeLayer(map);

      const layer = _this.sharedState.aerials.filter(el => el.name === year)[0]

      layer.url.forEach((url, idx) => {
        map.addLayer({
          id: `basemap-${idx}`,
          type: "raster",
          source: {
            type: "raster",
            tiles: [url],
            tileSize: 256,
            maxzoom: layer.maxZoom,
            minzoom: layer.minZoom,
            attribution: "<a href='http://emaps.charmeck.org/' target='_blank'>Mecklenburg County GIS</a>"
          },
          minzoom: 8,
          maxzoom: 19,
          paint: {
            "raster-opacity": 1
          }
        })
      })

      // map.addLayer({
      //   id: "basemap",
      //   type: "raster",
      //   source: {
      //     type: "raster",
      //     tiles: [layer.url],
      //     tileSize: 256,
      //     maxzoom: layer.maxZoom,
      //     minzoom: layer.minZoom,
      //     attribution: "<a href='http://emaps.charmeck.org/' target='_blank'>Mecklenburg County GIS</a>"
      //   },
      //   minzoom: 8,
      //   maxzoom: 19,
      //   paint: {
      //     "raster-opacity": 1
      //   }
      // });

      // set effects
      _this.setEffects(map);
    }
  }
};
</script>