import mongoose from 'mongoose';
import { MONGODB_URI, MONGODB_NAME } from '$env/static/private';

let isConnected = false;

export async function connectDB() {
	if (isConnected || mongoose.connection.readyState === 1) {
		isConnected = true;
		return;
	}

	try {
		await mongoose.connect(MONGODB_URI, {
			dbName: MONGODB_NAME
		} as mongoose.ConnectOptions);
		isConnected = true;
	} catch (error) {
		console.error('Mongoose connection error:', error);
		throw error;
	}
}
