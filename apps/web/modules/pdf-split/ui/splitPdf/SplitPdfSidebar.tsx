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
	const { ranges, onRangeFocus, onRangeBlur } = useSplitPdfStore();

	const onFocus = (index: number) => {
		const range = ranges[index];
		const rangeNode = document.getElementById(`file-${range?.from}`);

		if (rangeNode) {
			rangeNode.scrollIntoView({ block: 'start', behavior: 'smooth' });
		}

		onRangeFocus(index);
	};

	return (
		<Stack gap={4}>
			<Text size="xl">Rangos!!</Text>
			<Stack gap={2}>
				{/* TODO: Avoid using index as key*/}
				{ranges.map((range, index) => (
					<Stack key={index}>
						<HStack>
							<Text size="lg">{range.name}</Text>
						</HStack>

						<HStack>
							<FieldNumber
								name="aaaa"
								value={range.from}
								lead="desde"
								onFocus={() => onFocus(index)}
								onBlur={onRangeBlur}
							/>

							<FieldNumber
								name="bbb"
								value={range.to}
								lead="hasta"
								onFocus={() => onFocus(index)}
								onBlur={onRangeBlur}
							/>
						</HStack>
					</Stack>
				))}
			</Stack>
		</Stack>
	);
};
