import { Dispatch, SetStateAction, Suspense } from 'react';

import { FileState } from '@theasset/pdf-tools';
import { Stack } from '@theasset/style-system/jsx';

import { EditFileNameInput } from 'modules/shared/ui/EditFileNameInput';

import { FileMetadata } from './configFileInfo/FileMetadata';
import { FileMetadataSkeleton } from './configFileInfo/FileMetadataSkeleton';

type ConfigFileInfoProps = {
	file: FileState;
	name: string;
	setName: Dispatch<SetStateAction<string>>;
};

export const ConfigFileInfo = ({ file, name, setName }: ConfigFileInfoProps) => (
	<Stack gap={1}>
		<EditFileNameInput name={name} setName={setName} />
		<Suspense fallback={<FileMetadataSkeleton />}>
			<FileMetadata file={file} />
		</Suspense>
	</Stack>
);
