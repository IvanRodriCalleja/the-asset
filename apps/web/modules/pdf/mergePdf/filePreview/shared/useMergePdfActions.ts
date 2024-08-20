import { Dispatch, SetStateAction, useTransition } from 'react';

import { TheAssetFile, hashArrayBuffer } from '@theasset/file/domain/the-asset-file';
import { rotatePdfFile, rotatePdfPage } from '@theasset/pdf/merge';
import { removePageFromPDF } from '@theasset/pdf/shared';

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

	const onRemovePage = async (page: number) => {
		startTransition(async () => {
			const newPdf = await removePageFromPDF({ buffer: file.buffer, page });
			const hash = await hashArrayBuffer(newPdf);

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

	const onRotateFile = async (direction: 'left' | 'right') => {
		startTransition(async () => {
			const newPdf = await rotatePdfFile({
				buffer: file.buffer,
				rotation: direction === 'left' ? -90 : 90
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

	const onRotatePage = async (direction: 'left' | 'right', page: number) => {
		startTransition(async () => {
			const newPdf = await rotatePdfPage({
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

	return { onRemoveFile, onRotateFile, onRotatePage, onRemovePage, isPending };
};
