import Split from 'assets/tools/split.svg';

import { css } from '@theasset/style-system/css';
import { Stack } from '@theasset/style-system/jsx';
import { Button } from '@theasset/ui/button';

import { AddMorePdfsButton } from 'modules/pdf-merge/ui/mergePdf/AddMorePdfsButton';

// TODO: Repeated from merge result actions
// TODO: Add more files
export const SplitPdfActions = () => (
	<Stack paddingInline={12} paddingBottom={12}>
		<AddMorePdfsButton open={open} />
		<Stack direction="row" gap="1px">
			<Button size="lg" className={css({ flex: 1 })}>
				<Split />
				fwrfwfrw
			</Button>
		</Stack>
	</Stack>
);
