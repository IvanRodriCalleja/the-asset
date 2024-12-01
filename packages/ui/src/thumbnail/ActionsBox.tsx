import { PropsWithChildren } from 'react';

import { crv, cva, splitResponsiveVariant } from '@theasset/style-system/css';

const actionsBox = cva({
	variants: {
		...crv('variant', {
			mobile: {
				display: 'flex',
				gap: 4,
				flexDirection: 'row',
				borderTop: '1px solid #d9d3f1'
			},
			desktop: {
				position: 'absolute',
				width: 'fit-content',
				display: 'flex',
				gap: '1px',
				borderTop: '1px solid #d9d3f1',
				right: 1,
				top: 1,
				background: 'neutral.400',
				zIndex: 2,
				borderRadius: 'md',
				boxShadow: 'xl',
				'& button:first-child': {
					borderLeftRadius: 'md !important'
				},
				'& button:last-child': {
					borderRightRadius: 'md !important'
				}
			}
		})
	}
});

export const ActionsBox = ({ children }: PropsWithChildren) => {
	const variants = splitResponsiveVariant('variant', { base: 'mobile', md: 'desktop' });

	return (
		<div className={actionsBox({ ...variants })} data-part="actions">
			{children}
		</div>
	);
};
