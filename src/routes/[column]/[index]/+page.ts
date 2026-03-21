import { columns } from '$lib/data';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const column = columns.find((c) => c.id === params.column);
	if (!column) throw error(404, 'Column not found');

	const index = parseInt(params.index, 10);
	const item = column.items[index];
	if (!item) throw error(404, 'Character not found');

	const prevIndex = index > 0 ? index - 1 : null;
	const nextIndex = index < column.items.length - 1 ? index + 1 : null;

	return {
		item,
		column,
		index,
		prevIndex,
		nextIndex
	};
};
