import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { Stack } from '@theasset/style-system/jsx';
import { Text } from '@theasset/ui/inputs/text';
import { Label } from '@theasset/ui/label';

type EditFileNameProps = {
	name: string;
	extension: string;
	setName: Dispatch<SetStateAction<string>>;
};

export const EditFileName = ({ name, extension, setName }: EditFileNameProps) => {
	const { mergePdfResult } = useLocale();

	const onChange = (e: ChangeEvent<HTMLInputElement>) => setName(`${e.target.value}.${extension}`);

	return (
		<Stack>
			<Label htmlFor="file-name">{mergePdfResult.fileNameLabel}</Label>
			<Text id="file-name" name="file-name" value={name} onChange={onChange} />
		</Stack>
	);
};
