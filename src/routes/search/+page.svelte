<!--- egen søke side med en søke bar koblet til en json eller noee såntntt t!!  -->

<script>
    // Props
    export let placeholder = "Search...";
    export let value = "";
    
    // Events
    export let onSearch = () => {};
    export let onChange = (value) => {};
    
    // Local state
    let inputElement;
    let isActive = false;
    
    // Handle form submission
    function handleSubmit(event) {
      event.preventDefault();
      onSearch(value);
    }
    
    // Handle input change
    function handleInput(event) {
      value = event.target.value;
      onChange(value);
    }
    
    // Focus the input
    function focusInput() {
      inputElement.focus();
    }
    
    // Clear the input
    function clearInput() {
      value = "";
      onChange("");
      inputElement.focus();
    }




  </script>
  
  <div class="search-bar-container" class:active={isActive}>
    <form on:submit={handleSubmit} class="search-form">
      <button type="submit" class="search-icon-button" aria-label="Search">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
      
      <input
        type="text"
        bind:this={inputElement}
        bind:value
        on:input={handleInput}
        on:focus={() => isActive = true}
        on:blur={() => isActive = false}
        {placeholder}
        class="search-input"
      />
      
      {#if value}
        <button type="button" class="clear-button" on:click={clearInput} aria-label="Clear search">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="clear-icon">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      {/if}
    </form>
  </div>


  <div class="movie-content"></div>
  
  <style>
    .search-bar-container {
      position: relative;
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
      border-radius: 50px;
      background-color: #f5f5f5;
      transition: all 0.3s ease;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
  
    .search-bar-container.active {
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
    }
  
    .search-form {
      display: flex;
      align-items: center;
      width: 100%;
      height: 50px;
    }
  
    .search-icon-button {
      background: none;
      border: none;
      padding: 0 15px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  
    .search-icon {
      width: 18px;
      height: 18px;
      color: #666;
    }
  
    .search-input {
      flex: 1;
      border: none;
      background: transparent;
      padding: 0;
      font-size: 16px;
      color: #333;
      outline: none;
      height: 100%;
    }
  
    .clear-button {
      background: none;
      border: none;
      padding: 0 15px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  
    .clear-icon {
      width: 16px;
      height: 16px;
      color: #666;
    }
  
    /* Responsive adjustments */
    @media (max-width: 768px) {
      .search-bar-container {
        max-width: 100%;
      }
    }
  </style>