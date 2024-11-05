import { FallbackProps } from 'react-error-boundary';

import { PdfToolsError, PdfToolsErrorCodes } from '@theasset/pdf-tools/types';

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
	if (error instanceof PdfToolsError) {
		if (error.code === PdfToolsErrorCodes.PasswordError) {
			return (
				<PdfEncryptedThumbnailMobile
					file={file}
					setFiles={setFiles}
					actions={actions}
					resetErrorBoundary={resetErrorBoundary}
				/>
			);
		}
	}

	return <div>Erroraco</div>;
};
