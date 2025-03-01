import { useState } from 'react';

import { CheckCircledIcon, CrumpledPaperIcon } from '@radix-ui/react-icons';

import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { FileState } from '@theasset/pdf-tools';
import { HStack, Stack, styled } from '@theasset/style-system/jsx';
import { Sidebar } from '@theasset/ui/sidebar';

import { ConfigFileInfo } from './mergePdfResultSidebar/ConfigFileInfo';
import { ContinueTool, ContinueWith } from './mergePdfResultSidebar/ContinueWith';
import { MergePdfResultConfigActions } from './mergePdfResultSidebar/MergePdfResultConfigActions';

const Checked = styled(CheckCircledIcon, {
	base: {
		width: '24px',
		height: '24px'
	}
});

const tools: ContinueTool[] = [
	{
		label: 'Compress',
		icon: CrumpledPaperIcon,
		href: '/compress-pdf'
	}
]; // TODO: Add tools when available

type MergePdfResultSidebarProps = {
	file: FileState;
};
// TODO: Tools
export const MergePdfResultSidebar = ({ file }: MergePdfResultSidebarProps) => {
	const { mergePdfResult } = useLocale();
	const [fileName, setFileName] = useState(file.name);

	return (
		<Sidebar.Root>
			<Sidebar.Body gap={8}>
				<Stack gap={1}>
					<Sidebar.Title>
						<HStack gap={3}>
							<Checked />
							{mergePdfResult.successfullyMergedTitle}
						</HStack>
					</Sidebar.Title>

					<Sidebar.SubTitle>{mergePdfResult.successfullyMergedDescription}</Sidebar.SubTitle>
				</Stack>

				<Sidebar.Content variant="narrow" gap={8}>
					<ConfigFileInfo name={fileName} file={file} setName={setFileName} />

					<ContinueWith tools={tools} />
				</Sidebar.Content>
			</Sidebar.Body>
			<Sidebar.Separator />
			<Sidebar.Footer>
				<MergePdfResultConfigActions file={file} fileName={fileName} />
			</Sidebar.Footer>
		</Sidebar.Root>
	);
};
