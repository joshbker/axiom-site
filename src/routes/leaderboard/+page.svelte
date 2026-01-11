<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { onMount } from 'svelte';

	interface LeaderboardEntry {
		playerId: string;
		playerName: string;
		score: number;
		kills: number;
		survivalTime: number;
		achievedAt: string;
	}

	let leaderboard = $state<LeaderboardEntry[]>([]);
	let loading = $state(true);
	let error = $state('');

	onMount(async () => {
		try {
			const res = await fetch('/api/leaderboard?limit=100');
			const data = await res.json();
			if (data.success) {
				leaderboard = data.data;
			} else {
				error = data.error || 'Failed to load leaderboard';
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

	function formatDate(dateStr: string): string {
		return new Date(dateStr).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>Leaderboard | Axiom</title>
</svelte:head>

<!-- Page Title -->
<div class="text-center mb-8">
	<h1 class="text-4xl sm:text-5xl font-black tracking-tighter mb-2" style="font-family: 'Orbitron', sans-serif;">
		<span class="text-white">
			LEADERBOARD
		</span>
	</h1>
	<p class="text-muted-foreground text-lg" style="font-family: 'Rajdhani', sans-serif;">
		Top 100 players ranked by score
	</p>
</div>

<!-- Leaderboard -->
<div class="flex-1 max-w-3xl mx-auto w-full">
	<Card.Root class="border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
		<Card.Header class="border-b border-white/10">
			<div class="grid grid-cols-12 gap-4 text-sm text-muted-foreground uppercase tracking-wider" style="font-family: 'Rajdhani', sans-serif; font-weight: 600;">
				<div class="col-span-1 text-center">Rank</div>
				<div class="col-span-4">Player</div>
				<div class="col-span-2 text-center">Score</div>
				<div class="col-span-2 text-center">Kills</div>
				<div class="col-span-1 text-center">Time</div>
				<div class="col-span-2 text-right">Date</div>
			</div>
		</Card.Header>
		<Card.Content class="p-0">
			{#if loading}
				<div class="flex items-center justify-center py-20">
					<div class="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
				</div>
			{:else if error}
				<div class="text-center py-20 text-muted-foreground text-base" style="font-family: 'Rajdhani', sans-serif;">
					<svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto mb-4 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<circle cx="12" cy="12" r="10"></circle>
						<line x1="12" y1="8" x2="12" y2="12"></line>
						<line x1="12" y1="16" x2="12.01" y2="16"></line>
					</svg>
					<p class="text-lg">{error}</p>
				</div>
			{:else if leaderboard.length === 0}
				<div class="text-center py-20 text-muted-foreground text-base" style="font-family: 'Rajdhani', sans-serif;">
					<svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto mb-4 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
						<circle cx="9" cy="7" r="4"></circle>
						<path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
						<path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
					</svg>
					<p class="text-lg">No players on the leaderboard yet.</p>
					<p class="text-emerald-400 mt-2">Be the first to claim the throne!</p>
				</div>
			{:else}
				<div class="divide-y divide-white/5">
					{#each leaderboard as entry, index}
						{@const isTop3 = index < 3}
						{@const rankColors = ['bg-lime-400', 'bg-slate-400', 'bg-teal-600']}
						<a href="/player/{entry.playerId}" class="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-white/5 transition-colors items-center cursor-pointer {isTop3 ? 'bg-white/[0.02]' : ''}">
							<!-- Rank -->
							<div class="col-span-1 flex justify-center">
								{#if isTop3}
									<div class="w-8 h-8 rounded-full {rankColors[index]} flex items-center justify-center shadow-lg">
										<span class="text-sm font-bold text-white" style="font-family: 'Orbitron', sans-serif;">{index + 1}</span>
									</div>
								{:else}
									<span class="text-lg font-semibold text-muted-foreground" style="font-family: 'Orbitron', sans-serif;">{index + 1}</span>
								{/if}
							</div>

							<!-- Player Name -->
							<div class="col-span-4">
								<span class="font-semibold text-white truncate block hover:text-emerald-400 transition-colors {isTop3 ? 'text-emerald-400' : ''}" style="font-family: 'Rajdhani', sans-serif; font-size: 1.1rem;">
									{entry.playerName}
								</span>
							</div>

							<!-- Score -->
							<div class="col-span-2 text-center">
								<span class="font-bold {isTop3 ? 'text-emerald-400' : 'text-white'}" style="font-family: 'Orbitron', sans-serif;">
									{entry.score.toLocaleString()}
								</span>
							</div>

							<!-- Kills -->
							<div class="col-span-2 text-center text-muted-foreground text-base" style="font-family: 'Rajdhani', sans-serif;">
								{entry.kills}
							</div>

							<!-- Time -->
							<div class="col-span-1 text-center text-muted-foreground text-base" style="font-family: 'Rajdhani', sans-serif;">
								{formatTime(entry.survivalTime)}
							</div>

							<!-- Date -->
							<div class="col-span-2 text-right text-muted-foreground text-base" style="font-family: 'Rajdhani', sans-serif;">
								{formatDate(entry.achievedAt)}
							</div>
						</a>
					{/each}
				</div>
			{/if}
		</Card.Content>
	</Card.Root>

	<!-- Back Button -->
	<div class="text-center mt-6">
		<a href="/" class="inline-flex items-center gap-2 text-base text-muted-foreground hover:text-emerald-400 transition-colors py-2 px-3" style="font-family: 'Rajdhani', sans-serif;">
			<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<polyline points="15 18 9 12 15 6"></polyline>
			</svg>
			Back to Home
		</a>
	</div>
</div>
