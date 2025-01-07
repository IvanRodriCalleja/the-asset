'use client';

import { use } from 'react';

import { redirect } from 'next/navigation';

import { cacheStore } from '@theasset/cache/store';
import { FileState } from '@theasset/pdf-tools';
import { replaceParams } from '@theasset/ui/utils/replaceParams';

import { MergePdfResult } from 'modules/pdf-merge/ui/MergePdfResult';
import { mergePdfPath } from 'routes';

type MergeResultProps = {
	params: Promise<{
		id: string;
	}>;
};

const MergePdfResultPage = ({ params }: MergeResultProps) => {
	const parameters = use(params);
	const file = cacheStore.getResult<FileState>(parameters.id);

	if (!file) {
		redirect(replaceParams(mergePdfPath, parameters));
	}

	return <MergePdfResult file={file} />;
};

export default MergePdfResultPage;
