import { styled } from '@theasset/style-system/jsx';

const ThumbnailImage = styled('img', {
	base: {
		position: 'relative',
		marginTop: '9px',
		marginLeft: '9px',
		width: 'calc(100% - 9px)',
		boxShadow:
			'rgb(232, 232, 232) 0px 0px 0px 1px, rgb(255, 255, 255) -8px -8px 0px 0px, rgb(232, 232, 232) -8px -8px 0px 1px'
	}
});

type ImageProps = {
	src: string;
	alt: string;
};

export const Image = (props: ImageProps) => <ThumbnailImage {...props} />;
