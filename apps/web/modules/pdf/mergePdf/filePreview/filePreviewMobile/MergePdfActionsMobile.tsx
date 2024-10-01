import { Dispatch, SetStateAction } from 'react';

import { MagnifyingGlassIcon, ReloadIcon, TrashIcon } from '@radix-ui/react-icons';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { Direction } from '@theasset/pdf-tools/types';
import { ThumbnailMobileAction, ThumbnailMobileActions } from '@theasset/ui/thumbnail';

import { ViewerModalAction } from '../shared/ViewerModalAction';
import { useMergePdfActions } from '../shared/useMergePdfActions';

type MergePdfActionsMobileProp = {
	file: TheAssetFile;
	setFiles: Dispatch<SetStateAction<TheAssetFile[]>>;
};

export const MergePdfActionsMobile = (props: MergePdfActionsMobileProp) => <Actions {...props} />;

const Actions = ({ file, setFiles }: MergePdfActionsMobileProp) => {
	const { onRemoveFile, onRotateFile } = useMergePdfActions({ file, setFiles });

	return (
		<ThumbnailMobileActions>
			{!file.isEncrypted && (
				<ViewerModalAction file={file} setFiles={setFiles}>
					<ThumbnailMobileAction>
						<MagnifyingGlassIcon />
					</ThumbnailMobileAction>
				</ViewerModalAction>
			)}

			{!file.isEncrypted && (
				<ThumbnailMobileAction onPress={() => onRotateFile(Direction.Left)}>
					<ReloadIcon style={{ transform: 'scaleX(-1)' }} />
				</ThumbnailMobileAction>
			)}

			{!file.isEncrypted && (
				<ThumbnailMobileAction onPress={() => onRotateFile(Direction.Right)}>
					<ReloadIcon />
				</ThumbnailMobileAction>
			)}
			<ThumbnailMobileAction onPress={() => onRemoveFile()}>
				<TrashIcon />
			</ThumbnailMobileAction>
		</ThumbnailMobileActions>
	);
};
