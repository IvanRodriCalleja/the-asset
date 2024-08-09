import { CheckCircledIcon } from '@radix-ui/react-icons';

import { useLocale } from '@theasset/internationalization/hooks';
import { Stack, styled } from '@theasset/style-system/jsx';
import { Text } from '@theasset/ui/text';

const Checked = styled(CheckCircledIcon, {
	base: {
		width: '24px',
		height: '24px'
	}
});

const TitleRow = styled('b', {
	base: {
		display: 'flex',
		alignItems: 'center',
		gap: '12px'
	}
});

export const ConfigTitle = () => {
	const { mergePdfResult } = useLocale();

	return (
		<Stack gap={1}>
			<h3>
				<TitleRow>
					<Checked />
					<Text size="2xl">{mergePdfResult.successfullyMergedTitle}</Text>
				</TitleRow>
			</h3>

			<Text size="sm" color="textClear" family="mono">
				{mergePdfResult.successfullyMergedDescription}
			</Text>
		</Stack>
	);
};
