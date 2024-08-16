import { Dispatch, SetStateAction } from 'react';

import { RotateCw, Trash2, ZoomIn } from 'lucide-react';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { Thumbnail } from '@theasset/ui/thumbnail';

import { useMergePdfActions } from '../shared/useMergePdfActions';

type MergePdfActionsMobileProp = {
	file: TheAssetFile;
	index: number;
	setFiles: Dispatch<SetStateAction<TheAssetFile[]>>;
};

export const MergePdfActionsMobile = ({ file, index, setFiles }: MergePdfActionsMobileProp) => {
	const { onRemoveFile, onRotateFile } = useMergePdfActions({ setFiles, file });

	return (
		<Thumbnail.MobileActions>
			<Thumbnail.MobileAction>
				<ZoomIn size={16} />
			</Thumbnail.MobileAction>
			<Thumbnail.MobileAction onPress={() => onRotateFile(index, 'right')}>
				<RotateCw size={16} />
			</Thumbnail.MobileAction>
			<Thumbnail.MobileAction onPress={() => onRemoveFile(index)}>
				<Trash2 size={16} />
			</Thumbnail.MobileAction>
		</Thumbnail.MobileActions>
	);
};
