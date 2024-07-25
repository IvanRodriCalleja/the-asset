import { TheAssetFileItem } from '@theasset/ui/file-picker';
import { useMediaQuery } from '@theasset/utilities-react/useMediaQuery';

import { breakpoints } from '@theasset/style-system/breakpoints';

import { FilePreviewDesktop } from './filePreview/FilePreviewDesktop';
import { PdfMergeMetadata } from '@theasset/pdf';
import { Dispatch, SetStateAction } from 'react';

export type FilePreviewProps = {
	files: TheAssetFileItem<PdfMergeMetadata>[];
	setFiles: Dispatch<SetStateAction<TheAssetFileItem<PdfMergeMetadata>[]>>;
};

export const FilePreview = (props: FilePreviewProps) => {
	const isDesktop = useMediaQuery(`(min-width: ${breakpoints.md})`);

	return isDesktop ? <FilePreviewDesktop {...props} /> : <div>Mobile</div>;
};
