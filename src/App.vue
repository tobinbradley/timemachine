<template>
  <div>
    <Map />

    <div id="yearMain" class="year-control year-main">
      <LayerControl />
    </div>

    <div id="yearOverlay" class="year-control year-swipe">
      <LayerControl />
    </div>
  </div>
</template>

<script>

import Map from './components/map'
import LayerControl from './components/layercontrol'

export default {
  components: {
    Map,
    LayerControl
  },
  props: {
    metricId: {
      type: String
    },
    cardSize: {
      type: String
    }
  },
</script>
