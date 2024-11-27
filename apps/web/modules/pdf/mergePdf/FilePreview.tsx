import { Dispatch, SetStateAction } from 'react';

import { FileState } from '@theasset/pdf-tools';
import { breakpoints } from '@theasset/style-system/breakpoints';
import { useMediaQuery } from '@theasset/utilities-react/use-media-query';

import { FilePreviewDesktop } from './filePreview/FilePreviewDesktop';
import { FilePreviewMobile } from './filePreview/FilePreviewMobile';

export type FilePreviewProps = {
	files: FileState[];
	setFiles: Dispatch<SetStateAction<FileState[]>>;
};

export const FilePreview = (props: FilePreviewProps) => {
	const isDesktop = useMediaQuery(`(min-width: ${breakpoints.md})`);

	return isDesktop ? <FilePreviewDesktop {...props} /> : <FilePreviewMobile {...props} />;
};
