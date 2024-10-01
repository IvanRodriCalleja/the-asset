import { Stack, styled } from '@theasset/style-system/jsx';

export { Actions as ThumbnailActions } from './thumbnail/Actions';
export { Footer as ThumbnailFooter } from './thumbnail/Footer';
export { Image as ThumbnailImage } from './thumbnail/Image';
export { ImageContent as ThumbnailImageContent } from './thumbnail/ImageContent';
export { MobileAction as ThumbnailMobileAction } from './thumbnail/MobileAction';
export { MobileActions as ThumbnailMobileActions } from './thumbnail/MobileActions';
export { Suspense as ThumbnailSuspense, useThumbnailSuspense } from './thumbnail/Suspense';

export { ActionButton as ThumbnailActionButton } from './thumbnail/ActionButton';

export const ThumbnailRoot = styled(Stack, {
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
