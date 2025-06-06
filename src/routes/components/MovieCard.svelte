<script>
    export let title = "Movie Title";
    export let isFavorite = false;

    function toggleFavorite() {
        isFavorite = !isFavorite;
        // Add logic to update favorite in store/db if needed
    }
</script>

<div class="card">
    <div class="heart" on:click={toggleFavorite}>
        {#if isFavorite}
            ❤️
        {:else}
            🤍
        {/if}
    </div>
    <h3>{title}</h3>
    <div class="photo">[photo]</div>
    <div class="meta">
        <p><strong>Genre:</strong> Action</p>
        <p><strong>Length:</strong> 120 mins</p>
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
    }

    h3 {
        margin: 0.5rem 0;
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
    }

    .meta {
        font-size: 0.8rem;
    }
</style>
