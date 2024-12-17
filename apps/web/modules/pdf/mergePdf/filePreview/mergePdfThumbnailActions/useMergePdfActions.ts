import { useTransition } from 'react';

import { FileState, mergeManager } from '@theasset/pdf-tools';
import { Direction } from '@theasset/pdf-tools/types';

import { useMergePdfState } from '../../MergePdfStateContext';

type UseMergePdfActions = {
	file: FileState;
};

export const useMergePdfActions = ({ file }: UseMergePdfActions) => {
	const { onFileChange, onRemoveFile: onRemove } = useMergePdfState();
	const [isPending, startTransition] = useTransition();

	const onRemoveFile = () => {
		startTransition(() => {
			onRemove(file.id);
			mergeManager.removeFile(file.id);
		});
	};

	const onRemovePage = async (page: number) => {
		// TODO: Review startTransition
		const result = await mergeManager.removePdfPage(file.id, page - 1);

		onFileChange(file.id, { ...file, ...result });
	};

	const onRotateFile = (direction: Direction) => {
		startTransition(async () => {
			const result = await mergeManager.rotatePdf(file.id, direction);
			onFileChange(file.id, { ...file, ...result });
		});
	};

	const onRotatePage = (direction: Direction, page: number) => {
		startTransition(async () => {
			const result = await mergeManager.rotatePdfPage(file.id, page + 1, direction);
			onFileChange(file.id, { ...file, ...result });
		});
	};

	return { onRemoveFile, onRotateFile, onRotatePage, onRemovePage, isPending };
};
