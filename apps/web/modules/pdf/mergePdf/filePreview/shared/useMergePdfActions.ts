import { Dispatch, SetStateAction, useTransition } from 'react';

import { FileState, mergeManager } from '@theasset/pdf-tools';
import { Direction } from '@theasset/pdf-tools/types';

type UseMergePdfActions = {
	file: FileState;
	setFiles: Dispatch<SetStateAction<FileState[]>>;
};

export const useMergePdfActions = ({ file, setFiles }: UseMergePdfActions) => {
	const [isPending, startTransition] = useTransition();

	const onRemoveFile = () => {
		startTransition(() => {
			setFiles(currentFiles => currentFiles.filter(({ id }) => file.id !== id));
			mergeManager.removeFile(file.id);
		});
	};

	const onRemovePage = async (page: number) => {
		const result = await mergeManager.removePdfPage(file.id, page - 1);

		setFiles(files => {
			const fileIndex = files.findIndex(({ id }) => id === file.id);

			const newFiles = [...files];
			newFiles[fileIndex] = {
				...file,
				...result
			};
			return newFiles;
		});
	};

	const onRotateFile = (direction: Direction) => {
		startTransition(async () => {
			const result = await mergeManager.rotatePdf(file.id, direction);

			setFiles(files => {
				const fileIndex = files.findIndex(({ id }) => id === file.id);

				const newFiles = [...files];
				newFiles[fileIndex] = {
					...file,
					...result
				};

				return newFiles;
			});
		});
	};

	const onRotatePage = (direction: Direction, page: number) => {
		startTransition(async () => {
			const result = await mergeManager.rotatePdfPage(file.id, page + 1, direction);

			setFiles(files => {
				const fileIndex = files.findIndex(({ id }) => id === file.id);

				const newFiles = [...files];
				newFiles[fileIndex] = {
					...file,
					...result
				};

				return newFiles;
			});
		});
	};

	return { onRemoveFile, onRotateFile, onRotatePage, onRemovePage, isPending };
};
