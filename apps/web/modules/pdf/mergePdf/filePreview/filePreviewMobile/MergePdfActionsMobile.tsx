import { Dispatch, SetStateAction } from 'react';

import { MagnifyingGlassIcon, ReloadIcon, TrashIcon } from '@radix-ui/react-icons';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { Direction } from '@theasset/pdf-tools/types';
import { ThumbnailMobileAction, ThumbnailMobileActions } from '@theasset/ui/thumbnail';

import { ViewerModalAction } from '../shared/ViewerModalAction';
import { useMergePdfActions } from '../shared/useMergePdfActions';

type MergePdfActionsMobileProp = {
	file: TheAssetFile;
	setFiles: Dispatch<SetStateAction<TheAssetFile[]>>;
};

export const MergePdfActionsMobile = (props: MergePdfActionsMobileProp) => <Actions {...props} />;

const Actions = ({ file, setFiles }: MergePdfActionsMobileProp) => {
	const { mergePdf } = useLocale();
	const { onRemoveFile, onRotateFile } = useMergePdfActions({ file, setFiles });

	return (
		<ThumbnailMobileActions>
			{!file.isEncrypted && (
				<ViewerModalAction file={file} setFiles={setFiles}>
					<ThumbnailMobileAction aria-label={mergePdf.thumbnailActions.magnify}>
						<MagnifyingGlassIcon />
					</ThumbnailMobileAction>
				</ViewerModalAction>
			)}

			{!file.isEncrypted && (
				<ThumbnailMobileAction
					onPress={() => onRotateFile(Direction.Left)}
					aria-label={mergePdf.thumbnailActions.rotatePdfLeft}>
					<ReloadIcon style={{ transform: 'scaleX(-1)' }} />
				</ThumbnailMobileAction>
			)}

			{!file.isEncrypted && (
				<ThumbnailMobileAction
					onPress={() => onRotateFile(Direction.Right)}
					aria-label={mergePdf.thumbnailActions.rotatePdfRight}>
					<ReloadIcon />
				</ThumbnailMobileAction>
			)}
			<ThumbnailMobileAction
				onPress={() => onRemoveFile()}
				aria-label={mergePdf.thumbnailActions.removePdf}>
				<TrashIcon />
			</ThumbnailMobileAction>
		</ThumbnailMobileActions>
	);
};
