import { PDFDocument, degrees } from 'pdf-lib';

type RotatePdfArgs = {
	buffer: ArrayBuffer;
	rotation: number;
	page?: number;
};

//TODO: Create in specific file
export const rotatePdf = async ({ buffer, rotation, page }: RotatePdfArgs): Promise<Uint8Array> => {
	const pdfDoc = await PDFDocument.load(buffer);
	const pages = pdfDoc.getPages();

	if (page && (page < 0 || page >= pages.length)) {
		throw new Error('Invalid page number');
	}

	if (!page) {
		pages.forEach(page => {
			const { angle } = page.getRotation();
			page.setRotation(degrees(angle + rotation));
		});
	} else {
		const { angle } = pages[page]!.getRotation();
		pages[page]!.setRotation(degrees(angle + rotation));
	}

	return await pdfDoc.save();
};
