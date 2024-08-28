import { styled } from '@theasset/style-system/jsx';

export const Header = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		spaceY: '2',
		textAlign: 'center',

		sm: {
			textAlign: 'left'
		}
	}
});
