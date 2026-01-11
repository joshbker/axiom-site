<script lang="ts">
	import { useSession } from '$lib/auth-client';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { onMount } from 'svelte';

	const session = useSession();

	interface LeaderboardEntry {
		playerId: string;
		playerName: string;
		score: number;
		kills: number;
		survivalTime: number;
		achievedAt: string;
	}

	let leaderboard = $state<LeaderboardEntry[]>([]);
	let loadingLeaderboard = $state(true);
	let leaderboardError = $state('');

	onMount(async () => {
		try {
			const res = await fetch('/api/leaderboard?limit=10');
			const data = await res.json();
			if (data.success) {
				leaderboard = data.data;
			} else {
				leaderboardError = data.error || 'Failed to load leaderboard';
			}
		} catch (e) {
			leaderboardError = 'Failed to connect to server';
		} finally {
			loadingLeaderboard = false;
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
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>Axiom | Dominate the Arena</title>
</svelte:head>

<!-- Hero Section -->
<section class="flex-1 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
	<!-- Left: Hero Text -->
	<div class="flex-1 text-center lg:text-left">
		<h1 class="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-none" style="font-family: 'Orbitron', sans-serif;">
			<span class="text-white">
				AXIOM
			</span>
		</h1>
		
		<p class="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0" style="font-family: 'Rajdhani', sans-serif; font-weight: 400;">
			Enter the arena. Dominate your enemies. Climb the ranks. 
			<span class="text-emerald-400">Become legend.</span>
		</p>

		{#if !$session?.data?.user}
			<div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
				<Button href="/sign-up" size="lg" class="bg-emerald-500 hover:bg-emerald-400 border-0 text-white text-lg px-8 shadow-xl shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:scale-105" style="font-family: 'Rajdhani', sans-serif; font-weight: 600;">
					<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
						<polyline points="10 17 15 12 10 7"></polyline>
						<line x1="15" y1="12" x2="3" y2="12"></line>
					</svg>
					JOIN THE BATTLE
				</Button>
				<Button href="/sign-in" variant="outline" size="lg" class="text-lg px-8 border-white/20 hover:bg-white/5" style="font-family: 'Rajdhani', sans-serif; font-weight: 600;">
					SIGN IN
				</Button>
			</div>
		{:else}
			<div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
				<Button size="lg" class="bg-emerald-500 hover:bg-emerald-400 border-0 text-white text-lg px-8 shadow-xl shadow-emerald-500/25 cursor-pointer transition-colors" style="font-family: 'Rajdhani', sans-serif; font-weight: 600;">
					<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polygon points="5 3 19 12 5 21 5 3"></polygon>
					</svg>
					PLAY NOW
				</Button>
			</div>
		{/if}
	</div>

	<!-- Right: Leaderboard -->
	<div class="w-full lg:w-[420px] shrink-0">
		<Card.Root class="border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
			<Card.Header class="border-b border-white/10">
                <div class="flex items-center justify-between">
                    <Card.Title class="text-lg" style="font-family: 'Orbitron', sans-serif; font-weight: 600;">
                        LEADERBOARD
                    </Card.Title>
					<span class="text-sm text-emerald-400 px-2 py-1 bg-emerald-500/10 rounded-full font-medium" style="font-family: 'Rajdhani', sans-serif;">
						TOP 10
					</span>
				</div>
			</Card.Header>
			<Card.Content class="p-0">
				{#if loadingLeaderboard}
					<div class="flex items-center justify-center py-16">
						<div class="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
					</div>
				{:else if leaderboardError}
					<div class="text-center py-16 text-muted-foreground text-base" style="font-family: 'Rajdhani', sans-serif;">
						<svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mx-auto mb-3 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<circle cx="12" cy="12" r="10"></circle>
							<line x1="12" y1="8" x2="12" y2="12"></line>
							<line x1="12" y1="16" x2="12.01" y2="16"></line>
						</svg>
						{leaderboardError}
					</div>
				{:else if leaderboard.length === 0}
					<div class="text-center py-16 text-muted-foreground text-base" style="font-family: 'Rajdhani', sans-serif;">
						<svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mx-auto mb-3 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
							<circle cx="9" cy="7" r="4"></circle>
							<path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
							<path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
						</svg>
						No players on the leaderboard yet.<br>
						<span class="text-emerald-400">Be the first!</span>
					</div>
				{:else}
					<div class="divide-y divide-white/5 min-h-[520px]">
						{#each leaderboard as entry, index}
							{@const isTop3 = index < 3}
							{@const rankColors = ['bg-lime-400', 'bg-slate-400', 'bg-teal-600']}
							<a href="/player/{entry.playerId}" class="flex items-center gap-4 px-4 h-[52px] hover:bg-white/5 transition-colors group cursor-pointer {isTop3 ? 'bg-white/[0.02]' : ''}">
								<!-- Rank -->
								<div class="w-8 shrink-0">
									{#if isTop3}
										<div class="w-8 h-8 rounded-full {rankColors[index]} flex items-center justify-center shadow-lg">
											<span class="text-sm font-bold text-white" style="font-family: 'Orbitron', sans-serif;">{index + 1}</span>
										</div>
									{:else}
										<span class="text-lg font-semibold text-muted-foreground block text-center" style="font-family: 'Orbitron', sans-serif;">{index + 1}</span>
									{/if}
								</div>

								<!-- Player Info -->
								<div class="flex-1 min-w-0">
									<div class="font-semibold text-white truncate group-hover:text-emerald-400 transition-colors" style="font-family: 'Rajdhani', sans-serif; font-size: 1.1rem;">
										{entry.playerName}
									</div>
									<div class="flex items-center gap-3 text-sm text-muted-foreground" style="font-family: 'Rajdhani', sans-serif;">
										<span class="flex items-center gap-1">
											<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
												<circle cx="12" cy="12" r="10"></circle>
												<polyline points="12 6 12 12 16 14"></polyline>
											</svg>
											{formatTime(entry.survivalTime)}
										</span>
										<span class="flex items-center gap-1">
											<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
												<path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
											</svg>
											{entry.kills} kills
										</span>
									</div>
								</div>

								<!-- Score -->
								<div class="text-right shrink-0">
									<div class="font-bold text-lg {isTop3 ? 'text-emerald-400' : 'text-white'}" style="font-family: 'Orbitron', sans-serif;">
										{entry.score.toLocaleString()}
									</div>
									<div class="text-sm text-muted-foreground" style="font-family: 'Rajdhani', sans-serif;">
										{formatDate(entry.achievedAt)}
									</div>
								</div>
							</a>
						{/each}
					</div>
				{/if}
			</Card.Content>
			<Card.Footer class="border-t border-white/10 justify-center">
				<a href="/leaderboard" class="inline-flex items-center gap-1 text-base text-muted-foreground hover:text-emerald-400 transition-colors py-2 px-3" style="font-family: 'Rajdhani', sans-serif;">
					View Full Leaderboard
					<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<polyline points="9 18 15 12 9 6"></polyline>
					</svg>
				</a>
			</Card.Footer>
		</Card.Root>
	</div>
</section>
