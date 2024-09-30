export const getFileSize = (arrayBuffer: ArrayBuffer) => {
	const sizeInBytes = arrayBuffer.byteLength;
	const KB = 1024;
	const MB = KB * 1024;
	const GB = MB * 1024;

	let size = sizeInBytes;
	let unit = 'Bytes';

	if (size >= GB) {
		size = size / GB;
		unit = 'GB';
	} else if (size >= MB) {
		size = size / MB;
		unit = 'MB';
	} else if (size >= KB) {
		size = size / KB;
		unit = 'KB';
	}

	// Si el tamaño en la unidad actual es mayor a 99, pasa a la siguiente unidad
	if (size > 99) {
		if (unit === 'KB') {
			size = size / KB;
			unit = 'MB';
		} else if (unit === 'MB') {
			size = size / KB;
			unit = 'GB';
		}
	}

	return size.toFixed(2) + ' ' + unit;
};
