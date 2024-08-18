import { Dispatch, SetStateAction, useTransition } from 'react';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { rotatePdf } from '@theasset/pdf/merge';
import { removePageFromPDF } from '@theasset/pdf/shared';

type UseMergePdfActions = {
	file: TheAssetFile;
	setFiles: Dispatch<SetStateAction<TheAssetFile[]>>;
};

export const useMergePdfActions = ({ file, setFiles }: UseMergePdfActions) => {
	const [isPending, startTransition] = useTransition();

	const onRemoveFile = (page?: number) => {
		if (page) {
			startTransition(async () => {
				const newPdf = await removePageFromPDF({ buffer: file.buffer, page });

				setFiles(files => {
					const fileIndex = files.findIndex(({ id }) => id === file.id);

					const newFiles = [...files];
					newFiles[fileIndex] = {
						...file,
						contentId: new Date().getTime().toString(),
						buffer: newPdf
					};

					return newFiles;
				});
			});
		} else {
			startTransition(() => {
				setFiles(currentFiles => {
					return currentFiles.filter(({ id }) => file.id !== id);
				});
			});
		}
	};

	const onRotateFile = async (direction: 'left' | 'right', page?: number) => {
		const newPdf = await rotatePdf({
			buffer: file.buffer,
			rotation: direction === 'left' ? -90 : 90,
			page
		});

		setFiles(files => {
			const fileIndex = files.findIndex(({ id }) => id === file.id);

			const newFiles = [...files];
			newFiles[fileIndex] = {
				...file,
				contentId: new Date().getTime().toString(),
				buffer: newPdf
			};

			return newFiles;
		});
	};

	return { onRemoveFile, onRotateFile };
};
