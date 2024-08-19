import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';

type GetThumbnailResult = {
	src: string;
	width: number;
	height: number;
};

type GetThumbnail = {
	pdf: PDFDocumentProxy;
	page?: number;
};

export const getThumbnail = async ({
	pdf,
	page = 1
}: GetThumbnail): Promise<GetThumbnailResult> => {
	const pdfPage = await pdf.getPage(page);
	const scale = 1;
	const viewport = pdfPage.getViewport({ scale });

	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d')!;
	canvas.height = viewport.height;
	canvas.width = viewport.width;

	const renderContext = {
		canvasContext: context,
		viewport: viewport
	};
	await pdfPage.render(renderContext).promise;

	const src = canvas.toDataURL();

	return { src, width: viewport.width, height: viewport.height };
};
