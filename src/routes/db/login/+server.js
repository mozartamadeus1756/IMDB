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

        const user = users[0]
        if (!user || !user.password) { 
            return json({ error: 'user not found' }, { status: 401 }); 
        }  
        // ksjekke passordet !! 
        const passwordMatch = await bcrypt.compare(password, users.password.toString());
        if(!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: 'invalid !! '
            });
        }
    } catch (err) { 
        console.error('login error:', err); 
        return json({ error: 'server error' }, { status: 500 }); 
    } 

}