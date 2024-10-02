'use client';
'use no memo';

// TODO: Review RHF
import { useId } from 'react';

import { Path, useFormContext } from 'react-hook-form';

import { Password, PasswordProps } from '../inputs/Password';
import { Field, FieldProps } from '../shared/Field';
import { getErrorProps } from '../shared/RHFUtils';

type FieldPasswordProps = Omit<FieldProps, 'id'> & PasswordProps;

export const FieldPassword = ({ error, name, label, optional, ...props }: FieldPasswordProps) => {
	const fieldProps = { error, name, label, optional };

	const labelId = useId();

	return (
		<Field {...fieldProps} id={labelId}>
			<Password {...props} hasError={!!error} id={name} name={name} aria-labelledby={labelId} />
		</Field>
	);
};

type RHFFieldPasswordProps<T> = Omit<FieldPasswordProps, 'name'> & {
	name: Path<T>;
};
export const RHFFieldPassword = <T extends NonNullable<unknown>>(
	props: RHFFieldPasswordProps<T>
) => {
	const {
		register,
		formState: { errors }
	} = useFormContext<T>();

	const errorProps = getErrorProps(errors, props.name);

	return <FieldPassword {...props} {...register(props.name)} {...errorProps} />;
};
