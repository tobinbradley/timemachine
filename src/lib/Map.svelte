<script>
  import {
    nearToken,
    untilDate,
    portalDate,
    location,
    aerials,
    mapLocation,
    split
  } from "../store"
  import Time from './Time.svelte'
  import Search from "./Search.svelte"
  import "leaflet/dist/leaflet.css"
  import L from "leaflet"
  import geoBoundary from "../assets/geoboundary.json"
  import overlays from '../assets/overlays'

  let leftLayer
  let rightLayer

  let map
  let marker
  let popup
  let currentLabel = ""
  let activeAerial

  split.subscribe(val => {
    if (map && $aerials) clip()
    if (popup && popup.isOpen()) {
      const latlng = popup.getLatLng()
      popupText(latlng.lng, latlng.lat).then((content) => {
        popup.setContent(content)
      })
    }
  })

  $: if (map && $aerials && $untilDate && portalDate) {
    const r = $aerials.filter(elem => elem.flydate === $untilDate)[0]
    const l = $aerials.filter(elem => elem.flydate === $portalDate)[0]

    if (!leftLayer || leftLayer._url !== l.url) {
      if (leftLayer) leftLayer.remove()
      leftLayer = L.tileLayer(l.url, {
        attribution: l.attribution,
        maxZoom: 23,
        maxNativeZoom: l.maxzoom,
        minNativeZoom: l.minzoom,
        minZoom: 9
      })

    }

    if (!rightLayer || rightLayer._url !== r.url) {
      if (rightLayer) rightLayer.remove()
      rightLayer = L.tileLayer(r.url, {
        attribution: r.attribution,
        maxZoom: 23,
        maxNativeZoom: r.maxzoom,
        minNativeZoom: r.minzoom,
        minZoom: 9
      }).addTo(map)
    }

    clip()
  }

  $: if ($untilDate && $portalDate && popup && popup.isOpen()) {
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

  $: if ($location.label && map && $location.label !== currentLabel) {
    currentLabel = $location.label
    if (marker) marker.remove()
    marker = L.marker($location.latlng).addTo(map)
    map.flyTo($location.latlng, activeAerial.maxzoom < 20 ? activeAerial.maxzoom : 20)

    popupText($location.latlng[1], $location.latlng[0], $location).then(
      (content) => {
        marker.bindPopup(content)
      }
    )
  }

  async function popupText(lng, lat, location = null) {
    const r = $aerials.filter(elem => elem.flydate === $untilDate)[0]
    const l = $aerials.filter(elem => elem.flydate === $portalDate)[0]

    let survey = []

    for (const elem of [l,r]) {
      if (elem.attribution === "Nearmap") {
        const response = await fetch(
          `https://api.nearmap.com/coverage/v2/point/${lng},${lat}?apikey=${$nearToken}&limit=1&until=${
            new Date(elem.flydate).toISOString().split("T")[0]
          }`
        )
        const json = await response.json()
        survey.push(`${new Date(
          json.surveys[0].captureDate
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric"
        })} ${elem.attribution}`)
      } else {
        survey.push(elem.attribution)
      }
    }

    return `
      <div class="text-sm text-center">
        ${location ? `<div class="font-semibold">${location.label}</div>` : ""}
        ${location ? `<div class="mb-2">PID ${location.pid}</div>` : ""}
        <div>
          ${$split ? 'Left: ' + survey[0] + '<br>' + 'Right: ' + survey[1] : survey[1]}
        </div>
        <div>
          <a href="https://mcmap.org/geoportal/#${lng},${lat}/schools" target="_blank">GeoPortal</a> 	&#9702;
          ${
            location
              ? ` <a href="https://polaris3g.mecklenburgcountync.gov/#&pid=${location.pid}" target="_blank">POLARIS</a> 	&#9702;`
              : ""
          }
          <a href="http://maps.co.mecklenburg.nc.us/meckscope/?lat=${lat}&lon=${lng}" target="_blank">EagleView</a> &#9702;
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
      const center = map.getCenter()
      $mapLocation = [center.lng, center.lat, map.getZoom()]
    } else {
      //map.fitBounds(boundary.getBounds())
      map.setView([35.228, -80.84411], 15)
      $mapLocation = [-80.84411, 35.228, 15]
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


    map.on("resize", clip)
    map.on("move", clip)

    L.control.layers(null, overlays, { position: 'topright' }).addTo(map)

  }

  function clip() {
    if (map.getSize().x <= 640) {
      $split = false
    }

    if ($split) {
      const nw = map.containerPointToLayerPoint([0, 0])
      const se = map.containerPointToLayerPoint(map.getSize())

      const top = nw.y
      const middle = nw.x + (se.x - nw.x) * 0.5
      const right = nw.x + (se.x - nw.x)
      const bottom = se.y
      const left = nw.x

      if (!map.hasLayer(leftLayer)) leftLayer.addTo(map)

      leftLayer.getContainer().style.clipPath = `
          polygon(
            ${left}px ${top}px,
            ${middle}px ${top}px,
            ${middle}px ${bottom}px,
            ${left}px ${bottom}px
          )`

      rightLayer.getContainer().style.clipPath = `
          polygon(
            ${middle}px ${top}px,
            ${right}px ${top}px,
            ${right}px ${bottom}px,
            ${middle}px ${bottom}px
          )`

    } else {
      if (map.hasLayer(leftLayer)) map.removeLayer(leftLayer)
      rightLayer.getContainer().style.clipPath = ''
    }
  }
</script>

<div use:initMap id="#map" class="w-full h-full z-0" />
<Search />

<div class="absolute bottom-2 left-4 right-4 z-50 md:flex md:gap-3">
  <Time />
</div>
