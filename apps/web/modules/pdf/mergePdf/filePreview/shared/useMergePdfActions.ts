import { Dispatch, SetStateAction } from 'react';

import { PdfMergeMetadata } from '@theasset/pdf';
import { TheAssetFileItem } from '@theasset/ui/file-picker';

type UseMergePdfActions = {
	setFiles: Dispatch<SetStateAction<TheAssetFileItem<PdfMergeMetadata>[]>>;
};

export const useMergePdfActions = ({ setFiles }: UseMergePdfActions) => {
	const onRemoveFile = (id: string) => {
		setFiles(currentFiles => {
			return currentFiles.filter(file => file.id !== id);
		});
	};

	const onRotateFile = (id: string, direction: 'left' | 'right') => {
		setFiles(currentFiles => {
			const newFiles = currentFiles.map(file => {
				if (file.id === id) {
					const rotation =
						direction === 'left' ? file.metadata.rotation - 90 : file.metadata.rotation + 90;

					const newRotation = rotation >= 360 || rotation <= -360 ? 0 : rotation;

					return {
						...file,
						metadata: {
							...file.metadata,
							rotation: newRotation as 0 | 90 | 180 | 270
						}
					};
				}

				return file;
			});

			return newFiles;
		});
	};

	return { onRemoveFile, onRotateFile };
};
