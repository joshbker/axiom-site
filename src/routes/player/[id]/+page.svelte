<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	interface PlayerScore {
		_id: string;
		playerId: string;
		playerName: string;
		score: number;
		kills: number;
		survivalTime: number;
		achievedAt: string;
	}

	let scores = $state<PlayerScore[]>([]);
	let loading = $state(true);
	let error = $state('');

	// Computed stats
	let playerName = $derived(scores[0]?.playerName || 'Unknown Player');
	let totalGames = $derived(scores.length);
	let highScore = $derived(scores.length > 0 ? Math.max(...scores.map(s => s.score)) : 0);
	let totalScore = $derived(scores.reduce((sum, s) => sum + s.score, 0));
	let avgScore = $derived(totalGames > 0 ? Math.round(totalScore / totalGames) : 0);
	let totalKills = $derived(scores.reduce((sum, s) => sum + s.kills, 0));
	let avgKills = $derived(totalGames > 0 ? (totalKills / totalGames).toFixed(1) : '0');
	let bestKills = $derived(scores.length > 0 ? Math.max(...scores.map(s => s.kills)) : 0);
	let totalSurvivalTime = $derived(scores.reduce((sum, s) => sum + s.survivalTime, 0));
	let avgSurvivalTime = $derived(totalGames > 0 ? Math.floor(totalSurvivalTime / totalGames) : 0);
	let bestSurvivalTime = $derived(scores.length > 0 ? Math.max(...scores.map(s => s.survivalTime)) : 0);
	let killRate = $derived(totalSurvivalTime > 0 ? ((totalKills / totalSurvivalTime) * 60).toFixed(1) : '0');
	
	// Best game and sorted history
	let bestGame = $derived(scores.length > 0 ? scores.reduce((best, s) => s.score > best.score ? s : best, scores[0]) : null);
	let sortedScores = $derived(
		[...scores].sort((a, b) => new Date(b.achievedAt).getTime() - new Date(a.achievedAt).getTime())
	);
	let otherGames = $derived(
		sortedScores.filter(game => !bestGame || game._id !== bestGame._id)
	);

	onMount(async () => {
		try {
			const playerId = $page.params.id;
			const res = await fetch(`/api/player/${playerId}/scores?limit=50`);
			const data = await res.json();
			if (data.success) {
				scores = data.data;
			} else {
				error = data.error || 'Failed to load player data';
			}
		} catch (e) {
			error = 'Failed to connect to server';
		} finally {
			loading = false;
		}
	});

	function formatTime(seconds: number): string {
		const totalSecs = Math.floor(seconds);
		const mins = Math.floor(totalSecs / 60);
		const secs = totalSecs % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}

	function formatTotalTime(seconds: number): string {
		const totalSecs = Math.floor(seconds);
		const hours = Math.floor(totalSecs / 3600);
		const mins = Math.floor((totalSecs % 3600) / 60);
		const secs = totalSecs % 60;
		
		if (hours > 0) {
			return `${hours}h ${mins}m`;
		} else if (mins > 0) {
			return `${mins}m ${secs}s`;
		}
		return `${secs}s`;
	}

	function formatDate(dateStr: string): string {
		return new Date(dateStr).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>

<svelte:head>
	<title>{playerName} | Axiom</title>
</svelte:head>

{#if loading}
	<div class="flex-1 flex items-center justify-center">
		<div class="w-12 h-12 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
	</div>
{:else if error}
	<div class="flex-1 flex flex-col items-center justify-center text-muted-foreground text-base" style="font-family: 'Rajdhani', sans-serif;">
		<svg xmlns="http://www.w3.org/2000/svg" class="w-20 h-20 mb-4 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
			<circle cx="12" cy="12" r="10"></circle>
			<line x1="12" y1="8" x2="12" y2="12"></line>
			<line x1="12" y1="16" x2="12.01" y2="16"></line>
		</svg>
		<p class="text-xl">{error}</p>
		<a href="/" class="inline-flex items-center gap-2 mt-4 text-emerald-400 hover:text-emerald-300 transition-colors" style="font-family: 'Rajdhani', sans-serif;">
			Back to Home
		</a>
	</div>
{:else if scores.length === 0}
	<div class="flex-1 flex flex-col items-center justify-center text-muted-foreground text-base" style="font-family: 'Rajdhani', sans-serif;">
		<svg xmlns="http://www.w3.org/2000/svg" class="w-20 h-20 mb-4 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
			<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
			<circle cx="12" cy="7" r="4"></circle>
		</svg>
		<p class="text-xl">Player not found</p>
		<a href="/leaderboard" class="inline-flex items-center gap-2 mt-4 text-emerald-400 hover:text-emerald-300 transition-colors" style="font-family: 'Rajdhani', sans-serif;">
			View Leaderboard
		</a>
	</div>
{:else}
	<!-- Player Profile -->
	<div class="flex-1 max-w-4xl mx-auto w-full">
		<!-- Player Header -->
		<div class="text-center mb-6">
			<div class="w-24 h-24 mx-auto mb-4 rounded-full bg-emerald-500 flex items-center justify-center shadow-xl shadow-emerald-500/20">
				<span class="text-4xl font-bold text-white" style="font-family: 'Orbitron', sans-serif;">
					{playerName.charAt(0).toUpperCase()}
				</span>
			</div>
			<h1 class="text-3xl sm:text-4xl font-black tracking-tight" style="font-family: 'Orbitron', sans-serif;">
				<span class="text-white">
					{playerName}
				</span>
			</h1>
		</div>

		<!-- Stats Grid - Row 1: Key Stats -->
		<div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
			<Card.Root class="border-white/10 bg-white/5 backdrop-blur-xl py-3 gap-0">
				<Card.Content class="text-center">
					<div class="text-3xl font-bold text-emerald-400 mb-0.5" style="font-family: 'Orbitron', sans-serif;">
						{highScore.toLocaleString()}
					</div>
					<div class="text-lg text-white/50 font-medium" style="font-family: 'Rajdhani', sans-serif;">
						HIGH SCORE
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root class="border-white/10 bg-white/5 backdrop-blur-xl py-3 gap-0">
				<Card.Content class="text-center">
					<div class="text-3xl font-bold text-blue-400 mb-0.5" style="font-family: 'Orbitron', sans-serif;">
						{bestKills}
					</div>
					<div class="text-lg text-white/50 font-medium" style="font-family: 'Rajdhani', sans-serif;">
						BEST KILLS
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root class="border-white/10 bg-white/5 backdrop-blur-xl py-3 gap-0">
				<Card.Content class="text-center">
					<div class="text-3xl font-bold text-lime-400 mb-0.5" style="font-family: 'Orbitron', sans-serif;">
						{formatTime(bestSurvivalTime)}
					</div>
					<div class="text-lg text-white/50 font-medium" style="font-family: 'Rajdhani', sans-serif;">
						BEST TIME
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root class="border-white/10 bg-white/5 backdrop-blur-xl py-3 gap-0">
				<Card.Content class="text-center">
					<div class="text-3xl font-bold text-teal-400 mb-0.5" style="font-family: 'Orbitron', sans-serif;">
						{killRate}
					</div>
					<div class="text-lg text-white/50 font-medium" style="font-family: 'Rajdhani', sans-serif;">
						KILLS/MIN
					</div>
				</Card.Content>
			</Card.Root>
		</div>

		<!-- Stats Grid - Row 2: Totals & Averages -->
		<div class="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
			<Card.Root class="border-white/10 bg-white/5 backdrop-blur-xl py-3 gap-0">
				<Card.Content class="text-center">
					<div class="text-2xl font-bold text-white mb-0.5" style="font-family: 'Orbitron', sans-serif;">
						{totalGames}
					</div>
					<div class="text-base text-white/50 font-medium" style="font-family: 'Rajdhani', sans-serif;">
						GAMES
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root class="border-white/10 bg-white/5 backdrop-blur-xl py-3 gap-0">
				<Card.Content class="text-center">
					<div class="text-2xl font-bold text-white mb-0.5" style="font-family: 'Orbitron', sans-serif;">
						{totalScore.toLocaleString()}
					</div>
					<div class="text-base text-white/50 font-medium" style="font-family: 'Rajdhani', sans-serif;">
						TOTAL SCORE
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root class="border-white/10 bg-white/5 backdrop-blur-xl py-3 gap-0">
				<Card.Content class="text-center">
					<div class="text-2xl font-bold text-white mb-0.5" style="font-family: 'Orbitron', sans-serif;">
						{totalKills}
					</div>
					<div class="text-base text-white/50 font-medium" style="font-family: 'Rajdhani', sans-serif;">
						TOTAL KILLS
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root class="border-white/10 bg-white/5 backdrop-blur-xl py-3 gap-0">
				<Card.Content class="text-center">
					<div class="text-2xl font-bold text-white mb-0.5" style="font-family: 'Orbitron', sans-serif;">
						{formatTotalTime(totalSurvivalTime)}
					</div>
					<div class="text-base text-white/50 font-medium" style="font-family: 'Rajdhani', sans-serif;">
						TIME PLAYED
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root class="border-white/10 bg-white/5 backdrop-blur-xl py-3 gap-0">
				<Card.Content class="text-center">
					<div class="text-2xl font-bold text-white mb-0.5" style="font-family: 'Orbitron', sans-serif;">
						{avgScore.toLocaleString()}
					</div>
					<div class="text-base text-white/50 font-medium" style="font-family: 'Rajdhani', sans-serif;">
						AVG SCORE
					</div>
				</Card.Content>
			</Card.Root>
		</div>

		<!-- Recent Games -->
		<Card.Root class="border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
			<Card.Header class="border-b border-white/10">
				<div class="flex items-center justify-between">
					<Card.Title class="text-lg" style="font-family: 'Orbitron', sans-serif; font-weight: 600;">
						GAME HISTORY
					</Card.Title>
					<span class="text-base text-muted-foreground" style="font-family: 'Rajdhani', sans-serif;">
						Showing last {scores.length} games
					</span>
				</div>
			</Card.Header>
			<Card.Content class="p-0">
				<!-- Table Header -->
				<div class="grid grid-cols-12 gap-4 px-4 py-3 border-b border-white/10 text-sm text-muted-foreground uppercase tracking-wider" style="font-family: 'Rajdhani', sans-serif; font-weight: 600;">
					<div class="col-span-3">Score</div>
					<div class="col-span-2 text-center">Kills</div>
					<div class="col-span-2 text-center">Time</div>
					<div class="col-span-5 text-right">Date</div>
				</div>

				<!-- Personal Best (pinned at top) -->
				{#if bestGame}
					<div class="grid grid-cols-12 gap-4 px-4 py-3 items-center bg-emerald-500/5">
						<div class="col-span-3 flex items-center gap-2">
							<span class="font-bold text-emerald-400" style="font-family: 'Orbitron', sans-serif;">
								{bestGame.score.toLocaleString()}
							</span>
							<span class="text-sm text-emerald-400 font-semibold px-2 py-1 bg-emerald-500/15 rounded inline-flex items-center gap-1" style="font-family: 'Rajdhani', sans-serif;">
								<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
									<path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
								</svg>
								PB
							</span>
						</div>
						<div class="col-span-2 text-center text-white/80 text-base font-medium" style="font-family: 'Orbitron', sans-serif;">
							{bestGame.kills}
						</div>
						<div class="col-span-2 text-center text-white/80 text-base font-medium" style="font-family: 'Orbitron', sans-serif;">
							{formatTime(bestGame.survivalTime)}
						</div>
						<div class="col-span-5 text-right text-muted-foreground text-base" style="font-family: 'Rajdhani', sans-serif;">
							{formatDate(bestGame.achievedAt)}
						</div>
					</div>
					<!-- Separator -->
					<div class="border-b-2 border-emerald-500/20"></div>
				{/if}

				<!-- Other Games (sorted by date) -->
				<div class="divide-y divide-white/5">
					{#each otherGames as game}
						<div class="grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-white/5 transition-colors">
							<div class="col-span-3 flex items-center gap-2">
								<span class="font-bold text-white" style="font-family: 'Orbitron', sans-serif;">
									{game.score.toLocaleString()}
								</span>
							</div>
							<div class="col-span-2 text-center text-white/80 text-base font-medium" style="font-family: 'Orbitron', sans-serif;">
								{game.kills}
							</div>
							<div class="col-span-2 text-center text-white/80 text-base font-medium" style="font-family: 'Orbitron', sans-serif;">
								{formatTime(game.survivalTime)}
							</div>
							<div class="col-span-5 text-right text-muted-foreground text-base" style="font-family: 'Rajdhani', sans-serif;">
								{formatDate(game.achievedAt)}
							</div>
						</div>
					{/each}
				</div>
			</Card.Content>
		</Card.Root>

		<!-- Back Button -->
		<div class="text-center mt-6">
			<a href="/leaderboard" class="inline-flex items-center gap-2 text-base text-muted-foreground hover:text-emerald-400 transition-colors py-2 px-3" style="font-family: 'Rajdhani', sans-serif;">
				<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<polyline points="15 18 9 12 15 6"></polyline>
				</svg>
				Back to Leaderboard
			</a>
		</div>
	</div>
{/if}
