import { PropsWithChildren } from 'react';

import { crv, cva, splitResponsiveVariant } from '@theasset/style-system/css';

import { Button, ButtonProps } from '../Button';

const actionButton = cva({
	variants: {
		...crv('variant', {
			mobile: {
				display: 'flex',
				flex: 1
			},
			desktop: {
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: '28px',
				height: '28px',
				cursor: 'auto',
				borderRadius: '0',
				padding: 0,

				_hover: {
					bga: 'primary/60'
				},

				_focusVisible: {
					zIndex: 2
				},

				'& svg': {
					width: '16px',
					height: '16px'
				}
			}
		})
	}
});

export const Action = (props: PropsWithChildren<ButtonProps>) => {
	const variants = splitResponsiveVariant('variant', { base: 'mobile', md: 'desktop' });

	return (
		<Button
			className={actionButton({ ...variants })}
			variant={{ base: 'transparent', md: 'primary' }}
			{...props}
		/>
	);
};
