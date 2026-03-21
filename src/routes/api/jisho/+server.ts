import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const keyword = url.searchParams.get('keyword');
	if (!keyword) return json({ error: 'missing keyword' }, { status: 400 });

	try {
		const res = await fetch(
			`https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(keyword)}`
		);
		const data = await res.json();
		return json(data);
	} catch {
		return json({ error: 'lookup failed' }, { status: 502 });
	}
};
