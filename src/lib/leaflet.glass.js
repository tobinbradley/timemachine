// Adapted from https://github.com/bbecquet/Leaflet.MagnifyingGlass

import L from 'leaflet'

L.MagnifyingGlass = L.Layer.extend({
  options: {
    radius: 100,
    zoomOffset: 0,
    layer: null,
    fixedPosition: false,
    latLng: [0, 0],
    fixedZoom: -1,
    minZoom: 0,
    maxZoom: 22,
    boundary: null
  },

  initialize: function (options) {
    L.Util.setOptions(this, options)
    this._fixedZoom = this.options.fixedZoom != -1
    this._mainMap = null
    this._glassMap = null
  },

  getMap: function () {
    return this._glassMap
  },

  updateLayer: function (layer) {
    const opts = this.options
    const map = this.getMap()
    if (map) {
      if ( opts.layer ) map.removeLayer(opts.layer)
      opts.layer = layer
      map.addLayer(opts.layer)
    }
  },

  _createMiniMap: function (elt) {
    return new L.Map(elt, {
      //layers: [this.options.layer],
      zoom: this._getZoom(),
      fadeAnimation: false,
      // disable every controls and interaction means
      attributionControl: false,
      zoomControl: false,
      boxZoom: false,
      touchZoom: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      dragging: false,
      keyboard: false
    })
  },

  _getZoom: function () {
    return this._fixedZoom
      ? this.options.fixedZoom
      : this._mainMap.getZoom() + this.options.zoomOffset
  },

  _updateZoom: function () {
    this._glassMap.setZoom(this._getZoom())
  },

  setRadius: function (radius) {
    this.options.radius = radius
    if (this._wrapperElt) {
      this._wrapperElt.style.width = this.options.radius * 2 + "px"
      this._wrapperElt.style.height = this.options.radius * 2 + "px"
    }
  },

  setLatLng: function (latLng) {
    this.options.latLng = latLng
    this._update(latLng)
  },

  _updateFromMouse: function (evt) {
    this._update(evt.latlng, evt.layerPoint)
  },

  _updateFixed: function () {
    this._update(this.options.latLng)
  },

  _update: function (latLng, layerPoint) {
    // update mini map view, forcing no animation
    this._glassMap.setView(latLng, this._getZoom(), {
      pan: { animate: false }
    })

    // update the layer element position on the main map,
    // using the one provided or reprojecting it
    layerPoint = layerPoint || this._mainMap.latLngToLayerPoint(latLng)
    this._wrapperElt.style.left = layerPoint.x - this.options.radius + "px"
    this._wrapperElt.style.top = layerPoint.y - this.options.radius + "px"
  },

  /**
  As defined by ILayer
  */
  onAdd: function (map) {
    this._mainMap = map
    var opts = this.options

    // create a wrapper element and a container for the map inside it
    this._wrapperElt = L.DomUtil.create("div", "leaflet-magnifying-glass")
    var glassMapElt = L.DomUtil.create("div", "", this._wrapperElt)
    // Webkit border-radius clipping workaround (see CSS)
    if (L.Browser.webkit)
      L.DomUtil.addClass(glassMapElt, "leaflet-magnifying-glass-webkit")
    // build the map
    this._glassMap = this._createMiniMap(glassMapElt)
    if (opts.layer) this._glassMap.addLayer(opts.layer)
    if (opts.boundary) this._glassMap.addLayer(opts.boundary)

    // forward some DOM events as Leaflet events
    L.DomEvent.addListener(this._wrapperElt, "click", this._fireClick, this)



    this.setRadius(opts.radius)
    this.setLatLng(opts.latLng)

    this._glassMap.whenReady(function () {
      if (opts.fixedPosition) {
        this._mainMap.on("zoomend", this._updateFixed, this)
        // for now, hide the elements during zoom transitions
        L.DomUtil.addClass(this._wrapperElt, "leaflet-zoom-hide")
      } else {
        this._mainMap.on("mousemove", this._updateFromMouse, this)
        if (!this._fixedZoom) {
          this._mainMap.on("zoomend", this._updateZoom, this)
        }
      }
    }, this)

    // add the magnifying glass as a layer to the top-most pane
    map.getPanes().popupPane.appendChild(this._wrapperElt)

    // needed after the element has been added, otherwise tile loading is messy
    this._glassMap.invalidateSize()

    return this
  },

  _fireClick: function (domMouseEvt) {
    this.fire("click", domMouseEvt)
    L.DomEvent.stopPropagation(domMouseEvt)
  },

  /**
  As defined by ILayer
  */
  onRemove: function (map) {
    map.off("viewreset", this._updateFixed, this)
    map.off("mousemove", this._updateFromMouse, this)
    map.off("zoomend", this._updateZoom, this)
    // layers must be explicitely removed before map destruction,
    // otherwise they can't be reused if the mg is re-added
    // for (var i = 0, l = this.options.layers.length; i < l; i++) {
    //   this._glassMap.removeLayer(this.options.layers[i])
    // }
    // this._glassMap.eachLayer(function (layer) {
    //   this._glassMap.removeLayer(layer);
    // })
    this._glassMap.remove()
    L.DomEvent.removeListener(this._wrapperElt, "click", this._fireClick)
    map.getPanes().popupPane.removeChild(this._wrapperElt)
    this._mainMap = null

    return this
  }
})

export default function (options) {
  return new L.MagnifyingGlass(options)
}
