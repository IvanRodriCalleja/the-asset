import { useSyncExternalStore, useCallback } from 'react';

type CacheEntry<T> = {
	promise: Promise<void>;
	result?: T;
	error?: unknown;
};

type Cache = {
	[key: string]: CacheEntry<unknown>;
};

const cache: Cache = {};
const listeners: { [key: string]: Set<() => void> } = {};

function getCacheValue<T>(key: string): T | undefined {
	return cache[key]?.result as T | undefined;
}

function subscribe(key: string, callback: () => void) {
	if (!listeners[key]) {
		listeners[key] = new Set();
	}
	listeners[key].add(callback);
	return () => {
		listeners[key]!.delete(callback);
	};
}

function notify(key: string) {
	if (listeners[key]) {
		for (const callback of listeners[key]) {
			callback();
		}
	}
}

export function useCache<T>(key: string, asyncFunction: () => Promise<T>): T {
	const getSnapshot = useCallback(() => getCacheValue<T>(key), [key]);

	const state = useSyncExternalStore(
		callback => subscribe(key, callback),
		getSnapshot,
		getSnapshot
	);

	if (state !== undefined) {
		return state;
	}

	if (!cache[key]) {
		const promise = asyncFunction()
			.then(result => {
				// @ts-expect-error
				cache[key] = { ...cache[key], result };
				notify(key);
			})
			.catch(error => {
				// @ts-expect-error
				cache[key] = { ...cache[key], error };
				notify(key);
			});

		cache[key] = { promise };
	}

	if (cache[key].error) {
		throw cache[key].error;
	}

	throw cache[key].promise;
}
