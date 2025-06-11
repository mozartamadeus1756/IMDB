<!-- <script>
    import BackButtonMain from '../components/BackButtonMain.svelte';
    import MovieCard from '../components/MovieCard.svelte';
    import { onMount } from 'svelte';
    import { getCurrentUser, getUserId } from '$lib/stores/user.js';

    let user = null;
    let favorites = [];
    let loading = true;
    let error = '';

    onMount(async () => {
        // Get user from localStorage
        user = getCurrentUser();
        // 
        if (user) {
            await loadFavorites();
        } else {
            loading = false;
            error = 'Please log in to view your favorites';
        }
    });

    async function loadFavorites() {
        try {
            const userId = getUserId();
            
            const response = await fetch('/db/favorites/get', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_id: userId })
            });

            const data = await response.json();
            
            if (data.success) {
                // Convert database favorites back to movie object format
                favorites = data.favorites.map(fav => ({
                    id: fav.movie_id,
                    title: fav.title,
                    genre: fav.genre ? fav.genre.split(', ') : [],
                    length: fav.length,
                    year: fav.year,
                    director: fav.director,
                    rating: fav.rating,
                    poster: fav.poster
                }));
            } else {
                error = data.error || 'Failed to load favorites';
            }
        } catch (err) {
            error = 'Error loading favorites';
            console.error('Favorites error:', err);
        } finally {
            loading = false;
        }
    }
</script>

<BackButtonMain />

<main>
    <div class="container">
        <h1>My Favorites</h1>
        
        {#if loading}
            <div class="loading">Loading your favorites...</div>
        {:else if error}
            <div class="error">{error}</div>
        {:else if user}
            <div class="user-info">
                <p>Welcome back, <strong>{user.username}</strong>!</p>
            </div>
            
            {#if favorites.length > 0}
                <div class="favorites-grid">
                    {#each favorites as movie}
                        <MovieCard {movie} isFavorite={true} />
                    {/each}
                </div>
            {:else}
                <div class="no-favorites">
                    <p>You don't have any favorite movies yet.</p>
                    <p><a href="/main">Browse movies</a> to add some favorites!</p>
                </div>
            {/if}
        {:else}
            <div class="not-logged-in">
                <p>Please <a href="/login">log in</a> to view your favorites.</p>
            </div>
        {/if}
    </div>
</main>

<style>
    main {
        padding: 2rem;
        min-height: calc(100vh - 60px);
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
    }

    h1 {
        text-align: center;
        color: #333;
        margin-bottom: 2rem;
    }

    .user-info {
        text-align: center;
        margin-bottom: 2rem;
        font-size: 1.1rem;
        color: #666;
    }

    .favorites-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-top: 2rem;
    }

    .loading, .error, .no-favorites, .not-logged-in {
        text-align: center;
        padding: 2rem;
        font-size: 1.1rem;
    }

    .error {
        color: #e74c3c;
    }

    .no-favorites {
        background-color: #f8f9fa;
        border-radius: 8px;
        color: #666;
    }

    .no-favorites p:first-child {
        margin-bottom: 1rem;
    }

    .no-favorites a, .not-logged-in a {
        color: #007bff;
        text-decoration: none;
    }

    .no-favorites a:hover, .not-logged-in a:hover {
        text-decoration: underline;
    }

    @media (max-width: 768px) {
        main {
            padding: 1rem;
        }
        
        .favorites-grid {
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            gap: 1rem;
        }
    }
</style> -->