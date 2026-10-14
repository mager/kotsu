import { columns, getColumnItems, type Column } from '$lib/data';
import { courseUnits, getCourseTotalProgress, getCourseUnitProgress } from '$lib/course';

export interface Award {
	id: string;
	title: string;
	titleJp: string;
	description: string;
	icon: string;
	accent: string;
	rarity: 'common' | 'rare' | 'epic';
	progressLabel: string;
	unlocked: boolean;
}

const columnAwardMeta: Record<string, Omit<Award, 'id' | 'progressLabel' | 'unlocked'>> = {
	hiragana: {
		title: 'Hiragana Bloom',
		titleJp: 'ひらがな開花',
		description: 'Cleared every hiragana shape, branch, and double so the base sound map is yours.',
		icon: '✿',
		accent: 'var(--color-shu)',
		rarity: 'rare'
	},
	katakana: {
		title: 'Katakana Circuit',
		titleJp: 'カタカナ回路',
		description: 'Finished the borrowed-sound set and locked in the sharp mirror script.',
		icon: '✦',
		accent: 'var(--color-ai)',
		rarity: 'rare'
	},
	radicals: {
		title: 'Radical Forge',
		titleJp: '部首鍛錬',
		description: 'Mastered the building blocks that make later kanji feel less mysterious.',
		icon: '⛩',
		accent: 'var(--color-matcha)',
		rarity: 'rare'
	},
	kanji: {
		title: 'Kanji Keeper',
		titleJp: '漢字守',
		description: 'Completed the starter kanji wall and earned the right to read with more confidence.',
		icon: '◈',
		accent: 'var(--color-fuji)',
		rarity: 'epic'
	},
	vocabulary: {
		title: 'Word Runner',
		titleJp: '語彙疾走',
		description: 'Finished the first useful word set so the symbols can start living in real speech.',
		icon: '☄',
		accent: 'var(--color-asagi)',
		rarity: 'rare'
	}
};

const milestoneAwards = [
	{
		id: 'first-five',
		title: 'First Spark',
		titleJp: '火花',
		description: 'Learned your first five items. The system is alive now.',
		icon: '•',
		accent: 'var(--color-kitsune)',
		rarity: 'common' as const,
		threshold: 5
	},
	{
		id: 'course-half',
		title: 'Halfway Heat',
		titleJp: '半ば',
		description: 'Crossed the 50% mark across the full Kotsu course.',
		icon: '⬢',
		accent: 'var(--color-kitsune)',
		rarity: 'rare' as const,
		threshold: 50
	},
	{
		id: 'course-complete',
		title: 'Kotsu Crown',
		titleJp: '骨頂',
		description: 'Completed the full starter map across kana, radicals, kanji, and words.',
		icon: '♛',
		accent: 'var(--color-sumi)',
		rarity: 'epic' as const,
		threshold: 100
	}
];

export function getColumnAward(columnId: string): Award | null {
	const column = columns.find((entry) => entry.id === columnId);
	const meta = columnAwardMeta[columnId];
	if (!column || !meta) return null;

	return {
		id: `column-${column.id}`,
		...meta,
		progressLabel: `${getColumnItems(column).length} / ${getColumnItems(column).length}`,
		unlocked: true
	};
}

export function getUnlockedAwards(isLearned: (columnId: string, index: number) => boolean): Award[] {
	const awards: Award[] = [];
	const totalProgress = getCourseTotalProgress(isLearned);

	for (const column of columns) {
		const columnAward = resolveColumnAward(column, isLearned);
		if (columnAward) awards.push(columnAward);
	}

	for (const milestone of milestoneAwards) {
		const unlocked = milestone.threshold === 100
			? totalProgress.status === 'complete'
			: milestone.threshold === 50
				? totalProgress.pct >= 50
				: totalProgress.learned >= milestone.threshold;

		if (!unlocked) continue;
		awards.push({
			id: milestone.id,
			title: milestone.title,
			titleJp: milestone.titleJp,
			description: milestone.description,
			icon: milestone.icon,
			accent: milestone.accent,
			rarity: milestone.rarity,
			progressLabel: milestone.threshold === 100 ? '100%' : `${milestone.threshold}${milestone.threshold < 10 ? ' items' : '%'}`,
			unlocked: true
		});
	}

	if (courseUnits.every((unit) => getCourseUnitProgress(unit, isLearned).status === 'complete')) {
		awards.push({
			id: 'course-map-complete',
			title: 'Path Walker',
			titleJp: '完走',
			description: 'Closed every unit on the course map, not just the raw totals.',
			icon: '↠',
			accent: 'var(--color-matcha)',
			rarity: 'epic',
			progressLabel: `${courseUnits.length}/${courseUnits.length} units`,
			unlocked: true
		});
	}

	return awards;
}

export function getFeaturedLockedAwards(isLearned: (columnId: string, index: number) => boolean, limit = 3): Award[] {
	const locked: Award[] = [];
	const totalProgress = getCourseTotalProgress(isLearned);

	for (const column of columns) {
		const total = getColumnItems(column).length;
		const learned = getColumnItems(column).filter((_, index) => isLearned(column.id, index)).length;
		if (learned >= total) continue;
		const meta = columnAwardMeta[column.id];
		locked.push({
			id: `column-${column.id}`,
			...meta,
			progressLabel: `${learned} / ${total}`,
			unlocked: false
		});
	}

	for (const milestone of milestoneAwards) {
		const unlocked = milestone.threshold === 100
			? totalProgress.status === 'complete'
			: milestone.threshold === 50
				? totalProgress.pct >= 50
				: totalProgress.learned >= milestone.threshold;
		if (unlocked) continue;
		locked.push({
			id: milestone.id,
			title: milestone.title,
			titleJp: milestone.titleJp,
			description: milestone.description,
			icon: milestone.icon,
			accent: milestone.accent,
			rarity: milestone.rarity,
			progressLabel: milestone.threshold === 100 ? `${totalProgress.pct}% / 100%` : `${totalProgress.learned} / ${milestone.threshold}`,
			unlocked: false
		});
	}

	return locked.slice(0, limit);
}

function resolveColumnAward(column: Column, isLearned: (columnId: string, index: number) => boolean): Award | null {
	const meta = columnAwardMeta[column.id];
	if (!meta) return null;
	const items = getColumnItems(column);
	const learned = items.filter((_, index) => isLearned(column.id, index)).length;
	if (learned < items.length) return null;

	return {
		id: `column-${column.id}`,
		...meta,
		progressLabel: `${learned} / ${items.length}`,
		unlocked: true
	};
}
