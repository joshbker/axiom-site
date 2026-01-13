<script lang="ts">
	import { onMount } from 'svelte';

	let videoLoaded = $state(false);
	let sectionsVisible = $state(false);

	onMount(() => {
		// Stagger the animations
		setTimeout(() => videoLoaded = true, 100);
		setTimeout(() => sectionsVisible = true, 400);
	});
</script>

<svelte:head>
	<title>Game Demo | AXIOM</title>
	<meta name="description" content="Watch a demonstration of AXIOM gameplay and learn how to play." />
</svelte:head>

<div class="flex-1 flex flex-col items-center">
	<!-- Hero Section -->
	<div class="w-full max-w-5xl mb-8">
		<div class="text-center mb-8">
			<h1 
				class="text-4xl sm:text-5xl font-black tracking-tighter mb-2 transition-all duration-700"
				class:opacity-0={!videoLoaded}
				class:translate-y-4={!videoLoaded}
				style="font-family: 'Orbitron', sans-serif;"
			>
				<span class="text-white">
					GAME DEMO
				</span>
			</h1>
		</div>

		<!-- Video Container -->
		<div 
			class="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl shadow-emerald-500/10 transition-all duration-700 delay-200"
			class:opacity-0={!videoLoaded}
			class:scale-95={!videoLoaded}
		>
			<!-- Decorative corner accents -->
			<div class="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-emerald-500/50 rounded-tl-2xl pointer-events-none"></div>
			<div class="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-emerald-500/50 rounded-tr-2xl pointer-events-none"></div>
			<div class="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-emerald-500/50 rounded-bl-2xl pointer-events-none"></div>
			<div class="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-emerald-500/50 rounded-br-2xl pointer-events-none"></div>
			
			<!-- Responsive Video Wrapper (16:9 aspect ratio) -->
			<div class="relative w-full" style="padding-bottom: 56.25%;">
				<iframe 
					class="absolute inset-0 w-full h-full"
					src="https://www.youtube.com/embed/hXLvQChKkgw?si=ufAp_xAAyoH9z88F" 
					title="AXIOM Gameplay Demo" 
					frameborder="0" 
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
					referrerpolicy="strict-origin-when-cross-origin" 
					allowfullscreen
				></iframe>
			</div>
		</div>
	</div>

	<!-- Info Cards Grid -->
	<div 
		class="w-full max-w-5xl grid md:grid-cols-2 gap-6 transition-all duration-700"
		class:opacity-0={!sectionsVisible}
		class:translate-y-8={!sectionsVisible}
	>
		<!-- About the Game Card -->
		<div class="group relative bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:border-emerald-500/30 transition-all duration-300">
			<!-- Card glow effect on hover -->
			<div class="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
			
			<div class="relative">
				<div class="flex items-center gap-3 mb-4">
					<div class="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
						<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
							<line x1="12" y1="22" x2="12" y2="15.5"></line>
							<polyline points="22 8.5 12 15.5 2 8.5"></polyline>
						</svg>
					</div>
					<h2 class="text-2xl font-bold text-white" style="font-family: 'Orbitron', sans-serif;">
						About AXIOM
					</h2>
				</div>
				
				<div class="space-y-3 text-muted-foreground" style="font-family: 'Rajdhani', sans-serif;">
					<p class="text-lg leading-relaxed">
						AXIOM is a fast-paced arcade game that tests your reflexes and strategic thinking. 
						Navigate through an ever-changing geometric landscape, dodging obstacles and collecting 
						power-ups to achieve the highest score possible.
					</p>
					<p class="text-lg leading-relaxed">
						Compete with players worldwide on our global leaderboard and prove you have what it 
						takes to reach the top. Every game is different, every run is a new challenge.
					</p>
				</div>
			</div>
		</div>

		<!-- How to Play Card -->
		<div class="group relative bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:border-blue-500/30 transition-all duration-300">
			<!-- Card glow effect on hover -->
			<div class="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
			
			<div class="relative">
				<div class="flex items-center gap-3 mb-4">
					<div class="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
						<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect>
							<path d="M12 18h.01"></path>
						</svg>
					</div>
					<h2 class="text-2xl font-bold text-white" style="font-family: 'Orbitron', sans-serif;">
						How to Play
					</h2>
				</div>
				
				<ul class="space-y-3" style="font-family: 'Rajdhani', sans-serif;">
					<li class="flex items-start gap-3">
						<span class="shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold" style="font-family: 'Orbitron', sans-serif;">1</span>
						<span class="text-lg text-muted-foreground">Use <kbd class="px-2 py-0.5 bg-white/10 rounded text-white text-sm">Arrow Keys</kbd> or <kbd class="px-2 py-0.5 bg-white/10 rounded text-white text-sm">WASD</kbd> to move your ship</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold" style="font-family: 'Orbitron', sans-serif;">2</span>
						<span class="text-lg text-muted-foreground">Avoid obstacles and enemy projectiles to stay alive</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold" style="font-family: 'Orbitron', sans-serif;">3</span>
						<span class="text-lg text-muted-foreground">Collect glowing orbs to increase your score multiplier</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold" style="font-family: 'Orbitron', sans-serif;">4</span>
						<span class="text-lg text-muted-foreground">Press <kbd class="px-2 py-0.5 bg-white/10 rounded text-white text-sm">Space</kbd> to activate special abilities</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold" style="font-family: 'Orbitron', sans-serif;">5</span>
						<span class="text-lg text-muted-foreground">Survive as long as possible and climb the leaderboard!</span>
					</li>
				</ul>
			</div>
		</div>
	</div>

	<!-- CTA Section -->
	<div 
		class="w-full max-w-5xl mt-8 text-center transition-all duration-700 delay-200"
		class:opacity-0={!sectionsVisible}
		class:translate-y-8={!sectionsVisible}
	>
		<div class="inline-flex items-center gap-4 p-6 bg-linear-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 rounded-2xl border border-white/10">
			<span class="text-lg text-muted-foreground" style="font-family: 'Rajdhani', sans-serif;">
				Ready to play?
			</span>
			<a 
				href="/download" 
				class="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:scale-105"
				style="font-family: 'Rajdhani', sans-serif;"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
					<polyline points="7 10 12 15 17 10"></polyline>
					<line x1="12" y1="15" x2="12" y2="3"></line>
				</svg>
				Download Now
			</a>
		</div>
	</div>
</div>
