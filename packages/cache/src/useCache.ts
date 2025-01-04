import { use, useSyncExternalStore } from 'react';

import { UseCacheKey, cacheStore } from './cacheStore';

export function useCache<T>(key: UseCacheKey, asyncFunction: () => Promise<T>): T {
	const cacheKey = cacheStore.getKey(key);

	const state = useSyncExternalStore(
		listener => cacheStore.subscribe(listener, cacheKey),
		() => cacheStore.getSnapshot<T>(cacheKey)
	);

	if (state?.result !== undefined) {
		return state.result;
	}

	if (state?.error) {
		throw state.error;
	}

	if (state?.promise) {
		use(state.promise);
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
