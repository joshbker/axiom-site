<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/logo.png';
	import { useSession, signOut } from '$lib/auth-client';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let { children } = $props();

	const session = useSession();

	interface SearchResult {
		playerId: string;
		playerName: string;
		highScore: number;
		gamesPlayed: number;
	}

	// Search state
	let searchQuery = $state('');
	let searchResults = $state<SearchResult[]>([]);
	let searchLoading = $state(false);
	let showSearchResults = $state(false);
	let searchTimeout: ReturnType<typeof setTimeout>;

	// Check if we're on auth pages (don't show navbar there)
	let isAuthPage = $derived($page.url.pathname === '/sign-in' || $page.url.pathname === '/sign-up');

	async function handleSearch() {
		if (searchQuery.length < 2) {
			searchResults = [];
			return;
		}

		searchLoading = true;
		try {
			const res = await fetch(`/api/players/search?q=${encodeURIComponent(searchQuery)}&limit=5`);
			const data = await res.json();
			if (data.success) {
				searchResults = data.data;
			}
		} catch (e) {
			searchResults = [];
		} finally {
			searchLoading = false;
		}
	}

	function onSearchInput() {
		clearTimeout(searchTimeout);
		showSearchResults = true;
		searchTimeout = setTimeout(handleSearch, 300);
	}

	function selectPlayer(playerId: string) {
		showSearchResults = false;
		searchQuery = '';
		searchResults = [];
		goto(`/player/${playerId}`);
	}

	function handleSearchBlur() {
		setTimeout(() => {
			showSearchResults = false;
		}, 200);
	}

	async function handleSignOut() {
		await signOut();
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="dark min-h-screen bg-background text-foreground overflow-hidden relative">
	<!-- Animated Background -->
	<div class="absolute inset-0 overflow-hidden pointer-events-none">
		<!-- Grid pattern -->
		<div class="absolute inset-0 opacity-[0.04]" 
			style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 60px 60px;">
		</div>
		
		<!-- Glowing orbs - softer, more ambient -->
		<div class="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/15 rounded-full blur-[140px]"></div>
		<div class="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/15 rounded-full blur-[140px]"></div>
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/8 rounded-full blur-[180px]"></div>
		
		<!-- Geometric shapes -->
		<div class="absolute top-20 right-20 w-32 h-32 border border-emerald-500/15 rotate-45 animate-spin" style="animation-duration: 25s;"></div>
		<div class="absolute bottom-32 left-32 w-24 h-24 border border-blue-500/15 rotate-12 animate-spin" style="animation-duration: 30s; animation-direction: reverse;"></div>
	</div>

	<!-- Main Content -->
	<div class="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
		<!-- Navbar (hidden on auth pages) -->
		{#if !isAuthPage}
			<header class="flex items-center justify-between mb-8 sm:mb-12">
				<!-- Left: Logo + Nav Links -->
				<div class="flex items-center gap-6">
					<a href="/" class="flex items-center gap-3 hover:opacity-80 transition-opacity">
						<div class="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
							<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
								<polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
								<line x1="12" y1="22" x2="12" y2="15.5"></line>
								<polyline points="22 8.5 12 15.5 2 8.5"></polyline>
							</svg>
						</div>
						<span class="text-xl font-semibold tracking-wide hidden sm:block" style="font-family: 'Rajdhani', sans-serif;">AXIOM</span>
					</a>

					<!-- Nav Links -->
					<nav class="hidden sm:flex items-center gap-6">
						<a 
							href="/download" 
							class="text-lg font-semibold text-muted-foreground hover:text-emerald-400 transition-colors"
							style="font-family: 'Rajdhani', sans-serif;"
						>
							Download
						</a>
						<a 
							href="/video" 
							class="text-lg font-semibold text-muted-foreground hover:text-emerald-400 transition-colors"
							style="font-family: 'Rajdhani', sans-serif;"
						>
							Demo
						</a>
						<a 
							href="/leaderboard" 
							class="text-lg font-semibold text-muted-foreground hover:text-emerald-400 transition-colors"
							style="font-family: 'Rajdhani', sans-serif;"
						>
							Leaderboard
						</a>
					</nav>
				</div>

				<!-- Right: Search + Auth -->
				<div class="flex items-center gap-3">
					<!-- Search Bar -->
					<div class="relative hidden md:block w-72">
						<svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<circle cx="11" cy="11" r="8"></circle>
							<path d="m21 21-4.3-4.3"></path>
						</svg>
						<Input 
							type="text" 
							placeholder="Search players..." 
							class="pl-9 bg-white/5 border-white/10 focus:border-emerald-500/50 h-10"
							style="font-family: 'Rajdhani', sans-serif; font-size: 1rem;"
							bind:value={searchQuery}
							oninput={onSearchInput}
							onfocus={() => showSearchResults = true}
							onblur={handleSearchBlur}
						/>
						{#if searchLoading}
							<div class="absolute right-3 top-1/2 -translate-y-1/2">
								<div class="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
							</div>
						{/if}

						<!-- Search Results Dropdown -->
						{#if showSearchResults && searchQuery.length >= 2}
							<div class="absolute top-full right-0 w-full mt-2 bg-card border border-white/10 rounded-lg shadow-xl overflow-hidden z-50">
								{#if searchResults.length === 0 && !searchLoading}
									<div class="px-4 py-3 text-base text-muted-foreground" style="font-family: 'Rajdhani', sans-serif;">
										No players found
									</div>
								{:else}
									{#each searchResults as player}
										<button
											type="button"
											class="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors text-left cursor-pointer"
											onclick={() => selectPlayer(player.playerId)}
										>
											<div class="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
												<span class="text-sm font-bold text-white" style="font-family: 'Orbitron', sans-serif;">
													{player.playerName.charAt(0).toUpperCase()}
												</span>
											</div>
											<div class="flex-1 min-w-0">
												<div class="font-semibold text-white truncate" style="font-family: 'Rajdhani', sans-serif;">
													{player.playerName}
												</div>
												<div class="text-sm text-muted-foreground" style="font-family: 'Rajdhani', sans-serif;">
													High: {player.highScore.toLocaleString()} · {player.gamesPlayed} games
												</div>
											</div>
										</button>
									{/each}
								{/if}
							</div>
						{/if}
					</div>

					<!-- Auth Buttons -->
					{#if $session?.data?.user}
						<!-- Profile Avatar Dropdown -->
						<DropdownMenu.Root>
							<DropdownMenu.Trigger class="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-background">
								<span class="text-lg font-bold text-white" style="font-family: 'Orbitron', sans-serif;">
									{$session.data.user.name?.charAt(0).toUpperCase() || '?'}
								</span>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content align="end" class="w-48">
								<DropdownMenu.Item>
									{#snippet child({ props })}
										<a href="/player/{$session.data?.user.id}" {...props}>
											<span style="font-family: 'Rajdhani', sans-serif;">View Profile</span>
										</a>
									{/snippet}
								</DropdownMenu.Item>
								<DropdownMenu.Separator />
								<DropdownMenu.Item variant="destructive" onSelect={handleSignOut}>
									<span style="font-family: 'Rajdhani', sans-serif;">Sign Out</span>
								</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					{:else}
						<Button href="/sign-in" variant="ghost" class="px-4 py-2 text-base font-semibold h-10" style="font-family: 'Rajdhani', sans-serif;">
							Sign In
						</Button>
						<Button href="/sign-up" class="px-4 py-2 text-base font-semibold h-10 bg-emerald-500 hover:bg-emerald-400 border-0 text-white shadow-lg shadow-emerald-500/25" style="font-family: 'Rajdhani', sans-serif;">
							Join the Battle
						</Button>
					{/if}
				</div>
			</header>
		{/if}

		{@render children()}
	</div>
</div>

<style>
	:global(body) {
		font-family: 'Rajdhani', sans-serif;
	}
</style>
