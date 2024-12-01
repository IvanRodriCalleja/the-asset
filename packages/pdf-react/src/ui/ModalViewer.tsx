import { useState, useTransition } from 'react';

import { FileState } from '@theasset/pdf-tools';
import { css } from '@theasset/style-system/css';
import { Box, styled } from '@theasset/style-system/jsx';

import { usePages } from '../hooks/usePages';
import { useThumbnail } from '../hooks/useThumbnail';
import { Toolbar } from './viewer/Toolbar';

type ChildrenProps = {
	page: number;
	totalPages: number;
	setPage: (page: number) => void;
};

type ModalViewerProps = {
	file: FileState;
	children: (props: ChildrenProps) => JSX.Element;
};

const PdfImage = styled('img', {
	base: {
		position: 'relative',
		width: '100%'
	}
});

export const ModalViewer = ({ file, children }: ModalViewerProps) => {
	const [page, setPageA] = useState(1);
	const startTransition = useTransition()[1];

	const setPage = (page: number) => {
		startTransition(() => {
			setPageA(page);
		});
	};

	const totalPages = usePages(file);
	const { src, width, height, rotation } = useThumbnail({ file, page: page - 1 });

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
				<PdfImage
					src={src}
					alt={`${file.name} - ${page}`}
					data-rotation={rotation}
					className={css(
						isVertical ? { width: 'auto', height: '100%' } : { width: '100%', height: 'auto' }
					)}
				/>
			</Box>
			<Box position="absolute" bottom={{ base: 0, md: '1rem' }} left={0} right={0}>
				<Toolbar totalPages={totalPages} page={page} setPage={setPage}>
					{children}
				</Toolbar>
			</Box>
		</>
	);
};
