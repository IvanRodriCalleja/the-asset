import { PdfMergeMetadata } from '@theasset/pdf';
import { styled } from '@theasset/style-system/jsx';
import { TheAssetFileItem } from '@theasset/ui/file-picker';
import { RotateCw, Trash2, ZoomIn } from 'lucide-react';

import { Dispatch, MouseEventHandler, SetStateAction } from 'react';

const ThumbnailActionsContainer = styled('div', {
	base: {
		position: 'absolute',
		display: 'flex',
		gap: '1px',
		right: 1,
		top: 1,
		background: 'neutral.400',
		zIndex: 2,
		overflow: 'hidden',
		borderRadius: 'md',
		boxShadow: 'xl'
	}
});

const ThumbnailActionButton = styled('button', {
	base: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '28px',
		height: '28px',
		bg: 'primary',
		color: 'primary.foreground',
		cursor: 'auto',

		_hover: {
			bga: 'primary/80'
		}
	}
});

type ThumbnailActionsProps = {
	index: number;
	setFiles: Dispatch<SetStateAction<TheAssetFileItem<PdfMergeMetadata>[]>>;
};

export const ThumbnailActions = ({ index, setFiles }: ThumbnailActionsProps) => {
	const onAbortDrag: MouseEventHandler<HTMLButtonElement> = event => event.stopPropagation();

	const onRemoveFile = (index: number) => {
		setFiles(currentFiles => {
			const newFiles = [...currentFiles];
			newFiles.splice(index, 1);
			return newFiles;
		});
	};

	const onRotateFile = (index: number, direction: 'left' | 'right') => {
		setFiles(currentFiles => {
			const newFiles = currentFiles.map((file, fileIndex) => {
				if (fileIndex === index) {
					const rotation =
						direction === 'left' ? file.metadata.rotation - 90 : file.metadata.rotation + 90;

					const newRotation = rotation >= 360 || rotation <= -360 ? 0 : rotation;

					return {
						...file,
						metadata: {
							...file.metadata,
							rotation: newRotation
						}
					};
				}

				return file;
			});

			return newFiles;
		});
	};

	return (
		<ThumbnailActionsContainer data-part="actions">
			<ThumbnailActionButton>
				<ZoomIn size={16} />
			</ThumbnailActionButton>
			<ThumbnailActionButton onMouseDown={onAbortDrag} onClick={() => onRotateFile(index, 'right')}>
				<RotateCw size={16} />
			</ThumbnailActionButton>
			<ThumbnailActionButton onMouseDown={onAbortDrag} onClick={() => onRemoveFile(index)}>
				<Trash2 size={16} />
			</ThumbnailActionButton>
		</ThumbnailActionsContainer>
	);
};
