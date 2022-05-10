import L from 'leaflet'

export default {
  "2016 Tree Canopy": L.tileLayer(
    "https://mcmap.org/tiles/treecanopy2016/{z}/{x}/{y}.png",
    {
      maxZoom: 22,
      maxNativeZoom: 16,
      minNativeZoom: 9,
      minZoom: 9
    }
  ),
  "2012 Tree Canopy": L.tileLayer(
    "https://mcmap.org/tiles/treecanopy2012/{z}/{x}/{y}.png",
    {
      maxZoom: 22,
      maxNativeZoom: 16,
      minNativeZoom: 9,
      minZoom: 9
    }
  ),
  "2008 Tree Canopy": L.tileLayer(
    "https://mcmap.org/tiles/treecanopy2008/{z}/{x}/{y}.png",
    {
      maxZoom: 22,
      maxNativeZoom: 16,
      minNativeZoom: 9,
      minZoom: 9
    }
  ),
  "2001 Tree Canopy": L.tileLayer(
    "https://mcmap.org/tiles/treecanopy2001/{z}/{x}/{y}.png",
    {
      maxZoom: 22,
      maxNativeZoom: 16,
      minNativeZoom: 9,
      minZoom: 9
    }
  ),
  Roads: L.tileLayer(
    "https://mcmap.org/geoserver/gwc/service/gmaps?layers=postgis%3Aroads&styles=postgis%3Aroads_aerial_overlay&zoom={z}&x={x}&y={y}&format=image/png",
    {
      maxZoom: 22,
      minZoom: 9
    }
  )
}
