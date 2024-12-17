import { MagnifyingGlassIcon, ReloadIcon, TrashIcon } from '@radix-ui/react-icons';

import * as Thumbnail from '@theasset/ui/thumbnail';
import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { FileState } from '@theasset/pdf-tools';
import { Direction } from '@theasset/pdf-tools/types';

import { ViewerModalAction } from './mergePdfThumbnailActions/ViewerModalAction';
import { useMergePdfActions } from './mergePdfThumbnailActions/useMergePdfActions';

type MergePdfActionsDesktopProp = {
	file: FileState;
};

export const MergePdfThumbnailActions = (props: MergePdfActionsDesktopProp) => (
	<Actions {...props} />
);

const Actions = ({ file }: MergePdfActionsDesktopProp) => {
	const { mergePdf } = useLocale();
	const { onRemoveFile, onRotateFile } = useMergePdfActions({ file });

	return (
		<>
			{!file.isEncrypted && (
				<ViewerModalAction file={file}>
					<Thumbnail.Action aria-label={mergePdf.thumbnailActions.magnify}>
						<MagnifyingGlassIcon />
					</Thumbnail.Action>
				</ViewerModalAction>
			)}

			{!file.isEncrypted && (
				<Thumbnail.Action
					onPress={() => onRotateFile(Direction.Left)}
					aria-label={mergePdf.thumbnailActions.rotatePdfLeft}>
					<ReloadIcon style={{ transform: 'scaleX(-1)' }} />
				</Thumbnail.Action>
			)}

			{!file.isEncrypted && (
				<Thumbnail.Action
					onPress={() => onRotateFile(Direction.Right)}
					aria-label={mergePdf.thumbnailActions.rotatePdfRight}>
					<ReloadIcon />
				</Thumbnail.Action>
			)}
			<Thumbnail.Action
				onPress={() => onRemoveFile()}
				aria-label={mergePdf.thumbnailActions.removePdf}>
				<TrashIcon />
			</Thumbnail.Action>
		</>
	);
};
