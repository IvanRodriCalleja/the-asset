'use client';

import { use } from 'react';

import { redirect } from 'next/navigation';

import { cacheStore } from '@theasset/cache/store';
import { FileState } from '@theasset/pdf-tools';
import { replaceParams } from '@theasset/ui/utils/replaceParams';

import { splitPdfPath } from 'routes';

type SplitResultProps = {
	params: Promise<{
		id: string;
	}>;
};

const SplitPdfResultPage = ({ params }: SplitResultProps) => {
	const parameters = use(params);
	const files = cacheStore.getResult<FileState[]>(parameters.id);

	if (!files) {
		redirect(replaceParams(splitPdfPath, parameters));
	}

	return <div>{JSON.stringify(files, null, 2)}</div>;
};

export default SplitPdfResultPage;
