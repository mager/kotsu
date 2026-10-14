import { stopById } from '$lib/journey/graph';
import { error } from '@sveltejs/kit';
export function load({ params }: { params: { id: string } }) {
  const stop = stopById.get(params.id);
  if (!stop || stop.checkpoint) error(404, 'Lesson not found');
  return { stop };
}
