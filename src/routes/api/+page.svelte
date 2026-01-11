<script lang="ts">
	import * as Card from "$lib/components/ui/card";

	type Route = {
		method: string;
		path: string;
		description: string;
		params: string | null;
		auth?: boolean;
	};

	type EndpointCategory = {
		category: string;
		description: string;
		routes: Route[];
	};

	const endpoints: EndpointCategory[] = [
		{
			category: "Authentication",
			description: "User registration, login, and session management",
			routes: [
				{
					method: "POST",
					path: "/api/auth/sign-up/email",
					description: "Register a new account",
					params: "email, password, name, username"
				},
				{
					method: "POST",
					path: "/api/auth/sign-in/username",
					description: "Login with credentials",
					params: "username, password"
				},
				{
					method: "POST",
					path: "/api/auth/sign-out",
					description: "End current session",
					params: null
				},
				{
					method: "GET",
					path: "/api/auth/session",
					description: "Get current session info",
					params: null
				}
			]
		},
		{
			category: "Scores",
			description: "Submit and retrieve game scores",
			routes: [
				{
					method: "POST",
					path: "/api/scores",
					description: "Submit a new score",
					params: "score, kills, survivalTime",
					auth: true
				},
				{
					method: "GET",
					path: "/api/me/scores",
					description: "Get your scores + stats",
					params: "limit (optional)",
					auth: true
				},
				{
					method: "GET",
					path: "/api/player/:id/scores",
					description: "Get a player's scores",
					params: "limit (optional)"
				}
			]
		},
		{
			category: "Leaderboard",
			description: "Global rankings and top players",
			routes: [
				{
					method: "GET",
					path: "/api/leaderboard",
					description: "Get top scores globally",
					params: "limit (optional, default: 10)"
				}
			]
		},
		{
			category: "Players",
			description: "Player search and profiles",
			routes: [
				{
					method: "GET",
					path: "/api/players/search",
					description: "Search for players by username",
					params: "q (query), limit (optional)"
				}
			]
		}
	];

	function getMethodColor(method: string) {
		switch (method) {
			case "GET":
				return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
			case "POST":
				return "bg-blue-500/15 text-blue-400 border-blue-500/30";
			case "PUT":
				return "bg-lime-500/15 text-lime-400 border-lime-500/30";
			case "DELETE":
				return "bg-rose-500/15 text-rose-400 border-rose-500/30";
			default:
				return "bg-muted text-muted-foreground";
		}
	}
</script>

<svelte:head>
	<title>API Documentation | Axiom</title>
</svelte:head>

<div class="flex-1 max-w-4xl mx-auto w-full">
	<!-- Header -->
	<div class="mb-10 text-center">
		<div class="mb-4 inline-flex items-center gap-3">
			<div class="w-12 h-12 rounded-xl bg-blue-500 p-2.5 shadow-lg shadow-blue-500/20">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="w-full h-full text-white"
				>
					<path d="m7 11 2-2-2-2" />
					<path d="M11 13h4" />
					<rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
				</svg>
			</div>
		</div>
		<h1 class="text-4xl sm:text-5xl font-black tracking-tighter mb-3" style="font-family: 'Orbitron', sans-serif;">
			<span class="text-white">
				API DOCS
			</span>
		</h1>
		<p class="text-lg text-muted-foreground" style="font-family: 'Rajdhani', sans-serif;">
			REST API powering the Axiom game experience
		</p>
		<div class="mt-4 flex items-center justify-center gap-3 text-base" style="font-family: 'Rajdhani', sans-serif;">
			<span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-emerald-400">
				<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
				Operational
			</span>
			<span class="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-muted-foreground">v1.0</span>
		</div>
	</div>

	<!-- Endpoint Categories -->
	<div class="space-y-6">
		{#each endpoints as category}
			<Card.Root class="border-white/10 bg-white/5 backdrop-blur-xl shadow-xl overflow-hidden">
				<Card.Header class="border-b border-white/10">
					<Card.Title class="text-xl" style="font-family: 'Orbitron', sans-serif; font-weight: 600;">
						{category.category.toUpperCase()}
					</Card.Title>
					<Card.Description class="text-base" style="font-family: 'Rajdhani', sans-serif;">
						{category.description}
					</Card.Description>
				</Card.Header>
				<Card.Content class="p-0">
					<div class="divide-y divide-white/5">
						{#each category.routes as route}
							<div class="flex flex-col gap-3 p-4 transition-colors hover:bg-white/5 sm:flex-row sm:items-start sm:gap-4">
								<div class="flex shrink-0 items-center gap-3">
									<span class="inline-flex w-16 justify-center rounded-md border px-2 py-1 text-xs font-semibold {getMethodColor(route.method)}" style="font-family: 'Rajdhani', sans-serif;">
										{route.method}
									</span>
								</div>
								<div class="min-w-0 flex-1 space-y-1">
									<code class="block truncate rounded bg-white/5 border border-white/10 px-2 py-1 font-mono text-sm text-white">
										{route.path}
									</code>
									<p class="text-base text-muted-foreground" style="font-family: 'Rajdhani', sans-serif;">
										{route.description}
									</p>
									{#if route.params}
										<p class="text-sm text-muted-foreground/70" style="font-family: 'Rajdhani', sans-serif;">
											<span class="font-medium text-emerald-400">Params:</span>
											{route.params}
										</p>
									{/if}
								</div>
								{#if route.auth}
									<span class="inline-flex shrink-0 items-center gap-1 self-start rounded-full border border-lime-500/30 bg-lime-500/10 px-2 py-0.5 text-sm text-lime-400" style="font-family: 'Rajdhani', sans-serif;">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-3 h-3">
											<path fill-rule="evenodd" d="M8 1a3.5 3.5 0 0 0-3.5 3.5V7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7V4.5A3.5 3.5 0 0 0 8 1Zm2 6V4.5a2 2 0 1 0-4 0V7h4Z" clip-rule="evenodd" />
										</svg>
										Auth Required
									</span>
								{/if}
							</div>
						{/each}
					</div>
				</Card.Content>
			</Card.Root>
		{/each}
	</div>

	<!-- Back Button -->
	<div class="text-center mt-8">
		<a href="/" class="inline-flex items-center gap-2 text-base text-muted-foreground hover:text-emerald-400 transition-colors py-2 px-3" style="font-family: 'Rajdhani', sans-serif;">
			<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<polyline points="15 18 9 12 15 6"></polyline>
			</svg>
			Back to Home
		</a>
	</div>
</div>
