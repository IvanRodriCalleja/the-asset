import { Dispatch, SetStateAction, Suspense } from 'react';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { Stack, styled } from '@theasset/style-system/jsx';
import { Button } from '@theasset/ui/button';
import { Popover, PopoverPanel, PopoverTrigger } from '@theasset/ui/popover';
import { Text } from '@theasset/ui/text';

import { EditFileName } from './configFileInfo/EditFileName';
import { FileMetadata } from './configFileInfo/FileMetadata';
import { FileMetadataSkeleton } from './configFileInfo/FileMetadataSkeleton';

const FileName = styled(Text, {
	base: {
		borderBottomStyle: 'dashed',
		borderBottomWidth: '1px',
		borderBottomColor: 'black',
		cursor: 'pointer'
	}
});

type ConfigFileInfoProps = {
	file: TheAssetFile;
	name: string;
	setName: Dispatch<SetStateAction<string>>;
};

export const ConfigFileInfo = ({ file, name, setName }: ConfigFileInfoProps) => {
	const extension = name.split('.').pop() || '';
	const notExtension = name.replace(`.${extension}`, '');

	return (
		<Stack gap={1}>
			<Stack direction="row" gap={0}>
				<PopoverTrigger>
					<Button variant="transparent" size="none">
						<FileName size="md" weight="bold">
							{notExtension}
						</FileName>
					</Button>

					<Popover placement="bottom left">
						<PopoverPanel>
							<Text size="sm" color="textClear">
								<EditFileName name={notExtension} extension={extension} setName={setName} />
							</Text>
						</PopoverPanel>
					</Popover>
				</PopoverTrigger>

				<Text size="md" color="textClear">
					.{extension}
				</Text>
			</Stack>
			<Suspense fallback={<FileMetadataSkeleton />}>
				<FileMetadata file={file} />
			</Suspense>
		</Stack>
	);
};
