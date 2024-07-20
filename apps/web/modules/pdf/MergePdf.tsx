'use client';

import { MainSection } from 'modules/shared/ui/MainSection';
import { FilePicker, type TheAssetFileItem } from '@theasset/ui/file-picker';
import { Thumbnail } from '@theasset/pdf-react/thumbnail';

import { SectionGradient } from 'modules/shared/ui/SectionGradient';
import { styled } from '@theasset/style-system/jsx';

const UploadSection = styled('section', {
	base: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		width: 'full',
		height: 'calc(100vh - 64px)'
	}
});

type PdfMetadata = {};

//TODO: REPLACE BY LITERALS

export const MergePdf = () => {
	return (
		<UploadSection>
			<SectionGradient />

			<FilePicker<PdfMetadata>
				metadata={{}}
				accept={{ 'application/pdf': [] }}
				buttonText="Upload PDF"
				preview={FilePreview}>
				<MainSection title="Merge PDF" description="dederi frioej f" />
			</FilePicker>
		</UploadSection>
	);
};

type FilePreviewProps = {
	files: TheAssetFileItem<PdfMetadata>[];
};

const FilePreview = ({ files }: FilePreviewProps) => {
	return (
		<div>
			{files.map(({ id, buffer, name, kbSize }) => (
				<Thumbnail key={id} buffer={buffer} id={id} name={name} kbSize={kbSize} />
			))}
		</div>
	);
};
