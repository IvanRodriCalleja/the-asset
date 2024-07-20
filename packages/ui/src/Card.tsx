import { styled } from '@theasset/style-system/jsx';

const Root = styled('div', {
	base: {
		rounded: 'lg',
		border: 'base',
		bg: 'card',
		color: 'card.foreground',
		shadow: 'sm'
	}
});

const CardHeader = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		spaceY: '1.5',
		p: '6'
	},
	variants: {
		size: {
			sm: {
				p: '4'
			}
		}
	}
});

const CardTitle = styled('h3', {
	base: {
		textStyle: '2xl',
		fontWeight: 'semibold',
		leading: 'none',
		tracking: 'tight'
	}
});

const CardDescription = styled('p', {
	base: {
		textStyle: 'sm',
		color: 'muted.foreground'
	}
});

const CardContent = styled('div', {
	base: {
		p: '6',
		pt: '0'
	},
	variants: {
		size: {
			sm: {
				p: '4'
			}
		}
	}
});

const CardFooter = styled('div', {
	base: {
		display: 'flex',
		alignItems: 'center',
		p: '6',
		pt: '0'
	},
	variants: {
		size: {
			sm: {
				p: '4'
			}
		}
	}
});

export const Card = {
	Root,
	Header: CardHeader,
	Title: CardTitle,
	Description: CardDescription,
	Content: CardContent,
	Footer: CardFooter
};
