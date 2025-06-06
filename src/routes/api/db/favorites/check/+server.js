import { query } from '$lib/db/mariadb';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    try {
        const { user_id, movie_id } = await request.json();

        if (!user_id || !movie_id) {
            return json({ error: 'User ID and Movie ID are required' }, { status: 400 });
        }

        // Check if movie is in favorites
        const result = await query(
            'SELECT * FROM favorites WHERE user_id = ? AND movie_id = ?',
            [user_id, movie_id]
        );

        return json({ 
            isFavorite: result.length > 0 
        });
    } catch (error) {
        console.error('Check favorite error:', error);
        return json({ error: 'Server error' }, { status: 500 });
    }
}