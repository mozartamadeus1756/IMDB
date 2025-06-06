import { query } from '$lib/db/mariadb';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    try {
        const { user_id, movie_id, title, genre, length, year, director, rating, poster } = await request.json();

        if (!user_id || !movie_id) {
            return json({ error: 'User ID and Movie ID are required' }, { status: 400 });
        }

        // Check if already exists
        const existing = await query(
            'SELECT * FROM favorites WHERE user_id = ? AND movie_id = ?',
            [user_id, movie_id]
        );

        if (existing.length > 0) {
            return json({ error: 'Movie already in favorites' }, { status: 400 });
        }

        // Add to favorites
        await query(
            'INSERT INTO favorites (user_id, movie_id, title, genre, length, year, director, rating, poster) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [user_id, movie_id, title, genre, length, year, director, rating, poster]
        );

        return json({ success: true, message: 'Movie added to favorites' });
    } catch (error) {
        console.error('Add favorite error:', error);
        return json({ error: 'Server error' }, { status: 500 });
    }
}



// import { query } from '$lib/db/mariadb';
// import { json } from '@sveltejs/kit';

// // når du trykker på favortitdes knappen så ser den user_id-en og gir deg din favorites tign 

// // Select * from user_id = user_id; 
// export async function POST({ request }) {
// 	try {
// 		const { user_id } = await request.json();

// 		if (!user_id) {
// 			return json({ error: 'User ID required' }, { status: 400 });
// 		}

// 		// Get user's favorites from database
// 		const favorites = await query(
// 			'SELECT * FROM favorites WHERE user_id = ?',
// 			[user_id]
// 		);

// 		return json({ 
// 			success: true, 
// 			favorites: favorites 
// 		});
// 	} catch (error) {
// 		console.error('Favorites API error:', error);
// 		return json({ error: 'Server error' }, { status: 500 });
// 	}
// }