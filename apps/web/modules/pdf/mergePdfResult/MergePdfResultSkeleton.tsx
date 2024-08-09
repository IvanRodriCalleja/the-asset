import { Stack } from '@theasset/style-system/jsx';
import { Skeleton } from '@theasset/ui/skeleton';

export const MergePdfResultSkeleton = () => (
	<Stack width="100%" maxWidth="580px" height="max-content">
		{[...new Array(10)].map((_, index) => (
			<Skeleton key={index} width="100%" aspectRatio="1 / 1.4142857" boxShadow="lg" />
		))}
	</Stack>
);
