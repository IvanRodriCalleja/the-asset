import { Dispatch, SetStateAction } from 'react';

import { RotateCw, Trash2, ZoomIn } from 'lucide-react';

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
				<ZoomIn size={16} />
			</Thumbnail.MobileAction>
			<Thumbnail.MobileAction onPress={() => onRotateFile('right')}>
				<RotateCw size={16} />
			</Thumbnail.MobileAction>
			<Thumbnail.MobileAction onPress={() => onRemoveFile()}>
				<Trash2 size={16} />
			</Thumbnail.MobileAction>
		</Thumbnail.MobileActions>
	);
};
