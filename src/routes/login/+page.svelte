<script>
    import BackButton from "../BackButton.svelte";
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let username = '';
	let email = '';
	let password = '';

	async function handleLogin(event) {
		event.preventDefault();
		const res = await fetch('/api/db/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, email, password })
		});
		const data = await res.json();
		if (res.ok) {
			console.log("Login successful");
			goto('/main'); 
		} else {
			alert(data.error || 'Login failed');
		}
	}
    
    let users = '';

    onMount(async () => {
        const res = await fetch('/api/db/register');
        users = await res.json();
        console.log(users); 
    });

</script>

<BackButton />

<main class="login-container">
    <h1>Welcome back u bitch !!</h1>
    <form class="login-form" on:submit={handleLogin}>
	<div class="form-group">
		<label for="username">Username</label>
		<input type="text" id="username" bind:value={username} required>
	</div>
	<div class="form-group">
		<label for="email">Email</label>
		<input type="email" id="email" bind:value={email} required>
	</div>
	<div class="form-group">
		<label for="password">Password</label>
		<input type="password" id="password" bind:value={password} required>
	</div>
	<button type="submit" class="login-btn">Login</button>
    </form>
    <p class="register-link">New here? <a href="/register" class="register-btn" aria-label="Go to registration page">Register</a></p>
</main>

<style>
    .login-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: #f0f0f0;
    }

    h1 {
        margin-bottom: 20px;
    }

    .login-form {
        display: flex;
        flex-direction: column;
        width: 300px;
    }

    .form-group {
        margin-bottom: 15px;
    }

    label {
        margin-bottom: 5px;
    }

    input {
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
    }

    .login-btn {
        padding: 10px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .register-link {
        margin-top: 20px;
    }
    .register-btn {
        color: #007bff;
        text-decoration: none;
    }
    .register-btn:hover {
        text-decoration: underline;
    }
</style>
