import { Fragment } from 'react';

import { PlusIcon, TrashIcon } from '@radix-ui/react-icons';

import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { css } from '@theasset/style-system/css';
import { Divider, HStack, Stack, styled } from '@theasset/style-system/jsx';
import { Button } from '@theasset/ui/button';
import { FieldNumber } from '@theasset/ui/fields/number';

import { useSplitPdfStore } from 'modules/pdf-split/store/SplitPdfStore';
import { EditFileNameInput } from 'modules/shared/ui/EditFileNameInput';

const RangeItem = styled(Stack, {
	base: {
		paddingBlock: 4,
		paddingInline: {
			base: 6,
			sm: 8,
			lg: 12
		},
		_hover: {
			backgroundColor: 'accent'
		}
	}
});

const RangesList = styled(Stack, {
	base: {
		position: 'relative',
		overflow: 'auto',
		gap: 0,
		_before: {
			content: '""',
			position: 'sticky',
			top: 0,
			width: '100%',
			borderTopStyle: 'solid',
			borderTopWidth: '1px',
			borderTopColor: 'border'
		}
	},
	variants: {
		hasRanges: {
			true: {
				_after: {
					content: '""',
					position: 'sticky',
					bottom: 0,
					width: '100%',
					borderTopStyle: 'solid',
					borderTopWidth: '1px',
					borderTopColor: 'border'
				}
			}
		}
	}
});

export const SplitPdfRanges = () => {
	const {
		ranges,
		onRangeFocus,
		onRangeBlur,
		onRangeFromChange,
		onRangeToChange,
		onRemoveRange,
		onRenameRange,
		onAddRange
	} = useSplitPdfStore();
	const { splitPdf } = useLocale();

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

	const addRange = async () => {
		await onAddRange();

		setTimeout(() => {
			document.getElementById(`from-${ranges.length}`)?.focus();
		}, 100);
	};

	return (
		<Stack flex={1} overflow="hidden">
			<RangesList hasRanges={ranges.length > 0}>
				{ranges.map((range, index) => {
					const fromValue = range.from + 1;
					const toValue = range.to + 1;

					return (
						<Fragment key={range.id}>
							<RangeItem>
								<HStack justifyContent="space-between">
									<EditFileNameInput
										name={range.name}
										setName={value => onRenameRange(index, value)}
									/>

									<Button size="icon" variant="transparent" onPress={() => onRemoveRange(index)}>
										<TrashIcon />
									</Button>
								</HStack>
								<HStack>
									<FieldNumber
										name={`from-${index}`}
										value={fromValue}
										lead={splitPdf.sidebar.ranges.from}
										onFocus={() => onFocus(index, range.from)}
										onBlur={onRangeBlur}
										onChange={value => onFromChange(index, value)}
									/>

									<FieldNumber
										name={`to-${index}`}
										value={toValue}
										lead={splitPdf.sidebar.ranges.to}
										onFocus={() => onFocus(index, range.to)}
										onBlur={onRangeBlur}
										onChange={value => onToChange(index, value)}
									/>
								</HStack>
							</RangeItem>
							{index < ranges.length - 1 && <Divider color="border" />}
						</Fragment>
					);
				})}
			</RangesList>
			<Stack width="100%" paddingInline={{ base: 6, sm: 8, lg: 12 }}>
				<Button
					variant="secondary"
					onPress={addRange}
					className={css({
						_focusVisible: { outline: 'none !important', boxShadow: 'none !important' }
					})}>
					<PlusIcon />
					{splitPdf.sidebar.actions.addRange}
				</Button>
			</Stack>
		</Stack>
	);
};
