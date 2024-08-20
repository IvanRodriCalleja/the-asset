import { useEffect, useState } from 'react';

import {
	ChevronLeftIcon,
	ChevronRightIcon,
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon
} from '@radix-ui/react-icons';
import { KeyboardEvent } from '@react-types/shared';

import { css } from '@theasset/style-system/css';
import { Flex, Stack, styled } from '@theasset/style-system/jsx';
import { Button } from '@theasset/ui/button';
import { Number } from '@theasset/ui/form/number';
import { Text } from '@theasset/ui/text';
import { Tooltip } from '@theasset/ui/tooltip';

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
};

type ToolbarProps = {
	numPages: number;
	page: number;
	setPage: (page: number) => void;
	children: (props: ChildrenProps) => JSX.Element;
};

// TODO: Add literals

export const Toolbar = ({ numPages, page, setPage, children }: ToolbarProps) => {
	const [editablePage, setEditablePage] = useState(page);

	const onEdit = (value: number) => setEditablePage(value);
	const onBlur = () => {
		if (editablePage >= 1 && editablePage <= numPages) {
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
	const goToLastPage = () => setPage(numPages);

	const goToPreviousPage = () => setPage(page - 1);
	const goToNextPage = () => setPage(page + 1);

	const isGoToFirstPageDisabled = page === 1;
	const isGoToLastPageDisabled = page === numPages;

	return (
		<Flex justifyContent="center">
			<ViewerToolbarContainer>
				<Tooltip.Root delayDuration={1000}>
					<Tooltip.Trigger>
						<Button
							size="icon"
							variant="ghost"
							onPress={goToFirstPage}
							isDisabled={isGoToFirstPageDisabled}>
							<DoubleArrowLeftIcon />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>Go to first page</Tooltip.Content>
				</Tooltip.Root>

				<Tooltip.Root delayDuration={1000}>
					<Tooltip.Trigger>
						<Button
							size="icon"
							variant="ghost"
							onPress={goToPreviousPage}
							isDisabled={isGoToFirstPageDisabled}>
							<ChevronLeftIcon />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>Go to previous page</Tooltip.Content>
				</Tooltip.Root>

				<Stack direction="row" alignItems="center">
					<Number
						size="lg"
						aria-label="TODO: Change"
						hasControls={false}
						value={editablePage}
						onChange={onEdit}
						onBlur={onBlur}
						onKeyUp={onKeyUp}
					/>
					/
					<Text size="sm" className={css({ paddingInline: 2 })}>
						{numPages}
					</Text>
				</Stack>

				<Tooltip.Root delayDuration={1000}>
					<Tooltip.Trigger>
						<Button
							size="icon"
							variant="ghost"
							onPress={goToNextPage}
							isDisabled={isGoToLastPageDisabled}>
							<ChevronRightIcon />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>Go to next page</Tooltip.Content>
				</Tooltip.Root>

				<Tooltip.Root delayDuration={1000}>
					<Tooltip.Trigger>
						<Button
							size="icon"
							variant="ghost"
							onPress={goToLastPage}
							isDisabled={isGoToLastPageDisabled}>
							<DoubleArrowRightIcon />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>Go to last page</Tooltip.Content>
				</Tooltip.Root>

				{children({ page })}
			</ViewerToolbarContainer>
		</Flex>
	);
};
