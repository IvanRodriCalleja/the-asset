import { type PDFDocumentProxy } from 'pdfjs-dist/build/pdf.min.mjs';

import { styled } from '../../style-system/generated/jsx/factory';

type ViewerProps = {
	pdf: PDFDocumentProxy;
	name: string;
	id: string;
};

const ViewerImageContainer = styled('div', {
	base: {
		width: '540px',
		height: '765px'
	}
});

export const Viewer = ({} /*pdf, name, id*/ : ViewerProps) => {
	return (
		<ViewerImageContainer>
			{/*<ThumbnailImage pdf={pdf} page={2} name={name} id={id} />*/}
		</ViewerImageContainer>
	);
};
