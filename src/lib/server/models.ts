import mongoose, { Schema, model } from 'mongoose';

// Leaderboard Entry Schema
const leaderboardEntrySchema = new Schema({
	playerId: { type: String, required: true, index: true },
	playerName: { type: String, required: true },
	score: { type: Number, required: true, index: true },
	kills: { type: Number, required: true },
	survivalTime: { type: Number, required: true },
	achievedAt: { type: Date, default: Date.now, index: true }
});

leaderboardEntrySchema.index({ score: -1, achievedAt: -1 });

export const LeaderboardEntry = mongoose.models.LeaderboardEntry || model('LeaderboardEntry', leaderboardEntrySchema);
