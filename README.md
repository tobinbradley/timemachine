# timemachine
Mecklenburg County historical aerials viewer. [DEMO](http://timemachine.mcmap.org/)

You'll need `git` and `Node` to get started. 

```bash
git clone https://github.com/tobinbradley/timemachine.git
cd timemachine
npm install
```

To run the project with a development server, `npm run serve`. To build the project for production, `npm run build` and copy the contents of the `dist` folder to your web server. It's simple HTML/CSS/JS, so no server side processing setup is required.

To customize the code for another municipality, change the map initial center/zoom in `src/main.js`, and change the layer code in `src/js/layers.js` to point to your aerial sources.

The search is set up for Mecklenburg using a fork of Mapbox's [mapbox-gl-geocoder](https://github.com/mapbox/mapbox-gl-geocoder). You could fork the fork and customize something using your own API, or you could use Mapbox's geocoder with their API, the latter being the easiest way to go.
