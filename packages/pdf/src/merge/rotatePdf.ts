import { PDFDocument, degrees } from 'pdf-lib';

type RotatePdfArgs = {
	buffer: ArrayBuffer;
	rotation: number;
};

export const rotatePdfFile = async ({ buffer, rotation }: RotatePdfArgs): Promise<Uint8Array> => {
	const pdfDoc = await PDFDocument.load(buffer);
	const pages = pdfDoc.getPages();

	pages.forEach(page => {
		const { angle } = page.getRotation();
		page.setRotation(degrees(angle + rotation));
	});

	return await pdfDoc.save();
};

type RotatePdfPageProps = {
	buffer: ArrayBuffer;
	rotation: number;
	page: number;
};

export const rotatePdfPage = async ({ buffer, rotation, page }: RotatePdfPageProps) => {
	const pdfDoc = await PDFDocument.load(buffer);
	const pages = pdfDoc.getPages();

	const pageNumber = page ? page - 1 : page;

	if (pageNumber && (pageNumber < 0 || pageNumber >= pages.length)) {
		throw new Error('Invalid page number');
	}
	const { angle } = pages[pageNumber]!.getRotation();
	pages[pageNumber]!.setRotation(degrees(angle + rotation));

	return await pdfDoc.save();
};
