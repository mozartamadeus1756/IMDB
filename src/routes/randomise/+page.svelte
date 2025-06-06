<script>
    import BackButton from "../components/BackButton.svelte";

  const allGenres = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 
    'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller'
  ];
  
  const lengthOptions = [
    { id: 'short', label: 'Short (< 90 min)' },
    { id: 'medium', label: 'Medium (90-120 min)' },
    { id: 'long', label: 'Long (> 120 min)' }
  ];

  let selectedGenres = [];
  let selectedLength = [];
  
  // Sample movie database (you can replace with your own data)
  const movies = [
    { title: 'The Matrix', genre: ['Sci-Fi', 'Action'], length: 136 },
    { title: 'Toy Story', genre: ['Animation', 'Adventure', 'Comedy'], length: 81 },
    { title: 'The Shawshank Redemption', genre: ['Drama'], length: 142 },
    { title: 'The Dark Knight', genre: ['Action', 'Crime', 'Drama'], length: 152 },
    { title: 'Pulp Fiction', genre: ['Crime', 'Drama'], length: 154 },
    { title: 'Fight Club', genre: ['Drama'], length: 139 },
    { title: 'Forrest Gump', genre: ['Drama', 'Romance'], length: 142 },
    { title: 'Inception', genre: ['Action', 'Adventure', 'Sci-Fi'], length: 148 },
    { title: 'The Silence of the Lambs', genre: ['Crime', 'Drama', 'Thriller'], length: 118 },
    { title: 'Star Wars: A New Hope', genre: ['Action', 'Adventure', 'Fantasy'], length: 121 },
    { title: 'Jurassic Park', genre: ['Adventure', 'Sci-Fi'], length: 127 },
    { title: 'Get Out', genre: ['Horror', 'Mystery', 'Thriller'], length: 104 },
    { title: 'La La Land', genre: ['Comedy', 'Drama', 'Music'], length: 128 },
    { title: 'Parasite', genre: ['Comedy', 'Drama', 'Thriller'], length: 132 },
    { title: 'The Hangover', genre: ['Comedy'], length: 100 },
    { title: 'Spirited Away', genre: ['Animation', 'Adventure', 'Fantasy'], length: 125 },
    { title: 'A Quiet Place', genre: ['Drama', 'Horror', 'Sci-Fi'], length: 90 },
    { title: 'Whiplash', genre: ['Drama', 'Music'], length: 106 },
    { title: 'The Grand Budapest Hotel', genre: ['Adventure', 'Comedy', 'Crime'], length: 99 },
    { title: 'Hereditary', genre: ['Drama', 'Horror', 'Mystery'], length: 127 }
  ];
  
  let filteredMovies = [];
  let randomMovie = null;
  let showResults = false;
  
  // Handle genre selection
  function toggleGenre(genre) {
    if (selectedGenres.includes(genre)) {
      selectedGenres = selectedGenres.filter(g => g !== genre);
    } else {
      selectedGenres = [...selectedGenres, genre];
    }
  }
  
  // Handle length selection
  function toggleLength(length) {
    if (selectedLength.includes(length)) {
      selectedLength = selectedLength.filter(l => l !== length);
    } else {
      selectedLength = [...selectedLength, length];
    }
  }
  
  // Apply filters
  function applyFilters() {
    filteredMovies = movies.filter(movie => {
      // Genre filter
      const genreMatch = selectedGenres.length === 0 || 
        selectedGenres.some(genre => movie.genre.includes(genre));
      
      // Length filter
      let lengthMatch = true;
      if (selectedLength.length > 0) {
        lengthMatch = false;
        if (selectedLength.includes('short') && movie.length < 90) lengthMatch = true;
        if (selectedLength.includes('medium') && movie.length >= 90 && movie.length <= 120) lengthMatch = true;
        if (selectedLength.includes('long') && movie.length > 120) lengthMatch = true;
      }
      
      return genreMatch && lengthMatch;
    });
    
    showResults = true;
    randomMovie = null;
  }
  
  // Pick a random movie from filtered results
  function randomize() {
    if (filteredMovies.length === 0) {
      applyFilters();
    }
    
    if (filteredMovies.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredMovies.length);
      randomMovie = filteredMovies[randomIndex];
    } else {
      randomMovie = null;
    }
    
    showResults = true;
  }
</script>

<BackButton />

<div class="movie-picker">
  <div class="filter-side">
    <h2>Movie Filters</h2>
    
    <div class="filter-section">
      <h3>Genres</h3>
      <div class="genre-list">
        {#each allGenres as genre}
          <label class="genre-item">
            <input 
              type="checkbox" 
              checked={selectedGenres.includes(genre)} 
              on:change={() => toggleGenre(genre)}
            />
            {genre}
          </label>
        {/each}
      </div>
    </div>
    
    <div class="filter-section">
      <h3>Movie Length</h3>
      <div class="length-options">
        {#each lengthOptions as option}
          <label class="length-item">
            <input 
              type="checkbox" 
              checked={selectedLength.includes(option.id)} 
              on:change={() => toggleLength(option.id)}
            />
            {option.label}
          </label>
        {/each}
      </div>
    </div>
    
    <button class="apply-button" on:click={applyFilters}>Apply Filters</button>
  </div>
  
  <div class="results-side">
    <button class="randomize-button" on:click={randomize}>Randomize</button>
    
    {#if showResults}
      <div class="results-container">
        {#if randomMovie}
          <div class="random-movie">
            <h3>Your Random Movie:</h3>
            <div class="movie-card">
              <h4>{randomMovie.title}</h4>
              <p>Genres: {randomMovie.genre.join(', ')}</p>
              <p>Length: {randomMovie.length} minutes</p>
            </div>
          </div>
        {:else if filteredMovies.length === 0}
          <p class="no-results">No movies match your criteria. Try different filters!</p>
        {:else}
          <div class="filtered-results">
            <h3>Filtered Movies ({filteredMovies.length})</h3>
            <p>Click "Randomize" to pick a random movie from this list.</p>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style>
  .movie-picker {
    display: flex;
    gap: 30px;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    font-family: sans-serif;
  }
  
  .filter-side {
    flex: 1;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
  }
  
  .results-side {
    flex: 1;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  h2 {
    margin-top: 0;
    color: #333;
  }
  
  h3 {
    margin-top: 20px;
    margin-bottom: 10px;
    color: #555;
  }
  
  .filter-section {
    margin-bottom: 20px;
  }
  
  .genre-list, .length-options {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .genre-item, .length-item {
    display: flex;
    align-items: center;
    background-color: white;
    padding: 6px 12px;
    border-radius: 16px;
    cursor: pointer;
    user-select: none;
  }
  
  .genre-item input, .length-item input {
    margin-right: 6px;
  }
  
  .apply-button, .randomize-button {
    background-color: #000000;
    color: white;
    border: none;
    padding: 12px 24px;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .apply-button:hover, .randomize-button:hover {
    background-color: #357abD;
  }
  
  .randomize-button {
    background-color: #000000;
    font-size: 18px;
    padding: 14px 28px;
    margin-top: 30px;
  }
  
  .randomize-button:hover {
    background-color: #000000;
  }
  
  .results-container {
    margin-top: 30px;
    width: 100%;
  }
  
  .movie-card {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    margin-top: 10px;
  }
  
  .movie-card h4 {
    margin-top: 0;
    color: #333;
    font-size: 20px;
  }
  
  .no-results {
    color: #888;
    text-align: center;
    font-style: italic;
  }
  
  .filtered-results {
    text-align: center;
  }
</style>
