import { useSyncExternalStore } from 'react';

type CacheEntry<T> = {
	promise?: Promise<void>;
	result?: T;
	error?: unknown;
};

type Cache = {
	[key: string]: CacheEntry<unknown>;
};

const cache: Cache = {};
let listeners: (() => void)[] = [];

export const cacheStore = {
	addEntry(key: string, value: CacheEntry<unknown>) {
		cache[key] = value;
		emitChange();
	},
	subscribe(listener: () => void) {
		listeners = [...listeners, listener];
		return () => {
			listeners = listeners.filter(l => l !== listener);
		};
	},
	getSnapshot() {
		return cache;
	}
};

function emitChange() {
	for (const listener of listeners) {
		listener();
	}
}

export function useCache<T>(key: string, asyncFunction: () => Promise<T>): T {
	const cache = useSyncExternalStore(cacheStore.subscribe, cacheStore.getSnapshot);
	const state = cache[key] as CacheEntry<T> | undefined;

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
			cacheStore.addEntry(key, { result });
		})
		.catch(error => {
			cacheStore.addEntry(key, { error });
		});

	cacheStore.addEntry(key, { promise });

	throw promise;
}
