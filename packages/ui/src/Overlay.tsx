import { styled } from '@theasset/style-system/jsx';

export const Overlay = styled('div', {
	base: {
		position: 'fixed',
		zIndex: '10',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		background: 'rgba(0, 0, 0, .8)'
	}
});
