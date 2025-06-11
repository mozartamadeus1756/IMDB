// import { query } from '$lib/db/mariadb';
// import { json } from '@sveltejs/kit';

// export async function POST({ request }) {
//     try {
//         const { user_id, movie_id } = await request.json();

//         if (!user_id || !movie_id) {
//             return json({ error: 'User ID and Movie ID are required' }, { status: 400 });
//         }

//         // Remove from favorites
//         const result = await query(
//             'DELETE FROM favorites WHERE user_id = ? AND movie_id = ?',
//             [user_id, movie_id]
//         );

//         if (result.affectedRows === 0) {
//             return json({ error: 'Favorite not found' }, { status: 404 });
//         }

//         return json({ success: true, message: 'Movie removed from favorites' });
//     } catch (error) {
//         console.error('Remove favorite error:', error);
//         return json({ error: 'Server error' }, { status: 500 });
//     }
// }