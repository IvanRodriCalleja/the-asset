import { Dispatch, SetStateAction } from 'react';

import { RotateCw, Trash2, ZoomIn } from 'lucide-react';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { Viewer } from '@theasset/pdf-react/viewer';
import { Modal } from '@theasset/ui/modal';
import { Thumbnail } from '@theasset/ui/thumbnail';

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
			<Thumbnail.ActionButton onPress={() => onRotateFile('right')}>
				<RotateCw size={16} />
			</Thumbnail.ActionButton>
			<Thumbnail.ActionButton onPress={() => onRemoveFile()}>
				<Trash2 size={16} />
			</Thumbnail.ActionButton>
		</Thumbnail.Actions>
	);
};
