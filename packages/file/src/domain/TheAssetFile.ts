export type TheAssetFile = {
	id: string;
	hash: string;
	buffer: ArrayBuffer;
	name: string;
};

export const hashArrayBuffer = async (buffer: ArrayBuffer) => {
	const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

	return hashHex;
};
