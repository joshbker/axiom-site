import { json, type RequestEvent } from '@sveltejs/kit';
import { connectDB } from '$lib/server/db';
import { LeaderboardEntry } from '$lib/server/models';

export async function GET(event: RequestEvent) {
	try {
		await connectDB();

		const url = new URL(event.request.url);
		const query = url.searchParams.get('q') || '';
		const limit = parseInt(url.searchParams.get('limit') || '10');

		if (!query || query.length < 2) {
			return json({
				success: true,
				data: []
			});
		}

		// Find unique players matching the search query
		const players = await LeaderboardEntry.aggregate([
			{
				$match: {
					playerName: { $regex: query, $options: 'i' }
				}
			},
			{
				$group: {
					_id: '$playerId',
					playerName: { $first: '$playerName' },
					highScore: { $max: '$score' },
					gamesPlayed: { $sum: 1 }
				}
			},
			{
				$sort: { highScore: -1 }
			},
			{
				$limit: Math.min(limit, 20)
			},
			{
				$project: {
					playerId: '$_id',
					playerName: 1,
					highScore: 1,
					gamesPlayed: 1,
					_id: 0
				}
			}
		]);

		return json({
			success: true,
			data: players
		});
	} catch (error) {
		console.error('Error searching players:', error);
		return json({
			success: false,
			error: 'Failed to search players'
		}, { status: 500 });
	}
}
