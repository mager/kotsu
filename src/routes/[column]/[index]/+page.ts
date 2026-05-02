import { radicalRecipes } from '$lib/course';
import { columns, getColumnItems, getSectionForIndex } from '$lib/data';
import { findCharacterLink } from '$lib/links';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const column = columns.find((c) => c.id === params.column);
	if (!column) throw error(404, 'Column not found');

	const items = getColumnItems(column);
	const index = parseInt(params.index, 10);
	const item = items[index];
	if (!item) throw error(404, 'Character not found');

	const prevIndex = index > 0 ? index - 1 : null;
	const nextIndex = index < items.length - 1 ? index + 1 : null;
	const sectionInfo = getSectionForIndex(column, index);
	const pairHref = item.pair
		? findCharacterLink(item.pair, column.id === 'katakana' ? ['hiragana'] : ['katakana'])?.href ?? null
		: null;
	const relatedRecipes = radicalRecipes
		.filter((recipe) => recipe.result === item.character || recipe.parts.includes(item.character))
		.map((recipe) => ({
			...recipe,
			parts: recipe.parts.map((part) => ({
				character: part,
				href: findCharacterLink(part, ['radicals', 'kanji'])?.href ?? null
			})),
			resultHref: findCharacterLink(recipe.result, ['kanji', 'radicals'])?.href ?? null
		}));

	return {
		item,
		column,
		index,
		prevIndex,
		nextIndex,
		totalItems: items.length,
		sectionTitle: sectionInfo?.section.titleJp ?? null,
		pairHref,
		relatedRecipes
	};
};
