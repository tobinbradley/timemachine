<script>
  import { createEventDispatcher } from 'svelte'
  import Spinner from './Spinner.svelte'

  const dispatch = createEventDispatcher()

  export let name= '';
  export let value= '';
  export let placeholder = '';
  export let items= [];
  export let nomatch = false
  export let isOpen= false;
  export let results= [];
  export let search = value;
  export let arrowCounter= 0;
  export let minChar= 2
  export let spinner = false

  let maxItems= 10;
  let fromStart= false; // Default type ahead
  let list;
  let input;

  function focusOnMount(node) {
    node.focus()
  }

  // debounce
  const debounce = (fn, time) => {
    let timeout
    return function () {
      const functionCall = () => fn.apply(this, arguments)
      clearTimeout(timeout)
      timeout = setTimeout(functionCall, time)
    }
  }

  const regExpEscape = (s) => {
    return s.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&")
  }

  $: if (items.length > 0) {
    filterResults()
  }

  async function onChange (event) {
    if (search.trim().length >= Number(minChar)) {
      isOpen = true;
      (debounce((e) => {
        dispatch('query', search)
      }, 200))()
    } else {
      isOpen = false
    }
  }

  function filterResults () {
    results = items.map(item => {
      const text = typeof item !== 'string' ? item.value : item
      return {
        value: item.value || item,
        type: item.type,
        label: search.trim() === '' ? text : text.replace(RegExp(regExpEscape(search.trim()), 'i'), "<span class='text-gray-700 font-bold'>$&</span>")
      }
    });
  }

  function onKeyDown (event) {
    if (event.key === 'ArrowDown' && arrowCounter < results.length) {
      arrowCounter =  arrowCounter + 1
    } else if (event.key === "ArrowUp" && arrowCounter > 0) {
      arrowCounter =  arrowCounter - 1;
    } else if (event.key === "Enter") {
      event.preventDefault()
      if (arrowCounter === -1) {
        arrowCounter = 0 // Default select first item of list
      }
      close(arrowCounter)
    } else if (event.key === "Escape") {
      isOpen = false
    }
  }

  function close (index = -1) {
    isOpen = false;
    arrowCounter = -1;

    if (index > -1) {
      input.blur()
      value = results[index].value
      search = value
      dispatch('hit', items[index])
    } else if (!value) {
      isOpen = false
    }
  }
  </script>

  <style>
  .autocomplete-results {
    top: 40px;
    max-height: 100vh;
  }

  .autocomplete-nomatch {
    @apply text-gray-700 font-bold py-1 px-2;
  }

  .autocomplete-result.is-active,
  .autocomplete-result:hover {
    @apply bg-orange-200;
  }

  input {
    user-select: all;
  }
  </style>

  <svelte:window on:click="{()=>close()}" />

  <div class="absolute top-3 right-3 z-50 w-96 print:hidden" style="max-width: 80dvw">
    <input
      class=" bg-white w-full rounded text-gray-900 px-2 py-1 shadow focus:outline-primaryPoppyRed"
      type="text"
      aria-label="search for an address or a place"
      {name}
      {placeholder}
      autocomplete="{name}"
      bind:value="{search}"
      on:input="{(event)=>onChange(event)}"
      on:keydown="{(event)=>onKeyDown(event)}"
      on:click={input.select()}
      bind:this={input}
      use:focusOnMount
    >
    {#if spinner}
      <Spinner />
    {/if}

    <ul class="autocomplete-results {!isOpen ? 'hidden' : ''} border-gray-500 shadow-lg rounded-lg mx-1 bg-white max-h-screen overflow-y-auto overflow-x-hidden z-50" bind:this={list}>
      {#if !nomatch}
        {#each results as result, i}
          <li   class="autocomplete-result { i === arrowCounter ? ' is-active' : '' }  text-gray-700 text-sm py-1 px-2 cursor-pointer">
          <button class="block" on:keypress="{()=>close(i)}" on:click="{()=>close(i)}">{@html result.label}</button>
          </li>
        {/each}
      {:else}
        <li class="autocomplete-nomatch">No matches found.</li>
      {/if}
    </ul>
  </div>
