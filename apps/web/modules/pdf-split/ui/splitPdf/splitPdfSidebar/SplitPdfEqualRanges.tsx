import Split from 'assets/tools/split.svg';

import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { Flex, HStack, styled } from '@theasset/style-system/jsx';
import { Button } from '@theasset/ui/button';
import { RHFFieldNumber } from '@theasset/ui/fields/number';
import { Form } from '@theasset/ui/form';

import { useSplitPdfStore } from 'modules/pdf-split/store/SplitPdfStore';

import {
	SplitEqualRangesForm,
	useSplitEqualRanges
} from './splitPdfEqualRanges/useSplitEqualRanges';

const Container = styled('div', {
	base: {
		paddingInline: {
			base: 6,
			sm: 8,
			lg: 12
		},
		paddingBlockEnd: '6px',
		paddingBlockStart: 4,
		borderTopStyle: 'solid',
		borderTopWidth: '1px',
		borderTopColor: 'border'
	}
});

export const SplitPdfEqualRanges = () => {
	const { splitPdf, shared } = useLocale();
	const form = useSplitEqualRanges();
	const { onSplitInEqualRanges } = useSplitPdfStore();

	const onSplit = (value: SplitEqualRangesForm) => onSplitInEqualRanges(value.splitAfterNPages);

	return (
		<Container>
			<Form {...form} onSubmit={onSplit}>
				<HStack alignItems="end">
					<Flex width="224px">
						<RHFFieldNumber<SplitEqualRangesForm>
							label={splitPdf.sidebar.splitInEqualRanges}
							name="splitAfterNPages"
							lead={splitPdf.sidebar.of}
							leadEnd={shared.page.plural}
						/>
					</Flex>

					<Button type="submit">
						<Split />
					</Button>
				</HStack>
			</Form>
		</Container>
	);
};
