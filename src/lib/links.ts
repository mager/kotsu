import { columns, getColumnItems, type CardItem } from './data';

export interface CharacterLink {
	columnId: string;
	index: number;
	item: CardItem;
	href: string;
}

export function findCharacterLink(
	character: string,
	preferredColumns: string[] = []
): CharacterLink | null {
	const matches: CharacterLink[] = [];

	for (const column of columns) {
		const items = getColumnItems(column);
		const index = items.findIndex((item) => item.character === character);
		if (index === -1) continue;

		matches.push({
			columnId: column.id,
			index,
			item: items[index],
			href: `/${column.id}/${index}`
		});
	}

	for (const columnId of preferredColumns) {
		const match = matches.find((candidate) => candidate.columnId === columnId);
		if (match) return match;
	}

	return matches[0] ?? null;
}

export function getCharacterHref(
	character: string,
	preferredColumns: string[] = []
): string | null {
	return findCharacterLink(character, preferredColumns)?.href ?? null;
}
