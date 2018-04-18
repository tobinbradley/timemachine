const FileSaver = require("file-saver");

export default class GLImage {
  constructor({ state = null }) {
    this._state = state;
  }
  onAdd(map) {
    this._map = map;
    let _this = this;

    this._btn = document.createElement("button");
    this._btn.className = "mapboxgl-ctrl-icon mapboxgl-ctrl-gl-image";
    this._btn.type = "button";
    this._btn.setAttribute("aria-label", "download map image");
    this._btn.onclick = function() {
      let mapId = map.getContainer().getAttribute("id");
      let year = null;
      mapId === "beforeMap"
        ? (year = _this._state.beforeYear)
        : (year = _this._state.afterYear);
      let dataURL = map.getCanvas().toBlob(function(blob) {
        FileSaver.saveAs(blob, `Time Machine - ${year}.png`);
      });
    };

    this._container = document.createElement("div");
    this._container.className = "mapboxgl-ctrl mapboxgl-ctrl-group";
    this._container.appendChild(this._btn);

    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}
