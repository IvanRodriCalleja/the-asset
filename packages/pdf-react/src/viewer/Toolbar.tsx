import { useEffect, useState } from 'react';

import {
	ChevronLeftIcon,
	ChevronRightIcon,
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon,
	TrashIcon
} from '@radix-ui/react-icons';
import { KeyboardEvent } from '@react-types/shared';

import { Flex, Stack, styled } from '@theasset/style-system/jsx';
import { Button } from '@theasset/ui/button';
import { Number } from '@theasset/ui/form/number';
import { Text } from '@theasset/ui/text';

const ViewerToolbarContainer = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'row',
		gap: 1,
		bg: 'background',
		padding: '8px',
		borderRadius: 'lg'
	}
});

type ToolbarProps = {
	numPages: number;
	page: number;
	setPage: (page: number) => void;
};

export const Toolbar = ({ numPages, page, setPage }: ToolbarProps) => {
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
				<Button
					size="icon"
					variant="ghost"
					onPress={goToFirstPage}
					isDisabled={isGoToFirstPageDisabled}>
					<DoubleArrowLeftIcon />
				</Button>
				<Button
					size="icon"
					variant="ghost"
					onPress={goToPreviousPage}
					isDisabled={isGoToFirstPageDisabled}>
					<ChevronLeftIcon />
				</Button>

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
					/<Text size="sm">{numPages}</Text>
				</Stack>

				<Button
					size="icon"
					variant="ghost"
					onPress={goToNextPage}
					isDisabled={isGoToLastPageDisabled}>
					<ChevronRightIcon />
				</Button>
				<Button
					size="icon"
					variant="ghost"
					onPress={goToLastPage}
					isDisabled={isGoToLastPageDisabled}>
					<DoubleArrowRightIcon />
				</Button>

				<Button size="icon" variant="ghost">
					<TrashIcon />
				</Button>
			</ViewerToolbarContainer>
		</Flex>
	);
};
