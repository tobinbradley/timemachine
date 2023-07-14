import { writable, readable, derived, get } from 'svelte/store'
import meckaerials from './assets/surveys.json'

// API tokens
export const nearToken = readable(import.meta.env.VITE_NEARTOKEN)

function timestampSnap(stamp) {
  let closest = get(aerials).reduce((prev, curr) => {
    return Math.abs(curr.flydate - stamp) < Math.abs(prev.flydate - stamp)
      ? curr
      : prev
  })

  return closest.flydate
}

// split screen
export let split = writable(false)

export let print = writable(false)

// surveys
export let aerials = writable(null)
const makeAerials = []
meckaerials.forEach(el => {
  makeAerials.push({
    url: el.url,
    flydate: new Date(el.flydate).getTime(),
    capturedate: el.flydate,
    minzoom: el.minzoom,
    maxzoom: el.maxzoom,
    attribution: `${el.flydate} Mecklenburg County GIS`
  })
})

if (!import.meta.env.VITE_NEARTOKEN) {
  makeAerials.sort((a, b) => b.flydate - a.flydate)
  aerials.set(makeAerials)
} else {
  fetch(`https://api.nearmap.com/coverage/v2/poly/-81.058205,35.00216,-80.550109,35.00216,-80.550109,35.5148,-81.058205,35.5148,-81.058205,35.00216?apikey=${import.meta.env.VITE_NEARTOKEN}&limit=200`)
    .then(response => {
      if (!response.ok) {
          throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then(json => {
      json.surveys.forEach(el => {
        makeAerials.push({
          url: `https://api.nearmap.com/tiles/v3/Vert/{z}/{x}/{y}.img?apikey=${import.meta.env.VITE_NEARTOKEN}&until=${el.captureDate}`,
          flydate: new Date(el.captureDateTime).getTime(),
          capturedate: el.captureDate,
          minzoom: 0,
          maxzoom: el.resources.tiles[0].scale,
          attribution: "Nearmap"
        })
      })
      makeAerials.sort((a, b) => b.flydate - a.flydate)
      aerials.set(makeAerials)
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    })
}

// set active dates
export let portalDate = writable(null)
export let untilDate = writable(null)
aerials.subscribe(arr => {
  if (arr) {
    portalDate.set(arr[arr.length - 1].flydate)

    const hash = document.location.hash.replace("#", "").split("/")
    if (hash.length === 4 && !isNaN(hash[3])) {
      untilDate.set(timestampSnap(hash[3]))
    } else {
      untilDate.set(arr[0].flydate)
    }
  }
})

// Search results
export let location = writable({
  label: null,
  address: null,
  latlng: null,
  pid: null,
  groundpid: null
})

// map location [lng,lat,zoom]
export let mapLocation = writable([-80.84411, 35.228, 15])


const hash = document.location.hash.replace("#", "").split("/")
if (
  (hash.length === 4 && !isNaN(hash[0]) && !isNaN(hash[1])) ||
  (!isNaN(hash[2]) && !isNaN(hash[3]))
) {
  mapLocation.set([hash[1], hash[0], hash[2]])
}

// set hash
mapLocation.subscribe(value => {
  setHash()
})

untilDate.subscribe(value => {
  setHash()
})

function setHash() {
  if (get(mapLocation) && get(untilDate)) {
    const loc = get(mapLocation)
    document.location.hash = `${loc[1]}/${loc[0]}/${loc[2]}/${get(untilDate)}`
  }
}
