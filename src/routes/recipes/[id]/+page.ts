import { radicalRecipes } from '$lib/course';
import { findCharacterLink } from '$lib/links';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const recipe = radicalRecipes.find((item) => item.id === params.id);
	if (!recipe) throw error(404, 'Recipe not found');

	return {
		recipe,
		parts: recipe.parts.map((part) => ({
			character: part,
			link: findCharacterLink(part, ['radicals', 'kanji'])
		})),
		result: {
			character: recipe.result,
			link: findCharacterLink(recipe.result, ['kanji', 'radicals'])
		}
	};
};
