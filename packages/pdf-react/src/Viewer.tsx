import { useState, useTransition } from 'react';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { usePdf } from '@theasset/pdf-react/usePdf';
import { Box } from '@theasset/style-system/jsx';
import { Thumbnail } from '@theasset/ui/thumbnail';

import { useThumbnail } from './infra/useThumbnail';
import { Toolbar } from './viewer/Toolbar';

type ViewerProps = {
	file: TheAssetFile;
};

export const Viewer = ({ file }: ViewerProps) => {
	const [page, setPageA] = useState(1);
	const startTransition = useTransition()[1];

	const setPage = (page: number) => {
		startTransition(() => {
			setPageA(page);
		});
	};

	const pdf = usePdf(file);
	const src = useThumbnail({ file, page });

	return (
		<>
			<Box
				position="absolute"
				top="calc(50% - 4px)"
				left="50%"
				transform="translate(-50%, calc(-50% - 2rem))"
				bottom="72px"
				height="fit-content"
				maxHeight="calc(100vh - 56px - 3rem)">
				<Thumbnail.Image src={src} alt={file.name} />
			</Box>
			<Box position="absolute" bottom={{ base: 0, md: '1rem' }} left={0} right={0}>
				<Toolbar numPages={pdf.numPages} page={page} setPage={setPage} />
			</Box>
		</>
	);
};
