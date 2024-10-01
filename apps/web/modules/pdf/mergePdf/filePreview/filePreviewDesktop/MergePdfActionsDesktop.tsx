import { Dispatch, SetStateAction } from 'react';

import { MagnifyingGlassIcon, ReloadIcon, TrashIcon } from '@radix-ui/react-icons';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
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
	const { onRemoveFile, onRotateFile } = useMergePdfActions({ file, setFiles });

	return (
		<ThumbnailActions>
			{!file.isEncrypted && (
				<ViewerModalAction file={file} setFiles={setFiles}>
					<ThumbnailActionButton>
						<MagnifyingGlassIcon />
					</ThumbnailActionButton>
				</ViewerModalAction>
			)}

			{!file.isEncrypted && (
				<ThumbnailActionButton onPress={() => onRotateFile(Direction.Left)}>
					<ReloadIcon style={{ transform: 'scaleX(-1)' }} />
				</ThumbnailActionButton>
			)}

			{!file.isEncrypted && (
				<ThumbnailActionButton onPress={() => onRotateFile(Direction.Right)}>
					<ReloadIcon />
				</ThumbnailActionButton>
			)}
			<ThumbnailActionButton onPress={() => onRemoveFile()}>
				<TrashIcon />
			</ThumbnailActionButton>
		</ThumbnailActions>
	);
};
