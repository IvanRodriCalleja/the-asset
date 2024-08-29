import { PropsWithChildren } from 'react';

import { styled } from '@theasset/style-system/jsx';

// @ts-expect-error
export const HighlightMakerComponent = styled('mark', {
	base: {
		'--lightness': '80%',
		background: 'transparent',

		'--highlighted': '0',
		animation: 'highlight steps(1) both',
		animationTimeline: 'view()',
		animationRange: 'entry 100% cover 10%',

		'::view-transition-new(root)': {
			animation: 'grow 1s'
		},
		'::view-transition-old(root)': {
			animation: 'none'
		},

		'& span': {
			background:
				'linear-gradient(120deg, var(--highlight, lightblue) 50%, transparent 50%) 110% 0 / 200% 100% no-repeat',
			backgroundPosition: 'calc((1 - var(--highlighted)) * 110%) 0',
			transition: 'background-position 1s'
		}
	}
});

export enum HighlightColor {
	Green = 'rgb(76 175 80 / 40%)',
	Purple = 'rgba(166 122 244 / 40%)'
}

export type HighlightMakerProps = {
	color: HighlightColor;
};

export const HighlightMaker = ({ children, color }: PropsWithChildren<HighlightMakerProps>) => (
	<HighlightMakerComponent style={{ '--highlight': color } as React.CSSProperties}>
		<span>{children}</span>
	</HighlightMakerComponent>
);
