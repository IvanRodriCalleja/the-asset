import { PDFDocument } from 'pdf-lib';

type RemovePageFromPdfProps = {
	buffer: ArrayBuffer;
	page: number;
};

export const removePageFromPDF = async ({ buffer, page }: RemovePageFromPdfProps) => {
	const pdfDoc = await PDFDocument.load(buffer);

	pdfDoc.removePage(page - 1);

	return pdfDoc.save();
};
