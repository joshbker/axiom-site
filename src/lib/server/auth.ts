import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { username } from 'better-auth/plugins';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import { MongoClient } from 'mongodb';
import { BETTER_AUTH_SECRET, BETTER_AUTH_URL, MONGODB_URI, MONGODB_NAME } from '$env/static/private';

type BetterAuthInstance = ReturnType<typeof betterAuth>;

let authInstance: BetterAuthInstance | null = null;

function getAuth(): BetterAuthInstance {
	if (authInstance) {
		return authInstance;
	}

	if (!MONGODB_URI) {
		throw new Error('Please define the MONGODB_URI environment variable inside .env');
	}

	if (!MONGODB_NAME) {
		throw new Error('Please define the MONGODB_NAME environment variable inside .env');
	}

	const client = new MongoClient(MONGODB_URI);

	authInstance = betterAuth({
		database: mongodbAdapter(client.db(MONGODB_NAME)),
		secret: BETTER_AUTH_SECRET,
		baseURL: BETTER_AUTH_URL || 'http://localhost:5173',
		trustedOrigins: ['http://localhost:5173'],
		emailAndPassword: {
			enabled: true
		},
		plugins: [
			username(),
			sveltekitCookies(getRequestEvent) // must be last plugin
		]
	});

	return authInstance;
}

export const auth = getAuth();
