// routes/api/+server.js
import { query } from '$lib/db/mariadb';
import { json } from '@sveltejs/kit';


export async function GET() {
    try {
        // MariaDB returns rows directly, not [rows, fields]
        const rows = await query('SELECT * FROM users');
        console.log(rows); // This logs to the server console
        
        return json(rows);
    } catch (error) {
        console.error('Database error:', error);
        return json({ error: 'Database error' }, { status: 500 });
    }
}

// export async function POST({ request }) {
//     try {
//         const { username, email, password } = await request.json();
        
//         // Validate input
//         if (!username || !email || !password) {
//             return json({ error: 'Missing required fields' }, { status: 400 });
//         }
        
//         // Insert user
//         const result = await query(
//             'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
//             [username, email, password]
//         );
        
//         console.log('Insert result:', result); // Logs to server console
        
//         return json({
//             success: true,
//             userId: result.insertId
//         });
//     } catch (error) {
//         console.error('Database error:', error);
//         return json({ error: 'Database error' }, { status: 500 });
//     }
// }