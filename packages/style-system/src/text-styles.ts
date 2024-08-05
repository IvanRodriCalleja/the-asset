import type { TextStyles } from '@pandacss/types';

const defineTextStyles = <T extends TextStyles>(config: T) => config;

export const textStyles = defineTextStyles({
	h1: {
		description: 'Heading 1',
		value: {
			fontSize: {
				base: '4xl',
				lg: '5xl'
			},
			leading: {
				base: '10',
				lg: 'none'
			},
			fontWeight: 'extrabold',
			tracking: 'tight'
		}
	},
	h2: {
		description: 'Heading 2',
		value: {
			fontSize: '3xl',
			leading: '9',
			fontWeight: 'semibold',
			tracking: 'tight'
		}
	},
	h3: {
		description: 'Heading 3',
		value: {
			fontSize: '2xl',
			leading: '8',
			fontWeight: 'semibold',
			tracking: 'tight'
		}
	},
	h4: {
		description: 'Heading 4',
		value: {
			fontSize: 'xl',
			leading: '7',
			fontWeight: 'semibold',
			tracking: 'tight'
		}
	},
	p: {
		description: 'Paragraph',
		value: {
			leading: '7'
		}
	},
	lead: {
		description: 'Lead paragraph',
		value: {
			fontSize: 'xl',
			leading: '7'
		}
	},
	large: {
		description: 'Large text',
		value: {
			fontSize: 'lg',
			fontWeight: 'semibold',
			leading: '7'
		}
	},
	small: {
		description: 'Small text',
		value: {
			fontSize: 'sm',
			fontWeight: 'medium',
			leading: 'none'
		}
	},
	xs: {
		value: {
			fontSize: '.75rem',
			lineHeight: '1rem'
		}
	},
	sm: {
		value: {
			fontSize: '.875rem',
			lineHeight: '1.25rem'
		}
	},
	md: {
		value: {
			fontSize: '1rem',
			lineHeight: '1.5rem'
		}
	},
	lg: {
		value: {
			fontSize: '1.125rem',
			lineHeight: '1.75rem'
		}
	},
	xl: {
		value: {
			fontSize: '1.25rem',
			lineHeight: '1.75rem'
		}
	},
	'2xl': {
		value: {
			fontSize: '1.5rem',
			lineHeight: '2rem'
		}
	},
	'3xl': {
		value: {
			fontSize: '1.875rem',
			lineHeight: '2.25rem'
		}
	},
	'4xl': {
		value: {
			fontSize: '2.25rem',
			lineHeight: '2.5rem'
		}
	},
	'5xl': {
		value: {
			fontSize: '3rem',
			lineHeight: '3.25rem'
		}
	},
	'6xl': {
		value: {
			fontSize: '3.75rem',
			lineHeight: '4rem'
		}
	},
	'7xl': {
		value: {
			fontSize: '4.5rem',
			lineHeight: '4.75rem'
		}
	}
});
