import { FallbackProps } from 'react-error-boundary';

import { ThumbnailProps } from '../PdfThumbnailDesktop';
import { PdfEncryptedThumbnailDesktop } from './pdfThumbnailErrorDesktop/PdfEncryptedThumbnailDesktop';

type ThumbnailErrorProps = FallbackProps & ThumbnailProps;

export const PdfThumbnailErrorDesktop = ({
	error,
	resetErrorBoundary,
	file,
	setFiles,
	actions
}: ThumbnailErrorProps) => {
	return (
		<PdfEncryptedThumbnailDesktop
			file={file}
			error={error}
			setFiles={setFiles}
			actions={actions}
			resetErrorBoundary={resetErrorBoundary}
		/>
	);
};
