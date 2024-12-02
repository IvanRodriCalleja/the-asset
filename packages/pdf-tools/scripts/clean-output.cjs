/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

// Función para eliminar archivos si existen
function deleteFile(fileName) {
	const filePath = path.join(__dirname, '..', fileName);
	console.log({ filePath });
	// Verificar si el archivo existe
	if (fs.existsSync(filePath)) {
		fs.unlink(filePath, err => {
			if (err) {
				console.error(`Error al eliminar el archivo ${fileName}:`, err);
			} else {
				console.log(`${fileName} eliminado exitosamente.`);
			}
		});
	} else {
		console.log(`El archivo ${fileName} no existe.`);
	}
}

// Eliminar package.json y .gitignore si existen
deleteFile('/node/output/package.json');
deleteFile('/node/output/.gitignore');

deleteFile('/web/output/package.json');
deleteFile('/web/output/.gitignore');
