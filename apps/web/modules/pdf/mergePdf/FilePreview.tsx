import { Dispatch, SetStateAction } from 'react';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { breakpoints } from '@theasset/style-system/breakpoints';
import { useMediaQuery } from '@theasset/utilities-react/useMediaQuery';

import { FilePreviewDesktop } from './filePreview/FilePreviewDesktop';
import { FilePreviewMobile } from './filePreview/FilePreviewMobile';

export type FilePreviewProps = {
	files: TheAssetFile[];
	setFiles: Dispatch<SetStateAction<TheAssetFile[]>>;
};

export const FilePreview = (props: FilePreviewProps) => {
	const isDesktop = useMediaQuery(`(min-width: ${breakpoints.md})`);

	return isDesktop ? <FilePreviewDesktop {...props} /> : <FilePreviewMobile {...props} />;
};
