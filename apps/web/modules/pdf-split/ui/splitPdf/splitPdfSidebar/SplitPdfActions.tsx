import Split from 'assets/tools/split.svg';

import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { css } from '@theasset/style-system/css';
import { Stack } from '@theasset/style-system/jsx';
import { Button } from '@theasset/ui/button';

import { AddMorePdfsButton } from 'modules/pdf-merge/ui/mergePdf/AddMorePdfsButton';

// TODO: Repeated from merge result actions
export const SplitPdfActions = () => {
	const { splitPdf } = useLocale();

	return (
		<Stack paddingInline={12} paddingBottom={12}>
			<AddMorePdfsButton />
			<Stack direction="row" gap="1px">
				<Button size="lg" className={css({ flex: 1 })}>
					<Split />
					{splitPdf.sidebar.actions.split}
				</Button>
			</Stack>
		</Stack>
	);
};
