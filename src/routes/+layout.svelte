<script>
	import { navigating } from '$app/stores';
	import { tick } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	import "../app.css";

	// Para la barra de progreso
	const progressValue = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	$: $navigating ? startProgress() : resetProgress();

	async function startProgress() {
		progressValue.set(0);
		// Esperar al siguiente ciclo de renderizado
		await tick();
		progressValue.set(50);

		const increment = () => {
			if ($navigating) {
				progressValue.update(n => Math.min(n + 5, 90));
				setTimeout(increment, 300);
			}
		};

		increment();
	}

	function resetProgress() {
		progressValue.set(100);
		setTimeout(() => {
			progressValue.set(0);
		}, 200);
	}
</script>

<div class="drawer lg:drawer-open">
	<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<progress class="progress progress-primary w-full block" value={$progressValue} max="100"></progress>
		<slot />
		<label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">
			Open drawer
		</label>
	</div>
	<div class="drawer-side">
		<label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
		<ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
			<!-- Sidebar content here -->
			<li><a href="/">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M21 16V10.1L12.95 14.475C12.65 14.6417 12.3333 14.725 12 14.725C11.6666 14.725 11.35 14.6417 11.05 14.475L2.59998 9.87502C2.41664 9.77502 2.28748 9.65002 2.21248 9.50002C2.13748 9.35002 2.09998 9.18336 2.09998 9.00002C2.09998 8.81669 2.13748 8.65002 2.21248 8.50002C2.28748 8.35002 2.41664 8.22502 2.59998 8.12502L11.05 3.52502C11.2 3.44169 11.3541 3.37919 11.5125 3.33752C11.6708 3.29586 11.8333 3.27502 12 3.27502C12.1666 3.27502 12.3291 3.29586 12.4875 3.33752C12.6458 3.37919 12.8 3.44169 12.95 3.52502L22.475 8.72502C22.6416 8.80836 22.7708 8.92919 22.8625 9.08752C22.9541 9.24586 23 9.41669 23 9.60002V16C23 16.2834 22.9041 16.5209 22.7125 16.7125C22.5208 16.9042 22.2833 17 22 17C21.7166 17 21.4791 16.9042 21.2875 16.7125C21.0958 16.5209 21 16.2834 21 16ZM11.05 20.475L6.04998 17.775C5.71664 17.5917 5.45831 17.3417 5.27498 17.025C5.09164 16.7084 4.99998 16.3667 4.99998 16V12.2L11.05 15.475C11.35 15.6417 11.6666 15.725 12 15.725C12.3333 15.725 12.65 15.6417 12.95 15.475L19 12.2V16C19 16.3667 18.9083 16.7084 18.725 17.025C18.5416 17.3417 18.2833 17.5917 17.95 17.775L12.95 20.475C12.8 20.5584 12.6458 20.6209 12.4875 20.6625C12.3291 20.7042 12.1666 20.725 12 20.725C11.8333 20.725 11.6708 20.7042 11.5125 20.6625C11.3541 20.6209 11.2 20.5584 11.05 20.475Z" fill="currentColor"/>
				</svg>
				Cursos
			</a></li>
		</ul>
	</div>
</div>