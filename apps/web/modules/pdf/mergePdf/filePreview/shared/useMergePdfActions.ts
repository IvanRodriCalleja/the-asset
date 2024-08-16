import { Dispatch, SetStateAction } from 'react';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { PdfMergeMetadata } from '@theasset/pdf';

type UseMergePdfActions = {
	file: TheAssetFile<PdfMergeMetadata>;
	setFiles: Dispatch<SetStateAction<TheAssetFile<PdfMergeMetadata>[]>>;
};

export const useMergePdfActions = ({ file, setFiles }: UseMergePdfActions) => {
	const onRemoveFile = () => {
		setFiles(currentFiles => {
			return currentFiles.filter(({ id }) => file.id !== id);
		});
	};

	const onRotateFile = (direction: 'left' | 'right') => {
		const rotation =
			direction === 'left' ? file.metadata.rotation - 90 : file.metadata.rotation + 90;

		const newRotation = rotation >= 360 || rotation <= -360 ? 0 : rotation;

		const newFile = {
			...file,
			metadata: {
				...file.metadata,
				rotation: newRotation as 0 | 90 | 180 | 270
			}
		};

		setFiles(files => {
			const fileIndex = files.findIndex(({ id }) => id === file.id);

			const newFiles = [...files];
			newFiles[fileIndex] = newFile;

			return newFiles;
		});
	};

	return { onRemoveFile, onRotateFile };
};
