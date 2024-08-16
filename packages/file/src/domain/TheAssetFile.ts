export type TheAssetFile<T> = {
	id: string;
	buffer: ArrayBuffer;
	name: string;
	kbSize: string;
	metadata: T;
};
