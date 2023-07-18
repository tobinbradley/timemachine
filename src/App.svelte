<script>
  import Map from './lib/Map.svelte'
  import Time from './lib/Time.svelte'
  import { aerials, split } from './store'

  let dialog
  let showHelp = false
  let print = false

  window.addEventListener("afterprint", (event) => {
    print = false
  })

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function printPreview() {
    print = !print
    if (print) {
      await sleep(600)
      window.print()
    }
  }

  function openHelp() {
    dialog.showModal()
    showHelp = true
    dialog.addEventListener('close', () => {
      showHelp = false
    })
  }
</script>

<style>
  .print {
    width: 10in;
    height: 7.7in;
    margin: 0 auto;
  }

  .help-dialog {
    width: 80dvw;
    height: 80dvh;
  }

  .help-dialog::backdrop {
    background-color: rgba(0,0,0,0.5);
  }
</style>

<main class="w-screen h-screen flex flex-col print:text-black fill-white text-white bg-slate-800" class:print={print}>
  <header class="flex items-center shadow z-10">
    <div class="grow pl-4">
      <a href="./" class="text-xl leading-none font-semibold "><span class="hidden sm:inline">Mecklenburg County </span>Time Machine</a>
    </div>
    <div>
      <button
      on:click={printPreview}
      class="px-2 h-full border-b-2 border-transparent hover:border-b-white md:px-4 py-3 leading-[22px] md:px-3 transition-colors duration-300 ease-in-out outline-0">
        <svg class="w-5 h-6 inline"><use xlink:href="#icon-printer"></use></svg>
      </button>
    </div>
    <div class="print:hidden">
      <button
      on:click={openHelp}
      class="px-2 h-full border-b-2 border-transparent hover:border-b-white md:px-4 py-3 leading-[22px] md:px-3 transition-colors duration-300 ease-in-out outline-0">
        <svg class="w-5 h-6 inline"><use xlink:href="#icon-question-circle"></use></svg>
      </button>
    </div>
  </header>
  <div class="flex-grow relative flex flex-row">
    {#if $aerials}
    <Map />
    {/if}
    {#if $split}
    <div class="absolute top-0 bottom-0 left-1/2 bg-slate-800 w-1 pointer-events-none"></div>
    {/if}
  </div>
  <div>
    {#if $aerials}
    <Time />
    {/if}
  </div>
</main>

<dialog class="help-dialog rounded-lg bg-slate-800 text-white" bind:this={dialog}>
  <div class="flex flex-col h-full">
    <div class="text-right p-3">
      <form method="dialog">
        <button class="text-white font-semibold py-1 px-2 bg-primaryPoppyRed rounded shadow-sm hover:shadow transition-all ease-in-out">Close</button>
      </form>
    </div>

    <div class="grow aspect-video">
      {#if showHelp}
      <iframe class="w-full h-full" src="https://www.youtube.com/embed/nSLLe6ne7No" title="YouTube video player" frameborder="0"></iframe>
      {/if}
    </div>

    <div class="text-center p-3">
      <a href="https://github.com/tobinbradley/timemachine" target="_blank"
      class="px-4 hover:underline">Time Machine on Github</a> &bullet;
      <a href="https://gis.mecknc.gov" target="_blank"
      class="px-4 hover:underline">Mecklenburg County GIS</a>
    </div>
  </div>
</dialog>


<symbol id="icon-printer" viewBox="0 0 32 32">
<path d="M8 2h16v4h-16v-4z"></path>
<path d="M30 8h-28c-1.1 0-2 0.9-2 2v10c0 1.1 0.9 2 2 2h6v8h16v-8h6c1.1 0 2-0.9 2-2v-10c0-1.1-0.9-2-2-2zM4 14c-1.105 0-2-0.895-2-2s0.895-2 2-2 2 0.895 2 2-0.895 2-2 2zM22 28h-12v-10h12v10z"></path>
</symbol>
<symbol id="icon-question-circle" viewBox="0 0 24 28">
<path d="M14 21.5v-3c0-0.281-0.219-0.5-0.5-0.5h-3c-0.281 0-0.5 0.219-0.5 0.5v3c0 0.281 0.219 0.5 0.5 0.5h3c0.281 0 0.5-0.219 0.5-0.5zM18 11c0-2.859-3-5-5.688-5-2.547 0-4.453 1.094-5.797 3.328-0.141 0.219-0.078 0.5 0.125 0.656l2.063 1.563c0.078 0.063 0.187 0.094 0.297 0.094 0.141 0 0.297-0.063 0.391-0.187 0.734-0.938 1.047-1.219 1.344-1.437 0.266-0.187 0.781-0.375 1.344-0.375 1 0 1.922 0.641 1.922 1.328 0 0.812-0.422 1.219-1.375 1.656-1.109 0.5-2.625 1.797-2.625 3.313v0.562c0 0.281 0.219 0.5 0.5 0.5h3c0.281 0 0.5-0.219 0.5-0.5v0c0-0.359 0.453-1.125 1.188-1.547 1.188-0.672 2.812-1.578 2.812-3.953zM24 14c0 6.625-5.375 12-12 12s-12-5.375-12-12 5.375-12 12-12 12 5.375 12 12z"></path>
</symbol>
