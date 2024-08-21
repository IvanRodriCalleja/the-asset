export type CacheEntry<T> = {
	promise?: Promise<void>;
	result?: T;
	error?: unknown;
};

type Cache = {
	[key: string]: CacheEntry<unknown>;
};

const cache: Cache = {};
let listeners: (() => void)[] = [];

export type UseCacheKey = string | Record<string, string | number | boolean>;

export const cacheStore = {
	addEntry(key: UseCacheKey, value: CacheEntry<unknown>) {
		const cacheKey = this.getKey(key);

		cache[cacheKey] = value;
		emitChange();
	},
	addResult(key: string, result: unknown) {
		cache[key] = { result };
		emitChange();
	},
	getResult<T>(key: string): T | undefined {
		const entry = cache[key] as CacheEntry<T> | undefined;
		return entry?.result;
	},
	subscribe(listener: () => void) {
		listeners = [...listeners, listener];
		return () => {
			listeners = listeners.filter(l => l !== listener);
		};
	},
	getSnapshot() {
		return cache;
	},
	getKey(key: UseCacheKey) {
		return typeof key === 'string' ? key : JSON.stringify(key);
	}
};

const emitChange = () => {
	for (const listener of listeners) {
		listener();
	}
};
