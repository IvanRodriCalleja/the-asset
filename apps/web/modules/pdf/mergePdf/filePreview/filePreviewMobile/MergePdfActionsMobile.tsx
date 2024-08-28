import { Dispatch, SetStateAction } from 'react';

import { MagnifyingGlassIcon, ReloadIcon, TrashIcon } from '@radix-ui/react-icons';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { Thumbnail } from '@theasset/ui/thumbnail';

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
		<Thumbnail.MobileActions>
			{!file.isEncrypted && (
				<ViewerModalAction file={file} setFiles={setFiles}>
					<Thumbnail.MobileAction>
						<MagnifyingGlassIcon />
					</Thumbnail.MobileAction>
				</ViewerModalAction>
			)}

			{!file.isEncrypted && (
				<Thumbnail.MobileAction onPress={() => onRotateFile('left')}>
					<ReloadIcon style={{ transform: 'scaleX(-1)' }} />
				</Thumbnail.MobileAction>
			)}

			{!file.isEncrypted && (
				<Thumbnail.MobileAction onPress={() => onRotateFile('right')}>
					<ReloadIcon />
				</Thumbnail.MobileAction>
			)}
			<Thumbnail.MobileAction onPress={() => onRemoveFile()}>
				<TrashIcon />
			</Thumbnail.MobileAction>
		</Thumbnail.MobileActions>
	);
};
