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