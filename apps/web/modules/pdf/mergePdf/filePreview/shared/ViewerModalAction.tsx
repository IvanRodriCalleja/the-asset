import { Dispatch, SetStateAction } from 'react';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { Viewer } from '@theasset/pdf-react/viewer';
import { css } from '@theasset/style-system/css';
import { Modal } from '@theasset/ui/modal';

import { ViewerActions } from './viewerModalAction/ViewerActions';

type ViewerModalActionProps = {
	children: JSX.Element;
	file: TheAssetFile;
	setFiles: Dispatch<SetStateAction<TheAssetFile[]>>;
};

export const ViewerModalAction = ({ children, file, setFiles }: ViewerModalActionProps) => (
	<Modal.Root>
		<Modal.Trigger>{children}</Modal.Trigger>
		<Modal.Content
			size="none"
			className={css({ boxShadow: 'none !important', border: 'none !important' })}>
			<Modal.Close />
			<Viewer file={file}>
				{({ page }) => <ViewerActions page={page} file={file} setFiles={setFiles} />}
			</Viewer>
		</Modal.Content>
	</Modal.Root>
);
