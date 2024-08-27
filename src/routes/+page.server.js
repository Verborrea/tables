const all_courses = [
	{ id: '1', career: 'Ingeniería Industrial', name: 'Matemática I', module: 'I' },
	{ id: '2', career: 'Ingeniería Industrial', name: 'Psicología', module: 'II' },
	{ id: '3', career: 'Contabilidad', name: 'Derecho Empresarial', module: 'I' },
	{ id: '4', career: 'Ingeniería Industrial', name: 'Otro nombre', module: 'I' },
	{ id: '5', career: 'Ingeniería Civil', name: 'Segundo Curso', module: 'I' },
	{ id: '6', career: 'Ingeniería Industrial', name: 'Matemática II', module: 'III' },
	{ id: '7', career: 'Ingeniería Civil', name: 'Apreciación artística', module: 'X' },
	{ id: '8', career: 'Ingeniería Civil', name: 'Ciencia de la Computación II', module: 'X' },
	{ id: '9', career: 'Ingeniería Industrial', name: 'Matemática III', module: 'IV' },
	{ id: '10', career: 'Contabilidad', name: 'Apreciación musical', module: 'I' },
	{ id: '11', career: 'Contabilidad', name: 'Persona, Matrimonio y Familia', module: 'V' },
	{ id: '12', career: 'Ingeniería Industrial', name: 'Ciencia de la Computación I', module: 'V' },
	{ id: '13', career: 'Contabilidad', name: 'Música', module: 'II' },
	{ id: '14', career: 'Ingeniería Industrial', name: 'Matemática IV', module: 'V' },
]

const modules = [ 'I','II','III','IV','V','VI','VII','VIII','IX','X' ]

const careers = [ 'Ingeniería Industrial', 'Contabilidad', 'Ingenería Civil' ]

const getCourses = (page, perPage, filter, mod, career) => {
	let list = all_courses;

	// Filtrar si hay un filtro especificado
	if (filter) {
		list = all_courses.filter(course =>
			course.name.toLowerCase().includes(filter.toLowerCase())
		);
	}
	
	if (mod) {
		list = list.filter(course =>
			course.module && course.module === mod
		);
	}

	if (career) {
		list = list.filter(course =>
			course.career && course.career === career
		);
	}

	// Calcular el total de páginas
	const totalPages = Math.ceil(list.length / perPage);

	// Calcular el índice inicial para la paginación
	const startIndex = (page - 1) * perPage;

	// Obtener los cursos paginados
	const paginatedCourses = list.slice(startIndex, startIndex + perPage);

	// Retornar los cursos paginados y el total de páginas
	return { paginatedCourses, totalPages, totalItems: list.length };
};

export async function load({ url }) {

	const page = parseInt(url.searchParams.get('page')) || 1
	const perPage = 10
	const query = url.searchParams.get('query')
	const mod = url.searchParams.get('module')
	const career = url.searchParams.get('career')

	await new Promise(r => setTimeout(r, 500));

	const { paginatedCourses, totalPages, totalItems} = getCourses(page, perPage, query, mod, career)

	return {
		modules,
		careers,
		courses: paginatedCourses,
		page,
		perPage,
		totalPages,
		totalItems
	}
}

/** @type {import('./$types').Actions} */
export const actions = {
	delete: async ({ request }) => {
		const data = await request.formData()
		const selection = data.get('selection').split(',')

		return { success: true, quantity: selection.length };
	}
};