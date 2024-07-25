import { useCache } from '@theasset/cache/useCache';
import { getThumbnail } from '@theasset/pdf/thumbnail';
import { styled } from '@theasset/style-system/jsx';

import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';

type ThumbnailImageProps = {
	pdf: PDFDocumentProxy;
	name: string;
	id: string;
};

const Image = styled('img', {
	base: {
		position: 'relative',
		borderStyle: 'solid',
		borderWidth: '1px',
		borderColor: 'border'
	}
});

const Page = styled('div', {
	base: {
		position: 'relative',
		paddingTop: '6px',
		paddingLeft: '6px',

		'&:before': {
			content: '""',
			position: 'absolute',
			display: 'block',
			width: 'calc(100% - 6px)',
			height: 'calc(100% - 6px)',
			top: '0',
			left: '0',
			bottom: '-6px',
			background: 'white',
			borderStyle: 'solid',
			borderWidth: '1px',
			borderColor: 'border'
		}
	}
});

export const ThumbnailImage = ({ pdf, name, id }: ThumbnailImageProps) => {
	const thumbnail = useCache(id, () => getThumbnail({ pdf }));

	return (
		<Page>
			<Image src={thumbnail} alt={name} />
		</Page>
	);
};
