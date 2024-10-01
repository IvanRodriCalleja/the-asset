import { useTransition } from 'react';

import { useParams, useRouter } from 'next/navigation';

import Merge from 'assets/tools/merge.svg';

import { cacheStore } from '@theasset/cache/store';
import { TheAssetFile, hashArrayBuffer } from '@theasset/file/domain/the-asset-file';
import { Loading } from '@theasset/icons/loading';
import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { mergePdfs } from '@theasset/pdf-tools';
import { Stack } from '@theasset/style-system/jsx';
import { Button } from '@theasset/ui/button';
import { replaceParams } from '@theasset/ui/utils/replaceParams';

import { mergePdfIdPath } from 'routes';

type MergeButtonProps = {
	files: TheAssetFile[];
};

export const MergeButton = ({ files }: MergeButtonProps) => {
	const [isLoading, startTransition] = useTransition();
	const { mergePdf } = useLocale();
	const { push } = useRouter();
	const params = useParams();

	const isAnyFileDecrypted = files.some(file => !file.isEncrypted);

	const onMerge = () => {
		startTransition(async () => {
			const decryptedFiles = files.filter(file => !file.isEncrypted);
			const mergedPdf = await mergePdfs({ buffers: decryptedFiles.map(file => file.buffer) });

			const id = new Date().getTime().toString();
			const hash = await hashArrayBuffer(mergedPdf);

			const resultFile: TheAssetFile = {
				id,
				hash,
				buffer: mergedPdf,
				name: decryptedFiles[0]!.name,
				isEncrypted: false
			};
			cacheStore.addResult(id, resultFile);

			push(replaceParams(mergePdfIdPath, { id, ...params }));
		});
	};

	return (
		<Stack width="100%" maxWidth={{ base: 'full', md: '500px' }}>
			<Button size="lg" onPress={onMerge} isDisabled={isLoading || !isAnyFileDecrypted}>
				{isLoading ? <Loading /> : <Merge />} {mergePdf.mergePdfAction}
			</Button>
		</Stack>
	);
};
