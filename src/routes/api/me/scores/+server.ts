import { json } from '@sveltejs/kit';
import { LeaderboardEntry } from '$lib/server/models';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, url }) => {
	// Check if user is authenticated
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const limit = parseInt(url.searchParams.get('limit') || '10');
	const offset = parseInt(url.searchParams.get('offset') || '0');

	try {
		// Get user's scores, sorted by most recent
		const scores = await LeaderboardEntry.find({ playerId: locals.user.id })
			.sort({ achievedAt: -1 })
			.skip(offset)
			.limit(Math.min(limit, 100)) // Cap at 100
			.lean();

		// Get total count for pagination
		const total = await LeaderboardEntry.countDocuments({ playerId: locals.user.id });

		// Get aggregate stats
		const stats = await LeaderboardEntry.aggregate([
			{ $match: { playerId: locals.user.id } },
			{
				$group: {
					_id: null,
					totalKills: { $sum: '$kills' },
					highestScore: { $max: '$score' },
					totalSurvivalTime: { $sum: '$survivalTime' },
					gamesPlayed: { $count: {} }
				}
			}
		]);

		return json({
			scores,
			total,
			stats: stats[0] || {
				totalKills: 0,
				highestScore: 0,
				totalSurvivalTime: 0,
				gamesPlayed: 0
			}
		});
	} catch (error) {
		console.error('Error fetching user scores:', error);
		return json({ error: 'Failed to fetch scores' }, { status: 500 });
	}
};
