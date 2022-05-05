import L from "leaflet"

L.Control.Button = L.Control.extend({
  options: {
    position: "topleft"
  },
  initialize: function (options) {
    this._button = {}
    this.setButton(options)
  },

  onAdd: function (map) {
    this._map = map

    this._container = map.zoomControl._container

    this._update()
    return this._container
  },

  onRemove: function (map) {},

  setButton: function (options) {
    var button = {
      title: options.title || '', //string
      onClick: options.onClick, //callback function
      inZoombar: null,
      buttonClass: options.buttonClass || "",
      toggleClass: options.toggleClass || ""
    }

    this._button = button
    this._update()
  },


  destroy: function () {
    this._button = {}
    this._update()
  },


  _update: function () {
    if (!this._map) {
      return
    }

    this._makeButton(this._button, this._map)
  },

  _makeButton: function (button) {


    var link = L.DomUtil.create("a", button.buttonClass, this._container)
    link.href = "#"
    link.title = button.title



    L.DomEvent.addListener(link, "click", L.DomEvent.stop)
      .addListener(link, "click", button.onClick, this)
      .addListener(link, "click", this._clicked, this)
    L.DomEvent.disableClickPropagation(link)

    this._link = link

    return link
  },

  _clicked: function () {
    if (this._button.toggleClass) {
      this._link.classList.toggle(this._button.toggleClass)
    }
    return
  }
})

export default function(options) { return new L.Control.Button(options) }