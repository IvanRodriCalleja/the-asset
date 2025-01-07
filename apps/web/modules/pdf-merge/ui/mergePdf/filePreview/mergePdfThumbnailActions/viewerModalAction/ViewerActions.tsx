import { startTransition } from 'react';

import { ReloadIcon, TrashIcon } from '@radix-ui/react-icons';

import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { FileState } from '@theasset/pdf-tools';
import { Direction } from '@theasset/pdf-tools/types';
import { Button } from '@theasset/ui/button';
import { Tooltip, TooltipTrigger } from '@theasset/ui/tooltip';

import { useMergePdfActions } from '../useMergePdfActions';

type ViewerActionsProps = {
	page: number;
	totalPages: number;
	file: FileState;
	setPage: (page: number) => void;
};

export const ViewerActions = ({ page, file, totalPages, setPage }: ViewerActionsProps) => {
	const { onRotatePage, onRemovePage, onRemoveFile } = useMergePdfActions({ file });

	const onRemove = (page: number) => {
		startTransition(() => {
			if (totalPages === 1) {
				onRemoveFile();
				return;
			}

			if (page === totalPages) {
				setPage(page - 1);
			}

			onRemovePage(page);
		});
	};

	const { mergePdf } = useLocale();
	return (
		<>
			<TooltipTrigger>
				<Button
					size="icon"
					variant="ghost"
					onPress={() => onRotatePage(Direction.Left, page - 1)}
					aria-label={mergePdf.viewer.rotatePageLeft}>
					<ReloadIcon style={{ transform: 'scaleX(-1)' }} />
				</Button>
				<Tooltip>{mergePdf.viewer.rotatePageLeft}</Tooltip>
			</TooltipTrigger>

			<TooltipTrigger>
				<Button
					size="icon"
					variant="ghost"
					onPress={() => onRotatePage(Direction.Right, page - 1)}
					aria-label={mergePdf.viewer.rotatePageRight}>
					<ReloadIcon />
				</Button>
				<Tooltip>{mergePdf.viewer.rotatePageRight}</Tooltip>
			</TooltipTrigger>

			<TooltipTrigger>
				<Button
					size="icon"
					variant="ghost"
					onPress={() => onRemove(page)}
					aria-label={mergePdf.viewer.removePage}>
					<TrashIcon />
				</Button>
				<Tooltip>{mergePdf.viewer.removePage}</Tooltip>
			</TooltipTrigger>
		</>
	);
};
