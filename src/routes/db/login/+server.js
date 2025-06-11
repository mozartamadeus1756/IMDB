// // routes/db/login/+server.js
// import { query } from '$lib/db/mariadb';
// import { json } from '@sveltejs/kit';
// import bcrypt from 'bcrypt';

// export async function POST({ request }) { 
// 	try { 
// 		const { username, email, password } = await request.json();  

// 		const users = await query(
// 			'SELECT * FROM users WHERE username = ? OR email = ?', 
// 			[username, email]
// 		); 
// 		const user = users[0];  
// 		if (!user || !user.password) { 
// 			return json({ error: 'User not found or invalid' }, { status: 401 }); 
// 		}  
		
// 		const isValid = await bcrypt.compare(password, user.password.toString());
// 		if (!isValid) { 
// 			return json({ error: 'Invalid credentials' }, { status: 401 }); 
// 		} 	
// 		return json({ success: true }); 
// 	} catch (err) { 
// 		console.error('Login error:', err); 
// 		return json({ error: 'Server error' }, { status: 500 }); 
// 	} 
// }