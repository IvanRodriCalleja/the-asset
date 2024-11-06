'use no memo';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { decryptPdf } from '@theasset/pdf-tools';
import { PdfToolsError, PdfToolsErrorCodes } from '@theasset/pdf-tools/types';
import { RHFFieldPassword } from '@theasset/ui/fields/password';
import { Form } from '@theasset/ui/form';

type UnlockPdf = {
	password: string;
};

type UnlockPdfFormProps = {
	file: TheAssetFile;
	onUnlockPdf: (decryptedFile: { buffer: Uint8Array; hash: string }) => Promise<void>;
};

export const UnlockPdfForm = ({ file, onUnlockPdf }: UnlockPdfFormProps) => {
	const { shared } = useLocale();

	const unlockPdfSchema = z.object({
		password: z.string().min(1, shared.form.validations.required)
	});

	const form = useForm<UnlockPdf>({
		defaultValues: {
			password: ''
		},
		resolver: zodResolver(unlockPdfSchema),
		mode: 'onChange'
	});

	const onSubmit = async ({ password }: UnlockPdf) => {
		try {
			const decryptedFile = await decryptPdf({ buffer: file.buffer, password });

			return onUnlockPdf(decryptedFile);
		} catch (error) {
			const decryptError = error as PdfToolsError;

			if (decryptError.code === PdfToolsErrorCodes.WrongPassword) {
				return form.setError('password', {
					type: 'manual',
					message: shared.form.validations.invalidPassword
				});
			}

			form.setError('password', {
				type: 'manual',
				message: shared.form.validations.decryptionError
			});
		}
	};

	return (
		<Form form={form} id="unlock-pdf" aria-label="unlock-pdf" onSubmit={onSubmit}>
			<RHFFieldPassword<UnlockPdf> name="password" label={shared.form.fields.password} />
		</Form>
	);
};
