import { Flex, styled } from '@theasset/style-system/jsx';

const MainTitle = styled('h1', {
	base: {
		textAlign: 'center',
		backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.8), rgb(0, 0, 0))',
		backgroundClip: 'text',
		color: 'transparent',
		fontWeight: 'extrabold',
		marginTop: {
			base: '3rem',
			lg: '5rem'
		},
		marginInline: '1.5rem',
		paddingBottom: '1rem',
		width: {
			base: '300px',
			md: '100%'
		},
		fontSize: {
			base: '5xl',
			lg: '6xl'
		},
		lineHeight: {
			base: 'tight',
			lg: 'none',
			xl: 'snug'
		}
	}
});

const Description = styled('p', {
	base: {
		textAlign: 'center',
		fontFamily: 'mono',
		textStyle: 'xl',
		color: 'textClear',
		width: {
			base: '315px',
			md: '700px'
		}
	}
});

type MainSectionProps = {
	title: string;
	description: string;
};

export const MainSection = ({ title, description }: MainSectionProps) => (
	<Flex direction="column" justifyContent="center" alignItems="center">
		<MainTitle>{title}</MainTitle>
		<Description>{description}</Description>
	</Flex>
);
