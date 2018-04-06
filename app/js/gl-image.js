export default class GLImage {
  constructor({}) {}
  onAdd(map) {
    this._map = map;
    let _this = this;

    this._btn = document.createElement("button");
    this._btn.className = "mapboxgl-ctrl-icon mapboxgl-ctrl-pitchtoggle-3d";
    this._btn.type = "button";
    this._btn.setAttribute("aria-label", "download map image");
    this._btn.onclick = function() {
      let dataURL = map.getCanvas().toDataURL("image/jpeg");

      // download image
      var link = document.createElement("a");
      link.download = "timemachine.jpg";
      var uri = dataURL;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
