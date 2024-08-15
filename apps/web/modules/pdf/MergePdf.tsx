'use client';

import { useLocale } from '@theasset/internationalization/hooks';
import { PdfMergeMetadata } from '@theasset/pdf';
import { Box, styled } from '@theasset/style-system/jsx';
import { FilePicker } from '@theasset/ui/file-picker';
import { HighlightMaker } from '@theasset/ui/highlight-maker';

import { MainSection } from 'modules/shared/ui/MainSection';
import { SectionGradient } from 'modules/shared/ui/SectionGradient';

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

//TODO: REPLACE BY LITERALS

export const MergePdf = () => {
	const { mergePdf } = useLocale();

	return (
		<>
			<UploadSection>
				<SectionGradient />

				<FilePicker<PdfMergeMetadata>
					metadata={{ rotation: 0 }}
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
									position="fixed"
									bottom={0}
									padding={4}
									borderTopStyle="solid"
									borderTopWidth="1px"
									borderTopColor="border"
									width="100%"
									background="white">
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
								<HighlightMaker color="rgba(166 122 244 / 40%)">
									{mergePdf.descriptionImportant}
								</HighlightMaker>
							</>
						}
					/>{' '}
				</FilePicker>
			</UploadSection>
		</>
	);
};
