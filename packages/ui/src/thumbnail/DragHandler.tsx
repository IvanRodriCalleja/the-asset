import { DragHandleDots2Icon } from '@radix-ui/react-icons';

import { styled } from '@theasset/style-system/jsx';

import { SortableDragHandle } from '../Sortable';

export const Handler = styled('div', {
	base: {
		display: {
			base: 'flex',
			md: 'none'
		},
		alignItems: 'center',
		minWidth: '40px',
		width: '40px',
		visibility: {
			base: 'visible',
			md: 'hidden'
		}
	}
});

export const DragHandler = () => (
	<Handler>
		<SortableDragHandle variant="transparent" size="icon">
			<DragHandleDots2Icon />
		</SortableDragHandle>
	</Handler>
);
