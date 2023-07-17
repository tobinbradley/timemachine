<script>
  import { split, untilDate, portalDate } from '../store'
  import Timeline from './Timeline.svelte'

</script>

<style>
  button {
    @apply bg-slate-600 fill-white hover:bg-slate-700 text-slate-800 font-bold py-1 px-4 focus:outline-none transition-colors;
  }
  .active {
    @apply bg-primaryPoppyRed hover:bg-primaryPoppyRed text-white text-sm font-semibold  fill-white;
  }
</style>


<div class="flex items-center gap-2 w-full p-1">
  {#if $split}
    <Timeline dte={portalDate} reverse={true} hideSplit={true}  />
  {/if}
  <div class="print:hidden">
    <div class="inline-flex">
      <button class="rounded-l"
        title="Full Screen Map"
        class:active={!$split}
        on:click={() => { $split = false } }>
        <svg class="w-5 h-6 inline"><use xlink:href="#icon-square"></use></svg>
      </button>
      <button class="rounded-r"
        title="Split Screen Map"
        class:active={$split}
        on:click={() => { $split = true } }>
        <svg class="w-5 h-6 inline rotate-90"><use xlink:href="#icon-page-break"></use></svg>
      </button>
    </div>
  </div>
  <Timeline dte={untilDate} />
</div>


<symbol id="icon-page-break" viewBox="0 0 32 32">
<path d="M0 16h4v2h-4zM6 16h6v2h-6zM14 16h4v2h-4zM20 16h6v2h-6zM28 16h4v2h-4zM27.5 0l0.5 14h-24l0.5-14h1l0.5 12h20l0.5-12zM4.5 32l-0.5-12h24l-0.5 12h-1l-0.5-10h-20l-0.5 10z"></path>
</symbol>
<symbol id="icon-square" viewBox="0 0 24 24">
<path d="M5 2c-0.828 0-1.58 0.337-2.121 0.879s-0.879 1.293-0.879 2.121v14c0 0.828 0.337 1.58 0.879 2.121s1.293 0.879 2.121 0.879h14c0.828 0 1.58-0.337 2.121-0.879s0.879-1.293 0.879-2.121v-14c0-0.828-0.337-1.58-0.879-2.121s-1.293-0.879-2.121-0.879zM5 4h14c0.276 0 0.525 0.111 0.707 0.293s0.293 0.431 0.293 0.707v14c0 0.276-0.111 0.525-0.293 0.707s-0.431 0.293-0.707 0.293h-14c-0.276 0-0.525-0.111-0.707-0.293s-0.293-0.431-0.293-0.707v-14c0-0.276 0.111-0.525 0.293-0.707s0.431-0.293 0.707-0.293z"></path>
</symbol>