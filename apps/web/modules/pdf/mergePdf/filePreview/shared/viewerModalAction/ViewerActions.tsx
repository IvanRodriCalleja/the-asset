import { Dispatch, SetStateAction } from 'react';

import { ReloadIcon, TrashIcon } from '@radix-ui/react-icons';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { useLocale } from '@theasset/internationalization/hooks';
import { Button } from '@theasset/ui/button';
import { Tooltip } from '@theasset/ui/tooltip';

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
			<Tooltip.Root delayDuration={1000}>
				<Tooltip.Trigger>
					<Button size="icon" variant="ghost" onPress={() => onRotatePage('left', page)}>
						<ReloadIcon style={{ transform: 'scaleX(-1)' }} />
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content>{mergePdf.viewer.rotatePageLeft}</Tooltip.Content>
			</Tooltip.Root>

			<Tooltip.Root delayDuration={1000}>
				<Tooltip.Trigger>
					<Button size="icon" variant="ghost" onPress={() => onRotatePage('right', page)}>
						<ReloadIcon />
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content>{mergePdf.viewer.rotatePageRight}</Tooltip.Content>
			</Tooltip.Root>

			{/* TODO: If last page is removed, move to previous page*/}
			<Tooltip.Root delayDuration={1000}>
				<Tooltip.Trigger>
					<Button size="icon" variant="ghost" onPress={() => onRemove(page)}>
						<TrashIcon />
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content>{mergePdf.viewer.removePage}</Tooltip.Content>
			</Tooltip.Root>
		</>
	);
};
