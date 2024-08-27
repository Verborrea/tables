<script>
	export let data, form;

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

	$: if (form?.success) {
		setTimeout(() => {
			form.success = false
		}, 2000)
	}
</script>

<main class="p-8 flex flex-col gap-6">
	<h1 class="text-4xl font-bold">Lista de Cursos</h1>
	<form class="fc gap-4">
		<label class="input input-bordered fc gap-2 grow">
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
	<header class="fcb4">
		<form id="filters" class="fc gap-4">
			<input type="text" class="hidden" name="query" value={query} />
			<button class="btn btn-primary">
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M10.3485 17.365C9.83539 17.365 9.40579 16.9555 9.40579 16.4383V12.9267C9.40579 12.4116 9.82633 12 10.3398 12C10.8533 12 11.2708 12.4122 11.2708 12.9267V13.75H16.3383C16.8524 13.75 17.2708 14.1553 17.2708 14.6723C17.2708 15.1853 16.8612 15.615 16.3441 15.615H11.2708V16.4383C11.2708 16.9532 10.8646 17.365 10.3485 17.365ZM3.65579 15.615C3.14068 15.615 2.72913 15.1945 2.72913 14.6811C2.72913 14.1674 3.14132 13.75 3.65579 13.75H7.16746C7.68212 13.75 8.09413 14.1563 8.09413 14.6723C8.09413 15.1853 7.68449 15.615 7.16746 15.615H3.65579ZM6.67183 12.6767C6.1586 12.6767 5.72913 12.2524 5.72913 11.7381V10.9267H3.66121C3.14727 10.9267 2.72913 10.5211 2.72913 10.0044C2.72913 9.48893 3.13924 9.07334 3.65579 9.07334H5.72913V8.25001C5.72913 7.73504 6.1498 7.32334 6.66308 7.32334C7.17667 7.32334 7.59413 7.73556 7.59413 8.25001V11.75C7.59413 12.2647 7.18777 12.6767 6.67183 12.6767ZM9.83246 10.9267C9.31783 10.9267 8.90579 10.5203 8.90579 10.0044C8.90579 9.48893 9.31591 9.07334 9.83246 9.07334H16.3441C16.8588 9.07334 17.2708 9.47968 17.2708 9.99564C17.2708 10.5111 16.8607 10.9267 16.3441 10.9267H9.83246ZM12.8485 8.00001C12.3356 8.00001 11.9058 7.59036 11.9058 7.07334V3.56168C11.9058 3.04657 12.3263 2.63501 12.8398 2.63501C13.3534 2.63501 13.7708 3.04721 13.7708 3.56168V4.38501H16.3441C16.8589 4.38501 17.2708 4.79118 17.2708 5.3073C17.2708 5.82014 16.861 6.25001 16.3441 6.25001H13.7708V7.07334C13.7708 7.58799 13.3644 8.00001 12.8485 8.00001ZM3.65579 6.25001C3.14081 6.25001 2.72913 5.82937 2.72913 5.31605C2.72913 4.80241 3.14129 4.38501 3.65579 4.38501H10.1675C10.6822 4.38501 11.0941 4.79118 11.0941 5.3073C11.0941 5.82014 10.6844 6.25001 10.1675 6.25001H3.65579Z" fill="currentColor"/>
				</svg>
				FILTRAR
			</button>
			<select id="career" name="career" class="select select-bordered" bind:value={career}>
				<option value="" selected>Todas las carreras</option>
				{#each data.careers as career}
					<option value={career}>{career}</option>
				{/each}
			</select>
			<select id="module" name="module" class="select select-bordered" bind:value={module}>
				<option value="" selected>Todos los módulos</option>
				{#each data.modules as mod}
					<option value={mod}>Módulo {mod}</option>
				{/each}
			</select>
		</form>
		<form id="eraseSelection" action="?/delete" method="post">
			<input type="text" class="hidden" name="selection" value={selection}>
			<button class="btn btn-error" disabled={selection.length === 0}>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="h-5 w-5 shrink-0"><path fill="currentColor" fill-rule="evenodd" d="M10.556 4a1 1 0 0 0-.97.751l-.292 1.14h5.421l-.293-1.14A1 1 0 0 0 13.453 4zm6.224 1.892-.421-1.639A3 3 0 0 0 13.453 2h-2.897A3 3 0 0 0 7.65 4.253l-.421 1.639H4a1 1 0 1 0 0 2h.1l1.215 11.425A3 3 0 0 0 8.3 22H15.7a3 3 0 0 0 2.984-2.683l1.214-11.425H20a1 1 0 1 0 0-2zm1.108 2H6.112l1.192 11.214A1 1 0 0 0 8.3 20H15.7a1 1 0 0 0 .995-.894zM10 10a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1" clip-rule="evenodd"></path></svg>
				Borrar Selección
			</button>
		</form>
	</header>
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
	<footer class="fcb4">
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
{#if form?.success}
<div class="toast toast-center">
	<div role="alert" class="alert alert-success">
		<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
		</svg>
		<span>{form.quantity} cursos eliminados con éxito</span>
	</div>
</div>
{/if}

<style lang="postcss">
	.fc {
		display: flex;
		align-items: center;
	}
	.fcb4 {
		display: flex;
		align-items: center;
		gap: 1rem;
		justify-content: space-between;
	}
</style>