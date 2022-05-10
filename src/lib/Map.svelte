<script>
  import {
    nearToken,
    untilDate,
    portalDate,
    location,
    activeAerial,
    activePortal,
    portalOpen,
    mapLocation
  } from "../store"
  import Search from "./Search.svelte"
  import "leaflet/dist/leaflet.css"
  import L from "leaflet"
  import geoBoundary from "../assets/geoboundary.json"
  import magGlass from "./leaflet.glass"
  import btnControl from "./leaflet-button"
  import overlays from '../assets/overlays'

  let map
  let activeTiles
  let marker
  let popup
  let magnifyingGlass
  let currentAerial


  $: if (map && $activeAerial && $activeAerial !== currentAerial) {
    if (activeTiles) activeTiles.remove()
    activeTiles = L.tileLayer($activeAerial.url, {
      attribution: $activeAerial.attribution,
      maxZoom: $activeAerial.maxzoom + 1 <= 22 ? $activeAerial.maxzoom + 1 : 22,
      maxNativeZoom: $activeAerial.maxzoom,
      minNativeZoom: $activeAerial.minzoom,
      minZoom: 9
    }).addTo(map)
    currentAerial = $activeAerial
  }

  $: if ($untilDate && popup && popup.isOpen()) {
    const latlng = popup.getLatLng()
    popupText(latlng.lng, latlng.lat).then((content) => {
      popup.setContent(content)
    })
  }

  $: if ($untilDate && marker) {
    popupText($location.latlng[1], $location.latlng[0], $location).then(
      (content) => {
        marker.bindPopup(content)
      }
    )
  }

  $: if ($location.label && map) {
    if (marker) marker.remove()
    marker = L.marker($location.latlng).addTo(map)
    map.flyTo($location.latlng, $activeAerial.maxzoom < 20 ? $activeAerial.maxzoom : 20)

    popupText($location.latlng[1], $location.latlng[0], $location).then(
      (content) => {
        marker.bindPopup(content).openPopup()
      }
    )
  }

  $: if (map && $portalDate && magnifyingGlass) {
    const pLayer = L.tileLayer($activePortal.url, {
      maxZoom: 22,
      maxNativeZoom: $activePortal.maxzoom,
      minNativeZoom: $activePortal.minzoom,
      minZoom: 9
    })
    magnifyingGlass.updateLayer(pLayer)
  }

  function handleMagGlass() {
    if (!magnifyingGlass) return

    $portalOpen = !$portalOpen

    if (map.hasLayer(magnifyingGlass)) {
      map.removeLayer(magnifyingGlass)
    } else {
      magnifyingGlass.addTo(map)
    }
  }

  async function popupText(lng, lat, location = null) {
    let survey
    if ($activeAerial.attribution === "Near Map") {
      const response = await fetch(
        `https://api.nearmap.com/coverage/v2/point/${lng},${lat}?apikey=${$nearToken}&limit=1&until=${
          new Date($untilDate).toISOString().split("T")[0]
        }`
      )
      const json = await response.json()
      survey = `${$activeAerial.attribution} survey from ${new Date(
        json.surveys[0].captureDate
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      })}`
    } else {
      survey = $activeAerial.attribution
    }
    return `
      <div class="text-sm text-center">
        ${location ? `<div class="font-semibold">${location.label}</div>` : ""}
        ${location ? `<div class="mb-2">PID ${location.pid}</div>` : ""}
        <div>${survey}</div>
        <div>
          <a href="https://mcmap.org/geoportal/#${lng},${lat}/schools" target="_blank">GeoPortal</a> 	&#9702;
          ${
            location
              ? ` <a href="https://polaris3g.mecklenburgcountync.gov/#&pid=${location.pid}" target="_blank">POLARIS</a> 	&#9702;`
              : ""
          }
          <a href="http://maps.co.mecklenburg.nc.us/meckscope/?lat=${lat}&lon=${lng}" target="_blank">Eagle View</a> 	&#9702;
          <a href="https://www.google.com/maps/@${lat},${lng},18z" target="_blank">Google Maps</a>
        </div>
    `
  }

  function initMap(node) {
    const boundary = L.geoJSON(geoBoundary, {
      style: {
        fill: false
      }
    })
    map = L.map(node, {
      //maxBounds: boundary.getBounds(),
      attributionControl: false,
      preferCanvas: true
    })

    // zoom to hash on load, otherwise zoom to county
    const hash = document.location.hash.replace('#', '').split('/')
    if (hash.length === 4 && !isNaN(hash[0]) && !isNaN(hash[1]) || !isNaN(hash[2]) &&  !isNaN(hash[3])) {
      map.setView([hash[1], hash[0]], hash[2])
      $untilDate = parseInt(hash[3])
    } else {
      map.fitBounds(boundary.getBounds())
    }

    // add county outline to map
    boundary.addTo(map)

    // map popup
    map.on("click", (evt) => {
      popupText(evt.latlng.lng, evt.latlng.lat).then((content) => {
        if (popup) {
          popup.remove()
        }
        popup = L.popup().setLatLng(evt.latlng).setContent(content).openOn(map)
      })
    })

    map.on("moveend", (evt) => {
      const center = map.getCenter()
      $mapLocation = [center.lng, center.lat, map.getZoom()]
    })

    // attribution control
    L.control.attribution({ prefix: false }).addTo(map)
    //layer control
    L.control.layers(null, overlays, { position: 'bottomleft' }).addTo(map)

    // time machine glass
    magnifyingGlass = magGlass({
      zoomOffset: 0,
      radius: 130,
      boundary: boundary,
      layer: L.tileLayer("https://mcmap.org/tiles/1938/{z}/{x}/{y}.jpg", {
        minZoom: 9,
        maxZoom: 22,
        maxNativeZoom: 17,
        minNativeZoom: 8
      })
    })

    btnControl({
      title: "Time Machine portal",
      onClick: handleMagGlass,
      toggleClass: "glassactive",
      buttonClass: "leaflet-control-magnifying-glass"
    }).addTo(map)
  }
</script>

<div use:initMap id="#map" class="w-full h-full z-0" />
<Search />

<style>
  :global(.leaflet-container) {
    background-color: black;
  }
</style>
