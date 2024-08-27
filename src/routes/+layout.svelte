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

<progress class="progress progress-primary w-full block" value={$progressValue} max="100"></progress>
<slot />