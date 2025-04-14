import { PropsWithChildren } from 'react';

import { styled } from '@theasset/style-system/jsx';

import { Text } from '../Text';

const SubTitleText = styled(Text, {
	base: {
		paddingInline: {
			base: 6,
			sm: 8,
			lg: 12
		}
	}
});

export const SubTitle = ({ children }: PropsWithChildren) => (
	<SubTitleText size="sm" color="textClear" family="mono">
		{children}
	</SubTitleText>
);
