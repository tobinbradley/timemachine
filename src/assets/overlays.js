import L from 'leaflet'

export default {
  "2016 Tree Canopy": L.tileLayer(
    "https://maps.mecknc.gov/tiles/treecanopy2016/{z}/{x}/{y}.png",
    {
      maxZoom: 22,
      maxNativeZoom: 16,
      minNativeZoom: 9,
      minZoom: 9,
      opacity: 0.6
    }
  ),
  "2012 Tree Canopy": L.tileLayer(
    "https://maps.mecknc.gov/tiles/treecanopy2012/{z}/{x}/{y}.png",
    {
      maxZoom: 22,
      maxNativeZoom: 16,
      minNativeZoom: 9,
      minZoom: 9,
      opacity: 0.6
    }
  ),
  "2008 Tree Canopy": L.tileLayer(
    "https://maps.mecknc.gov/tiles/treecanopy2008/{z}/{x}/{y}.png",
    {
      maxZoom: 22,
      maxNativeZoom: 16,
      minNativeZoom: 9,
      minZoom: 9,
      opacity: 0.6
    }
  ),
  "2001 Tree Canopy": L.tileLayer(
    "https://maps.mecknc.gov/tiles/treecanopy2001/{z}/{x}/{y}.png",
    {
      maxZoom: 22,
      maxNativeZoom: 16,
      minNativeZoom: 9,
      minZoom: 9,
      opacity: 0.6
    }
  ),
  Roads: L.tileLayer(
    "https://maps.mecknc.gov/geoserver/gwc/service/gmaps?layers=postgis%3Aroads&styles=postgis%3Aroads_aerial_overlay&zoom={z}&x={x}&y={y}&format=image/png",
    {
      maxZoom: 22,
      minZoom: 9
    }
  ),
  "Tax Parcels": L.tileLayer(
    "https://maps.mecknc.gov/geoserver/gwc/service/gmaps?layers=postgis%3Atax_parcels&styles=&zoom={z}&x={x}&y={y}&format=image/png",
    {
      maxZoom: 22,
      minZoom: 17
    }
  )
}
