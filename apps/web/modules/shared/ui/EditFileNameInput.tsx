import { css } from '@theasset/style-system/css';
import { Stack, styled } from '@theasset/style-system/jsx';
import { Button } from '@theasset/ui/button';
import { PopoverPanel, PopoverTrigger } from '@theasset/ui/popover';
import { Text } from '@theasset/ui/text';

import { EditFileName } from './editFileNameInput/EditFileName';

const FileName = styled(Text, {
	base: {
		borderBottomStyle: 'dashed',
		borderBottomWidth: '1px',
		borderBottomColor: 'black',
		cursor: 'pointer'
	}
});

type ConfigFileInfoProps = {
	name: string;
	setName: (name: string) => void;
};

export const EditFileNameInput = ({ name, setName }: ConfigFileInfoProps) => {
	const extension = name.split('.').pop() || '';
	const notExtension = name.replace(`.${extension}`, '');

	return (
		<Stack direction="row" gap={0}>
			<PopoverTrigger>
				<Button variant="transparent" size="none" className={css({ borderRadius: 0 })}>
					<FileName size="md" weight="bold" data-testid="result-file-name">
						{notExtension}
					</FileName>
				</Button>

				<PopoverPanel placement="bottom left">
					<Text size="sm" color="textClear">
						<EditFileName name={notExtension} extension={extension} setName={setName} />
					</Text>
				</PopoverPanel>
			</PopoverTrigger>

			<Text size="md" color="textClear">
				.{extension}
			</Text>
		</Stack>
	);
};
