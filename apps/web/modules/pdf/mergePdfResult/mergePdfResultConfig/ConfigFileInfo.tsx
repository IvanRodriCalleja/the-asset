import { Dispatch, SetStateAction, Suspense } from 'react';

import { Stack, styled } from '@theasset/style-system/jsx';
import { Button } from '@theasset/ui/button';
import { Popover } from '@theasset/ui/popover';
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
	hash: string;
	buffer: ArrayBuffer;
	name: string;
	setName: Dispatch<SetStateAction<string>>;
};

export const ConfigFileInfo = ({ name, hash, buffer, setName }: ConfigFileInfoProps) => {
	const extension = name.split('.').pop() || '';
	const notExtension = name.replace(`.${extension}`, '');

	return (
		<Stack gap={1}>
			<Stack direction="row" gap={0}>
				<Popover.Root>
					<Popover.Trigger>
						<Button variant="transparent" size="none">
							<FileName size="md" weight="bold">
								{notExtension}
							</FileName>
						</Button>
					</Popover.Trigger>
					<Popover.Panel>
						<Text size="sm" color="textClear">
							<EditFileName name={notExtension} extension={extension} setName={setName} />
						</Text>
					</Popover.Panel>
				</Popover.Root>
				<Text size="md" color="textClear">
					.{extension}
				</Text>
			</Stack>
			<Suspense fallback={<FileMetadataSkeleton />}>
				<FileMetadata hash={hash} buffer={buffer} />
			</Suspense>
		</Stack>
	);
};
