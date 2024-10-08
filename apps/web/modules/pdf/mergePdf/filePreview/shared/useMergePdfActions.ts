import { Dispatch, SetStateAction, useTransition } from 'react';

import { TheAssetFile, hashArrayBuffer } from '@theasset/file/domain/the-asset-file';
import { removePdfPage, rotatePdf, rotatePdfPage } from '@theasset/pdf-tools';
import { Direction } from '@theasset/pdf-tools/types';

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

	const onRemovePage = (page: number) => {
		startTransition(async () => {
			const { buffer, hash } = await removePdfPage({ buffer: file.buffer, index: page - 1 });

			setFiles(files => {
				const fileIndex = files.findIndex(({ id }) => id === file.id);

				const newFiles = [...files];
				newFiles[fileIndex] = {
					...file,
					hash,
					buffer
				};

				return newFiles;
			});
		});
	};

	const onRotateFile = (direction: Direction) => {
		startTransition(async () => {
			const { buffer, hash } = await rotatePdf({
				buffer: file.buffer,
				direction
			});

			setFiles(files => {
				const fileIndex = files.findIndex(({ id }) => id === file.id);

				const newFiles = [...files];
				newFiles[fileIndex] = {
					...file,
					hash,
					buffer
				};

				return newFiles;
			});
		});
	};

	const onRotatePage = async (direction: Direction, page: number) => {
		startTransition(async () => {
			const { buffer, hash } = await rotatePdfPage({
				buffer: file.buffer,
				page,
				direction
			});

			setFiles(files => {
				const fileIndex = files.findIndex(({ id }) => id === file.id);

				const newFiles = [...files];
				newFiles[fileIndex] = {
					...file,
					hash,
					buffer
				};

				return newFiles;
			});
		});
	};

	const onUpdatePdf = async (newPdf: ArrayBuffer) => {
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
	};

	return { onRemoveFile, onRotateFile, onRotatePage, onRemovePage, onUpdatePdf, isPending };
};
