<script>
  import Map from './lib/Map.svelte'
  import Time from './lib/Time.svelte'
  import Help from './lib/Help.svelte'
  import { aerials, untilDate, portalDate, portalOpen } from './store'
</script>

<main class="bg-gray-300 w-screen h-screen flex flex-col">
  <header class=" bg-white flex items-center shadow z-10" style="height: 50px;">
    <div class="text-2xl font-semibold flex-grow p-2">

      <a href="./"><span class="font-bold text-emerald-700 tracking-widest">TIME</span>
      MACHINE</a>
    </div>
    <div class="print:hidden">
      <Help />
    </div>
  </header>
  <div class="flex-grow relative">
    {#if $aerials}
    <Map />
    {/if}
  </div>
</main>
