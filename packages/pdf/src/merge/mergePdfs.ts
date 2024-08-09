import { PDFDocument } from 'pdf-lib';

type MergeFileItem = {
	buffer: ArrayBuffer;
	metadata: {
		rotation: number;
	};
};

type MergePdfs = {
	files: MergeFileItem[];
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
