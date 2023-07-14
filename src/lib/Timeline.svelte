<script>
  import { aerials, split } from '../store'

  export let dte
  export let reverse = false
  export let hideSplit = false


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

<style>
  .reverse {
    @apply flex-row-reverse text-right;
  }
</style>

<div class="px-1 flex items-center gap-2 w-full" class:reverse={reverse} class:hidden={hideSplit && !$split}>
  <div class="grow hidden md:block print:hidden">
    <input class="w-full print:hidden" on:change={() => timestampSnap(componentTimestamp)} aria-label="Time slider" type="range" bind:value={componentTimestamp} min={$aerials[$aerials.length - 1].flydate} max={$aerials[0].flydate} list="steplist">
    <datalist id="steplist">
      <option>{new Date().getTime()}</option>
      {#each $aerials as survey}
        <option>{survey.flydate}</option>
      {/each}
    </datalist>
  </div>
  <div>
    <select class="focus:outline-0 font-medium bg-transparent print:appearance-none print:text-black" bind:value={componentTimestamp} on:change={() => setTimestamp(componentTimestamp)}>
      {#each $aerials as aerial}
      <option class="bg-slate-800 text-white" value="{aerial.flydate}">{aerial.capturedate}</option>
      {/each}
    </select>
  </div>
</div>
