'use client';

import { forwardRef, useId } from 'react';

import { Path, useFormContext } from 'react-hook-form';

import { Input, InputProps } from '../inputs/Input';
import { Field, FieldProps } from '../shared/Field';
import { getErrorProps } from '../shared/RHFUtils';

type FieldTextProps = Omit<FieldProps, 'id'> & InputProps;

export const FieldText = forwardRef<HTMLInputElement, FieldTextProps>(
	({ error, name, label, optional, ...props }, ref) => {
		const fieldProps = { error, name, label, optional };

		const labelId = useId();

		return (
			<Field {...fieldProps} id={labelId}>
				<Input
					{...props}
					ref={ref}
					hasError={!!error}
					id={name}
					name={name}
					aria-labelledby={labelId}
				/>
			</Field>
		);
	}
);

FieldText.displayName = 'FieldText';

type RHFFieldTextProps<T> = Omit<FieldTextProps, 'name'> & {
	name: Path<T>;
};
export const RHFFieldText = <T extends NonNullable<unknown>>(props: RHFFieldTextProps<T>) => {
	const {
		register,
		formState: { errors }
	} = useFormContext<T>();

	const errorProps = getErrorProps(errors, props.name);

	return <FieldText {...props} {...register(props.name)} {...errorProps} />;
};
