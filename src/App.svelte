<script>
  import Map from './lib/Map.svelte'
  import Time from './lib/Time.svelte'
  import Help from './lib/Help.svelte'
  import { untilDate, portalDate, portalOpen } from './store'
</script>

<main class="bg-gray-300 w-screen h-screen flex flex-col">
  <div class=" bg-white flex items-center shadow z-10">
    <div class="text-2xl font-semibold flex-grow p-2">
      <a href="./"><span class="font-bold text-emerald-700 tracking-widest">TIME</span>
      MACHINE</a>
    </div>
    <div>
      <Help />
    </div>
  </div>
  <div class="flex-grow relative">
    <Map />
  </div>
  <div>
    {#if $portalOpen}
    <Time dte={portalDate} isPortal={true} />
    {/if}
    <Time dte={untilDate} />
  </div>
</main>
