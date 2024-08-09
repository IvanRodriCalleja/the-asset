import { useSyncExternalStore } from 'react';

import { type CacheEntry, cacheStore } from './cacheStore';

type UseCacheKey = string | Record<string, string | number | boolean>;

export function useCache<T>(key: UseCacheKey, asyncFunction: () => Promise<T>): T {
	const cacheKey = typeof key === 'string' ? key : JSON.stringify(key);

	const cache = useSyncExternalStore(cacheStore.subscribe, cacheStore.getSnapshot);
	const state = cache[cacheKey] as CacheEntry<T> | undefined;

	if (state?.result !== undefined) {
		return state.result;
	}

	if (state?.error) {
		throw state.error;
	}

	if (state?.promise) {
		throw state.promise;
	}

	const promise = asyncFunction()
		.then(result => {
			cacheStore.addEntry(cacheKey, { result });
		})
		.catch(error => {
			cacheStore.addEntry(cacheKey, { error });
		});

	cacheStore.addEntry(cacheKey, { promise });

	throw promise;
}
