import { query } from '$lib/db/mariadb';
import { json } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

export async function POST({ request }) {
    try {
        const { username, email, password } = await request.json();

        if (!username || !email || !password) {
            return json({ error: 'missing fields' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // salt round 10 !!! feridg 
        await query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );
        return json({ success: true });
    } catch (error) {
        console.error('insert error:', error);
        return json({ error: 'failed regristation' }, { status: 500 });
    }
}




