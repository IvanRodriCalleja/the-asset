import { Dispatch, SetStateAction, useState, useTransition } from 'react';

import { useCache } from '@theasset/cache/useCache';
import { getDocument } from '@theasset/pdf/document';
import { getThumbnail } from '@theasset/pdf/thumbnail';
import { Box, Flex, Stack, styled } from '@theasset/style-system/jsx';
import { Button } from '@theasset/ui/button';
import { TheAssetFileItem } from '@theasset/ui/file-picker';
import { Number } from '@theasset/ui/form/number';
import { Text } from '@theasset/ui/text';
import { Thumbnail } from '@theasset/ui/thumbnail';

import { getRatio, getScale } from './thumbnail/shared/getScale';
import { Toolbar } from './viewer/Toolbar';

type ViewerProps = {
	file: TheAssetFileItem<{}>;
};

const ViewerImageContainer = styled('div', {
	base: {
		padding: '1rem'
	}
});

export const Viewer = ({ file }: ViewerProps) => {
	const [page, setPageA] = useState(1);
	const startTransition = useTransition()[1];

	const setPage = (page: number) => {
		startTransition(() => {
			setPageA(page);
		});
	};

	const pdf = useCache(`${file.id}-pdf`, () => getDocument({ buffer: file.buffer }));
	const { src, width, height } = useCache({ id: file.id, page }, () => getThumbnail({ pdf, page }));

	const ratio = getRatio(width, height, file.metadata.rotation);

	const screenHeight = window.innerHeight;
	const maxHeight = screenHeight - 56 - 3 * 16;

	const imageWidth = maxHeight / ratio;

	return (
		<>
			<Box
				position="absolute"
				top="calc(50% - 4px)"
				left="50%"
				transform="translate(-50%, calc(-50% - 2rem))"
				bottom="72px"
				height="fit-content"
				maxHeight="calc(100vh - 56px - 3rem)"
				style={{ width: `${imageWidth}px`, maxWidth: `${screenHeight}px` }}>
				<Thumbnail.Image
					src={src}
					alt={file.name}
					rotation={file.metadata.rotation}
					scale={getScale(width, height, file.metadata.rotation)}
				/>
			</Box>
			<Box position="absolute" bottom={{ base: 0, md: '1rem' }} left={0} right={0}>
				<Toolbar numPages={pdf.numPages} page={page} setPage={setPage} />
			</Box>
		</>
	);
};
