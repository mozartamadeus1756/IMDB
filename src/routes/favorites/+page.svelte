<!-- src/routes/favorites/+page.svelte -->
<script>
    import BackButtonMain from '../BackButtonMain.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getCurrentUser, getUserId } from '$lib/stores/user.js';

	let user = null;
	let favorites = [];
	let loading = true;
	let error = '';

	onMount(async () => {
		// Get user from localStorage
		user = getCurrentUser();
		// Fetch user's favorites
		//await loadFavorites();
        console.log('User:', user);
	});

	// async function loadFavorites() {
	// 	try {
	// 		const userId = getUserId();
			
	// 		const response = await fetch('/api/favorites', {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			},
	// 			body: JSON.stringify({ user_id: userId })
	// 		});

	// 		const data = await response.json();
			
	// 		if (data.success) {
	// 			favorites = data.favorites;
	// 		} else {
	// 			error = data.error || 'Failed to load favorites';
	// 		}
	// 	} catch (err) {
	// 		error = 'Error loading favorites';
	// 		console.error('Favorites error:', err);
	// 	} finally {
	// 		loading = false;
	// 	}
	// };
</script>

<BackButtonMain />


<!-- {#if loading}
	<p>Loading...</p>
{:else if user}
	<h1>Welcome {user.username}!</h1>
	<h2>Your Favorites</h2>

	{#if error}
		<p class="error">{error}</p>
	{/if}

	{#if favorites.length > 0}
		<ul>
			{#each favorites as favorite}
				<li>{favorite.title || favorite.name}</li>
			{/each}
		</ul>
	{:else}
		<p>You don't have any favorites yet.</p>
	{/if}
{/if} -->

<style>
	.error {
		color: red;
	}
</style>