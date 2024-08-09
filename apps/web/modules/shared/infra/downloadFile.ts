export const downloadFile = (buffer: ArrayBuffer, filename: string, type: string) => {
	const blob = new Blob([buffer], { type: type });
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.style.display = 'none';
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	window.URL.revokeObjectURL(url);
};
