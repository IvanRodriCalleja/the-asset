import { Dispatch, SetStateAction } from 'react';

import { MagnifyingGlassIcon, ReloadIcon, TrashIcon } from '@radix-ui/react-icons';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { Direction } from '@theasset/pdf-tools/types';
import { Thumbnail } from '@theasset/ui/thumbnail';

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
		<Thumbnail.Actions>
			{!file.isEncrypted && (
				<ViewerModalAction file={file} setFiles={setFiles}>
					<Thumbnail.ActionButton>
						<MagnifyingGlassIcon />
					</Thumbnail.ActionButton>
				</ViewerModalAction>
			)}

			{!file.isEncrypted && (
				<Thumbnail.ActionButton onPress={() => onRotateFile(Direction.Left)}>
					<ReloadIcon style={{ transform: 'scaleX(-1)' }} />
				</Thumbnail.ActionButton>
			)}

			{!file.isEncrypted && (
				<Thumbnail.ActionButton onPress={() => onRotateFile(Direction.Right)}>
					<ReloadIcon />
				</Thumbnail.ActionButton>
			)}
			<Thumbnail.ActionButton onPress={() => onRemoveFile()}>
				<TrashIcon />
			</Thumbnail.ActionButton>
		</Thumbnail.Actions>
	);
};
