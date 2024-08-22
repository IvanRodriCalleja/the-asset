import { type Locales } from '../domain/Locales';

const es: Locales = {
	home: {
		title: 'Haz tu pdf realidad',
		description:
			'Herramientas PDF gratuitas en línea para combinar, dividir, comprimir y convertir PDFs,',
		descriptionImportant: 'todo de manera segura sin que tus archivos salgan de tu dispositivo'
	},
	mergePdf: {
		title: 'Unir PDF',
		description: 'Combina múltiples PDFs de forma instantánea y segura,',
		descriptionImportant: 'todo sin enviar datos fuera de tu navegador.',
		uploadPdf: 'Subir PDF',
		mergePdfAction: 'Unir PDFs',
		card: {
			description: 'Combina múltiples PDFs en el orden que desees y gíralos fácilmente.'
		},
		invalidPdfError: {
			title: 'Ficheros PDF inválidos',
			description: 'Contenido de los PDFs no válido para:'
		}
	},
	mergePdfResult: {
		successfullyMergedTitle: 'Ficheros unidos!',
		successfullyMergedDescription: 'Revisa el documento final y descárgalo si todo es correcto.',
		fileNameLabel: 'Nombre del fichero',
		mergeNewPdf: 'Une un nuevo PDF'
	},
	shared: {
		continueWith: 'Continua con:',
		pages: 'páginas',
		download: 'Descargar',
		page: 'Página'
	}
};

export default es;
