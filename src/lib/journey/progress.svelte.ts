import { allItems } from './graph';
const storageKey = 'kotsu-journey-v1';
const validKeys = new Set(allItems.map(({ key }) => key));
const progress = $state({ learned: {} as Record<string, boolean>, ready: false, saveError: false });
export function loadJourney() {
  if (progress.ready || typeof window === 'undefined') return;
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) ?? '{}');
    if (stored && typeof stored === 'object' && !Array.isArray(stored)) {
      progress.learned = Object.fromEntries(Object.entries(stored).filter(([key, value]) => validKeys.has(key) && value === true).map(([key]) => [key, true]));
    }
  } catch { progress.saveError = true; }
  progress.ready = true;
}
export function getJourneyProgress() { return progress; }
export function recordAnswer(key: string) {
  if (!validKeys.has(key)) return;
  progress.learned = { ...progress.learned, [key]: true };
  try { localStorage.setItem(storageKey, JSON.stringify(progress.learned)); progress.saveError = false; }
  catch { progress.saveError = true; }
}
