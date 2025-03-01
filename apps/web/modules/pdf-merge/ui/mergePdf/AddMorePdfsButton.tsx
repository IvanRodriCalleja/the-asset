import { PlusIcon } from '@radix-ui/react-icons';

import * as Dropzone from '@theasset/ui/drop-zone';
import { useLocale } from '@theasset/internationalization/hooks/use-locale';

type AddMorePdfsButtonProps = {
	isDisabled: boolean;
};

export const AddMorePdfsButton = ({ isDisabled }: AddMorePdfsButtonProps) => {
	const { mergePdf } = useLocale();

	return (
		<Dropzone.Button size="lg" variant="outline" isDisabled={isDisabled}>
			<PlusIcon />
			{mergePdf.addMoreFiles}
		</Dropzone.Button>
	);
};
