import "./app.css"
import App from "./App.svelte"
import './lib/registerServiceWorker'

const app = new App({
  target: document.getElementById("app")
})

export default app
