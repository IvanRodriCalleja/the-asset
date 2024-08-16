import { PDFDocument, degrees } from 'pdf-lib';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';

type MergePdfs = {
	files: TheAssetFile[];
};

export const mergePdfs = async ({ files }: MergePdfs) => {
	const mergedPdf = await PDFDocument.create();

	for (const file of files) {
		const pdf = await PDFDocument.load(file.buffer);
		const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
		copiedPages.forEach(page => mergedPdf.addPage(page));
	}

	return await mergedPdf.save();
};

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
		pages[page]!.setRotation(degrees(rotation));
	}

	return await pdfDoc.save();
};
