import { PropsWithChildren } from 'react';

import { useLocale } from '@theasset/internationalization/hooks';
import { styled } from '@theasset/style-system/jsx';

import { Badge } from '../../Badge';

export type FieldsetProps = {
	legend: string;
	optional?: boolean;
};

const Legend = styled('legend', {
	base: {
		marginBottom: '.5em'
	}
});

//TODO: Put (optional) in literals
export const Fieldset = ({ legend, optional, children }: PropsWithChildren<FieldsetProps>) => {
	const locales = useLocale();

	return (
		<fieldset>
			<Legend>
				{legend}{' '}
				{optional && (
					<Badge variant="secondary" size="sm" marginLeft=".5em">
						{locales.shared.form.optional}
					</Badge>
				)}
			</Legend>
			{children}
		</fieldset>
	);
};
