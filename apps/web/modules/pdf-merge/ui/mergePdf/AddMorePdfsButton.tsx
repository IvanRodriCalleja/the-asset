import { PlusIcon } from '@radix-ui/react-icons';

import * as Dropzone from '@theasset/ui/drop-zone';
import { useLocale } from '@theasset/internationalization/hooks/use-locale';

type AddMorePdfsButtonProps = {
	open: () => void;
};

export const AddMorePdfsButton = ({ open }: AddMorePdfsButtonProps) => {
	const { mergePdf } = useLocale();

	return (
		<Dropzone.Button size="lg" variant="outline" onPress={open}>
			<PlusIcon />
			{mergePdf.addMoreFiles}
		</Dropzone.Button>
	);
};
