import { PDFDocumentProxy } from 'pdfjs-dist/build/pdf.min.mjs';

import { useCache } from '@theasset/cache/useCache';
import { getThumbnail } from '@theasset/pdf/thumbnail';
import { Thumbnail } from '@theasset/ui/thumbnail';

type ScrollViewerPageProps = {
	page: number;
	hash: string;
	pdf: PDFDocumentProxy;
};

export const ScrollViewerPage = ({ page, hash, pdf }: ScrollViewerPageProps) => {
	const { src } = useCache({ page, hash }, () => getThumbnail({ pdf, page })); // TODO: Create custom hook

	return <Thumbnail.Image src={src} alt="" />; // TODO: Add ALT
};
