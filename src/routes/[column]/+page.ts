import { columns } from '$lib/data';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const column = columns.find((c) => c.id === params.column);
	if (!column) throw error(404, 'Column not found');
	return { column };
};
