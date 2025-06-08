<!-- <script>
    import BackButton from "../components/BackButton.svelte";
    import MovieCard from "../components/MovieCard.svelte";
    import { onMount } from 'svelte';

    let movies = [];
    let randomMovie = null;
    let loading = true;
    let error = '';

    onMount(async () => {
        await loadMovies();
    });

    async function loadMovies() {
        try {
            loading = true;
            const response = await fetch('/movies.json');
            if (!response.ok) {
                throw new Error('Failed to load movies');
            }
            const data = await response.json();
            movies = data.movies;
        } catch (err) {
            console.error('Error loading movies:', err);
            error = 'Failed to load movies';
        } finally {
            loading = false;
        }
    }

    function getRandomMovie() {
        if (movies.length === 0) return;
        
        const randomIndex = Math.floor(Math.random() * movies.length);
        randomMovie = movies[randomIndex];
    }

    // Get a random movie on page load
    $: if (movies.length > 0 && !randomMovie) {
        getRandomMovie();
    }
</script>

<BackButton />

<div class="randomise-container">
    {#if loading}
        <div class="loading">
            <p>Loading movies...</p>
        </div>
    {:else if error}
      <p>{error}</p>
    {:else if movies.length === 0}
        <div class="no-movies">
            <p>No movies available</p>
        </div>
    {:else}
        <div class="controls">
            <button class="randomise-btn" on:click={getRandomMovie}>
                pick another movie !!
            </button>
        </div>
        {#if randomMovie}
            <div class="movie-display">
                <div class="movie-card-container">
                    <MovieCard movie={randomMovie} />
                </div>
            </div>
        {/if}
    {/if}
</div>

<style>
    .randomise-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        font-family: sans-serif;
        text-align: center;
        min-height: calc(100vh - 100px);
    }


    .randomise-btn {
        background: linear-gradient(black);
        color: white;
        border: none;
        padding: 15px 30px;
        font-size: 1.1rem;
        border-radius: 50px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }

    .randomise-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0,0,0,0.3);
    }

    .randomise-btn:active {
        transform: translateY(0);
    }

    .movie-display {
        margin: 3rem 0;
        animation: fadeIn 0.5s ease-in;
    }


    .movie-card-container {
        display: flex;
        justify-content: center;
        margin: 2rem 0;
    }

  
    .loading, .no-movies {
        padding: 3rem;
        font-size: 1.2rem;
    }


    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 768px) {
        .randomise-container {
            padding: 1rem;
        }
        
        .randomise-btn {
            padding: 12px 24px;
            font-size: 1rem;
        }
        
    }
</style>

 -->
