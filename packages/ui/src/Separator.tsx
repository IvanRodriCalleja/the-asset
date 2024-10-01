import { SeparatorProps, useSeparator } from '@react-aria/separator';

import { styled } from '@theasset/style-system/jsx';

const SeparatorComponent = styled('div', {
	base: {
		flexShrink: 0,
		bg: 'border'
	},
	variants: {
		orientation: {
			horizontal: {
				h: '1px',
				w: 'full'
			},
			vertical: {
				h: 'full',
				w: '1px'
			}
		}
	},
	defaultVariants: {
		orientation: 'horizontal'
	}
});

export const Separator = (props: SeparatorProps) => {
	const { separatorProps } = useSeparator(props);

	return <SeparatorComponent {...separatorProps} />;
};
