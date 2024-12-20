'use client';

import { UploadIcon } from '@radix-ui/react-icons';

import * as Dropzone from '@theasset/ui/drop-zone';
import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { Box, Stack, styled } from '@theasset/style-system/jsx';
import { HighlightColor, HighlightMaker } from '@theasset/ui/highlight-maker';

import { MainSection } from 'modules/shared/ui/MainSection';
import { SectionGradient } from 'modules/shared/ui/SectionGradient';

import { AddMorePdfsButton } from './mergePdf/AddMorePdfsButton';
import { FilePreview } from './mergePdf/FilePreview';
import { MergeButton } from './mergePdf/MergeButton';
import { useMergePdfState } from './mergePdf/MergePdfStateContext';

const UploadSection = styled('section', {
	base: {
		position: 'relative',
		display: 'block',
		width: 'full',
		height: 'full',
		minHeight: 'calc(100vh - 64px)'
	}
});

export const MergePdf = () => {
	const { mergePdf } = useLocale();
	const { files, hasFiles, onChange } = useMergePdfState();

	return (
		<>
			<UploadSection>
				<SectionGradient />
				<Dropzone.Root accept={{ 'application/pdf': [] }} onChange={onChange}>
					<Dropzone.Area>
						<Stack>
							{!hasFiles && (
								<>
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
									<Box padding={4} marginInline="auto" width="full" maxWidth="500px">
										<Dropzone.Button size="2xl">
											<UploadIcon />
											{mergePdf.uploadPdf}
										</Dropzone.Button>
									</Box>
								</>
							)}
							{hasFiles && (
								<>
									<Box marginBottom="89px">
										<FilePreview />
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
										<AddMorePdfsButton open={open} />
										<MergeButton files={files} />
									</Box>
								</>
							)}
						</Stack>
					</Dropzone.Area>
				</Dropzone.Root>
			</UploadSection>
		</>
	);
};
