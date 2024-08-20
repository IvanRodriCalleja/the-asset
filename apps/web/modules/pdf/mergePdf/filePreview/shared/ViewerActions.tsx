import { Dispatch, SetStateAction } from 'react';

import { ReloadIcon, TrashIcon } from '@radix-ui/react-icons';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { Button } from '@theasset/ui/button';
import { Tooltip } from '@theasset/ui/tooltip';

import { useMergePdfActions } from './useMergePdfActions';

type ViewerActionsProps = {
	page: number;
	file: TheAssetFile;
	setFiles: Dispatch<SetStateAction<TheAssetFile[]>>;
};

export const ViewerActions = ({ page, file, setFiles }: ViewerActionsProps) => {
	const { onRotatePage, onRemovePage } = useMergePdfActions({ file, setFiles });

	return (
		<>
			<Tooltip.Root delayDuration={1000}>
				<Tooltip.Trigger>
					<Button size="icon" variant="ghost" onPress={() => onRotatePage('left', page)}>
						{/* TODO: Add literal*/}
						<ReloadIcon style={{ transform: 'scaleX(-1)' }} />
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content>Rotate page to left</Tooltip.Content>
			</Tooltip.Root>

			<Tooltip.Root delayDuration={1000}>
				<Tooltip.Trigger>
					<Button size="icon" variant="ghost" onPress={() => onRotatePage('right', page)}>
						{/* TODO: Add literal*/}
						<ReloadIcon />
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content>Rotate page to right</Tooltip.Content>
			</Tooltip.Root>

			{/* TODO: If last page is removed, move to previous page*/}
			<Tooltip.Root delayDuration={1000}>
				<Tooltip.Trigger>
					{/* TODO: Add literals*/}
					<Button size="icon" variant="ghost" onPress={() => onRemovePage(page)}>
						<TrashIcon />
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content>Remove page</Tooltip.Content>
			</Tooltip.Root>
		</>
	);
};
