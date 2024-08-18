import { Dispatch, SetStateAction, useTransition } from 'react';

import { TheAssetFile, hashArrayBuffer } from '@theasset/file/domain/the-asset-file';
import { rotatePdf } from '@theasset/pdf/merge';

type UseMergePdfActions = {
	file: TheAssetFile;
	setFiles: Dispatch<SetStateAction<TheAssetFile[]>>;
};

export const useMergePdfActions = ({ file, setFiles }: UseMergePdfActions) => {
	const [isPending, startTransition] = useTransition();

	const onRemoveFile = () => {
		startTransition(() => {
			setFiles(currentFiles => {
				return currentFiles.filter(({ id }) => file.id !== id);
			});
		});
	};

	const onRotateFile = async (direction: 'left' | 'right', page?: number) => {
		startTransition(async () => {
			const newPdf = await rotatePdf({
				buffer: file.buffer,
				rotation: direction === 'left' ? -90 : 90,
				page
			});
			const hash = await hashArrayBuffer(newPdf); // TODO: Check why this doesn't return same hash when rotating the same file

			setFiles(files => {
				const fileIndex = files.findIndex(({ id }) => id === file.id);

				const newFiles = [...files];
				newFiles[fileIndex] = {
					...file,
					hash,
					buffer: newPdf
				};

				return newFiles;
			});
		});
	};

	return { onRemoveFile, onRotateFile, isPending };
};
