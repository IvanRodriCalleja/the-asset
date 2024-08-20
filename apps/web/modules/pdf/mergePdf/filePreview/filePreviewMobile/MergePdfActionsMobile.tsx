import { Dispatch, SetStateAction } from 'react';

import { MagnifyingGlassIcon, ReloadIcon, TrashIcon } from '@radix-ui/react-icons';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { Viewer } from '@theasset/pdf-react/viewer';
import { Modal } from '@theasset/ui/modal';
import { Thumbnail } from '@theasset/ui/thumbnail';

import { ViewerActions } from '../shared/ViewerActions';
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
			<Modal.Root>
				<Modal.Trigger>
					<Thumbnail.MobileAction>
						<MagnifyingGlassIcon />
					</Thumbnail.MobileAction>
				</Modal.Trigger>
				<Modal.Content size="none">
					<Modal.Close />
					<Viewer file={file}>
						{({ page }) => <ViewerActions page={page} file={file} setFiles={setFiles} />}
					</Viewer>
				</Modal.Content>
			</Modal.Root>

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
