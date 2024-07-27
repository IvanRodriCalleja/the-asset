import { Dispatch, SetStateAction } from 'react';

import { PdfMergeMetadata } from '@theasset/pdf';
import { breakpoints } from '@theasset/style-system/breakpoints';
import { TheAssetFileItem } from '@theasset/ui/file-picker';
import { useMediaQuery } from '@theasset/utilities-react/useMediaQuery';

import { FilePreviewDesktop } from './filePreview/FilePreviewDesktop';
import { FilePreviewMobile } from './filePreview/FilePreviewMobile';

export type FilePreviewProps = {
	files: TheAssetFileItem<PdfMergeMetadata>[];
	setFiles: Dispatch<SetStateAction<TheAssetFileItem<PdfMergeMetadata>[]>>;
};

export const FilePreview = (props: FilePreviewProps) => {
	const isDesktop = useMediaQuery(`(min-width: ${breakpoints.md})`);

	return isDesktop ? <FilePreviewDesktop {...props} /> : <FilePreviewMobile {...props} />;
};
