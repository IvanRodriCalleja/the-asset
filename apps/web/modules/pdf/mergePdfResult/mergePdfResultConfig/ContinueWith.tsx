import { FC } from 'react';

import { ChevronRightIcon } from '@radix-ui/react-icons';

import { useLocale } from '@theasset/internationalization/hooks';
import { Flex, Stack } from '@theasset/style-system/jsx';
import { Link } from '@theasset/ui/next/link';
import { Text } from '@theasset/ui/text';

type ContinueWithProps = {
	tools: ContinueTool[];
};

export type ContinueTool = {
	label: string;
	icon: FC;
	href: string;
};

export const ContinueWith = ({ tools }: ContinueWithProps) => {
	const { shared } = useLocale();

	return (
		<Stack>
			<h3>
				<b>
					<Text size="md">{shared.continueWith}</Text>
				</b>
			</h3>

			<Stack gap={2}>
				{tools.map(({ icon: Icon, label, href }) => (
					<Flex key={href} direction="column">
						<Link variant="outline" href={href}>
							<Stack
								width="100%"
								direction="row"
								justifyContent="space-between"
								alignItems="center">
								<Stack direction="row" alignItems="center">
									<Icon /> {label}
								</Stack>
								<ChevronRightIcon />
							</Stack>
						</Link>
					</Flex>
				))}
			</Stack>
		</Stack>
	);
};
