<script>
	import { navigating } from '$app/stores';
	import { tick } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	export let data;

	let query = '';
	let module = '';
	let career = '';
	let selection = [];

	function selectAll() {
		if (selection.length < data.courses.length) {
			selection = data.courses.map((c) => c.id);
		} else {
			selection = [];
		}
	}

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
<main class="p-8 flex flex-col gap-6">
	<h1 class="text-4xl font-bold">Lista de Cursos</h1>
	<form class="flex items-center gap-4">
		<label class="input input-bordered flex items-center gap-2 grow">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-6 w-6 opacity-70">
				<path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" />
			</svg>
			<input type="text" class="hidden" name="career" value={career} />
			<input type="text" class="hidden" name="module" value={module} />
			<input
				type="text"
				class="grow"
				name="query"
				placeholder="Nombre del curso"
				bind:value={query}
			/>
		</label>
		<button class="btn btn-primary">
			BUSCAR
		</button>
	</form>
	<form id="filters" class="flex items-center gap-6">
		<input type="text" class="hidden" name="query" value={query} />
		<button class="btn btn-primary">
			<svg class="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M10.3485 17.365C10.0902 17.365 9.86846 17.2762 9.68332 17.0987C9.49832 16.9211 9.40582 16.701 9.40582 16.4383V12.9267C9.40582 12.6642 9.49686 12.4441 9.67895 12.2665C9.86117 12.0888 10.0814 12 10.3398 12C10.5981 12 10.8179 12.0888 10.9992 12.2665C11.1803 12.4441 11.2708 12.6642 11.2708 12.9267V13.75H16.3383C16.6007 13.75 16.8217 13.8384 17.0012 14.0152C17.181 14.1919 17.2708 14.4109 17.2708 14.6723C17.2708 14.9306 17.182 15.1524 17.0044 15.3375C16.8269 15.5225 16.6068 15.615 16.3442 15.615H11.2708V16.4383C11.2708 16.701 11.1824 16.9211 11.0056 17.0987C10.8289 17.2762 10.6099 17.365 10.3485 17.365ZM3.65582 15.615C3.39318 15.615 3.17311 15.524 2.99561 15.3419C2.81798 15.1596 2.72916 14.9394 2.72916 14.681C2.72916 14.4227 2.81798 14.2029 2.99561 14.0217C3.17311 13.8406 3.39318 13.75 3.65582 13.75H7.16749C7.43013 13.75 7.6502 13.8384 7.8277 14.0152C8.00534 14.1919 8.09416 14.4109 8.09416 14.6723C8.09416 14.9306 8.00534 15.1524 7.8277 15.3375C7.6502 15.5225 7.43013 15.615 7.16749 15.615H3.65582ZM6.67186 12.6767C6.41353 12.6767 6.19186 12.5851 6.00686 12.4021C5.82173 12.2192 5.72916 11.9978 5.72916 11.7381V10.9267H3.66124C3.39916 10.9267 3.17832 10.8383 2.99874 10.6615C2.81902 10.4846 2.72916 10.2656 2.72916 10.0044C2.72916 9.74312 2.81798 9.52263 2.99561 9.34291C3.17311 9.16319 3.39318 9.07333 3.65582 9.07333H5.72916V8.25C5.72916 7.98749 5.82027 7.76743 6.00249 7.58979C6.18457 7.41215 6.40478 7.32333 6.66311 7.32333C6.92145 7.32333 7.14124 7.41215 7.32249 7.58979C7.5036 7.76743 7.59416 7.98749 7.59416 8.25V11.75C7.59416 12.0125 7.50575 12.2326 7.32895 12.4102C7.15228 12.5878 6.93325 12.6767 6.67186 12.6767ZM9.83249 10.9267C9.56985 10.9267 9.34978 10.8383 9.17228 10.6615C8.99464 10.4846 8.90582 10.2656 8.90582 10.0044C8.90582 9.74312 8.99464 9.52263 9.17228 9.34291C9.34978 9.16319 9.56985 9.07333 9.83249 9.07333H16.3442C16.6068 9.07333 16.8269 9.16173 17.0044 9.33854C17.182 9.51534 17.2708 9.73437 17.2708 9.99562C17.2708 10.2569 17.182 10.4774 17.0044 10.6571C16.8269 10.8368 16.6068 10.9267 16.3442 10.9267H9.83249ZM12.8485 8C12.5902 8 12.3685 7.91118 12.1833 7.73354C11.9983 7.5559 11.9058 7.33583 11.9058 7.07333V3.56166C11.9058 3.29902 11.9969 3.07895 12.1789 2.90145C12.3612 2.72381 12.5814 2.63499 12.8398 2.63499C13.0981 2.63499 13.3179 2.72381 13.4992 2.90145C13.6803 3.07895 13.7708 3.29902 13.7708 3.56166V4.38499H16.3442C16.6068 4.38499 16.8269 4.47333 17.0044 4.65C17.182 4.8268 17.2708 5.0459 17.2708 5.30729C17.2708 5.56562 17.182 5.78729 17.0044 5.97229C16.8269 6.15743 16.6068 6.24999 16.3442 6.24999H13.7708V7.07333C13.7708 7.33583 13.6824 7.5559 13.5056 7.73354C13.3289 7.91118 13.1099 8 12.8485 8ZM3.65582 6.24999C3.39318 6.24999 3.17311 6.15888 2.99561 5.97666C2.81798 5.79458 2.72916 5.57437 2.72916 5.31604C2.72916 5.05756 2.81798 4.83777 2.99561 4.65666C3.17311 4.47555 3.39318 4.38499 3.65582 4.38499H10.1675C10.4301 4.38499 10.6502 4.47333 10.8277 4.65C11.0053 4.8268 11.0942 5.0459 11.0942 5.30729C11.0942 5.56562 11.0053 5.78729 10.8277 5.97229C10.6502 6.15743 10.4301 6.24999 10.1675 6.24999H3.65582Z" fill="currentColor"/>
			</svg>
			FILTRAR
		</button>
		<label class="flex items-center gap-2" for="career">
			Carrera:
			<select
				id="career"
				name="career"
				class="select select-bordered"
				bind:value={career}
			>
				<option value="" selected>Todas</option>
				{#each data.careers as career}
					<option value={career}>{career}</option>
				{/each}
			</select>
		</label>
		<label class="flex items-center gap-2" for="module">
			Módulo:
			<select
				id="module"
				name="module"
				class="select select-bordered"
				bind:value={module}
			>
				<option value="" selected>Todos</option>
				{#each data.modules as mod}
					<option value={mod}>{mod}</option>
				{/each}
			</select>
		</label>
	</form>
	<table class="table table-auto table-zebra">
		<thead>
			<tr>
				<th>
					<label>
						<input
							type="checkbox"
							class="checkbox"
							checked={selection.length === data.courses.length}
							on:click={selectAll}
						/>
					</label>
				</th>
				<th>ID</th>
				<th>NOMBRE</th>
				<th>CARRERA</th>
				<th>MÓDULO</th>
			</tr>
		</thead>
		<tbody>
			{#each data.courses as course (course.id)}
				<tr class="hover">
					<td>
						<label>
							<input
								type="checkbox"
								class="checkbox"
								value={course.id}
								bind:group={selection}
							/>
						</label>
					</td>
					<td>{course.id}</td>
					<td>{course.name}</td>
					<td>{course.career}</td>
					<td>{course.module}</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<footer class="flex items-center justify-between">
		<p>
			Mostrando
			{(data.page - 1) * data.perPage + (data.totalItems > 1 ? 1 : 0)}
			-
			{data.perPage * data.page > data.totalItems
				? data.totalItems
				: data.page * data.perPage}
			de
			{data.totalItems}
		</p>
		<p class="font-bold">{selection.length} cursos seleccionados</p>
		<div class="join">
			<form>
				<button
					type="submit"
					class="join-item btn"
					class:btn-disabled={data.page == 1}
					on:click={() => {
						selection = [];
					}}>«</button
				>
				<input type="text" class="hidden" name="page" value={data.page - 1} />
				<input type="text" class="hidden" name="query" value={query} />
				<input type="text" class="hidden" name="career" value={career} />
				<input type="text" class="hidden" name="module" value={module} />
			</form>
			<button type="button" class="join-item px-4">
				Página {data.page} de {data.totalPages}
			</button>
			<form>
				<input type="text" class="hidden" name="page" value={data.page + 1}/>
				<input type="text" class="hidden" name="query" value={query} />
				<input type="text" class="hidden" name="career" value={career} />
				<input type="text" class="hidden" name="module" value={module} />
				<button
					type="submit"
					class="join-item btn"
					class:btn-disabled={data.page == data.totalPages}
					on:click={() => {
						selection = [];
					}}>»</button
				>
			</form>
		</div>
	</footer>
</main>