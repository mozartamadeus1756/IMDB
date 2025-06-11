<script>
    import BackButton from "../components/BackButton.svelte";
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment';

    let username = '';
    let email = '';
    let password = '';
    let isLoading = false;
    let errorMessage = '';

    async function handleLogin(event) {
        event.preventDefault();
        errorMessage = '';
        isLoading = true;

        try {
            // Hent bruker fra Azure Data API - sjekk både username og email
            const res = await fetch(`/data-api/rest/users?$filter=username eq '${username}' and email eq '${email}'`);
            
            if (res.ok) {
                const data = await res.json();
                
                if (data.value && data.value.length > 0) {
                    const user = data.value[0];
                    
                    // Enkel passord-sjekk (ikke hashet i denne versjonen)
                    if (password === user.password) {
                        if (browser) {
                            localStorage.setItem('user', JSON.stringify({
                                id: user.user_id,
                                username: user.username,
                                email: user.email
                            }));
                        }
                        console.log("Login successful");
                        alert('Login successful');
                        goto('/main'); 
                    } else {
                        errorMessage = 'Invalid password';
                    }
                } else {
                    errorMessage = 'User not found';
                }
            } else {
                errorMessage = 'Failed to check user credentials';
            }
        } catch (error) {
            console.error('Login error:', error);
            errorMessage = 'Something went wrong. Please try again.';
        } finally {
            isLoading = false;
        }
    }
</script>

<BackButton />

<main class="container">
    <h1>Welcome back!!</h1>
    
    <form on:submit={handleLogin}>
        <input type="text" placeholder="Username" bind:value={username} required aria-label="Username">
        <input type="email" placeholder="Email" bind:value={email} required aria-label="Email">
        <input type="password" placeholder="Password" bind:value={password} required aria-label="Password">
        
        {#if errorMessage}
            <p class="error">{errorMessage}</p>
        {/if}
        
        <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
        </button>
    </form>
    
    <p>New here? <a href="/register">Register</a></p>
</main>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: #f0f0f0;
        padding: 20px;
    }

    h1 {
        margin-bottom: 30px;
    }

    form {
        background: white;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        width: 300px;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    input {
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 16px;
    }

    button {
        padding: 12px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
    }

    button:hover:not(:disabled) {
        background: #0056b3;
    }

    button:disabled {
        background: #ccc;
        cursor: not-allowed;
    }

    .error {
        color: #e74c3c;
        margin: 0;
        text-align: center;
    }

    p {
        margin-top: 20px;
        text-align: center;
    }

    a {
        color: #007bff;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
</style>