<script>

  import BackButton from "../BackButton.svelte";

    let searchText = "";
    
    // skal connetcte noe til denne !! 
    let items = [

    ];
    
    // This will hold the filtered items
    let filteredItems = [...items];
    
    // This function runs when user submits the search
    function handleSearch(event) {
      // Prevent form from reloading the page
      event.preventDefault();
      
      // If search is empty, show all items
      if (!searchText.trim()) {
        filteredItems = [...items];
        return;
      }
      
      // Filter items that contain the search text
      filteredItems = items.filter(item => 
        item.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    // This function runs whenever the search text changes
    function handleInput() {
      // If search is empty, show all items
      if (!searchText.trim()) {
        filteredItems = [...items];
        return;
      }
      
      // Filter items that contain the search text
      filteredItems = items.filter(item => 
        item.toLowerCase().includes(searchText.toLowerCase())
      );
    }
  </script>

<BackButton />
  
  <main>
    <h1>Simple Movie Search</h1>
    
    <!-- Search bar -->
    <div class="search-container">
      <form on:submit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a movie..."
          bind:value={searchText}
          on:input={handleInput}
          class="search-input"
        />
        <button type="submit" class="search-button">
          Search
        </button>
      </form>
    </div>
    
    <!-- Display the filtered items -->
    <div class="results-container">
      {#if filteredItems.length > 0}
        <ul class="movie-list">
          {#each filteredItems as item}
            <li>{item}</li>
          {/each}
        </ul>
      {:else}
        <p>No movies found. Try a different search.</p>
      {/if}
    </div>
  </main>
  
  <style>
    main {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    
    h1 {
      color: #333;
      text-align: center;
    }
    
    .search-container {
      margin: 20px 0;
    }
    
    form {
      display: flex;
    }
    
    .search-input {
      flex-grow: 1;
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ddd;
      border-radius: 4px 0 0 4px;
    }
    
    .search-button {
      padding: 10px 15px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 0 4px 4px 0;
      cursor: pointer;
    }
    
    .search-button:hover {
      background-color: #45a049;
    }
    
    .movie-list {
      list-style-type: none;
      padding: 0;
      margin-top: 20px;
    }
    
    li {
      padding: 10px;
      margin: 5px 0;
      background-color: #f9f9f9;
      border-radius: 4px;
    }
    
    li:hover {
      background-color: #f0f0f0;
    }
    
    p {
      text-align: center;
      color: #666;
      margin-top: 20px;
    }
  </style>