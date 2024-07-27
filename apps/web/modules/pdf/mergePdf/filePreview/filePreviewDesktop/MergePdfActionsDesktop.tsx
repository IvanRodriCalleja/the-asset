import { Dispatch, SetStateAction } from 'react';

import { RotateCw, Trash2, ZoomIn } from 'lucide-react';

import { PdfMergeMetadata } from '@theasset/pdf';
import { TheAssetFileItem } from '@theasset/ui/file-picker';
import { Thumbnail } from '@theasset/ui/thumbnail';

import { useMergePdfActions } from '../shared/useMergePdfActions';

type MergePdfActionsDesktopProp = {
	file: TheAssetFileItem<PdfMergeMetadata>;
	setFiles: Dispatch<SetStateAction<TheAssetFileItem<PdfMergeMetadata>[]>>;
};

export const MergePdfActionsDesktop = ({ file, setFiles }: MergePdfActionsDesktopProp) => {
	const { onRemoveFile, onRotateFile } = useMergePdfActions({ setFiles });

	return (
		<Thumbnail.Actions>
			<Thumbnail.ActionButton>
				<ZoomIn size={16} />
			</Thumbnail.ActionButton>
			<Thumbnail.ActionButton onPress={() => onRotateFile(file.id, 'right')}>
				<RotateCw size={16} />
			</Thumbnail.ActionButton>
			<Thumbnail.ActionButton onPress={() => onRemoveFile(file.id)}>
				<Trash2 size={16} />
			</Thumbnail.ActionButton>
		</Thumbnail.Actions>
	);
};
