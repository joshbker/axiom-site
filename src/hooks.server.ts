import { auth } from '$lib/server/auth';
import { connectDB } from '$lib/server/db';
import type { Handle } from '@sveltejs/kit';

// Connect mongoose for our models (LeaderboardEntry, etc.)
// Better Auth uses its own MongoClient connection
await connectDB();

export const handle: Handle = async ({ event, resolve }) => {
	// Handle OPTIONS preflight requests
	if (event.request.method === 'OPTIONS') {
		return new Response(null, {
			headers: {
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': 'Content-Type, Authorization'
			}
		});
	}

	// Get session from Better Auth
	const session = await auth.api.getSession({
		headers: event.request.headers
	});

	if (session) {
		event.locals.session = session;
		event.locals.user = session.user;
	} else {
		event.locals.session = null;
		event.locals.user = null;
	}

	const response = await resolve(event);

	// Add CORS headers to all responses
	response.headers.set('Access-Control-Allow-Origin', '*');
	response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	return response;
};
