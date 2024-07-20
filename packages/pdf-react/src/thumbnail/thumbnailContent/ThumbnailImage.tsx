import { useCache } from '@theasset/cache/useCache';
import { getThumbnail } from '@theasset/pdf/thumbnail';

import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';

type ThumbnailImageProps = {
	pdf: PDFDocumentProxy;
	name: string;
	id: string;
};

export const ThumbnailImage = ({ pdf, name, id }: ThumbnailImageProps) => {
	const thumbnail = useCache(id, () => getThumbnail({ pdf }));

	return <img src={thumbnail} alt={name} />;
};
