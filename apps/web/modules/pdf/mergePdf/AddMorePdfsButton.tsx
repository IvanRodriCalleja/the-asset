import { PlusIcon } from '@radix-ui/react-icons';

import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { Stack } from '@theasset/style-system/jsx';
import { Button } from '@theasset/ui/button';

type AddMorePdfsButtonProps = {
	open: () => void;
};

export const AddMorePdfsButton = ({ open }: AddMorePdfsButtonProps) => {
	const { mergePdf } = useLocale();

	return (
		<Stack flex={1} maxWidth={{ base: 'full', md: '300px' }}>
			<Button size="lg" variant="outline" onPress={open}>
				<PlusIcon />
				{mergePdf.addMoreFiles}
			</Button>
		</Stack>
	);
};
