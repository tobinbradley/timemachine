<script>
  import Map from './lib/Map.svelte'
  import Time from './lib/Time.svelte'
  import Help from './lib/Help.svelte'
  import { aerials, split, print } from './store'
</script>

<style>
  .print {
    width: 10in;
    height: 7.7in;
    margin: 0 auto;
  }
</style>

<main class="w-screen h-screen flex flex-col bg-slate-800 text-white print:text-black fill-white" class:print={$print}>
  <header class="flex items-center shadow z-10">
    <div class="grow pl-4">
      <a href="./" class="text-lg leading-none font-semibold "><span class="hidden sm:inline">Mecklenburg County </span>Time Machine</a>
    </div>
    <div>
      <button
      on:click={() => { $print = !$print }}
      class="px-2 h-full border-b-2 border-transparent hover:border-b-white md:px-6 py-3 leading-[22px] md:px-3 transition-colors duration-300 ease-in-out outline-0">
        <svg class="w-5 h-6 inline"><use xlink:href="#icon-printer"></use></svg>
      </button>
    </div>
    <div class="print:hidden">
      <Help />
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

<symbol id="icon-printer" viewBox="0 0 32 32">
<path d="M8 2h16v4h-16v-4z"></path>
<path d="M30 8h-28c-1.1 0-2 0.9-2 2v10c0 1.1 0.9 2 2 2h6v8h16v-8h6c1.1 0 2-0.9 2-2v-10c0-1.1-0.9-2-2-2zM4 14c-1.105 0-2-0.895-2-2s0.895-2 2-2 2 0.895 2 2-0.895 2-2 2zM22 28h-12v-10h12v10z"></path>
</symbol>