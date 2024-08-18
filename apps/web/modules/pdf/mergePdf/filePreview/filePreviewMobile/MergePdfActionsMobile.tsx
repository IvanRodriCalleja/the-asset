import { Dispatch, SetStateAction } from 'react';

import { MagnifyingGlassIcon, ReloadIcon, TrashIcon } from '@radix-ui/react-icons';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { Thumbnail } from '@theasset/ui/thumbnail';

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
			<Thumbnail.MobileAction>
				<MagnifyingGlassIcon />
			</Thumbnail.MobileAction>
			<Thumbnail.MobileAction onPress={() => onRotateFile('left')}>
				<ReloadIcon style={{ transform: 'scaleX(-1)' }} />
			</Thumbnail.MobileAction>
			<Thumbnail.MobileAction onPress={() => onRotateFile('right')}>
				<ReloadIcon />
			</Thumbnail.MobileAction>
			<Thumbnail.MobileAction onPress={() => onRemoveFile()}>
				<TrashIcon />
			</Thumbnail.MobileAction>
		</Thumbnail.MobileActions>
	);
};
