import { ReactEventHandler } from 'react';

import { styled } from '@theasset/style-system/jsx';
import { StyledVariantProps } from '@theasset/style-system/types';

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

type ImageVariants = StyledVariantProps<typeof ThumbnailImage>;

type ImageProps = {
	src: string;
	alt: string;
	onLoad?: ReactEventHandler<HTMLImageElement>;
} & ImageVariants;

export const Image = (props: ImageProps) => <ThumbnailImage {...props} />;
