<script>
    import BackButton from "../BackButton.svelte";

function getSomeData() {
  const url = 'http://localhost:3000/';
  const response = fetch(url)
    .then(data => {
      console.log('Got data from API!', data)
    }).catch(err => {
      console.log('Something went wrong', err);
    });
    return response;
}


    // import { onMount } from 'svelte';
// // Frontend Registration Handler
//     async function submitRegistration(username, email, password) {
//         try {
//             const response = await fetch('/api/database/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     username: username,
//                     email: email,
//                     password: password
//                 })
//             });
            
//             if (!response.ok) {
//                 throw new Error(`Error: ${response.statusText}`);
//             }
            
//             const data = await response.json();
//             console.log('Registration successful:', data);
//             return data;

//         } catch (error) {
//             console.error('Error saving data:', error);
//             throw error;
//         }
//     }

//     async function handleRegister() {
//         try {
//             // Validate inputs first
//             if (password !== confirmPassword) {
//                 alert("Passwords don't match");
//                 return;
//             }
            
//             const result = await submitRegistration(username, email, password);
//             console.log('User registered successfully');
//             goto('/login');
//         } catch (error) {
//             // Handle registration error
//             console.error('Registration failed:', error);
//         }
//     }
    


</script>

<BackButton /> 

<main class="register-container" >
    <h1>Register !!</h1>
    <form class="register-form" aria-labelledby="register-heading">
        <h2 id="register-heading" class="visually-hidden">Registration Form</h2>
        
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
        <div class="form-group">
            <label for="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" name="confirm-password" required aria-required="true">
        </div>
        <button type="submit" class="register-btn" aria-label="Create your account">Register</button>
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
