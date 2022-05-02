<script>
  import {
    nearToken,
    untilDate,
    portalDate,
    location,
    activeAerial,
    activePortal,
    portalOpen
  } from "../store"
  import Search from "./Search.svelte"
  import "leaflet/dist/leaflet.css"
  import L from "leaflet"
  import countyBoundary from "../assets/countyboundary.json"
  import "./leaflet.glass"
  import "./leaflet-hash"

  let map
  let activeTiles
  let portalTiles
  let marker
  let popup
  let magnifyingGlass

  $: if (map && $activeAerial) {
    if (activeTiles) activeTiles.remove()
    activeTiles = L.tileLayer($activeAerial.url, {
      attribution: $activeAerial.attribution,
      maxZoom: $activeAerial.maxzoom + 1 <= 22 ? $activeAerial.maxzoom + 1 : 22,
      maxNativeZoom: $activeAerial.maxzoom,
      minNativeZoom: $activeAerial.minzoom,
      minZoom: 9
    }).addTo(map)
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
    map.flyTo($location.latlng, 20)

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

  async function popupText(lng, lat, location = null) {
    let survey
    if ($activeAerial.attribution === "Near Map") {
      const response = await fetch(
        `https://api.nearmap.com/coverage/v2/point/${lng},${lat}?apikey=${$nearToken}&limit=1&until=${
          new Date($untilDate * 1000).toISOString().split("T")[0]
        }`
      )
      const json = await response.json()
      survey = `${$activeAerial.attribution} survey from ${new Date(json.surveys[0].captureDate).toLocaleDateString("en-US", {
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
    const boundary = L.geoJSON(countyBoundary, {
      style: {
        fill: false
      }
    })
    map = L.map(node, {
      maxBounds: boundary.getBounds(),
      attributionControl: false
    }).fitBounds(boundary.getBounds())

    new L.Hash(map)

    L.control.attribution({ prefix: false }).addTo(map)

    const overlays = {
      "2016 Tree Canopy": L.tileLayer('https://mcmap.org/tiles/treecanopy2016/{z}/{x}/{y}.png', {
        maxZoom: 17,
        maxNativeZoom: 16,
        minNativeZoom: 9,
        minZoom: 9
      }),
      "2012 Tree Canopy": L.tileLayer('https://mcmap.org/tiles/treecanopy2012/{z}/{x}/{y}.png', {
        maxZoom: 17,
        maxNativeZoom: 16,
        minNativeZoom: 9,
        minZoom: 9
      }),
      "2008 Tree Canopy": L.tileLayer('https://mcmap.org/tiles/treecanopy2008/{z}/{x}/{y}.png', {
        maxZoom: 17,
        maxNativeZoom: 16,
        minNativeZoom: 9,
        minZoom: 9
      }),
      "2001 Tree Canopy": L.tileLayer('https://mcmap.org/tiles/treecanopy2001/{z}/{x}/{y}.png', {
        maxZoom: 17,
        maxNativeZoom: 16,
        minNativeZoom: 9,
        minZoom: 9
      }),
    }
    L.control.layers(null, overlays).addTo(map)

    boundary.addTo(map)

    map.on("click", (evt) => {
      popupText(evt.latlng.lng, evt.latlng.lat).then((content) => {
        if (popup) {
          popup.remove()
        }
        popup = L.popup().setLatLng(evt.latlng).setContent(content).openOn(map)
      })
    })


    // mag glass control
    L.Control.MagnifyingGlass = L.Control.extend({
      _magnifyingGlass: false,

      options: {
        position: "topleft",
        title: "Toggle Magnifying Glass",
        forceSeparateButton: false
      },

      initialize: function (magnifyingGlass, options) {
        this._magnifyingGlass = magnifyingGlass
        // Override default options
        for (var i in options)
          if (options.hasOwnProperty(i) && this.options.hasOwnProperty(i))
            this.options[i] = options[i]
      },

      onAdd: function (map) {
        var className = "leaflet-control-magnifying-glass",
          container

        if (map.zoomControl && !this.options.forceSeparateButton) {
          container = map.zoomControl._container
        } else {
          container = L.DomUtil.create("div", "leaflet-bar")
        }

        this._createButton(
          this.options.title,
          className,
          container,
          this._clicked,
          map,
          this._magnifyingGlass
        )
        return container
      },

      _createButton: function (
        title,
        className,
        container,
        method,
        map,
        magnifyingGlass
      ) {
        var link = L.DomUtil.create("a", className, container)
        link.href = "#"
        link.title = title

        L.DomEvent.addListener(link, "click", L.DomEvent.stopPropagation)
          .addListener(link, "click", L.DomEvent.preventDefault)
          .addListener(
            link,
            "click",
            function () {
              method(map, magnifyingGlass)
            },
            map
          )

        return link
      },

      _clicked: function (map, magnifyingGlass) {
        if (!magnifyingGlass) {
          return
        }

        $portalOpen = !$portalOpen
        document.querySelector(".leaflet-control-magnifying-glass").classList.toggle("glassactive")

        if (map.hasLayer(magnifyingGlass)) {
          map.removeLayer(magnifyingGlass)
        } else {
          magnifyingGlass.addTo(map)
        }
      }
    })

    L.control.magnifyingglass = function (magnifyingGlass, options) {
      return new L.Control.MagnifyingGlass(magnifyingGlass, options)
    }

    magnifyingGlass = L.magnifyingGlass({
      zoomOffset: 0,
      radius: 130,
      boundary: boundary,
      layer: L.tileLayer('https://mcmap.org/tiles/1938/{z}/{x}/{y}.jpg', {
        minZoom: 9,
        maxZoom: 22,
        maxNativeZoom: 17,
        minNativeZoom: 8
      })
    })

    L.control
      .magnifyingglass(magnifyingGlass, {
        forceSeparateButton: true
      })
      .addTo(map)
  }
</script>

<div use:initMap id="#map" class="w-full h-full z-0" />
<Search />

<style>
  :global(.leaflet-container) {
    background-color: black;
  }
</style>
