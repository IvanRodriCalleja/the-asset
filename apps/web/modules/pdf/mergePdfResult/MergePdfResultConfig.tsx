import { useState } from 'react';

import { DownloadIcon, ReloadIcon } from '@radix-ui/react-icons';

import { useLocale } from '@theasset/internationalization/hooks';
import { Stack } from '@theasset/style-system/jsx';
import { Button } from '@theasset/ui/button';
import { Link } from '@theasset/ui/next/link';

import { downloadFile } from 'modules/shared/infra/downloadFile';
import { mergePdfPath } from 'routes';

import { MergeResultFile } from '../domain/MergeResultFile';
import { ConfigFileInfo } from './mergePdfResultConfig/ConfigFileInfo';
import { ConfigTitle } from './mergePdfResultConfig/ConfigTitle';
import { ContinueTool, ContinueWith } from './mergePdfResultConfig/ContinueWith';

type MergePdfResultConfigProps = {
	file: MergeResultFile;
};

const tools: ContinueTool[] = []; // TODO: Add tools when available

export const MergePdfResultConfig = ({ file }: MergePdfResultConfigProps) => {
	const { shared, mergePdfResult } = useLocale();
	const [fileName, setFileName] = useState(file.name);

	const onDownload = () => {
		downloadFile(file.buffer, fileName, 'application/pdf');
	};

	return (
		<Stack display="flex">
			<Stack flex={1} overflow="auto" paddingInline={4}>
				<Stack gap={8}>
					<ConfigTitle />

					<ConfigFileInfo
						name={fileName}
						hash={file.hash}
						buffer={file.buffer}
						setName={setFileName}
					/>

					<ContinueWith tools={tools} />
				</Stack>
			</Stack>

			<Stack paddingInline={4}>
				<Link href={mergePdfPath} size="lg" variant="outline">
					<ReloadIcon />
					{mergePdfResult.mergeNewPdf}
				</Link>
				<Button size="lg" onPress={onDownload}>
					<DownloadIcon />
					{shared.download}
				</Button>
			</Stack>
		</Stack>
	);
};
