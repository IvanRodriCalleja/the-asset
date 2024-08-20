import { useState, useTransition } from 'react';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { css } from '@theasset/style-system/css';
import { Box } from '@theasset/style-system/jsx';
import { Thumbnail } from '@theasset/ui/thumbnail';

import { usePdf } from './infra/usePdf';
import { useThumbnail } from './infra/useThumbnail';
import { Toolbar } from './viewer/Toolbar';

type ChildrenProps = {
	page: number;
};

type ViewerProps = {
	file: TheAssetFile;
	children: (props: ChildrenProps) => JSX.Element;
};

export const Viewer = ({ file, children }: ViewerProps) => {
	const [page, setPageA] = useState(1);
	const startTransition = useTransition()[1];

	const setPage = (page: number) => {
		startTransition(() => {
			setPageA(page);
		});
	};

	const pdf = usePdf(file);
	const { src, width, height } = useThumbnail({ file, page });

	const isVertical = width < height;
	const aspectRatio = width / height;

	return (
		<>
			<Box
				position="absolute"
				top="calc(50% - 4px)"
				left="50%"
				transform="translate(-50%, calc(-50% - 2rem))"
				bottom="72px"
				height={isVertical ? '100%' : 'fit-content'}
				maxHeight="calc(100vh - 56px - 3rem)"
				style={{ aspectRatio: `${aspectRatio} / 1` }}>
				<Thumbnail.Image
					src={src}
					alt={file.name}
					className={css(
						isVertical ? { width: 'auto', height: '100%' } : { width: '100%', height: 'auto' }
					)}
				/>
			</Box>
			<Box position="absolute" bottom={{ base: 0, md: '1rem' }} left={0} right={0}>
				<Toolbar numPages={pdf.numPages} page={page} setPage={setPage}>
					{children}
				</Toolbar>
			</Box>
		</>
	);
};
