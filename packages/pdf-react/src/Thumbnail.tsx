import { Suspense } from 'react';
import { Card } from '@theasset/ui/card';

import { ThumbnailSkeleton } from './thumbnail/ThumbnailSkeleton';
import { ThumbnailContent } from './thumbnail/ThumbnailContent';

type ThumbnailProps = {
	id: string;
	buffer: Uint8Array;
	name: string;
	kbSize: string;
};

// TODO: Add error boundary

export const Thumbnail = ({ buffer, id, name, kbSize }: ThumbnailProps) => {
	return (
		<Card.Root width={160}>
			<Suspense fallback={<ThumbnailSkeleton />}>
				<ThumbnailContent id={id} buffer={buffer} name={name} kbSize={kbSize} />
			</Suspense>
		</Card.Root>
	);
};
