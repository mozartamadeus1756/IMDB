<script>

  import BackButton from "../BackButton.svelte";
  
  let searchQuery = '';
  let filteredItems = [];
  
  // Example data - replace with your own data or API call
  const items = [
    'Apple',
    'Banana',
    'Cherry',
    'Dragonfruit',
    'Elderberry',
    'Fig',
    'Grape',
    'Honeydew'
  ];
  
  // Simple search function
  function handleSearch() {
    if (searchQuery.trim() === '') {
      filteredItems = [];
    } else {
      filteredItems = items.filter(item => 
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  }

</script>

<BackButton />
  
<div class="search-container">
  <h2>searhc movies !!</h2>
  
  <div class="search-input">
    <input
      type="text"
      placeholder="search items..."
      bind:value={searchQuery}
      on:input={handleSearch}
    />
  </div>
  
  {#if searchQuery.trim() !== ''}
    <div class="search-results">
      {#if filteredItems.length > 0}
        <ul>
          {#each filteredItems as item}
            <li>{item}</li>
          {/each}
        </ul>
      {:else}
        <p>No results found for "{searchQuery}"</p>
      {/if}
    </div>
  {/if}
</div>

<style>
  .search-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    font-family: sans-serif;
  }
  
  .search-input input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .search-results {
    margin-top: 20px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
  
  li:hover {
    background-color: #f9f9f9;
  }
</style>
  