export const hashArrayBuffer = async (buffer: ArrayBuffer) => {
	// Usar la API Web Crypto para crear un hash SHA-256 del ArrayBuffer
	const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);

	// Convertir el ArrayBuffer del hash a un Array de bytes
	const hashArray = Array.from(new Uint8Array(hashBuffer));

	// Convertir el Array de bytes a una cadena hexadecimal
	const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

	return hashHex;
};
