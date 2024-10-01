import { ChevronDownIcon, DownloadIcon, ReloadIcon } from '@radix-ui/react-icons';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { Stack, styled } from '@theasset/style-system/jsx';
import { Button } from '@theasset/ui/button';
import { TheLink } from '@theasset/ui/the-link';

import { downloadFile } from 'modules/shared/infra/downloadFile';
import { mergePdfPath } from 'routes';

type MergePdfResultConfigActionsProps = {
	file: TheAssetFile;
	fileName: string;
	isOpen: boolean;
	toggleOpen: () => void;
};

const DownloadButton = styled(Button, {
	base: {
		flex: '1',
		borderRightRadius: {
			base: '0 !important',
			md: 'md'
		}
	}
});

const OpenPanelButton = styled(Button, {
	base: {
		display: {
			base: 'flex',
			md: 'none'
		},
		borderLeftRadius: '0 !important'
	}
});

export const MergePdfResultConfigActions = ({
	file,
	fileName,
	isOpen,
	toggleOpen
}: MergePdfResultConfigActionsProps) => {
	const { shared, mergePdfResult } = useLocale();

	const onDownload = () => {
		downloadFile(file.buffer, fileName, 'application/pdf');
	};

	return (
		<Stack paddingInline={4}>
			<TheLink href={mergePdfPath} size="lg" variant="outline">
				<ReloadIcon />
				{mergePdfResult.mergeNewPdf}
			</TheLink>
			<Stack direction="row" gap="1px">
				<DownloadButton size="lg" onPress={onDownload}>
					<DownloadIcon />
					{shared.download}
				</DownloadButton>
				<OpenPanelButton size="icon-lg" onPress={toggleOpen}>
					<ChevronDownIcon
						style={{ rotate: isOpen ? '0deg' : '180deg', transition: 'rotate 0.3s ease-out' }}
					/>
				</OpenPanelButton>
			</Stack>
		</Stack>
	);
};
