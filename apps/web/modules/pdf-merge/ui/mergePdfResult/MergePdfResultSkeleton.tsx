import { Stack } from '@theasset/style-system/jsx';
import { Skeleton } from '@theasset/ui/skeleton';

export const MergePdfResultSkeleton = () => (
	<Stack alignItems="center" width="100%" height="max-content" padding={16}>
		{[...new Array(10)].map((_, index) => (
			<Skeleton
				key={index}
				width="100%"
				maxWidth="580px"
				aspectRatio="1 / 1.4142857"
				boxShadow="lg"
			/>
		))}
	</Stack>
);
