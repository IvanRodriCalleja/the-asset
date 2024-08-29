import { Dispatch, SetStateAction } from 'react';

import { ReloadIcon, TrashIcon } from '@radix-ui/react-icons';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { useLocale } from '@theasset/internationalization/hooks';
import { Button } from '@theasset/ui/button';
import { Tooltip, TooltipTrigger } from '@theasset/ui/tooltip';

import { useMergePdfActions } from '../useMergePdfActions';

type ViewerActionsProps = {
	page: number;
	totalPages: number;
	file: TheAssetFile;
	setFiles: Dispatch<SetStateAction<TheAssetFile[]>>;
	setPage: (page: number) => void;
};

export const ViewerActions = ({
	page,
	file,
	totalPages,
	setPage,
	setFiles
}: ViewerActionsProps) => {
	const { onRotatePage, onRemovePage, onRemoveFile } = useMergePdfActions({ file, setFiles });

	const onRemove = (page: number) => {
		if (totalPages === 1) {
			onRemoveFile();
			return;
		}

		if (page === totalPages) {
			setPage(page - 1);
		}

		onRemovePage(page);
	};

	const { mergePdf } = useLocale();
	return (
		<>
			<TooltipTrigger>
				<Button size="icon" variant="ghost" onPress={() => onRotatePage('left', page)}>
					<ReloadIcon style={{ transform: 'scaleX(-1)' }} />
				</Button>
				<Tooltip>{mergePdf.viewer.rotatePageLeft}</Tooltip>
			</TooltipTrigger>

			<TooltipTrigger>
				<Button size="icon" variant="ghost" onPress={() => onRotatePage('right', page)}>
					<ReloadIcon />
				</Button>
				<Tooltip>{mergePdf.viewer.rotatePageRight}</Tooltip>
			</TooltipTrigger>

			<TooltipTrigger>
				<Button size="icon" variant="ghost" onPress={() => onRemove(page)}>
					<TrashIcon />
				</Button>
				<Tooltip>{mergePdf.viewer.removePage}</Tooltip>
			</TooltipTrigger>
		</>
	);
};
