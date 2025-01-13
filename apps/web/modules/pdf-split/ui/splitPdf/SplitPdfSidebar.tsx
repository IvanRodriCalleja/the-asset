import { HStack, Stack, styled } from '@theasset/style-system/jsx';
import { FieldNumber } from '@theasset/ui/fields/number';
import { Text } from '@theasset/ui/text';

import { useSplitPdfStore } from 'modules/pdf-split/store/SplitPdfStore';

import { SplitPdfSidebarContent } from './splitPdfSidebar/SplitPdfSidebarContent';

const SplitPdfSidebarContainer = styled('div', {
	base: {
		position: 'relative',
		width: '480px',
		minWidth: '480px',
		height: '100%',
		zIndex: 1
	}
});

export const SplitPdfSidebar = () => (
	<SplitPdfSidebarContainer>
		<SplitPdfSidebarContent>
			<Stack flex={1} overflow="auto" padding={12}>
				<h3>
					<Text size="2xl">
						<b>A uiudoiwu doiewusssss</b>
					</Text>
				</h3>

				<SplitPdfRanges />
			</Stack>
		</SplitPdfSidebarContent>
	</SplitPdfSidebarContainer>
);

// TODO: Literals
const SplitPdfRanges = () => {
	const { ranges, onRangeFocus, onRangeBlur, onRangeFromChange, onRangeToChange } =
		useSplitPdfStore();

	const scrollToPage = (pageIndex?: number) => {
		if (pageIndex === undefined) return;

		const rangeNode = document.getElementById(`file-${pageIndex < 0 ? 0 : pageIndex}`);

		if (rangeNode) {
			rangeNode.scrollIntoView({ block: 'center', behavior: 'smooth' });
		}
	};

	const onFocus = (index: number, page: number) => {
		scrollToPage(page);

		onRangeFocus(index);
	};

	const onFromChange = (index: number, value: number) => {
		const realValue = value - 1;
		scrollToPage(realValue);

		onRangeFromChange(index, realValue);
	};

	const onToChange = (index: number, value: number) => {
		const realValue = value - 1;
		scrollToPage(realValue);

		onRangeToChange(index, realValue);
	};

	return (
		<Stack gap={4}>
			<Text size="xl">Rangos!!</Text>
			<Stack gap={2}>
				{ranges.map((range, index) => {
					const fromValue = range.from + 1;
					const toValue = range.to + 1;

					return (
						<Stack key={range.id}>
							<HStack>
								<Text size="lg">{range.name}</Text>
							</HStack>
							<HStack>
								<FieldNumber
									name="aaaa"
									value={fromValue}
									lead="desde"
									onFocus={() => onFocus(index, range.from)}
									onBlur={onRangeBlur}
									onChange={value => onFromChange(index, value)}
								/>

								<FieldNumber
									name="bbb"
									value={toValue}
									lead="hasta"
									onFocus={() => onFocus(index, range.to)}
									onBlur={onRangeBlur}
									onChange={value => onToChange(index, value)}
								/>
							</HStack>
						</Stack>
					);
				})}
			</Stack>
		</Stack>
	);
};
