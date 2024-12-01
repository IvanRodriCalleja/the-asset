export type CacheEntry<T> = {
	promise?: Promise<void>;
	result?: T;
	error?: unknown;
};

type Store = {
	[key: string]: CacheEntry<unknown>;
};
export type UseCacheKey = string | Record<string, string | number | boolean>;

type TheAssetStoreConfig = {
	timeout: number;
};

export class TheAssetStore {
	config: TheAssetStoreConfig;

	store: Store = {};
	listeners = new Map<UseCacheKey, Set<() => void>>();
	// eslint-disable-next-line no-undef
	timeouts = new Map<string, NodeJS.Timeout>();

	constructor(config: TheAssetStoreConfig) {
		this.config = config;
	}

	addEntry(key: UseCacheKey, value: CacheEntry<unknown>) {
		const cacheKey = this.getKey(key);

		this.store[cacheKey] = value;
		this.notify(cacheKey);
	}
	addResult(key: string, result: unknown) {
		this.store[key] = { result };
		this.notify(key);
	}
	getResult<T>(key: string): T | undefined {
		const entry = this.store[key] as CacheEntry<T> | undefined;
		return entry?.result;
	}
	subscribe(listener: () => void, key: UseCacheKey) {
		const cacheKey = this.getKey(key);

		if (this.timeouts.has(cacheKey)) {
			clearTimeout(this.timeouts.get(cacheKey)!);
			this.timeouts.delete(cacheKey);
		}

		if (!this.listeners.has(cacheKey)) {
			this.listeners.set(cacheKey, new Set());
		}
		this.listeners.get(cacheKey)!.add(listener);

		return () => {
			const keyListeners = this.listeners.get(cacheKey);
			if (keyListeners) {
				keyListeners.delete(listener);
				if (keyListeners.size === 0) {
					this.listeners.delete(cacheKey);

					const timeoutId = setTimeout(() => {
						this.removeEntry(cacheKey);
						this.timeouts.delete(cacheKey);
					}, this.config.timeout);

					this.timeouts.set(cacheKey, timeoutId);
				}
			}
		};
	}
	removeEntry(key: string) {
		delete this.store[key];
	}
	getSnapshot<T>(key: string) {
		return this.store[key] as CacheEntry<T> | undefined;
	}
	getKey(key: UseCacheKey) {
		return typeof key === 'string' ? key : JSON.stringify(key);
	}

	notify(key: UseCacheKey) {
		if (this.listeners.has(key)) {
			this.listeners.get(key)!.forEach(listener => listener());
		}
	}
}

export const cacheStore = new TheAssetStore({ timeout: 30000 });
