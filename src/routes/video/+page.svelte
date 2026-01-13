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

<div class="flex-1 flex flex-col items-center gap-8">
	<!-- Hero Section -->
	<div class="w-full max-w-5xl">
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
						AXIOM is a fast-paced arcade game where you fight off endless enemies using your 
						area-of-effect attack. Move with WASD, right-click to attack, and survive as long 
						as you can while racking up score.
					</p>
					<p class="text-lg leading-relaxed">
						Enemies will swarm you from all directions — and watch out for the <span class="text-red-400 font-semibold">red demons</span>, 
						they're especially dangerous! Compete on the global leaderboard and see how you stack up.
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
							<rect x="2" y="4" width="20" height="16" rx="2"/>
							<path d="M6 8h.001"/>
							<path d="M10 8h.001"/>
							<path d="M14 8h.001"/>
							<path d="M18 8h.001"/>
							<path d="M6 12h.001"/>
							<path d="M10 12h.001"/>
							<path d="M14 12h.001"/>
							<path d="M18 12h.001"/>
							<path d="M6 16h12"/>
						</svg>
					</div>
					<h2 class="text-2xl font-bold text-white" style="font-family: 'Orbitron', sans-serif;">
						How to Play
					</h2>
				</div>
				
				<ul class="space-y-3" style="font-family: 'Rajdhani', sans-serif;">
					<li class="flex items-start gap-3">
						<span class="shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold" style="font-family: 'Orbitron', sans-serif;">1</span>
						<span class="text-lg text-muted-foreground">Use <kbd class="px-2 py-0.5 bg-white/10 rounded text-white text-sm">WASD</kbd> to move your character</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold" style="font-family: 'Orbitron', sans-serif;">2</span>
						<span class="text-lg text-muted-foreground"><kbd class="px-2 py-0.5 bg-white/10 rounded text-white text-sm">Right Click</kbd> to attack enemies in range</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold" style="font-family: 'Orbitron', sans-serif;">3</span>
						<span class="text-lg text-muted-foreground">Enemies will attack you when they get close — don't let them!</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold" style="font-family: 'Orbitron', sans-serif;">4</span>
						<span class="text-lg text-muted-foreground">Survive and kill enemies to earn score and climb the leaderboard</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="shrink-0 w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-sm font-bold" style="font-family: 'Orbitron', sans-serif;">!</span>
						<span class="text-lg text-muted-foreground">Watch out for <span class="text-red-400 font-semibold">red demons</span> — they're dangerous!</span>
					</li>
				</ul>
			</div>
		</div>
	</div>

	<!-- CTA Section -->
	<div 
		class="w-full max-w-5xl transition-all duration-700 delay-200"
		class:opacity-0={!sectionsVisible}
		class:translate-y-8={!sectionsVisible}
	>
		<div class="group/cta relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-linear-to-br from-emerald-500/10 via-background to-blue-500/10 p-8 md:p-12">
			<!-- Animated glow effects -->
			<div class="absolute top-0 left-1/4 w-64 h-64 bg-emerald-500/20 rounded-full blur-[100px] animate-pulse"></div>
			<div class="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" style="animation-delay: 1s;"></div>
			
			<!-- Animated border using conic gradient -->
			<div class="cta-border-wrapper absolute inset-0 rounded-2xl pointer-events-none"></div>
			
			<div class="relative text-center">
				<h3 class="text-3xl md:text-4xl font-black tracking-tight mb-3" style="font-family: 'Orbitron', sans-serif;">
					<span class="text-white">READY TO </span>
					<span class="text-emerald-400">PLAY?</span>
				</h3>
				<p class="text-lg text-muted-foreground mb-8 max-w-md mx-auto" style="font-family: 'Rajdhani', sans-serif;">
					Download AXIOM now and see how long you can survive!
				</p>
				<a 
					href="/download" 
					class="group inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white text-lg font-bold rounded-xl shadow-2xl shadow-emerald-500/30 transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/50"
					style="font-family: 'Rajdhani', sans-serif;"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 transition-transform group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
						<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
						<polyline points="7 10 12 15 17 10"></polyline>
						<line x1="12" y1="15" x2="12" y2="3"></line>
					</svg>
					DOWNLOAD NOW
					<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="9 18 15 12 9 6"></polyline>
					</svg>
				</a>
			</div>
		</div>
	</div>
</div>

<style>
	.cta-border-wrapper {
		--border-angle: 45deg;
		background: conic-gradient(
			from var(--border-angle),
			transparent 0deg,
			transparent 40deg,
			rgb(16 185 129 / 0.8) 45deg,
			rgb(16 185 129 / 0.8) 90deg,
			transparent 95deg,
			transparent 220deg,
			rgb(16 185 129 / 0.8) 225deg,
			rgb(16 185 129 / 0.8) 270deg,
			transparent 275deg,
			transparent 360deg
		);
		-webkit-mask: 
			linear-gradient(#fff 0 0) content-box, 
			linear-gradient(#fff 0 0);
		mask: 
			linear-gradient(#fff 0 0) content-box, 
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		padding: 2px;
		transition: --border-angle 0.8s ease-in-out;
	}
	
	.group\/cta:hover .cta-border-wrapper {
		--border-angle: 135deg;
	}
	
	@property --border-angle {
		syntax: '<angle>';
		initial-value: 45deg;
		inherits: false;
	}
</style>
