import { CacheEntry, TheAssetStore } from './cacheStore';

describe('TheAssetStore', () => {
	let cacheStore: TheAssetStore;

	beforeEach(() => {
		cacheStore = new TheAssetStore({ timeout: 30000 });
	});

	test('addEntry should add an entry and notify listeners', () => {
		const key = 'testKey';
		const value: CacheEntry<unknown> = { result: 'testResult' };
		const listener = jest.fn();

		cacheStore.subscribe(listener, key);
		cacheStore.addEntry(key, value);

		expect(cacheStore.store[key]).toEqual(value);
		expect(listener).toHaveBeenCalled();
	});

	test('addResult should add a result and notify listeners', () => {
		const key = 'testKey';
		const result = 'testResult';
		const listener = jest.fn();

		cacheStore.subscribe(listener, key);
		cacheStore.addResult(key, result);

		expect(cacheStore.store[key]).toEqual({ result });
		expect(listener).toHaveBeenCalled();
	});

	test('getResult should return the result if present', () => {
		const key = 'testKey';
		const result = 'testResult';

		cacheStore.addResult(key, result);
		const cachedResult = cacheStore.getResult(key);

		expect(cachedResult).toBe(result);
	});

	test('getResult should return undefined if no result is present', () => {
		const result = cacheStore.getResult('nonExistingKey');
		expect(result).toBeUndefined();
	});

	test('subscribe should add a listener and return unsubscribe function', () => {
		const key = 'testKey';
		const listener = jest.fn();
		const unsubscribe = cacheStore.subscribe(listener, key);

		cacheStore.notify(key);
		expect(listener).toHaveBeenCalled();

		listener.mockClear();
		unsubscribe();
		cacheStore.notify(key);
		expect(listener).not.toHaveBeenCalled();
	});

	test('removeEntry should delete the entry from store', () => {
		const key = 'testKey';
		const value: CacheEntry<unknown> = { result: 'testResult' };

		cacheStore.addEntry(key, value);
		expect(cacheStore.store[key]).toBeDefined();

		cacheStore.removeEntry(key);

		expect(cacheStore.store[key]).toBeUndefined();
	});

	test('notify should call all listeners for the given key', () => {
		const key = 'testKey';
		const listener1 = jest.fn();
		const listener2 = jest.fn();

		cacheStore.subscribe(listener1, key);
		cacheStore.subscribe(listener2, key);

		cacheStore.notify(key);
		expect(listener1).toHaveBeenCalled();
		expect(listener2).toHaveBeenCalled();
	});

	test('getSnapshot should return the CacheEntry for a given key', () => {
		const key = 'testKey';
		const value: CacheEntry<unknown> = { result: 'testResult' };

		cacheStore.addEntry(key, value);
		const snapshot = cacheStore.getSnapshot(key);

		expect(snapshot).toEqual(value);
	});

	test('timeouts should remove entry after unsubscribe delay', () => {
		jest.useFakeTimers();
		const key = 'testKey';
		const listener = jest.fn();

		const value: CacheEntry<unknown> = { result: 'testResult' };
		cacheStore.addEntry(key, value);

		const unsubscribe = cacheStore.subscribe(listener, key);
		unsubscribe();

		expect(cacheStore.store[key]).toBeDefined();
		expect(cacheStore.getResult(key)).toBeDefined();

		jest.advanceTimersByTime(30000);

		expect(cacheStore.store[key]).toBeUndefined();
		expect(cacheStore.getResult(key)).toBeUndefined();
		jest.useRealTimers();
	});
});
