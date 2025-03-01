import { PropsWithChildren } from 'react';

import { styled } from '@theasset/style-system/jsx';

import { Text } from '../Text';

const Heading = styled('h3', {
	base: {
		paddingInline: {
			base: 6,
			sm: 8,
			lg: 12
		},
		paddingTop: {
			base: 6,
			sm: 8,
			lg: 12
		}
	}
});

export const Title = ({ children }: PropsWithChildren) => (
	<Heading>
		<Text size="2xl">
			<b>{children}</b>
		</Text>
	</Heading>
);
