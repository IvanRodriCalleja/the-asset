import { Stack, styled } from '@theasset/style-system/jsx';

import { ActionButton } from './thumbnail/ActionButton';
import { Actions } from './thumbnail/Actions';
import { Footer } from './thumbnail/Footer';
import { Image } from './thumbnail/Image';
import { ImageContent } from './thumbnail/ImageContent';
import { MobileAction } from './thumbnail/MobileAction';
import { MobileActions } from './thumbnail/MobileActions';
import { Suspense, useThumbnailSuspense } from './thumbnail/Suspense';

const Root = styled(Stack, {
	base: {
		position: 'relative',
		padding: 4,
		gap: 2,
		borderRadius: 'md',
		transition: 'background-color 0.2s',

		background: {
			base: '#f3eaff',
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
			background: '#f3eaff'
		}
	},
	variants: {
		status: {
			default: {},
			warning: {
				background: '#ff3358b3',

				_hover: {
					background: '#ff3358cc'
				}
			}
		}
	},
	defaultVariants: {
		status: 'default'
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
	MobileActions,
	Suspense
};

export { useThumbnailSuspense };
