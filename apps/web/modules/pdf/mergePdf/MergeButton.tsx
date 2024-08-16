import { useParams, useRouter } from 'next/navigation';

import Merge from 'assets/tools/merge.svg';

import { cacheStore } from '@theasset/cache/store';
import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { useLocale } from '@theasset/internationalization/hooks';
import { PdfMergeMetadata } from '@theasset/pdf';
import { mergePdfs } from '@theasset/pdf/merge';
import { Stack } from '@theasset/style-system/jsx';
import { Button } from '@theasset/ui/button';
import { replaceParams } from '@theasset/ui/utils/replaceParams';

import { hashArrayBuffer } from 'modules/shared/infra/hashArrayBuffer';
import { mergePdfIdPath } from 'routes';

import { MergeResultFile } from '../domain/MergeResultFile';

type MergeButtonProps = {
	files: TheAssetFile<PdfMergeMetadata>[];
};

export const MergeButton = ({ files }: MergeButtonProps) => {
	const { mergePdf } = useLocale();
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
		<Stack width="100%" maxWidth={{ base: 'full', md: '500px' }}>
			<Button size="lg" onPress={onMerge}>
				<Merge /> {mergePdf.mergePdfAction}
			</Button>
		</Stack>
	);
};
