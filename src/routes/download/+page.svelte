<script lang="ts">
	import { onMount } from 'svelte';

	let contentVisible = $state(false);

	onMount(() => {
		setTimeout(() => contentVisible = true, 100);
	});
</script>

<svelte:head>
	<title>Download | AXIOM</title>
	<meta name="description" content="Download AXIOM and start playing today." />
</svelte:head>

<div class="flex-1 flex flex-col items-center justify-center">
	<div 
		class="w-full max-w-2xl text-center transition-all duration-700"
		class:opacity-0={!contentVisible}
		class:translate-y-4={!contentVisible}
	>
		<!-- Logo -->
		<div class="mb-8 flex justify-center">
			<div class="w-24 h-24 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/30">
				<svg xmlns="http://www.w3.org/2000/svg" class="w-14 h-14 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
					<polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
					<line x1="12" y1="22" x2="12" y2="15.5"></line>
					<polyline points="22 8.5 12 15.5 2 8.5"></polyline>
				</svg>
			</div>
		</div>

		<!-- Title -->
		<h1 
			class="text-4xl sm:text-5xl font-black tracking-tighter mb-4"
			style="font-family: 'Orbitron', sans-serif;"
		>
			<span class="text-white">DOWNLOAD</span>
		</h1>

		<p class="text-xl text-muted-foreground mb-10" style="font-family: 'Rajdhani', sans-serif;">
			Get AXIOM for your platform and jump into the action
		</p>

		<!-- Download Options Grid -->
		<div class="grid md:grid-cols-2 gap-6 mb-8">
			<!-- EXE Download Card (Recommended) -->
			<div class="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-emerald-500/30 p-6">
				<!-- Decorative glow -->
				<div class="absolute inset-0 bg-linear-to-br from-emerald-500/10 via-transparent to-transparent rounded-2xl pointer-events-none"></div>
				
				<!-- Recommended badge -->
				<div class="absolute -top-3 left-1/2 -translate-x-1/2">
					<span class="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-lg" style="font-family: 'Orbitron', sans-serif;">
						RECOMMENDED
					</span>
				</div>
				
				<div class="relative flex flex-col items-center pt-4">
					<div class="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
						<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
							<path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
						</svg>
					</div>
					<h3 class="text-lg font-bold text-white mb-1" style="font-family: 'Orbitron', sans-serif;">
						Windows
					</h3>
					<p class="text-sm text-muted-foreground mb-4 text-center" style="font-family: 'Rajdhani', sans-serif;">
						Includes bundled JRE 21<br/>
						<span class="text-emerald-400">No Java installation required</span>
					</p>
					
					<a 
						href="https://github.com/joshbker/axiom-game/releases/latest/download/Axiom.zip"
						class="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl shadow-xl shadow-emerald-500/25 transition-all duration-200 hover:scale-105 hover:shadow-emerald-500/40"
						style="font-family: 'Rajdhani', sans-serif;"
					>
						<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
							<polyline points="7 10 12 15 17 10"></polyline>
							<line x1="12" y1="15" x2="12" y2="3"></line>
						</svg>
						<span>Download .zip</span>
					</a>
					
					<p class="text-xs text-muted-foreground mt-3" style="font-family: 'Rajdhani', sans-serif;">
						Windows 10 or later
					</p>
				</div>
			</div>

			<!-- JAR Download Card -->
			<div class="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
				<!-- Decorative glow -->
				<div class="absolute inset-0 bg-linear-to-br from-orange-500/5 via-transparent to-transparent rounded-2xl pointer-events-none"></div>
				
				<div class="relative flex flex-col items-center pt-4">
					<div class="w-14 h-14 rounded-xl bg-orange-500/20 flex items-center justify-center mb-4">
						<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
							<path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
							<line x1="6" y1="2" x2="6" y2="4"/>
							<line x1="10" y1="2" x2="10" y2="4"/>
							<line x1="14" y1="2" x2="14" y2="4"/>
						</svg>
					</div>
					<h3 class="text-lg font-bold text-white mb-1" style="font-family: 'Orbitron', sans-serif;">
						Java JAR
					</h3>
					<p class="text-sm text-muted-foreground mb-4 text-center" style="font-family: 'Rajdhani', sans-serif;">
						Lightweight, cross-platform<br/>
						<span class="text-orange-400">Requires Java 21+</span>
					</p>
					
					<a 
						href="https://github.com/joshbker/axiom-game/releases/latest/download/axiom-game.jar"
						class="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/10 transition-all duration-200 hover:scale-105"
						style="font-family: 'Rajdhani', sans-serif;"
					>
						<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
							<polyline points="7 10 12 15 17 10"></polyline>
							<line x1="12" y1="15" x2="12" y2="3"></line>
						</svg>
						<span>Download .jar</span>
					</a>
					
					<p class="text-xs text-muted-foreground mt-3" style="font-family: 'Rajdhani', sans-serif;">
						Any OS with Java 21+
					</p>
				</div>
			</div>
		</div>

		<!-- Instructions -->
		<div class="grid md:grid-cols-2 gap-6">
			<!-- Windows Instructions -->
			<div class="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5 text-left">
				<h3 class="text-base font-bold text-white mb-3 flex items-center gap-2" style="font-family: 'Orbitron', sans-serif;">
					<div class="w-6 h-6 rounded bg-emerald-500/20 flex items-center justify-center">
						<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
							<path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
						</svg>
					</div>
					Windows Instructions
				</h3>
				<ol class="space-y-2 text-muted-foreground text-sm" style="font-family: 'Rajdhani', sans-serif;">
					<li class="flex items-start gap-2">
						<span class="shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold" style="font-family: 'Orbitron', sans-serif;">1</span>
						<span>Download <kbd class="px-1.5 py-0.5 bg-white/10 rounded text-white text-xs">Axiom.zip</kbd></span>
					</li>
					<li class="flex items-start gap-2">
						<span class="shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold" style="font-family: 'Orbitron', sans-serif;">2</span>
						<span>Extract the zip to a folder</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold" style="font-family: 'Orbitron', sans-serif;">3</span>
						<span>Run <kbd class="px-1.5 py-0.5 bg-white/10 rounded text-white text-xs">axiom-game.exe</kbd></span>
					</li>
				</ol>
			</div>

			<!-- JAR Instructions -->
			<div class="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5 text-left">
				<h3 class="text-base font-bold text-white mb-3 flex items-center gap-2" style="font-family: 'Orbitron', sans-serif;">
					<div class="w-6 h-6 rounded bg-orange-500/20 flex items-center justify-center">
						<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
							<path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
							<line x1="6" y1="2" x2="6" y2="4"/>
							<line x1="10" y1="2" x2="10" y2="4"/>
							<line x1="14" y1="2" x2="14" y2="4"/>
						</svg>
					</div>
					JAR Instructions
				</h3>
				<ol class="space-y-2 text-muted-foreground text-sm" style="font-family: 'Rajdhani', sans-serif;">
					<li class="flex items-start gap-2">
						<span class="shrink-0 w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-bold" style="font-family: 'Orbitron', sans-serif;">1</span>
						<span>Ensure <a href="https://adoptium.net/" target="_blank" class="text-orange-400 hover:underline">Java 21+</a> is installed</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="shrink-0 w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-bold" style="font-family: 'Orbitron', sans-serif;">2</span>
						<span>Download <kbd class="px-1.5 py-0.5 bg-white/10 rounded text-white text-xs">axiom-game.jar</kbd></span>
					</li>
					<li class="flex items-start gap-2">
						<span class="shrink-0 w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-bold" style="font-family: 'Orbitron', sans-serif;">3</span>
						<span>Run: <kbd class="px-1.5 py-0.5 bg-white/10 rounded text-white text-xs">java -jar axiom-game.jar</kbd></span>
					</li>
				</ol>
			</div>
		</div>

		<!-- Back link -->
		<div class="mt-8">
			<a href="/" class="inline-flex items-center gap-2 text-base text-muted-foreground hover:text-emerald-400 transition-colors py-2 px-3" style="font-family: 'Rajdhani', sans-serif;">
				<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<polyline points="15 18 9 12 15 6"></polyline>
				</svg>
				Back to Home
			</a>
		</div>
	</div>
</div>
