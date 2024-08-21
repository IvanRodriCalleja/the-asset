import { useSyncExternalStore } from 'react';

import { type CacheEntry, UseCacheKey, cacheStore } from './cacheStore';

export function useCache<T>(key: UseCacheKey, asyncFunction: () => Promise<T>): T {
	const cacheKey = cacheStore.getKey(key);

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
