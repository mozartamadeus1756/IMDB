<script>
    import BackButton from "../components/BackButton.svelte";
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
            
            // Bruk Azure Data API til å legge til bruker
            const res = await fetch('/data-api/rest/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    username: username,
                    email: email, 
                    password: password // Merk: ikke hashet i denne enkle versjonen
                }) 
            });
            
            if (res.ok) {
                alert('Registration successful! Please login.');
                goto('/login');
            } else {
                const errorData = await res.json();
                errorMessage = errorData.message || "Registration failed. User might already exist.";
            }
        } catch (error) {
            console.error("Registration error:", error);
            errorMessage = "Something went wrong. Please try again later.";
        } finally {
            isLoading = false;
        }
    }
</script>

<BackButton />

<main class="container">
    <h1>Register !!</h1>
    
    <form on:submit={handleSubmit}>
        <input type="text" placeholder="Username" bind:value={username} required aria-label="Username">
        <input type="email" placeholder="Email" bind:value={email} required aria-label="Email">
        <input type="password" placeholder="Password" bind:value={password} required aria-label="Password">
        <input type="password" placeholder="Confirm Password" bind:value={confirmPassword} required aria-label="Confirm Password">
        
        {#if errorMessage}
            <p class="error">{errorMessage}</p>
        {/if}
        
        <button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Register'}
        </button>
    </form>
    
    <p>Already have an account? <a href="/login">Login here</a></p>
</main>
<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: #f4f4f4;
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