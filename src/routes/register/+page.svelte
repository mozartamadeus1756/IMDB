<script>
    import BackButton from "../components/BackButton.svelte";
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let username = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
    let isLoading = false;
    let errorMessage = '';
    
    async function handleSubmit(event) {
        event.preventDefault();
        errorMessage = '';
        if (password !== confirmPassword) {
            errorMessage = "Passwords do not match!";
            return;
        }
        try {
            isLoading = true;
            const res = await fetch('/api/db/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password }) 
            });
            
            const data = await res.json();
            console.log(data);
            
            if (res.ok) {
                goto('/login');
            } else {
                errorMessage = data.message || "Registration failed. Please try again.";
            }
        } catch (error) {
            console.error("Registration error:", error);
            errorMessage = "Something went wrong. Please try again later.";
        } finally {
            isLoading = false;
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

<main class="register-container">
    <h1>Register !!</h1>
    <form class="register-form" on:submit|preventDefault={handleSubmit}>
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
	<div class="form-group">
		<label for="confirm-password">Confirm Password</label>
		<input type="password" id="confirm-password" bind:value={confirmPassword} required>
	</div>
	<button type="submit" class="register-btn">Register</button>
    <p class="login-link">Already have an account? <a href="/login" aria-label="Go to login page">Login here</a></p>
</form>
</main>



<style>
    .register-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: #f4f4f4;
        padding: 20px;
    }

    h1 {
        margin-bottom: 20px;
    }

    .register-form {
        background-color: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        width: 300px;
    }

    .form-group {
        margin-bottom: 15px;
    }

    label {
        display: block;
        margin-bottom: 5px;
    }

    input {
        width: 100%;
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #ccc;
    }

    .register-btn {
        background-color: #007bff;
        color: white;
        padding: 10px;
        border-radius: 5px;
        border: none;
        cursor: pointer;
    }

    .register-btn:hover {
        background-color: #0056b3;
    }

    .login-link {
        margin-top: 10px;
    }
</style>
