import { cva } from '@theasset/style-system/css';
import { styled } from '@theasset/style-system/jsx';

export const labelRecipe = cva({
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

export const Label = styled('label', labelRecipe);
