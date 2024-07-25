import { Suspense, Dispatch, SetStateAction } from 'react';

import { ThumbnailSkeleton } from './thumbnailDesktop/ThumbnailSkeleton';
import { ThumbnailContent } from './thumbnailDesktop/ThumbnailContent';
import { TheAssetFileItem } from '@theasset/ui/file-picker';

import { PdfMergeMetadata } from '@theasset/pdf';

type ThumbnailProps = {
	id: string;
	buffer: Uint8Array;
	name: string;
	index: number;
	metadata: PdfMergeMetadata;
	setFiles: Dispatch<SetStateAction<TheAssetFileItem<PdfMergeMetadata>[]>>;
};

// TODO: Add error boundary

export const ThumbnailDesktop = ({
	buffer,
	id,
	name,
	index,
	metadata,
	setFiles
}: ThumbnailProps) => {
	return (
		<Suspense fallback={<ThumbnailSkeleton />}>
			<ThumbnailContent
				index={index}
				id={id}
				buffer={buffer}
				name={name}
				metadata={metadata}
				setFiles={setFiles}
			/>
		</Suspense>
	);
};
