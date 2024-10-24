'use client';

import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { Box, styled } from '@theasset/style-system/jsx';
import { FilePicker } from '@theasset/ui/file-picker';
import { HighlightColor, HighlightMaker } from '@theasset/ui/highlight-maker';

import { MainSection } from 'modules/shared/ui/MainSection';
import { SectionGradient } from 'modules/shared/ui/SectionGradient';

import { AddMorePdfsButton } from './mergePdf/AddMorePdfsButton';
import { FilePreview } from './mergePdf/FilePreview';
import { MergeButton } from './mergePdf/MergeButton';

const UploadSection = styled('section', {
	base: {
		position: 'relative',
		display: 'block',
		width: 'full',
		height: 'full',
		minHeight: 'calc(100vh - 64px)'
	}
});

// TODO: Manage mal formed pdfs
// TODO: Rethink file upload approach

export const MergePdf = () => {
	const { mergePdf } = useLocale();

	return (
		<>
			<UploadSection>
				<SectionGradient />

				<FilePicker
					accept={{ 'application/pdf': [] }}
					buttonText={mergePdf.uploadPdf}
					preview={props => {
						return (
							<>
								<Box marginBottom="89px">
									<FilePreview {...props} />
								</Box>
								<Box
									display="flex"
									justifyContent="center"
									flexDirection={{ base: 'column', md: 'row' }}
									gap={4}
									position="fixed"
									bottom={0}
									padding={4}
									borderTopStyle="solid"
									borderTopWidth="1px"
									borderTopColor="border"
									width="100%"
									background="white">
									<AddMorePdfsButton open={props.open} />
									<MergeButton files={props.files} />
								</Box>
							</>
						);
					}}>
					<MainSection
						title={mergePdf.title}
						description={
							<>
								{mergePdf.description}{' '}
								<HighlightMaker color={HighlightColor.Purple}>
									{mergePdf.descriptionImportant}
								</HighlightMaker>
							</>
						}
					/>
				</FilePicker>
			</UploadSection>
		</>
	);
};
