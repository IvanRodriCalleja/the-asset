import { useTransition } from 'react';

import { useParams, useRouter } from 'next/navigation';

import Merge from 'assets/tools/merge.svg';

import { cacheStore } from '@theasset/cache/store';
import { Loading } from '@theasset/icons/loading';
import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { useThePdfTools } from '@theasset/pdf-react/context/the-pdf-actions-context';
import { FileState } from '@theasset/pdf-tools';
import { Stack } from '@theasset/style-system/jsx';
import { Button } from '@theasset/ui/button';
import { replaceParams } from '@theasset/ui/utils/replaceParams';

import { mergePdfIdPath } from 'routes';

type MergeButtonProps = {
	files: FileState[];
};

export const MergeButton = ({ files }: MergeButtonProps) => {
	const [isLoading, startTransition] = useTransition();
	const { mergePdf } = useLocale();
	const { push } = useRouter();
	const params = useParams();
	const { pdfTools } = useThePdfTools();

	const isAnyFileDecrypted = files.some(file => !file.isEncrypted);

	const onMerge = async () => {
		await startTransition(async () => {
			const decryptedFiles = files.filter(file => !file.isEncrypted);
			const { hash, id } = await pdfTools.mergePdfs(decryptedFiles.map(file => file.id));

			const resultFile: FileState = {
				id,
				hash,
				name: decryptedFiles[0]!.name,
				isEncrypted: false
			};
			cacheStore.addResult(hash, resultFile);

			push(replaceParams(mergePdfIdPath, { id: hash, ...params }));
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
