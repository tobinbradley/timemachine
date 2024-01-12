import L from 'leaflet'

const overlays = {
  "2023 Color Infrared": L.tileLayer(
    "https://maps.mecknc.gov/tiles/2023cir/{z}/{x}/{y}",
    {
      maxZoom: 22,
      maxNativeZoom: 16,
      minNativeZoom: 9,
      minZoom: 9,
      opacity: 1
    }
  ),
  "2023 Tree Canopy": L.tileLayer(
    "https://maps.mecknc.gov/tiles/treecanopy2023/{z}/{x}/{y}",
    {
      maxZoom: 22,
      maxNativeZoom: 15,
      minNativeZoom: 9,
      minZoom: 9,
      opacity: 0.6
    }
  ),
  "2016 Tree Canopy": L.tileLayer(
    "https://maps.mecknc.gov/tiles/treecanopy2016/{z}/{x}/{y}",
    {
      maxZoom: 22,
      maxNativeZoom: 15,
      minNativeZoom: 9,
      minZoom: 9,
      opacity: 0.6
    }
  ),
  "2012 Tree Canopy": L.tileLayer(
    "https://maps.mecknc.gov/tiles/treecanopy2012/{z}/{x}/{y}",
    {
      maxZoom: 22,
      maxNativeZoom: 15,
      minNativeZoom: 9,
      minZoom: 9,
      opacity: 0.6
    }
  ),
  "2008 Tree Canopy": L.tileLayer(
    "https://maps.mecknc.gov/tiles/treecanopy2008/{z}/{x}/{y}",
    {
      maxZoom: 22,
      maxNativeZoom: 16,
      minNativeZoom: 9,
      minZoom: 9,
      opacity: 0.6
    }
  ),
  "2001 Tree Canopy": L.tileLayer(
    "https://maps.mecknc.gov/tiles/treecanopy2001/{z}/{x}/{y}",
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

// Add zIndex starting at 2 to force everything over the two base aerials
// on split screen
let i = 2
for (const property in overlays) {
  overlays[property].setZIndex(i)
  i++
}

export default overlays
