import { useState } from 'react';

import { TheAssetFile, hashArrayBuffer } from '@theasset/file/domain/the-asset-file';
import { useLocale } from '@theasset/internationalization/hooks';
import { seedPdf } from '@theasset/pdf-react/infra/usePdf';
import { getDocument } from '@theasset/pdf/document';

import { toaster } from '../../Toast';

export const useFilePickerState = () => {
	const [files, setFiles] = useState<TheAssetFile[]>([]);
	const { mergePdf } = useLocale();

	const onChange = async (files: File[]) => {
		const fileItems = await Promise.allSettled(
			files.map(async (file, index) => {
				const id = `${Date.now() + index}`;
				const name = file.name;

				const buffer = await new Promise<Uint8Array>((resolve, reject) => {
					const fileReader = new FileReader();

					fileReader.onerror = reject;

					fileReader.onload = event => {
						const buffer = new Uint8Array(event.target!.result as ArrayBuffer);
						resolve(buffer);
					};

					fileReader.readAsArrayBuffer(file);
				});

				const pdf = await getDocument(new Uint8Array(buffer)); // NOTE: this is used to validate PDF content if wrong format, it throws an error

				const hash = await hashArrayBuffer(buffer);

				seedPdf(pdf, hash);

				const fileItem: TheAssetFile = {
					id,
					hash,
					buffer,
					name
				};

				return fileItem;
			})
		);

		const erroredFiles = fileItems.filter(item => item.status === 'rejected');
		if (erroredFiles.length > 0) {
			const erroredFileIndexes = fileItems.reduce((acc, item, index) => {
				if (item.status === 'rejected') {
					const name = files[index]!.name;
					return [...acc, name];
				}
				return acc;
			}, [] as string[]);

			toaster.add(
				{
					title: mergePdf.invalidPdfError.title,
					description: `${mergePdf.invalidPdfError.description} ${erroredFileIndexes.join(', ')}`,
					variant: 'destructive'
				},
				{ timeout: 3000 }
			);
		}
		const pdfs = fileItems.filter(item => item.status === 'fulfilled').map(item => item.value);

		setFiles(currentFiles => [...currentFiles, ...pdfs]);
	};

	return { files, onChange, setFiles };
};
