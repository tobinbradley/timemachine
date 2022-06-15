<script>
let dialog
let showHelp = false

function openHelp() {
  dialog.showModal()
  showHelp = true
  dialog.addEventListener('close', () => {
    showHelp = false
  })
}

</script>

<div class="h-full">
  <button class="px-2 lg:px-6 py-4 border-b-2 border-transparent hover:border-b-emerald-500 leading-[22px] md:px-3 text-gray-600 hover:text-emerald-600 transition-colors duration-300 ease-in-out outline-0" on:click={openHelp}>Help</button>
</div>

<dialog class="help-dialog" bind:this={dialog}>
  <div class="text-right">
    <form method="dialog">
      <button class="text-white font-semibold py-1 px-2 mb-1 bg-emerald-600 rounded shadow-sm hover:shadow hover:bg-emerald-700 transition-all ease-in-out">Close</button>
    </form>
  </div>

  {#if showHelp}
  <iframe class="w-full aspect-video" src="https://www.youtube.com/embed/nSLLe6ne7No" title="YouTube video player" frameborder="0"></iframe>
  {/if}

  <div class="text-center mt-2">
    <a href="https://github.com/tobinbradley/timemachine" target="_blank"
    class="px-4 text-blue-700 hover:underline hover:text-blue-800 transition-all ease-in-out">Time Machine on Github</a> &bullet;
    <a href="https://gis.mecknc.gov" target="_blank"
    class="px-4 text-blue-700 hover:underline hover:text-blue-800 transition-all ease-in-out">Mecklenburg County GIS</a>
  </div>
</dialog>

<style>
.help-dialog {
  width: 80%;
  max-height: 100vh;
}

.help-dialog::backdrop {
  background-color: rgba(0,0,0,0.5);
}
</style>
