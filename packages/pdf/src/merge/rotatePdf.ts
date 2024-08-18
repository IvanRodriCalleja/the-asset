import { PDFDocument, degrees } from 'pdf-lib';

type RotatePdfArgs = {
	buffer: ArrayBuffer;
	rotation: number;
	page?: number;
};

export const rotatePdf = async ({ buffer, rotation, page }: RotatePdfArgs): Promise<Uint8Array> => {
	const pdfDoc = await PDFDocument.load(buffer);
	const pages = pdfDoc.getPages();

	const pageNumber = page ? page - 1 : page;

	if (pageNumber && (pageNumber < 0 || pageNumber >= pages.length)) {
		throw new Error('Invalid page number');
	}

	if (!pageNumber) {
		pages.forEach(page => {
			const { angle } = page.getRotation();
			page.setRotation(degrees(angle + rotation));
		});
	} else {
		const { angle } = pages[pageNumber]!.getRotation();
		pages[pageNumber]!.setRotation(degrees(angle + rotation));
	}

	return await pdfDoc.save();
};
