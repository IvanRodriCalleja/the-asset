'use client';
'use no memo';

import { DetailedHTMLProps, FormHTMLAttributes, PropsWithChildren } from 'react';

import { FormProvider, UseFormReturn } from 'react-hook-form';

type FormProps<T extends NonNullable<unknown>, TContext = unknown> = {
	form: UseFormReturn<T, TContext, undefined>;
	id?: string;
	'aria-label'?: string;
	onSubmit: (values: T) => void | Promise<void>;
} & Omit<DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, 'onSubmit'>;

export const Form = <T extends NonNullable<unknown>>({
	form,
	onSubmit,
	children,
	...props
}: PropsWithChildren<FormProps<T>>) => {
	return (
		<FormProvider {...form}>
			<form {...props} onSubmit={form?.handleSubmit(onSubmit)} noValidate>
				{children}
			</form>
		</FormProvider>
	);
};
