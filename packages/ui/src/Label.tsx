import { styled } from '@theasset/style-system/jsx';

export const Label = styled('label', {
	base: {
		textStyle: 'sm',
		leading: 'none',
		fontWeight: 'medium',

		_peerDisabled: {
			cursor: 'not-allowed',
			opacity: '0.7'
		}
	}
});
