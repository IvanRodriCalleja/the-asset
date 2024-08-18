import { useParams, useRouter } from 'next/navigation';

import Merge from 'assets/tools/merge.svg';

import { cacheStore } from '@theasset/cache/store';
import { TheAssetFile, hashArrayBuffer } from '@theasset/file/domain/the-asset-file';
import { useLocale } from '@theasset/internationalization/hooks';
import { mergePdfs } from '@theasset/pdf/merge';
import { Stack } from '@theasset/style-system/jsx';
import { Button } from '@theasset/ui/button';
import { replaceParams } from '@theasset/ui/utils/replaceParams';

import { mergePdfIdPath } from 'routes';

type MergeButtonProps = {
	files: TheAssetFile[];
};

export const MergeButton = ({ files }: MergeButtonProps) => {
	const { mergePdf } = useLocale();
	const { push } = useRouter();
	const params = useParams();

	const onMerge = async () => {
		const mergedPdf = await mergePdfs({ files });

		const id = new Date().getTime().toString();
		const hash = await hashArrayBuffer(mergedPdf);

		const resultFile: TheAssetFile = {
			id,
			hash,
			buffer: mergedPdf,
			name: files[0]!.name
		};
		cacheStore.addResult(id, resultFile);

		push(replaceParams(mergePdfIdPath, { id, ...params }));
	};

	return (
		<Stack width="100%" maxWidth={{ base: 'full', md: '500px' }}>
			<Button size="lg" onPress={onMerge}>
				<Merge /> {mergePdf.mergePdfAction}
			</Button>
		</Stack>
	);
};
