import { json, type RequestEvent } from '@sveltejs/kit';
import { connectDB } from '$lib/server/db';
import { LeaderboardEntry } from '$lib/server/models';
import { auth } from '$lib/server/auth';

export async function POST(event: RequestEvent) {
	try {
		await connectDB();

		// Verify session
		const session = await auth.api.getSession({ headers: event.request.headers });
		if (!session) {
			return json({
				success: false,
				error: 'Unauthorized'
			}, { status: 401 });
		}

		const body = await event.request.json();
		const { kills, survivalTime, score } = body;

		if (typeof kills !== 'number' || typeof survivalTime !== 'number' || typeof score !== 'number') {
			return json({
				success: false,
				error: 'Invalid data'
			}, { status: 400 });
		}

		const entry = await LeaderboardEntry.create({
			playerId: session.user.id,
			playerName: session.user.name || session.user.email || 'Unknown',
			score,
			kills,
			survivalTime
		});

		return json({
			success: true,
			data: entry
		});
	} catch (error) {
		console.error('Error saving score:', error);
		return json({
			success: false,
			error: 'Failed to save score'
		}, { status: 500 });
	}
}
