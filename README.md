# Time Machine

Aerial viewer built using Leaflet, Svelte, and TailwindCSS. [Demo site](https://timemachine.mcmap.org).

## Instructions

* Dev Server: `npm run dev`
* Build: `npm run build`

Aerial layers are defined in `src/assets/surveys.json`. If you have purchased access to the NearMap API, you can create a `.env` file in the main folder with you key. The NearMap aerials available for your area (defined by a polygon in `src/store.js`) will be merged with your imagery timeline.

```env .env
VITE_NEARTOKEN=<key>
```
