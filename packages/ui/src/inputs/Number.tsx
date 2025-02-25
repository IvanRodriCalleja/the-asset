'use client';

import { PropsWithChildren, Ref } from 'react';

import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import {
	type NumberFieldProps as AriaNumberFieldProps,
	type ButtonProps,
	Group,
	NumberField
} from 'react-aria-components';

import { RecipeVariantProps, sva } from '@theasset/style-system/css';
import { VStack } from '@theasset/style-system/jsx';

import { Button } from '../Button';
import { Input } from './Input';

// NOTE: Buttons and lead height should be based on size variant
const numberInput = sva({
	slots: ['root', 'group', 'input', 'button', 'lead'],
	base: {
		root: {
			'--input-height': '40px',
			height: 'var(--input-height)',
			display: 'flex',
			alignItems: 'center',
			gap: '2',
			rounded: 'md',
			border: 'input',
			background: 'white',
			_focusWithin: {
				borderColor: 'primary',
				boxShadow: '0 0 0 1px var(--shadow-color)',
				shadowColor: 'primary'
			}
		},
		group: {
			display: 'flex',
			flexDirection: 'row',
			gap: 0
		},
		lead: {
			display: 'flex',
			alignItems: 'center',
			color: 'gray.500',
			height: 'calc(var(--input-height) - 2px)',
			borderRightColor: 'input',
			borderRightWidth: '1px',
			borderRightStyle: 'solid',
			paddingInline: 4,
			textStyle: 'sm'
		},
		input: {
			height: 'calc(var(--input-height) - 2px)',
			textAlign: 'right',
			border: 'none',
			flex: 1,
			_focusVisible: {
				border: 'none',
				boxShadow: 'none'
			}
		},
		button: {
			height: 'calc(var(--input-height) / 2 - 1px)',
			width: '40px',
			borderRadius: '0 !important',
			padding: '0',
			borderLeftColor: 'input',
			borderLeftWidth: '1px',
			borderLeftStyle: 'solid',
			'&:first-child': {
				borderBottomColor: 'input',
				borderBottomStyle: 'solid',
				borderBottomWidth: '1px',
				borderTopRightRadius: 'md !important'
			},
			'&:last-child': {
				borderBottomRightRadius: 'md !important'
			}
		}
	}
});

export type NumberVariants = RecipeVariantProps<typeof numberInput>;
export type NumberProps = AriaNumberFieldProps &
	NumberVariants & {
		name?: string;
		ref?: Ref<HTMLInputElement>;
		hasControls?: boolean;
		lead?: string;
	};

export const Number = (props: NumberProps) => {
	const { hasControls = true } = props;
	const styles = numberInput({});

	return (
		<NumberField {...props} className={styles.root}>
			<Group className={styles.group}>
				{props.lead && <div className={styles.lead}>{props.lead}</div>}
				<Input id={props.id} className={styles.input} />
				{hasControls && (
					<VStack gap={0}>
						<NumberIconButton slot="increment" className={styles.button}>
							<ChevronUpIcon />
						</NumberIconButton>
						<NumberIconButton slot="decrement" className={styles.button}>
							<ChevronDownIcon />
						</NumberIconButton>
					</VStack>
				)}
			</Group>
		</NumberField>
	);
};

const NumberIconButton = (props: PropsWithChildren<ButtonProps & { className?: string }>) => (
	<Button {...props} type="button" variant={'ghost'} />
);
