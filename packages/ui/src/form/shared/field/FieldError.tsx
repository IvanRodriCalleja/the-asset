import { css } from '@theasset/style-system/css';

import { Text } from '../../../Text';

export type FieldErrorProps = {
	name: string;
	error?: string;
};

export const FieldError = ({ error, name }: FieldErrorProps) =>
	error ? (
		<div id={`${name}-error`}>
			<Text size="sm" color="destructive" className={css({ mt: 2 })}>
				{error}
			</Text>
		</div>
	) : null;
