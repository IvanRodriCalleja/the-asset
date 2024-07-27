import { Box, Stack } from '@theasset/style-system/jsx';
import { Skeleton } from '@theasset/ui/skeleton';

export const ThumbnailSkeletonDesktop = () => (
	<Stack width={180} padding={4} gap={1} background={'rgb(186 163 255 / 20%)'} borderRadius="md">
		<Skeleton width="100%" paddingBottom="141.42857142857142%" />

		<Stack>
			<Skeleton width="90%" height="12px" marginTop={1} />
			<Box display="flex" justifyContent="center">
				<Skeleton width="60px" height="22px" marginTop={1} borderRadius="11px" />
			</Box>
		</Stack>
	</Stack>
);
