import { styled } from '@theasset/style-system/jsx';
import { StyledVariantProps } from '@theasset/style-system/types';

import { useThumbnailSuspense } from './Suspense';

export const ImageArea = styled('div', {
	base: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	variants: {
		status: {
			warning: {
				flex: {
					base: 1,
					md: 'unset'
				},
				minHeight: {
					base: '64px',
					md: 'unset'
				},
				aspectRatio: {
					base: 'unset',
					md: '1 / 1.4142857'
				}
			},
			default: {
				width: {
					base: '64px',
					md: '100%'
				},
				minWidth: {
					base: '64px',
					md: '100%'
				},

				aspectRatio: '1 / 1.4142857'
			}
		}
	},
	defaultVariants: {
		status: 'default'
	}
});

const ThumbnailImage = styled('img', {
	base: {
		position: 'relative',
		width: '100%'
	},
	variants: {
		shadow: {
			true: {
				marginTop: '9px',
				marginLeft: '9px',
				width: 'calc(100% - 9px)',
				boxShadow:
					'rgb(232, 232, 232) 0px 0px 0px 1px, rgb(255, 255, 255) -8px -8px 0px 0px, rgb(232, 232, 232) -8px -8px 0px 1px'
			}
		}
	}
});

type ImageProps = {
	src: string;
	alt: string;
	className?: string;
} & StyledVariantProps<typeof ThumbnailImage>;

export const Image = (props: ImageProps) => {
	const { onLoad } = useThumbnailSuspense();

	return (
		<ImageArea>
			<ThumbnailImage {...props} onLoad={onLoad} />
		</ImageArea>
	);
};
