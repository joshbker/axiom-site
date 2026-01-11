<script lang="ts">
	import { signUp } from '$lib/auth-client';
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Card from '$lib/components/ui/card';

	let username = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let error = $state('');
	let loading = $state(false);

	async function handleSubmit(e: Event) {
		e.preventDefault();
		error = '';

		if (password !== confirmPassword) {
			error = 'Passwords do not match';
			return;
		}

		if (password.length < 8) {
			error = 'Password must be at least 8 characters';
			return;
		}

		loading = true;

		// Auto-generate fake email to satisfy better-auth (same as game does)
		const fakeEmail = `${username.toLowerCase().replace(/[^a-z0-9]/g, '')}@axiom.local`;

		const result = await signUp.email({
			email: fakeEmail,
			password,
			name: username,
			username
		});

		loading = false;

		if (result.error) {
			error = result.error.message || 'Failed to create account';
			return;
		}

		goto('/');
	}
</script>

<svelte:head>
	<title>Sign Up | Axiom</title>
</svelte:head>

<div class="flex-1 flex items-center justify-center">
	<div class="w-full max-w-md">
		<!-- Logo & Branding -->
		<a href="/" class="flex items-center justify-center gap-3 mb-8 group">
			<div class="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow">
				<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
					<polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
					<line x1="12" y1="22" x2="12" y2="15.5"></line>
					<polyline points="22 8.5 12 15.5 2 8.5"></polyline>
				</svg>
			</div>
			<span class="text-3xl font-bold tracking-wider text-white" style="font-family: 'Orbitron', sans-serif;">AXIOM</span>
		</a>

		<Card.Root class="border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
			<Card.Header class="text-center pb-2">
				<Card.Title class="text-2xl font-bold tracking-wide" style="font-family: 'Orbitron', sans-serif;">
					JOIN THE ARENA
				</Card.Title>
				<Card.Description class="text-muted-foreground" style="font-family: 'Rajdhani', sans-serif; font-size: 1.1rem;">
					Create your account and become legend
				</Card.Description>
			</Card.Header>
			<Card.Content class="pt-4">
				<form onsubmit={handleSubmit} class="space-y-4">
					{#if error}
						<div class="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-3 rounded-lg flex items-center gap-2" style="font-family: 'Rajdhani', sans-serif;">
							<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<circle cx="12" cy="12" r="10"></circle>
								<line x1="12" y1="8" x2="12" y2="12"></line>
								<line x1="12" y1="16" x2="12.01" y2="16"></line>
							</svg>
							{error}
						</div>
					{/if}

					<div class="space-y-2">
						<Label for="username" class="text-base font-medium text-white/80" style="font-family: 'Rajdhani', sans-serif;">
							Username
						</Label>
						<div class="relative">
							<svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
								<circle cx="12" cy="7" r="4"></circle>
							</svg>
							<Input
								id="username"
								type="text"
								placeholder="Choose your warrior name"
								class="pl-10 bg-white/5 border-white/10 focus:border-blue-500/50 h-11"
								style="font-family: 'Rajdhani', sans-serif;"
								bind:value={username}
								required
								autocomplete="username"
							/>
						</div>
					</div>

					<div class="space-y-2">
						<Label for="password" class="text-base font-medium text-white/80" style="font-family: 'Rajdhani', sans-serif;">
							Password
						</Label>
						<div class="relative">
							<svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
								<path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
							</svg>
							<Input
								id="password"
								type="password"
								placeholder="Create a strong password"
								class="pl-10 bg-white/5 border-white/10 focus:border-blue-500/50 h-11"
								style="font-family: 'Rajdhani', sans-serif;"
								bind:value={password}
								required
								autocomplete="new-password"
							/>
						</div>
						<p class="text-sm text-muted-foreground pl-1" style="font-family: 'Rajdhani', sans-serif;">
							Minimum 8 characters
						</p>
					</div>

					<div class="space-y-2">
						<Label for="confirmPassword" class="text-base font-medium text-white/80" style="font-family: 'Rajdhani', sans-serif;">
							Confirm Password
						</Label>
						<div class="relative">
							<svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
							</svg>
							<Input
								id="confirmPassword"
								type="password"
								placeholder="Confirm your password"
								class="pl-10 bg-white/5 border-white/10 focus:border-blue-500/50 h-11"
								style="font-family: 'Rajdhani', sans-serif;"
								bind:value={confirmPassword}
								required
								autocomplete="new-password"
							/>
						</div>
					</div>

					<Button 
						type="submit" 
						class="w-full h-12 bg-blue-500 hover:bg-blue-400 border-0 text-white text-base font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all cursor-pointer mt-2" 
						style="font-family: 'Rajdhani', sans-serif;"
						disabled={loading}
					>
						{#if loading}
							<div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
							CREATING ACCOUNT...
						{:else}
							<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
								<circle cx="8.5" cy="7" r="4"></circle>
								<line x1="20" y1="8" x2="20" y2="14"></line>
								<line x1="23" y1="11" x2="17" y2="11"></line>
							</svg>
							CREATE ACCOUNT
						{/if}
					</Button>
				</form>
			</Card.Content>
			<Card.Footer class="flex justify-center pt-2 pb-6">
				<p class="text-base text-muted-foreground" style="font-family: 'Rajdhani', sans-serif;">
					Already have an account?
					<a href="/sign-in" class="text-blue-400 hover:text-blue-300 font-semibold ml-1 transition-colors">
						Sign in
					</a>
				</p>
			</Card.Footer>
		</Card.Root>

		<!-- Back to home link -->
		<div class="text-center mt-6">
			<a href="/" class="text-base text-muted-foreground hover:text-white transition-colors inline-flex items-center gap-2" style="font-family: 'Rajdhani', sans-serif;">
				<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<polyline points="15 18 9 12 15 6"></polyline>
				</svg>
				Back to home
			</a>
		</div>
	</div>
</div>
