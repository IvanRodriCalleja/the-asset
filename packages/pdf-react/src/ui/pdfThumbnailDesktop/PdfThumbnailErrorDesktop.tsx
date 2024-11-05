import { FallbackProps } from 'react-error-boundary';

import { PdfToolsError, PdfToolsErrorCodes } from '@theasset/pdf-tools/types';

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
	if (error instanceof PdfToolsError) {
		if (error.code === PdfToolsErrorCodes.PasswordError) {
			return (
				<PdfEncryptedThumbnailDesktop
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
