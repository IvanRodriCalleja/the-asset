'use client';

import { PropsWithChildren, useRef } from 'react';

import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import { useLocale } from '@react-aria/i18n';
import { AriaNumberFieldProps, useNumberField } from '@react-aria/numberfield';
import { useNumberFieldState } from '@react-stately/numberfield';
import { AriaButtonProps } from '@react-types/button';

import { RecipeVariantProps, sva } from '@theasset/style-system/css';

import { Button } from '../../Button';
import { Input } from './Input';

const numberInput = sva({
	slots: ['root', 'incrementTrigger', 'decrementTrigger', 'input', 'button'],
	base: {
		root: { display: 'flex', alignItems: 'center', gap: '2' },
		input: {
			textAlign: 'center'
		},
		incrementTrigger: {},
		decrementTrigger: {},
		button: {
			borderRadius: '50%',
			padding: '0'
		}
	},
	variants: {
		size: {
			sm: {
				input: {
					width: 'calc(1ch + 1.5rem + 2px)'
				}
			},
			md: {
				input: {
					width: 'calc(2ch + 1.5rem + 3px)'
				}
			},
			lg: {
				input: {
					width: 'calc(3ch + 1.5rem  + 4px)'
				}
			},
			xl: {
				input: {
					width: 'calc(4ch + 1.5rem + 5px)'
				}
			},
			'2xl': {
				input: {
					width: 'calc(5ch + 1.5rem)'
				}
			}
		}
	},
	defaultVariants: {
		size: 'sm'
	}
});

export type NumberVariants = RecipeVariantProps<typeof numberInput>;
export type NumberProps = AriaNumberFieldProps &
	NumberVariants & {
		hasControls?: boolean;
	};

export const Number = (props: NumberProps) => {
	const { size, hasControls = true } = props;
	const styles = numberInput({ size });

	const { locale } = useLocale();
	const state = useNumberFieldState({ ...props, locale });
	const inputRef = useRef(null);
	const { inputProps, incrementButtonProps, decrementButtonProps } = useNumberField(
		props,
		state,
		inputRef
	);

	return (
		<div className={styles.root}>
			{hasControls && (
				<NumberIconButton {...decrementButtonProps} className={styles.button}>
					<MinusIcon />
				</NumberIconButton>
			)}
			<Input {...inputProps} className={styles.input} ref={inputRef} />
			{hasControls && (
				<NumberIconButton {...incrementButtonProps} className={styles.button}>
					<PlusIcon />
				</NumberIconButton>
			)}
		</div>
	);
};
const NumberIconButton = ({
	children,
	className
}: PropsWithChildren<AriaButtonProps<'button'> & { className?: string }>) => {
	return (
		<Button className={className} size="icon" type="button">
			{children}
		</Button>
	);
};
