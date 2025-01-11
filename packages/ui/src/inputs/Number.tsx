'use client';

import { PropsWithChildren, Ref, useImperativeHandle, useRef } from 'react';

import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { useLocale } from '@react-aria/i18n';
import { AriaNumberFieldProps, useNumberField } from '@react-aria/numberfield';
import { useNumberFieldState } from '@react-stately/numberfield';
import { AriaButtonProps } from '@react-types/button';

import { RecipeVariantProps, sva } from '@theasset/style-system/css';
import { HStack, VStack } from '@theasset/style-system/jsx';

import { Button } from '../Button';
import { Input } from './Input';

// NOTE: Buttons and lead height should be based on size variant

const numberInput = sva({
	slots: ['root', 'incrementTrigger', 'decrementTrigger', 'input', 'button', 'lead'],
	base: {
		root: {
			display: 'flex',
			alignItems: 'center',
			gap: '2',
			rounded: 'md',
			border: 'input',
			_focusWithin: {
				borderColor: 'primary',
				boxShadow: '0 0 0 1px var(--shadow-color)',
				shadowColor: 'primary'
			}
		},
		lead: {
			display: 'flex',
			alignItems: 'center',
			color: 'gray.500',
			height: '40px',
			borderRightColor: 'input',
			borderRightWidth: '1px',
			borderRightStyle: 'solid',
			paddingInline: 4,
			textStyle: 'sm'
		},
		input: {
			textAlign: 'right',
			border: 'none',
			flex: 1,
			_focusVisible: {
				border: 'none',
				boxShadow: 'none'
			}
		},
		incrementTrigger: {},
		decrementTrigger: {},
		button: {
			height: '20px',
			width: '40px',
			borderRadius: '0',
			padding: '0',
			borderLeftColor: 'input',
			borderLeftWidth: '1px',
			borderLeftStyle: 'solid',
			'&:first-child': {
				borderBottomColor: 'input',
				borderBottomStyle: 'solid',
				borderBottomWidth: '1px',
				borderTopRightRadius: 'md'
			},
			'&:last-child': {
				borderBottomRightRadius: 'md'
			}
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
		name?: string;
		ref?: Ref<HTMLInputElement>;
		hasControls?: boolean;
		lead?: string;
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

	useImperativeHandle(props.ref, () => inputRef.current!);

	return (
		<HStack className={styles.root} gap={0}>
			{props.lead && <div className={styles.lead}>{props.lead}</div>}
			<Input {...inputProps} className={styles.input} ref={inputRef} />
			<VStack gap={0}>
				{hasControls && (
					<NumberIconButton {...incrementButtonProps} className={styles.button}>
						<ChevronUpIcon />
					</NumberIconButton>
				)}
				{hasControls && (
					<NumberIconButton {...decrementButtonProps} className={styles.button}>
						<ChevronDownIcon />
					</NumberIconButton>
				)}
			</VStack>
		</HStack>
	);
};
const NumberIconButton = ({
	children,
	className
}: PropsWithChildren<AriaButtonProps<'button'> & { className?: string }>) => {
	return (
		<Button className={className} type="button" variant={'ghost'}>
			{children}
		</Button>
	);
};
