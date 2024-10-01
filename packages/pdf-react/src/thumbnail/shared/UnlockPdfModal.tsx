import { LockOpen2Icon } from '@radix-ui/react-icons';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { useLocale } from '@theasset/internationalization/hooks';
import { Button } from '@theasset/ui/button';
import {
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalRoot,
	ModalTitle,
	ModalTrigger
} from '@theasset/ui/modal';

import { UnlockPdfForm } from './unlockPdfModal/UnlockPdfForm';

type UnlockPdfModalProps = {
	file: TheAssetFile;
	onUnlockPdf: (decryptedFile: ArrayBuffer) => Promise<void>;
};

export const UnlockPdfModal = ({ file, onUnlockPdf }: UnlockPdfModalProps) => {
	const { mergePdf, shared } = useLocale();

	return (
		<ModalRoot variant="alert">
			{({ close }) => (
				<>
					<ModalTrigger>
						<Button size="xs" variant="destructive">
							<LockOpen2Icon />
							{mergePdf.unlockPdf.startAction}
						</Button>
					</ModalTrigger>
					<ModalContent size="alert">
						<ModalHeader>
							<ModalTitle>{mergePdf.unlockPdf.title}</ModalTitle>
						</ModalHeader>
						<ModalBody>
							<UnlockPdfForm file={file} onUnlockPdf={onUnlockPdf} />
						</ModalBody>
						<ModalFooter>
							<Button variant="outline" type="button" onPress={close}>
								{shared.cancel}
							</Button>
							<Button form="unlock-pdf" type="submit">
								{mergePdf.unlockPdf.unlock}
							</Button>
						</ModalFooter>
					</ModalContent>
				</>
			)}
		</ModalRoot>
	);
};
