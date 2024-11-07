import { FallbackProps } from 'react-error-boundary';

import { ThumbnailProps } from '../PdfThumbnailDesktop';
import { PdfEncryptedThumbnailMobile } from './pdfThumbnailErrorMobile/PdfEncryptedThumbnailMobile';

type ThumbnailErrorProps = FallbackProps & ThumbnailProps;

export const PdfThumbnailErrorMobile = ({
	error,
	resetErrorBoundary,
	file,
	setFiles,
	actions
}: ThumbnailErrorProps) => {
	return (
		<PdfEncryptedThumbnailMobile
			file={file}
			error={error}
			setFiles={setFiles}
			actions={actions}
			resetErrorBoundary={resetErrorBoundary}
		/>
	);
};
