<script>
    import BackButton from "../BackButton.svelte";

    document.addEventListener('DOMContentLoaded', () => {
        const loginForm = document.querySelector('.login-form');
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            try {
                const response = await fetch('http://localhost:5173/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, password })
                });
                const data = await response.json();
                if (data.success) {
                    // localStorage.setItem('username', username);
                    window.location.href = '/'; // Redirect to home page, change later to the main page !!!
                    alert('Login successful!');
                } else {
                    alert('Login failed: ' + data.message);
                }
            } catch (error) {
                alert('An error occurred during login');
                console.error('Error:', error);
            }
        });
    });

</script>

<BackButton />

<main class="login-container">
    <h1>Welcome back !!</h1>
    <form class="login-form" aria-labelledby="login-heading">
        <h2 id="login-heading" class="visually-hidden">Login Form</h2>
        <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" required aria-required="true">
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required aria-required="true">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required aria-required="true">
        </div>
        <button type="submit" class="login-btn" aria-label="Login to your account">Login</button>
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

<!-- lage login button mot bunnen som er til å redriecte til neste side !! -->