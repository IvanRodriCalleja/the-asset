import { type Locales } from '../domain/Locales';

const es: Locales = {
	home: {
		title: 'Haz tu pdf realidad',
		description:
			'Herramientas PDF gratuitas en línea para combinar, dividir, comprimir y convertir PDFs,',
		descriptionImportant: 'todo de manera segura sin que tus archivos salgan de tu dispositivo'
	},
	mergePdf: {
		metadata: {
			title: 'Une PDF Online - Combina ficheros PDF de manera privada totalmente gratis'
		},
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
		},
		unlockPdf: {
			title: 'Desbloquea PDF con contraseña',
			description:
				'Este PDF está protegido con contraseña, porfavor introduce la contraseña para desbloquear.',
			startAction: 'Desbloquear PDF',
			unlock: 'Desbloquear'
		},
		viewer: {
			rotatePageLeft: 'Girar página a la izquierda',
			rotatePageRight: 'Girar página a la derecha',
			removePage: 'Eliminar página'
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
		download: 'Descargar',
		page: {
			singular: 'página',
			plural: 'páginas'
		},
		cancel: 'Cancel',
		form: {
			optional: 'opcional',
			fields: {
				password: 'Contraseña'
			},
			validations: {
				required: 'Campo obligatorio',
				invalidPassword: 'Contraseña incorrecta'
			}
		}
	},
	components: {
		viewer: {
			toolbar: {
				goFirstPage: 'Ir a la primera página',
				goPreviousPage: 'Ir a la página anterior',
				goNextPAge: 'Ir a la página siguiente',
				goLastPage: 'Ir a la última página',
				currentPage: 'Página actual'
			}
		}
	}
};

export default es;
