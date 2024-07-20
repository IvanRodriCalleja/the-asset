import { styled } from '@theasset/style-system/jsx';

export const GradientLeft = styled('span', {
	base: {
		position: 'absolute',
		width: '60vw',
		height: '255px',
		top: '-200px',
		borderRadius: '100%',
		mixBlendMode: 'normal',
		filter: 'blur(50px)',
		left: '-200px',
		background: 'linear-gradient(180deg, #58a5ff, #a67af4)',
		opacity: '0.15'
	}
});

export const GradientRight = styled('span', {
	base: {
		position: 'absolute',
		width: '60vw',
		height: '255px',
		top: '-200px',
		borderRadius: '100%',
		mixBlendMode: 'normal',
		filter: 'blur(50px)',
		right: '-200px',
		background: 'linear-gradient(180deg, #ff3358, #ff4fd8);',
		opacity: '0.15'
	}
});

export const SectionGradient = () => (
	<>
		<GradientLeft />
		<GradientRight />
	</>
);
