'use client';

import { UploadIcon } from '@radix-ui/react-icons';

import * as Dropzone from '@theasset/ui/drop-zone';
import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { Box, Stack, styled } from '@theasset/style-system/jsx';
import { HighlightColor, HighlightMaker } from '@theasset/ui/highlight-maker';

import { MainSection } from 'modules/shared/ui/MainSection';
import { SectionGradient } from 'modules/shared/ui/SectionGradient';

import { useSplitPdfStore } from '../store/SplitPdfStore';
import { SplitPdfFilePreview } from './splitPdf/SplitPdfFilePreview';
import { SplitPdfSidebar } from './splitPdf/SplitPdfSidebar';

const UploadSection = styled('section', {
	base: {
		position: 'relative',
		display: 'block',
		width: 'full',
		height: 'calc(100vh - 64px)',
		minHeight: 'calc(100vh - 64px)'
	}
});

export const SplitPdf = () => {
	const { splitPdf, shared } = useLocale();
	const { hasFiles, onChange } = useSplitPdfStore();

	return (
		<UploadSection>
			<SectionGradient />
			<Dropzone.Root accept={{ 'application/pdf': [] }} onChange={onChange}>
				<Dropzone.Area>
					{!hasFiles && (
						<Stack>
							<MainSection
								title={splitPdf.title}
								description={
									<>
										{splitPdf.description}{' '}
										<HighlightMaker color={HighlightColor.Purple}>
											{splitPdf.descriptionImportant}
										</HighlightMaker>
									</>
								}
							/>
							<Box padding={4} marginInline="auto" width="full" maxWidth="500px">
								<Dropzone.Button size="2xl">
									<UploadIcon />
									{shared.uploadPdf}
								</Dropzone.Button>
							</Box>
						</Stack>
					)}

					{hasFiles && (
						<Box display="flex" flexDirection="row" height="100%">
							<SplitPdfFilePreview />
							<SplitPdfSidebar />
						</Box>
					)}
				</Dropzone.Area>
			</Dropzone.Root>
		</UploadSection>
	);
};
