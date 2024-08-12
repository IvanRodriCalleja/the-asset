import { useState } from 'react';

import { CrumpledPaperIcon, DownloadIcon, ReloadIcon } from '@radix-ui/react-icons';

import { Box, Stack } from '@theasset/style-system/jsx';
import { Separator } from '@theasset/ui/separator';

import { MergeResultFile } from '../domain/MergeResultFile';
import { ConfigFileInfo } from './mergePdfResultConfig/ConfigFileInfo';
import { ConfigTitle } from './mergePdfResultConfig/ConfigTitle';
import { ContinueTool, ContinueWith } from './mergePdfResultConfig/ContinueWith';
import { MergePdfResultConfigActions } from './mergePdfResultConfig/MergePdfResultConfigActions';

type MergePdfResultConfigProps = {
	file: MergeResultFile;
	isOpen: boolean;
	toggleOpen: () => void;
};

const tools: ContinueTool[] = [
	{
		label: 'Compress',
		icon: CrumpledPaperIcon,
		href: '/compress-pdf'
	}
]; // TODO: Add tools when available

export const MergePdfResultConfig = ({ file, isOpen, toggleOpen }: MergePdfResultConfigProps) => {
	const [fileName, setFileName] = useState(file.name);

	return (
		<Box display="flex" flexDirection="column" width="100%">
			<Stack
				flex={1}
				position="relative"
				overflow="auto"
				justifyContent="space-between"
				paddingInline={4}>
				<Stack gap={8} overflow="auto">
					<ConfigTitle />

					<ConfigFileInfo
						name={fileName}
						hash={file.hash}
						buffer={file.buffer}
						setName={setFileName}
					/>

					<ContinueWith tools={tools} />
				</Stack>
				<Box paddingBlock={4} position="sticky" bottom={1}>
					<Separator orientation="horizontal" />
				</Box>
			</Stack>

			<MergePdfResultConfigActions
				file={file}
				fileName={fileName}
				isOpen={isOpen}
				toggleOpen={toggleOpen}
			/>
		</Box>
	);
};
