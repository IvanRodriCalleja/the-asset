import { Dispatch, SetStateAction } from 'react';

import { RotateCw, Trash2, ZoomIn } from 'lucide-react';

import { PdfMergeMetadata } from '@theasset/pdf';
import { Viewer } from '@theasset/pdf-react/viewer';
import { TheAssetFileItem } from '@theasset/ui/file-picker';
import { Modal } from '@theasset/ui/modal';
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
			<Modal.Root>
				<Modal.Trigger>
					<Thumbnail.ActionButton>
						<ZoomIn size={16} />
					</Thumbnail.ActionButton>
				</Modal.Trigger>
				<Modal.Content size="none">
					<Modal.Close />
					<Viewer file={file} />
				</Modal.Content>
			</Modal.Root>
			<Thumbnail.ActionButton onPress={() => onRotateFile(file.id, 'right')}>
				<RotateCw size={16} />
			</Thumbnail.ActionButton>
			<Thumbnail.ActionButton onPress={() => onRemoveFile(file.id)}>
				<Trash2 size={16} />
			</Thumbnail.ActionButton>
		</Thumbnail.Actions>
	);
};
