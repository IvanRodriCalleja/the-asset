import { useCache } from '@theasset/cache/useCache';

import { Stack, styled } from '@theasset/style-system/jsx';
import { Tooltip } from '@theasset/ui/tooltip';
import { ThumbnailImage } from './thumbnailContent/ThumbnailImage';
import { getDocument } from '@theasset/pdf/document';

const FileInfo = styled('span', {
	base: {
		truncate: true,
		textStyle: 'xs'
	}
});

type ThumbnailContentProps = {
	id: string;
	buffer: Uint8Array;
	name: string;
	kbSize: string;
};

export const ThumbnailContent = ({ id, buffer, name, kbSize }: ThumbnailContentProps) => {
	const pdf = useCache(`${id}-pdf`, () => getDocument({ buffer }));

	return (
		<Tooltip.Root delayDuration={0}>
			<Tooltip.Trigger>
				<Stack padding={4} gap={1}>
					<ThumbnailImage pdf={pdf} id={id} name={name} />

					<Stack overflow="hidden">
						<FileInfo>{name}</FileInfo>
					</Stack>
				</Stack>
			</Tooltip.Trigger>
			<Tooltip.Content side="top">
				{pdf.numPages} Pages - {kbSize}KB
			</Tooltip.Content>
		</Tooltip.Root>
	);
};
