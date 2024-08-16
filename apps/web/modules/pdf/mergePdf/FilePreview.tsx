import { Dispatch, SetStateAction } from 'react';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { PdfMergeMetadata } from '@theasset/pdf';
import { breakpoints } from '@theasset/style-system/breakpoints';
import { useMediaQuery } from '@theasset/utilities-react/useMediaQuery';

import { FilePreviewDesktop } from './filePreview/FilePreviewDesktop';
import { FilePreviewMobile } from './filePreview/FilePreviewMobile';

export type FilePreviewProps = {
	files: TheAssetFile<PdfMergeMetadata>[];
	setFiles: Dispatch<SetStateAction<TheAssetFile<PdfMergeMetadata>[]>>;
};

export const FilePreview = (props: FilePreviewProps) => {
	const isDesktop = useMediaQuery(`(min-width: ${breakpoints.md})`);

	return isDesktop ? <FilePreviewDesktop {...props} /> : <FilePreviewMobile {...props} />;
};
