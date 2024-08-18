import { styled } from '@theasset/style-system/jsx';

import { Button } from '../Button';

export const ActionButton = styled(Button, {
	base: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '28px',
		height: '28px',
		cursor: 'auto',
		borderRadius: '0',
		padding: 0,

		_hover: {
			bga: 'primary/60'
		},

		_focusVisible: {
			zIndex: 2
		},

		'& svg': {
			width: '16px',
			height: '16px'
		}
	}
});
