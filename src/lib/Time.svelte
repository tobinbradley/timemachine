<script>
  import { aerials } from '../store'

  export let dte
  export let isPortal = false

  let componentTimestamp = $dte

  function timestampSnap(stamp) {
    let closest = $aerials.reduce((prev, curr) => {
      return (Math.abs(curr.flydate - stamp) < Math.abs(prev.flydate - stamp) ? curr : prev);
    })

    setTimestamp(closest.flydate)
  }

  function setTimestamp(stamp) {
    $dte = stamp
    componentTimestamp = stamp
  }

</script>


<div class="px-2 flex items-center gap-2 bg-white py-1 w-full" class:accent={isPortal}>
  <div class="w-7 text-center print:hidden">
    {#if !isPortal}
    <svg class="w-5 h-7 inline fill-gray-700"><use xlink:href="#icon-map"></use></svg>
    {:else}
    <img src="img/logo.svg" alt="Time Machine Logo" class="w-auto h-6">
    {/if}
  </div>
  <div class="flex-grow">
    <input class="w-full print:hidden" on:change={() => timestampSnap(componentTimestamp)} aria-label="Time slider" type="range" bind:value={componentTimestamp} min={$aerials[$aerials.length - 1].flydate} max={$aerials[0].flydate} list="steplist">
    <datalist id="steplist">
      <option>{new Date().getTime()}</option>
      {#each $aerials as survey}
        <option>{survey.flydate}</option>
      {/each}
    </datalist>
  </div>
  <div>
    <select class="focus:outline-0 font-medium" bind:value={componentTimestamp} on:change={() => setTimestamp(componentTimestamp)}>
      {#each $aerials as aerial}
      <option value="{aerial.flydate}">{new Date(aerial.flydate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</option>
      {/each}
    </select>
  </div>
</div>

<symbol id="icon-map" viewBox="0 0 32 32">
  <path d="M0 6l10-4v24l-10 4z"></path>
  <path d="M12 1l10 6v23l-10-5z"></path>
  <path d="M24 7l8-6v24l-8 6z"></path>
</symbol>

<style>
  .accent {
    @apply bg-emerald-500;
  }
</style>