<script>
    import NavbarFav from "../components/NavbarFav.svelte";
    import BottomNav from "../components/BottomNav.svelte";
    import MovieCard from "../components/MovieCard.svelte";
    import { onMount } from 'svelte';

    let movies = [];
    let loading = true;
    let error = '';

    onMount(async () => {
        try {
            // Load movies from JSON file
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
    });
</script>

<NavbarFav />

<main>
    {#if loading}
        <div class="loading">Loading movies...</div>
    {:else if error}
        <div class="error">{error}</div>
    {:else if movies.length > 0}
        <div class="grid">
            {#each movies as movie}
                <MovieCard {movie} />
            {/each}
        </div>
    {:else}
        <div class="no-movies">No movies available</div>
    {/if}
</main>

<BottomNav />

<style>
    main {
        padding: 2rem;
        display: flex;
        justify-content: center;
        min-height: calc(100vh - 120px);
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        max-width: 1200px;
        width: 100%;
    }

    .loading, .error, .no-movies {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.2rem;
        color: #666;
        height: 200px;
    }

    .error {
        color: #e74c3c;
    }

    @media (max-width: 768px) {
        main {
            padding: 1rem;
        }
        
        .grid {
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            gap: 1rem;
        }
    }
</style>