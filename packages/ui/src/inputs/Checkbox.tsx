import { PropsWithChildren } from 'react';

import { Checkbox as AriaCheckbox, type CheckboxProps } from 'react-aria-components';

import { styled } from '@theasset/style-system/jsx';

import { labelRecipe } from '../Label';

const InputCheckbox = styled(AriaCheckbox, {
	base: {
		'--checkmark-color': 'white',
		'--border-color': '#686868',
		'--text-color': 'red',
		'--focus-ring-color': '#8e6ef1',
		'--border-color-pressed': '#848484',

		display: 'flex',
		alignItems: 'center',
		gap: '0.571rem',
		fontSize: '1.143rem',
		forcedColorAdjust: 'none',
		'& [data-slot="checkbox"]': {
			width: '1.143rem',
			height: '1.143rem',
			border: '2px solid var(--border-color)',
			borderRadius: '4px',
			transition: 'all 200ms',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			flexShrink: 0
		},

		'& svg': {
			width: '1rem',
			height: '1rem',
			fill: 'none',
			stroke: 'var(--checkmark-color)',
			strokeWidth: '3px',
			strokeDasharray: '22px',
			strokeDashoffset: '66',
			transition: 'all 200ms'
		},

		'&[data-pressed] [data-slot="checkbox"]': {
			borderColor: 'var(--border-color-pressed)'
		},
		'&[data-focus-visible] [data-slot="checkbox"]': {
			outline: '2px solid var(--focus-ring-color)',
			outlineOffset: '2px'
		},
		'&[data-selected], &[data-indeterminate]': {
			'& [data-slot="checkbox"]': {
				borderColor: 'primary',
				background: 'primary'
			},

			'&[data-pressed] [data-slot="checkbox"]': {
				borderColor: 'gray.700',
				background: 'gray.700'
			},

			'& svg': {
				strokeDashoffset: '44 !important'
			}
		},
		'&[data-indeterminate]': {
			'& svg': {
				stroke: 'none',
				fill: 'var(--checkmark-color)'
			}
		}
	}
});

type CheckboxRenderProps = PropsWithChildren<Omit<CheckboxProps, 'children'>>;

export const Checkbox = ({ children, ...props }: CheckboxRenderProps) => (
	<InputCheckbox {...props} className={labelRecipe()}>
		{({ isIndeterminate }) => (
			<>
				<div data-slot="checkbox">
					<svg viewBox="0 0 18 18" aria-hidden="true">
						{isIndeterminate ? (
							<rect x={1} y={7.5} width={15} height={3} />
						) : (
							<polyline points="1 9 7 14 15 4" />
						)}
					</svg>
				</div>
				{children}
			</>
		)}
	</InputCheckbox>
);
