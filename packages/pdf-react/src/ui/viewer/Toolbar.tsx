import { useEffect, useState } from 'react';

import {
	ChevronLeftIcon,
	ChevronRightIcon,
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon
} from '@radix-ui/react-icons';
import { KeyboardEvent } from '@react-types/shared';

import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { css } from '@theasset/style-system/css';
import { Flex, Stack, styled } from '@theasset/style-system/jsx';
import { Button } from '@theasset/ui/button';
import { Number } from '@theasset/ui/inputs/number';
import { Text } from '@theasset/ui/text';
import { Tooltip, TooltipTrigger } from '@theasset/ui/tooltip';

const ViewerToolbarContainer = styled('div', {
	base: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'row',
		gap: 1,
		bg: 'background',
		padding: '8px',
		borderRadius: 'lg'
	}
});

type ChildrenProps = {
	page: number;
	totalPages: number;
	setPage: (page: number) => void;
};

type ToolbarProps = {
	totalPages: number;
	page: number;
	setPage: (page: number) => void;
	children: (props: ChildrenProps) => JSX.Element;
};

export const Toolbar = ({ totalPages, page, setPage, children }: ToolbarProps) => {
	const {
		components: { viewer }
	} = useLocale();
	const [editablePage, setEditablePage] = useState(page);

	const onEdit = (value: number) => setEditablePage(value);
	const onBlur = () => {
		if (editablePage >= 1 && editablePage <= totalPages) {
			setPage(editablePage);
		} else {
			setEditablePage(page);
		}
	};

	const onKeyUp = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			onBlur();
		}
	};

	useEffect(() => {
		setEditablePage(page);
	}, [page]);

	const goToFirstPage = () => setPage(1);
	const goToLastPage = () => setPage(totalPages);

	const goToPreviousPage = () => setPage(page - 1);
	const goToNextPage = () => setPage(page + 1);

	const isGoToFirstPageDisabled = page === 1;
	const isGoToLastPageDisabled = page === totalPages;

	return (
		<Flex justifyContent="center" overflow="auto">
			<ViewerToolbarContainer>
				<TooltipTrigger>
					<Button
						size="icon"
						variant="ghost"
						onPress={goToFirstPage}
						isDisabled={isGoToFirstPageDisabled}
						aria-label={viewer.toolbar.goFirstPage}>
						<DoubleArrowLeftIcon />
					</Button>
					<Tooltip offset={50}>{viewer.toolbar.goFirstPage}</Tooltip>
				</TooltipTrigger>

				<TooltipTrigger>
					<Button
						size="icon"
						variant="ghost"
						onPress={goToPreviousPage}
						isDisabled={isGoToFirstPageDisabled}
						aria-label={viewer.toolbar.goPreviousPage}>
						<ChevronLeftIcon />
					</Button>
					<Tooltip offset={50}>{viewer.toolbar.goPreviousPage}</Tooltip>
				</TooltipTrigger>

				<Stack direction="row" alignItems="center">
					<Number
						size="lg"
						aria-label={viewer.toolbar.currentPage}
						hasControls={false}
						value={editablePage}
						onChange={onEdit}
						onBlur={onBlur}
						onKeyUp={onKeyUp}
					/>
					/
					<Text size="sm" className={css({ paddingInline: 2, width: '3ch' })}>
						{totalPages}
					</Text>
				</Stack>

				<TooltipTrigger>
					<Button
						size="icon"
						variant="ghost"
						onPress={goToNextPage}
						isDisabled={isGoToLastPageDisabled}
						aria-label={viewer.toolbar.goNextPAge}>
						<ChevronRightIcon />
					</Button>
					<Tooltip offset={50}>{viewer.toolbar.goNextPAge}</Tooltip>
				</TooltipTrigger>

				<TooltipTrigger>
					<Button
						size="icon"
						variant="ghost"
						onPress={goToLastPage}
						isDisabled={isGoToLastPageDisabled}
						aria-label={viewer.toolbar.goLastPage}>
						<DoubleArrowRightIcon />
					</Button>
					<Tooltip>{viewer.toolbar.goLastPage}</Tooltip>
				</TooltipTrigger>

				{children({ page, totalPages, setPage })}
			</ViewerToolbarContainer>
		</Flex>
	);
};
