const fs = require('fs');
const path = require('path');

// Directorio en el que se encuentran los archivos a eliminar
const directoryPath = './mi-carpeta';

// Función para eliminar archivos si existen
function deleteFile(fileName) {
  const filePath = path.join(__dirname, '../build', fileName);
  console.log({ filePath })
  // Verificar si el archivo existe
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
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
deleteFile('/node/package.json');
deleteFile('/node/.gitignore');

deleteFile('/web/package.json');
deleteFile('/web/.gitignore');
