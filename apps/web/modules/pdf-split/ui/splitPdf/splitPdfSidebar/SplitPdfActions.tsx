import { useTransition } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { cacheStore } from '@theasset/cache/store';
import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { useThePdfTools } from '@theasset/pdf-react/context/the-pdf-actions-context';
import { FileState, SplitPdfRange } from '@theasset/pdf-tools/types';
import { Sidebar } from '@theasset/ui/sidebar';
import { replaceParams } from '@theasset/ui/utils/replaceParams';

import { AddMorePdfsButton } from 'modules/pdf-merge/ui/mergePdf/AddMorePdfsButton';
import { useSplitPdfStore } from 'modules/pdf-split/store/SplitPdfStore';
import { splitPdfResultPath } from 'routes';

export const SplitPdfActions = () => {
	const { splitPdf } = useLocale();
	const { pdfTools } = useThePdfTools();
	const store = useSplitPdfStore();
	const { push } = useRouter();
	const params = useParams();
	const [isSplitting, startTransition] = useTransition();

	const onSplit = () => {
		startTransition(async () => {
			const ranges: SplitPdfRange[] = store.ranges.map(range => {
				const start = range.from;
				const end = range.to;

				const pages = Array.from({ length: end - start + 1 }, (_, i) => store.files[start + i]!.id);

				return { pages };
			});

			const result = await pdfTools.splitPdf(ranges);
			const id = new Date().getTime().toString();

			const resultFile: FileState[] = result.map(({ id, hash }, index) => ({
				id,
				hash,
				name: store.ranges[index]!.name,
				isEncrypted: false
			}));

			cacheStore.addResult(id, resultFile);
			push(replaceParams(splitPdfResultPath, { id, ...params }));
		});
	};

	return (
		<>
			<AddMorePdfsButton isDisabled={isSplitting} />
			<Sidebar.ActionWithConfigButton onPress={onSplit} isDisabled={isSplitting}>
				{splitPdf.sidebar.actions.split}
			</Sidebar.ActionWithConfigButton>
		</>
	);
};
