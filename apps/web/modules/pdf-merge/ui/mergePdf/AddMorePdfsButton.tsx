import { PlusIcon } from '@radix-ui/react-icons';

import * as Dropzone from '@theasset/ui/drop-zone';
import { useLocale } from '@theasset/internationalization/hooks/use-locale';

// 	TODO: Add loading state
export const AddMorePdfsButton = () => {
	const { mergePdf } = useLocale();

	return (
		<Dropzone.Button size="lg" variant="outline">
			<PlusIcon />
			{mergePdf.addMoreFiles}
		</Dropzone.Button>
	);
};
