<script>
    import { getUserId, logout } from '$lib/stores/user.js';
    import { onMount } from 'svelte';

    let userId = null;

    onMount(() => {
        userId = getUserId();
    });

    function handleLogout() {
        logout();
        userId = null;
        window.location.href = '/';
    }
</script>

<nav>
    <div class="navbar">
        <ul>
            <li><a href="/">IMDB</a></li>
            <li><a href="/search">Search</a></li>
            <li><a href="/randomise">Randomise</a></li>
            <li><a href="/favorites">Favorites</a></li>  
        </ul>

        {#if userId}
            <ul>
                <li><button class="link-button" on:click={handleLogout}>Logout</button></li>
            </ul>
        {/if}
    </div>
</nav>

<style>
    nav {
        background-color: #333;
        color: white;
        padding: 10px;
    }

    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex;
    }

    li {
        margin-right: 20px;
    }

    a {
        color: white;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    .link-button {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font: inherit;
        text-decoration: none;
        padding: 0;
    }

    .link-button:hover {
        text-decoration: underline;
    }
</style>
