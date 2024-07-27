import { Stack, styled } from '@theasset/style-system/jsx';
import { Image } from './thumbnail/Image';
import { Actions } from './thumbnail/Actions';
import { ActionButton } from './thumbnail/ActionButton';
import { ImageContent } from './thumbnail/ImageContent';
import { Footer } from './thumbnail/Footer';
import { MobileAction } from './thumbnail/MobileAction';
import { MobileActions } from './thumbnail/MobileActions';

const Root = styled(Stack, {
	base: {
		position: 'relative',
		padding: 4,
		gap: 2,
		borderRadius: 'md',
		transition: 'background-color 0.2s',

		background: {
			base: 'rgb(186 163 255 / 20%)',
			md: 'transparent'
		},

		'& [data-part="actions"]': {
			opacity: {
				base: 1,
				md: 0
			},
			transition: 'opacity 0.2s ease-in-out'
		},
		'&:hover [data-part="actions"]': {
			opacity: 1
		},

		_hover: {
			background: 'rgb(186 163 255 / 20%)'
		}
	}
});

export const Thumbnail = {
	Root,
	Image,
	ImageContent,
	Actions,
	ActionButton,
	Footer,
	MobileAction,
	MobileActions
};
