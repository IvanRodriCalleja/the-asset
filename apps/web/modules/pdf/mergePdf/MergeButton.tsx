import { useTransition } from 'react';

import { useParams, useRouter } from 'next/navigation';

import Merge from 'assets/tools/merge.svg';

import { cacheStore } from '@theasset/cache/store';
import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { Loading } from '@theasset/icons/loading';
import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { compress } from '@theasset/pdf-tools';
import { Stack } from '@theasset/style-system/jsx';
import { Button } from '@theasset/ui/button';
import { replaceParams } from '@theasset/ui/utils/replaceParams';

import { downloadFile } from 'modules/shared/infra/downloadFile';
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

			const { buffer, hash } = await compress({
				buffer: decryptedFiles[0]?.buffer!
			});

			console.log({ buffer, hash });

			downloadFile(buffer, 'test-compress.pdf', 'application/pdf');

			/*const { buffer, hash } = await mergePdfs({
				buffers: decryptedFiles.map(file => file.buffer)
			});

			const id = new Date().getTime().toString();

			const resultFile: TheAssetFile = {
				id,
				hash,
				buffer,
				name: decryptedFiles[0]!.name,
				isEncrypted: false
			};
			cacheStore.addResult(hash, resultFile);

			push(replaceParams(mergePdfIdPath, { id: hash, ...params }));*/
		});
	};

	return (
		<Stack flex={1} maxWidth={{ base: 'full', md: '300px' }}>
			<Button size="lg" onPress={onMerge} isDisabled={isLoading || !isAnyFileDecrypted}>
				{isLoading ? <Loading /> : <Merge />} {mergePdf.mergePdfAction}
			</Button>
		</Stack>
	);
};
