// bakcend routeijg
import { query } from '$lib/db/mariadb';
import { json } from '@sveltejs/kit';
import bcrypt from 'bcrypt';


export async function POST({ request }) { 
    try { 
        const { username, email, password } = await request.json();  

        const users = await query(
            'SELECT * FROM users WHERE username = ? OR email = ?', 
            [username, email]
        ); 

        // ksjekke passordet !! 

        const valid = bcrypt.compare()


    } catch (err) { 
        console.error('Login error:', err); 
        return json({ error: 'Server error' }, { status: 500 }); 
    } 
}