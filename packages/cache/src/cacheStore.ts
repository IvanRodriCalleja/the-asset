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

export const cacheStore = {
	addEntry(key: string, value: CacheEntry<unknown>) {
		cache[key] = value;
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
	}
};

const emitChange = () => {
	for (const listener of listeners) {
		listener();
	}
};
