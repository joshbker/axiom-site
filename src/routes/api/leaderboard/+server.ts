import { json, type RequestEvent } from '@sveltejs/kit';
import { connectDB } from '$lib/server/db';
import { LeaderboardEntry } from '$lib/server/models';

export async function GET(event: RequestEvent) {
	try {
		await connectDB();

		const url = new URL(event.request.url);
		const limit = parseInt(url.searchParams.get('limit') || '10');

		const entries = await LeaderboardEntry
			.find()
			.sort({ score: -1, achievedAt: -1 })
			.limit(Math.min(limit, 100))
			.lean();

		return json({
			success: true,
			data: entries
		});
	} catch (error) {
		console.error('Error fetching leaderboard:', error);
		return json({
			success: false,
			error: 'Failed to fetch leaderboard'
		}, { status: 500 });
	}
}
