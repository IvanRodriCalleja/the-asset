import { useLocale } from '@theasset/internationalization/hooks';

import { Flex, Grid, styled } from '@theasset/style-system/jsx';

import Merge from 'assets/tools/merge.svg';
import { ToolCard } from './home/ToolCard';
import { Tool } from '../domain/Tool';

const tools: Tool[] = [
	{
		icon: Merge,
		name: 'Merge PDF',
		description: 'Merge multiple PDF files into one PDF file',
		href: '/[lang]/merge-pdf'
	}
];

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

const Section = styled('section', {
	base: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '100%',
		paddingBottom: '8rem',
		paddingInline: '1.5rem',
		gap: {
			base: '2.25rem',
			lg: '3.5rem'
		}
	}
});

const GradientLeft = styled('span', {
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

const GradientRight = styled('span', {
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

export const Home = () => {
	const { home } = useLocale();

	return (
		<Section>
			<GradientLeft />
			<GradientRight />
			<Flex direction="column" justifyContent="center" alignItems="center">
				<MainTitle>{home.title}</MainTitle>
				<Description>{home.description}</Description>
			</Flex>

			<Grid
				maxWidth="1200px"
				width="100%"
				columnGap="1.5rem"
				rowGap="1.5rem"
				columns={{
					base: 1,
					sm: 2,
					lg: 3
				}}>
				{tools.map(tool => (
					<ToolCard key={tool.href} tool={tool} />
				))}
			</Grid>
		</Section>
	);
};
