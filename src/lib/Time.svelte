<script>
  import { split, untilDate, portalDate } from '../store'
  import Timeline from './Timeline.svelte'

</script>

<style>
  .active {
    @apply bg-pink-500 fill-white;
  }
</style>


<div class="flex items-center gap-2 bg-white w-full rounded-lg ">
  {#if $split}
  <Timeline dte={portalDate} reverse={true} hideSplit={true}/>
  {/if}
  <div class="hidden md:block">
    <button
    class="bg-gray-200  fill-gray-900 drop-shadow hover:border-pink-400 hover:fill-pink-400 transition-colors duration-300 ease-in-out rounded pb-2 pt-1  px-2"
    class:active={$split}
    on:click={() => { $split = !$split } }>
      <svg class="w-5 h-5 inline rotate-90"><use xlink:href="#icon-pagebreak"></use></svg>
    </button>
  </div>
  <Timeline dte={untilDate} />
</div>


<symbol id="icon-pagebreak" viewBox="0 0 32 32">
<path d="M8 12v-12h24v12h-2v-10h-20v10zM32 18v14h-24v-14h2v12h20v-12zM16 14h4v2h-4zM10 14h4v2h-4zM22 14h4v2h-4zM28 14h4v2h-4zM0 9l6 6-6 6z"></path>
</symbol>