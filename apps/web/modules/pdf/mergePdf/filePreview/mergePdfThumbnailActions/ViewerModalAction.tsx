import { ReactElement } from 'react';

import { ModalViewer } from '@theasset/pdf-react/ui/modal-viewer';
import { FileState } from '@theasset/pdf-tools';
import { css } from '@theasset/style-system/css';
import { ModalClose, ModalContent, ModalRoot, ModalTrigger } from '@theasset/ui/modal';

import { ViewerActions } from './viewerModalAction/ViewerActions';

type ViewerModalActionProps = {
	children: ReactElement;
	file: FileState;
};

export const ViewerModalAction = ({ children, file }: ViewerModalActionProps) => (
	<ModalRoot>
		<ModalTrigger>{children}</ModalTrigger>
		<ModalContent
			size="none"
			className={css({ boxShadow: 'none !important', border: 'none !important' })}>
			<ModalClose />
			<ModalViewer file={file}>
				{({ page, totalPages, setPage }) => (
					<ViewerActions page={page} file={file} totalPages={totalPages} setPage={setPage} />
				)}
			</ModalViewer>
		</ModalContent>
	</ModalRoot>
);
