import { DragHandleDots2Icon } from '@radix-ui/react-icons';

import { Box, Flex, Stack } from '@theasset/style-system/jsx';
import { Button } from '@theasset/ui/button';
import { Skeleton } from '@theasset/ui/skeleton';
import { Thumbnail } from '@theasset/ui/thumbnail';

export const ThumbnailSkeletonMobile = () => (
	<Thumbnail.Root width="100%" paddingBottom={0}>
		<Stack direction="row">
			<Box width="48px">
				<Thumbnail.ImageContent>
					<Skeleton width="100%" height="100%" />
				</Thumbnail.ImageContent>
			</Box>
			<Stack flex={1} justifyContent="center">
				<Skeleton width="90%" height="12px" marginTop={1} />
				<Box display="flex">
					<Skeleton width="60px" height="22px" marginTop={1} borderRadius="11px" />
				</Box>
			</Stack>

			<Flex alignItems="center">
				<Button variant="transparent" size="icon" isDisabled>
					<DragHandleDots2Icon />
				</Button>
			</Flex>
		</Stack>

		<Thumbnail.MobileActions>
			<Box display="flex" flex={2} height="40px" alignItems="center" justifyContent="center">
				<Skeleton height="32px" width="calc(100% - 32px)" />
			</Box>
			<Box display="flex" flex={2} height="40px" alignItems="center" justifyContent="center">
				<Skeleton height="32px" width="calc(100% - 32px)" />
			</Box>
			<Box display="flex" flex={2} height="40px" alignItems="center" justifyContent="center">
				<Skeleton height="32px" width="calc(100% - 32px)" />
			</Box>
		</Thumbnail.MobileActions>
	</Thumbnail.Root>
);
