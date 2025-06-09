<script>
    import BackButton from "../components/BackButton.svelte";
    import { goto } from '$app/navigation';

    let username = '';
    let email = '';
    let password = '';
    let confirmPassword = '';
    let error = '';
    let loading = false;
    
    function validatePassword(password) {
        const hasUppercase = /[A-Z]/.test(password) ;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasMinLength = password.length >= 8;
        
        if (!hasMinLength) {
            return "Password must be at least 8 characters long";
        }
        if (!hasUppercase) {
            return "Password must contain at least one uppercase letter (A-Z)";
        }
        if (!hasSpecialChar) {
            return "Password must contain at least one special character (!@#$%^&* etc.)";
        }
        return null; 
    }
    
    async function handleSubmit(event) {
        event.preventDefault();
        error = '';
        const passwordError = validatePassword(password);
        if (passwordError) {
            error = passwordError;
            return;
        }
        if (password !== confirmPassword) {
            error = "Passwords do not match!";
            return;
        }
        loading = true;
        try {
            const response = await fetch('/api/db/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });
            
            if (response.ok) {
                goto('/login');
            } else {
                const data = await response.json();
                error = data.error || "Registration failed";
            }
        } catch (err) {
            error = "Something went wrong";
        }
        loading = false;
    }
</script>

<BackButton />

<main class="container">
    <h1>Register !!</h1>
    <form on:submit={handleSubmit}>
        <input type="text" placeholder="Username" bind:value={username} required>
        <input type="email" placeholder="Email" bind:value={email} required>
        <input type="password" placeholder="Password" bind:value={password} required>
        <input type="password" placeholder="Confirm Password" bind:value={confirmPassword} required>
        
        <div class="password-hints">
            <p>Password must contain:</p>
            <ul>
                <li class:valid={password.length >= 8}>✓ At least 8 characters</li>
                <li class:valid={/[A-Z]/.test(password)}>✓ One uppercase letter (A-Z)</li>
                <li class:valid={/[!@#$%^&*(),.?":{}|<>]/.test(password)}>✓ One special character (!@#$%^&* etc.)</li>
            </ul>
        </div>
            {#if error}
                <p class="error">{error}</p>
            {/if}
        <button type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
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

    .password-hints {
        background: #f8f9fa;
        padding: 15px;
        border-radius: 4px;
        border: 1px solid #e9ecef;
    }

    .password-hints p {
        margin: 0 0 10px 0;
        font-weight: bold;
        color: #495057;
    }

    .password-hints ul {
        margin: 0;
        padding-left: 20px;
        list-style: none;
    }

    .password-hints li {
        margin: 5px 0;
        color: #dc3545;
        font-size: 14px;
    }

    .password-hints li.valid {
        color: #28a745;
        font-weight: bold;
    }
</style>