'use client';

// TODO: Review RHF
import { useId } from 'react';

import { FieldValues, Path, useController } from 'react-hook-form';

import { Number, NumberProps } from '../inputs/Number';
import { Field, FieldProps } from '../shared/Field';
import { getErrorProps } from '../shared/RHFUtils';

type FieldNumberProps = Omit<FieldProps, 'id'> & NumberProps;

export const FieldNumber = ({ error, name, label, optional, ref, ...props }: FieldNumberProps) => {
	const fieldProps = { error, name, label, optional };

	const labelId = useId();
	// TODO: Add hasError to Field
	return (
		<Field {...fieldProps} id={labelId}>
			<Number
				{...props}
				ref={ref}
				//hasError={!!error}
				id={name}
				name={name}
				aria-labelledby={labelId}
			/>
		</Field>
	);
};

type RHFFieldTextProps<T> = Omit<FieldNumberProps, 'name'> & {
	name: Path<T>;
};

export const RHFFieldNumber = <T extends FieldValues>(props: RHFFieldTextProps<T>) => {
	const {
		field,
		formState: { errors }
	} = useController<T>({ name: props.name });

	const errorProps = getErrorProps(errors, props.name);

	return <FieldNumber {...props} {...field} {...errorProps} />;
};
