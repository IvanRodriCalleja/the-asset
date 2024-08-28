import { styled } from '@theasset/style-system/jsx';

export const Footer = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column-reverse',

		sm: {
			flexDirection: 'row',
			justifyContent: 'flex-end',
			spaceX: '2'
		}
	}
});
