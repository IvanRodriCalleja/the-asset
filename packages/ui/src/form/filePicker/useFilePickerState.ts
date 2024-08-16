import { useState } from 'react';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';

import { FileMetadata } from '../FilePicker';

export const useFilePickerState = <T extends FileMetadata>(defaultMetadata: T) => {
	const [files, setFiles] = useState<TheAssetFile<T>[]>([]);

	const onChange = async (files: File[]) => {
		const fileItems = await Promise.all(
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

				const kbSize = (file.size / 1024).toFixed(2);

				const fileItem: TheAssetFile<T> = {
					id,
					buffer,
					name,
					metadata: defaultMetadata,
					kbSize
				};

				return fileItem;
			})
		);

		setFiles(currentFiles => [...currentFiles, ...fileItems]);
	};

	return { files, onChange, setFiles };
};
