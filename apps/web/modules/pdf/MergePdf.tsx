'use client';

import { useParams, useRouter } from 'next/navigation';

import { cacheStore } from '@theasset/cache/store';
import { PdfMergeMetadata } from '@theasset/pdf';
import { mergePdfs } from '@theasset/pdf/merge';
import { Box, Stack, styled } from '@theasset/style-system/jsx';
import { Button } from '@theasset/ui/button';
import { FilePicker, TheAssetFileItem } from '@theasset/ui/file-picker';
import { replaceParams } from '@theasset/ui/utils/replaceParams';

import { hashArrayBuffer } from 'modules/shared/infra/hashArrayBuffer';
import { MainSection } from 'modules/shared/ui/MainSection';
import { SectionGradient } from 'modules/shared/ui/SectionGradient';
import { mergePdfIdPath } from 'routes';

import { MergeResultFile } from './domain/MergeResultFile';
import { FilePreview } from './mergePdf/FilePreview';

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
		<>
			<UploadSection>
				<SectionGradient />

				<FilePicker<PdfMergeMetadata>
					metadata={{ rotation: 0 }}
					accept={{ 'application/pdf': [] }}
					buttonText="Upload PDF"
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
									background="#fcf3ff">
									<MergeButton files={props.files} />
								</Box>
							</>
						);
					}}>
					<MainSection title="Merge PDF" description="dederi frioej f" /> {/* TODO: Add literal */}
				</FilePicker>
			</UploadSection>
		</>
	);
};

type MergeButtonProps = {
	files: TheAssetFileItem<PdfMergeMetadata>[];
};

const MergeButton = ({ files }: MergeButtonProps) => {
	const { push } = useRouter();
	const params = useParams();

	const onMerge = async () => {
		const mergedPdf = await mergePdfs({
			files: files.map(file => ({ buffer: file.buffer, metadata: file.metadata }))
		});

		const fileHash = await hashArrayBuffer(mergedPdf);

		const resultFile: MergeResultFile = {
			buffer: mergedPdf,
			hash: fileHash,
			name: files[0]!.name
		};
		cacheStore.addResult(fileHash, resultFile);

		push(replaceParams(mergePdfIdPath, { id: fileHash, ...params }));
	};

	return (
		<Stack width="100%" maxWidth="500px">
			<Button size="2xl" onPress={onMerge}>
				Merge PDFs
			</Button>
		</Stack>
	); // TODO: Add literal
};
