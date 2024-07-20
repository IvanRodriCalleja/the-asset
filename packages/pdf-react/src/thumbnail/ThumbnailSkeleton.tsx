import { Flex, Stack } from '@theasset/style-system/jsx';
import { Skeleton } from '../../../ui/src/Skeleton';

export const ThumbnailSkeleton = () => (
	<Stack padding={4} gap={1}>
		<Skeleton width="100%" paddingBottom="141.42857142857142%" />

		<Stack>
			<Skeleton width="90%" height="12px" marginTop={3} />
			<Flex justifyContent="center">
				<Skeleton width="40%" height="12px" borderRadius="6px" />
			</Flex>
		</Stack>
	</Stack>
);
