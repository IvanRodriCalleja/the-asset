import { PropsWithChildren } from 'react';

import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { Stack } from '@theasset/style-system/jsx';

import { Badge } from '../Badge';
import { Label } from '../Label';
import { FieldError, FieldErrorProps } from './field/FieldError';

export type FieldProps = FieldErrorProps & {
	id: string;
	name: string;
	label: string;
	optional?: boolean;
};

export const Field = ({
	children,
	label,
	name,
	error,
	optional = false
}: PropsWithChildren<FieldProps>) => {
	const locales = useLocale();

	return (
		<Stack gap={2}>
			{label && (
				<Label htmlFor={name}>
					{label}
					{optional && (
						<Badge variant="secondary" size="sm" marginLeft=".5em">
							{locales.shared.form.optional}
						</Badge>
					)}
				</Label>
			)}
			{children}
			<FieldError name={name} error={error} />
		</Stack>
	);
};
