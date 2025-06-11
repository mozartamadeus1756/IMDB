<!-- <script>
    import { getUserId } from '$lib/stores/user.js';
    import { onMount } from 'svelte';

    export let movie = {};
    export let isFavorite = false;

    let userId = null;
    let isLoading = false;

    onMount(() => {
        userId = getUserId();
        // Check if this movie is already favorited
        checkIfFavorite();
    });

    async function checkIfFavorite() {
        if (!userId || !movie.id) return;
        
        try {
            const response = await fetch('/db/favorites/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    user_id: userId, 
                    movie_id: movie.id 
                })
            });
            
            const data = await response.json();
            isFavorite = data.isFavorite;
        } catch (error) {
            console.error('Error checking favorite status:', error);
        }
    }

    async function toggleFavorite() {
        if (!userId) {
            alert('Please log in to add favorites');
            return;
        }

        isLoading = true;
        
        try {
            const endpoint = isFavorite ? '/db/favorites/remove' : '/db/favorites/add';

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: userId,
                    movie_id: movie.id,
                    title: movie.title,
                    genre: movie.genre?.join(', ') || '',
                    length: movie.length,
                    year: movie.year,
                    director: movie.director,
                    rating: movie.rating,
                    poster: movie.poster
                })
            });

            const data = await response.json();
            
            if (data.success) {
                isFavorite = !isFavorite;
            } else {
                alert(data.error || 'Failed to update favorite');
            }
        } catch (error) {
            console.error('Error updating favorite:', error);
            alert('Error updating favorite');
        } finally {
            isLoading = false;
        }
    }
</script>

<div class="card">
    <div class="heart" on:click={toggleFavorite} class:loading={isLoading}>
        {#if isLoading}
            ⏳
        {:else if isFavorite}
            ❤️
        {:else}
            🤍
        {/if}
    </div>
    
    <h3>{movie.title || "Movie Title"}</h3>
    
    <div class="photo">
        {#if movie.poster}
            <img src={movie.poster} alt={movie.title} />
        {:else}
            [photo]
        {/if}
    </div>
    
    <div class="meta">
        <p><strong>Genre:</strong> {movie.genre?.join(', ') || 'N/A'}</p>
        <p><strong>Length:</strong> {movie.length || 'N/A'} mins</p>
        <p><strong>Year:</strong> {movie.year || 'N/A'}</p>
        <p><strong>Director:</strong> {movie.director || 'N/A'}</p>
        <p><strong>Rating:</strong> {movie.rating || 'N/A'}/10</p>
    </div>
</div>

<style>
    .card {
        border: 2px solid black;
        border-radius: 8px;
        padding: 1rem;
        width: 180px;
        background: white;
        position: relative;
    }

    .heart {
        position: absolute;
        top: 8px;
        left: 8px;
        cursor: pointer;
        font-size: 1.2em;
        transition: transform 0.2s;
    }

    .heart:hover {
        transform: scale(1.2);
    }

    .heart.loading {
        cursor: wait;
    }

    h3 {
        margin: 0.5rem 0;
        font-size: 1rem;
        min-height: 2.5rem;
        display: flex;
        align-items: center;
    }

    .photo {
        width: 100%;
        height: 120px;
        background: #eee;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
        overflow: hidden;
        border-radius: 4px;
    }

    .photo img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .meta {
        font-size: 0.8rem;
    }

    .meta p {
        margin: 0.3rem 0;
    }
</style> -->