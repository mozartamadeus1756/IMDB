// routes/api/+server.js
import { query } from '$lib/db/mariadb';
import { json } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

export async function POST({ request }) {
    try {
        const { username, email, password } = await request.json();
        if (!username || !email || !password) {
            return json({ error: 'Missing fields' }, { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 10); // salt round 10 !!! very good 
        await query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );
        return json({ success: true });
    } catch (error) {
        console.error('Insert error:', error);
        return json({ error: 'Failed to register user' }, { status: 500 });
    }
}s





