import { useState } from 'react';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';

export const useFilePickerState = () => {
	const [files, setFiles] = useState<TheAssetFile[]>([]);

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

				const fileItem: TheAssetFile = {
					id,
					buffer,
					name
				};

				return fileItem;
			})
		);

		setFiles(currentFiles => [...currentFiles, ...fileItems]);
	};

	return { files, onChange, setFiles };
};
