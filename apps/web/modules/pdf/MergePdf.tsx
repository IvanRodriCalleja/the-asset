'use client';

import { MainSection } from 'modules/shared/ui/MainSection';
import { FilePicker } from '@theasset/ui/file-picker';

import { SectionGradient } from 'modules/shared/ui/SectionGradient';
import { styled } from '@theasset/style-system/jsx';

import { FilePreview } from 'modules/shared/ui/FilePreview';
import { PdfMergeMetadata } from '@theasset/pdf';

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
	return (
		<UploadSection>
			<SectionGradient />

			<FilePicker<PdfMergeMetadata>
				metadata={{ rotation: 0 }}
				accept={{ 'application/pdf': [] }}
				buttonText="Upload PDF"
				preview={props => <FilePreview {...props} />}>
				<MainSection title="Merge PDF" description="dederi frioej f" />
			</FilePicker>
		</UploadSection>
	);
};
