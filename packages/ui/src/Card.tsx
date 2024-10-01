import { styled } from '@theasset/style-system/jsx';

export const CardRoot = styled('div', {
	base: {
		rounded: 'lg',
		border: 'base',
		bg: 'card',
		color: 'card.foreground',
		shadow: 'sm',
		transitionProperty: 'border-color',
		transitionDuration: '',
		transitionTimingFunction: 'ease-in-out'
	},
	variants: {
		hoverable: {
			true: {
				'&:hover': {
					borderColor: 'primary'
				}
			}
		}
	}
});

export const CardHeader = styled('div', {
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

export const CardTitle = styled('h3', {
	base: {
		textStyle: '2xl',
		fontWeight: 'semibold',
		leading: 'none',
		tracking: 'tight'
	}
});

export const CardDescription = styled('p', {
	base: {
		textStyle: 'sm',
		color: 'muted.foreground'
	}
});

export const CardContent = styled('div', {
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

export const CardFooter = styled('div', {
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
