import { DeepRequired, FieldError, FieldErrorsImpl, Path, get } from 'react-hook-form';

export const getFieldError = <T extends NonNullable<unknown>>(
	errors: FieldErrorsImpl<DeepRequired<T>>,
	name: Path<T>
): FieldError | undefined => get(errors, name);

export const getErrorProps = <T extends NonNullable<unknown>>(
	errors: FieldErrorsImpl<DeepRequired<T>>,
	name: Path<T>
) => {
	const fieldError = getFieldError(errors, name);

	return fieldError
		? {
				'aria-invalid': !!fieldError?.message,
				'aria-errormessage': `${name}-error`,
				error: fieldError?.message
			}
		: {};
};
