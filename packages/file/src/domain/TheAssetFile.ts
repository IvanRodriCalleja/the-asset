export type TheAssetFile = {
	id: string;
	hash: string;
	buffer: ArrayBuffer;
	name: string;
	isEncrypted: boolean;
};

export const hashArrayBuffer = async (buffer: ArrayBuffer) => {
	const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
	const hashArray = new Uint8Array(hashBuffer);

	const truncatedHashArray = hashArray.slice(0, 16);

	const hashHex = Array.from(truncatedHashArray)
		.map(byte => byte.toString(16).padStart(2, '0'))
		.join('');

	return hashHex;
};
