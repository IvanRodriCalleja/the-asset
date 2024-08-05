import { styled } from '@theasset/style-system/jsx';
import { StyledVariantProps } from '@theasset/style-system/types';

const ThumbnailImage = styled('img', {
	base: {
		position: 'relative',
		width: '100%'
	},
	variants: {
		shadow: {
			0: {
				marginTop: '9px',
				marginLeft: '9px',
				width: 'calc(100% - 9px)',
				boxShadow:
					'rgb(232, 232, 232) 0px 0px 0px 1px, rgb(255, 255, 255) -8px -8px 0px 0px, rgb(232, 232, 232) -8px -8px 0px 1px'
			},
			90: {
				marginTop: '9px',
				marginLeft: '9px',
				width: 'calc(100% - 9px)',
				boxShadow:
					'rgb(232, 232, 232) 0px 0px 0px 1.42px, rgb(255, 255, 255) -8px 8px 0px 0px, rgb(232, 232, 232) -8px 8px 0px 1.42px'
			},
			180: {
				marginTop: '9px',
				marginLeft: '9px',
				width: 'calc(100% - 9px)',
				boxShadow:
					'rgb(232, 232, 232) 0px 0px 0px 1px, rgb(255, 255, 255) 8px 8px 0px 0px, rgb(232, 232, 232) 8px 8px 0px 1px'
			},
			270: {
				marginTop: '9px',
				marginLeft: '9px',
				width: 'calc(100% - 9px)',
				boxShadow:
					'rgb(232, 232, 232) 0px 0px 0px 0.704225px, rgb(255, 255, 255) 8px -8px 0px 0px, rgb(232, 232, 232) 8px -8px 0px 0.704225px'
			}
		},
		rotation: {
			0: {
				transform: 'rotate(0deg) scale(1)'
			},
			90: {
				transform: 'rotate(90deg) scale(1)'
			},
			180: {
				transform: 'rotate(180deg) scale(1)'
			},
			270: {
				transform: 'rotate(270deg) scale(1)'
			}
		},
		scale: {
			none: {},
			horizontal: {},
			vertical: {}
		}
	},
	compoundVariants: [
		{
			rotation: 0,
			scale: 'horizontal',
			css: {
				transform: 'rotate(0deg) scale(0.704225)'
			}
		},
		{
			rotation: 0,
			scale: 'vertical',
			css: {
				transform: 'rotate(0deg) scale(1.42)'
			}
		},
		{
			rotation: 90,
			scale: 'horizontal',
			css: {
				transform: 'rotate(90deg) scale(0.704225)'
			}
		},
		{
			rotation: 90,
			scale: 'vertical',
			css: {
				transform: 'rotate(90deg) scale(1.42)'
			}
		},
		{
			rotation: 180,
			scale: 'horizontal',
			css: {
				transform: 'rotate(180deg) scale(0.704225)'
			}
		},
		{
			rotation: 180,
			scale: 'vertical',
			css: {
				transform: 'rotate(180deg) scale(1.42)'
			}
		},
		{
			rotation: 270,
			scale: 'horizontal',
			css: {
				transform: 'rotate(270deg) scale(0.704225)'
			}
		},
		{
			rotation: 270,
			scale: 'vertical',
			css: {
				transform: 'rotate(270deg) scale(1.42)'
			}
		}
	]
});

type ImageVariants = StyledVariantProps<typeof ThumbnailImage>;

type ImageProps = {
	src: string;
	alt: string;
} & ImageVariants;

export const Image = (props: ImageProps) => <ThumbnailImage {...props} />;
