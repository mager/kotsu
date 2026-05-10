/// <reference types="@sveltejs/kit" />
import { build, files, version } from '$service-worker';
import { columns, getColumnItems } from '$lib/data';
import { radicalRecipes } from '$lib/course';

const CACHE = `kotsu-${version}`;
const APP_ROUTES = [
	'/',
	'/about',
	'/profile',
	...radicalRecipes.map((recipe) => `/recipes/${recipe.id}`),
	...columns.flatMap((column) => getColumnItems(column).map((_, index) => `/${column.id}/${index}`))
];

const ASSETS = [...build, ...files, ...APP_ROUTES];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		(async () => {
			const keys = await caches.keys();
			await Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)));
			await self.clients.claim();
		})()
	);
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;

	const url = new URL(event.request.url);
	if (url.origin !== self.location.origin) return;

	const isNavigation = event.request.mode === 'navigate';

	event.respondWith(
		(async () => {
			const cache = await caches.open(CACHE);
			const cached = await cache.match(event.request);

			if (cached) return cached;

			try {
				const response = await fetch(event.request);
				if (response.ok && (isNavigation || url.pathname.startsWith('/_app/') || url.pathname.startsWith('/api/') === false)) {
					cache.put(event.request, response.clone());
				}
				return response;
			} catch {
				if (isNavigation) {
					return (await cache.match('/')) ?? Response.error();
				}
				return Response.error();
			}
		})()
	);
});
