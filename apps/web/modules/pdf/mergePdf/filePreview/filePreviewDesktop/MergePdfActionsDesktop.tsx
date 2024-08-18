import { Dispatch, SetStateAction } from 'react';

import { MagnifyingGlassIcon, ReloadIcon, TrashIcon } from '@radix-ui/react-icons';

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
						<MagnifyingGlassIcon />
					</Thumbnail.ActionButton>
				</Modal.Trigger>
				<Modal.Content size="none">
					<Modal.Close />
					<Viewer file={file} />
				</Modal.Content>
			</Modal.Root>

			<Thumbnail.ActionButton onPress={() => onRotateFile('left')}>
				<ReloadIcon style={{ transform: 'scaleX(-1)' }} />
			</Thumbnail.ActionButton>
			<Thumbnail.ActionButton onPress={() => onRotateFile('right')}>
				<ReloadIcon />
			</Thumbnail.ActionButton>
			<Thumbnail.ActionButton onPress={() => onRemoveFile()}>
				<TrashIcon />
			</Thumbnail.ActionButton>
		</Thumbnail.Actions>
	);
};
