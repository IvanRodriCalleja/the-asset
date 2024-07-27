import { PdfMergeMetadata } from '@theasset/pdf';
import { TheAssetFileItem } from '@theasset/ui/file-picker';
import { Thumbnail } from '@theasset/ui/thumbnail';
import { RotateCw, Trash2, ZoomIn } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { useMergePdfActions } from '../shared/useMergePdfActions';

type MergePdfActionsMobileProp = {
	file: TheAssetFileItem<PdfMergeMetadata>;
	setFiles: Dispatch<SetStateAction<TheAssetFileItem<PdfMergeMetadata>[]>>;
};

export const MergePdfActionsMobile = ({ file, setFiles }: MergePdfActionsMobileProp) => {
	const { onRemoveFile, onRotateFile } = useMergePdfActions({ setFiles });

	return (
		<Thumbnail.MobileActions>
			<Thumbnail.MobileAction>
				<ZoomIn size={16} />
			</Thumbnail.MobileAction>
			<Thumbnail.MobileAction onPress={() => onRotateFile(file.id, 'right')}>
				<RotateCw size={16} />
			</Thumbnail.MobileAction>
			<Thumbnail.MobileAction onPress={() => onRemoveFile(file.id)}>
				<Trash2 size={16} />
			</Thumbnail.MobileAction>
		</Thumbnail.MobileActions>
	);
};
