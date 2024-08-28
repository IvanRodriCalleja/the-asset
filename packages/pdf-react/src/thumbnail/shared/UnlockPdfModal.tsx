import { LockOpen2Icon } from '@radix-ui/react-icons';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { useLocale } from '@theasset/internationalization/hooks';
import { Button } from '@theasset/ui/button';
import { Modal } from '@theasset/ui/modal';

import { UnlockPdfForm } from './unlockPdfModal/UnlockPdfForm';

type UnlockPdfModalProps = {
	file: TheAssetFile;
	onUnlockPdf: (decryptedFile: ArrayBuffer) => Promise<void>;
};

export const UnlockPdfModal = ({ file, onUnlockPdf }: UnlockPdfModalProps) => {
	const { mergePdf, shared } = useLocale();

	return (
		<Modal.Root variant="alert">
			{({ close }) => (
				<>
					<Modal.Trigger>
						<Button size="xs" variant="destructive">
							<LockOpen2Icon />
							{mergePdf.unlockPdf.startAction}
						</Button>
					</Modal.Trigger>
					<Modal.Content size="alert">
						<Modal.Header>
							<Modal.Title>{mergePdf.unlockPdf.title}</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<UnlockPdfForm file={file} onUnlockPdf={onUnlockPdf} />
						</Modal.Body>
						<Modal.Footer>
							<Button variant="outline" type="button" onPress={close}>
								{shared.cancel}
							</Button>
							<Button form="unlock-pdf" type="submit">
								{mergePdf.unlockPdf.unlock}
							</Button>
						</Modal.Footer>
					</Modal.Content>
				</>
			)}
		</Modal.Root>
	);
};
