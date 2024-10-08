import { Dispatch, SetStateAction } from 'react';

import { MagnifyingGlassIcon, ReloadIcon, TrashIcon } from '@radix-ui/react-icons';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { Direction } from '@theasset/pdf-tools/types';
import { ThumbnailActionButton, ThumbnailActions } from '@theasset/ui/thumbnail';

import { ViewerModalAction } from '../shared/ViewerModalAction';
import { useMergePdfActions } from '../shared/useMergePdfActions';

type MergePdfActionsDesktopProp = {
	file: TheAssetFile;
	setFiles: Dispatch<SetStateAction<TheAssetFile[]>>;
};

export const MergePdfActionsDesktop = (props: MergePdfActionsDesktopProp) => <Actions {...props} />;

const Actions = ({ file, setFiles }: MergePdfActionsDesktopProp) => {
	const { mergePdf } = useLocale();
	const { onRemoveFile, onRotateFile } = useMergePdfActions({ file, setFiles });

	return (
		<ThumbnailActions>
			{!file.isEncrypted && (
				<ViewerModalAction file={file} setFiles={setFiles}>
					<ThumbnailActionButton aria-label={mergePdf.thumbnailActions.magnify}>
						<MagnifyingGlassIcon />
					</ThumbnailActionButton>
				</ViewerModalAction>
			)}

			{!file.isEncrypted && (
				<ThumbnailActionButton
					onPress={() => onRotateFile(Direction.Left)}
					aria-label={mergePdf.thumbnailActions.rotatePdfLeft}>
					<ReloadIcon style={{ transform: 'scaleX(-1)' }} />
				</ThumbnailActionButton>
			)}

			{!file.isEncrypted && (
				<ThumbnailActionButton
					onPress={() => onRotateFile(Direction.Right)}
					aria-label={mergePdf.thumbnailActions.rotatePdfRight}>
					<ReloadIcon />
				</ThumbnailActionButton>
			)}
			<ThumbnailActionButton
				onPress={() => onRemoveFile()}
				aria-label={mergePdf.thumbnailActions.removePdf}>
				<TrashIcon />
			</ThumbnailActionButton>
		</ThumbnailActions>
	);
};
