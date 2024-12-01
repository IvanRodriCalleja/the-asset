import { LockOpen2Icon } from '@radix-ui/react-icons';

import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { FileState, UpdatedFileState } from '@theasset/pdf-tools';
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
	file: FileState;
	isPending: boolean;
	onUnlockPdf: (decryptedFile: UpdatedFileState) => Promise<void>;
};

export const UnlockPdfModal = ({ file, isPending, onUnlockPdf }: UnlockPdfModalProps) => {
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
							<Button variant="outline" type="button" onPress={close} isDisabled={isPending}>
								{shared.cancel}
							</Button>
							<Button form="unlock-pdf" type="submit" isDisabled={isPending}>
								{mergePdf.unlockPdf.unlock}
							</Button>
						</ModalFooter>
					</ModalContent>
				</>
			)}
		</ModalRoot>
	);
};
