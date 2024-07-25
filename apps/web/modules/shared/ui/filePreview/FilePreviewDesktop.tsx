import { Sortable } from '@theasset/ui/sortable';
import { FilePreviewProps } from '../FilePreview';
import { Stack, styled } from '@theasset/style-system/jsx';

import { ThumbnailDesktop } from '@theasset/pdf-react/thumbnail';

const ThumbnailCard = styled('div', {
	base: {
		width: 180,
		borderRadius: 'md',
		transition: 'background-color 0.2s',

		_hover: {
			background: 'rgb(186 163 255 / 20%)'
		}
	}
});

export const FilePreviewDesktop = ({ files, setFiles }: FilePreviewProps) => (
	<Sortable.Root orientation="mixed" value={files} onValueChange={setFiles}>
		<Stack
			direction="row"
			marginInline="auto"
			flexWrap="wrap"
			justifyContent="center"
			maxWidth={'100%'}
			paddingBlock={16}
			paddingInline={16}>
			{files.map(({ id, buffer, name, metadata }, index) => (
				<Sortable.SortableItem key={id} value={id} asTrigger asChild>
					<ThumbnailCard>
						<ThumbnailDesktop
							index={index}
							buffer={buffer}
							id={id}
							name={name}
							metadata={metadata}
							setFiles={setFiles}
						/>
					</ThumbnailCard>
				</Sortable.SortableItem>
			))}
		</Stack>
	</Sortable.Root>
);
