'use client';

import { redirect } from 'next/navigation';

import { cacheStore } from '@theasset/cache/store';
import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { replaceParams } from '@theasset/ui/utils/replaceParams';

import { MergePdfResult } from 'modules/pdf/MergePdfResult';
import { mergePdfPath } from 'routes';

type MergeResultProps = {
	params: {
		id: string;
	};
};

const MergePdfResultPage = ({ params }: MergeResultProps) => {
	const resultFile = cacheStore.getResult<TheAssetFile>(params.id);

	if (!resultFile) {
		redirect(replaceParams(mergePdfPath, params));
	}

	return <MergePdfResult file={resultFile} />;
};

export default MergePdfResultPage;
