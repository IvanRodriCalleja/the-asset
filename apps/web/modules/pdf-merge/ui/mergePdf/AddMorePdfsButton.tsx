import { PlusIcon } from '@radix-ui/react-icons';

import * as Dropzone from '@theasset/ui/drop-zone';
import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { Stack } from '@theasset/style-system/jsx';

type AddMorePdfsButtonProps = {
	open: () => void;
};

export const AddMorePdfsButton = ({ open }: AddMorePdfsButtonProps) => {
	const { mergePdf } = useLocale();

	return (
		<Stack flex={1} maxWidth={{ base: 'full', md: '300px' }}>
			<Dropzone.Button size="lg" variant="outline" onPress={open}>
				<PlusIcon />
				{mergePdf.addMoreFiles}
			</Dropzone.Button>
		</Stack>
	);
};
