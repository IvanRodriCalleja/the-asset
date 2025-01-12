import Split from 'assets/tools/split.svg';

import { styled } from '@theasset/style-system/jsx';

const CutterContainer = styled('div', {
	base: {
		cursor: 'pointer',
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		padding: 2,
		height: '100%',
		_before: {
			content: '""',
			position: 'absolute',
			top: {
				base: 'calc(50% - 1px)',
				md: '0'
			},
			left: {
				base: 0,
				md: 'calc(50% - 1px)'
			},
			right: {
				base: 'unset',
				md: 0
			},
			bottom: '0',
			display: 'block',
			height: {
				base: 'unset',
				md: '100%'
			},
			width: {
				base: '100%',
				md: 'unset'
			},
			// Desktop
			borderLeftStyle: {
				base: 'none',
				md: 'dashed'
			},
			borderLeftWidth: {
				base: 0,
				md: '2px'
			},
			borderLeftColor: {
				base: 'none',
				md: 'gray.500'
			},
			// Mobile
			borderTopStyle: {
				base: 'dashed',
				md: 'none'
			},
			borderTopWidth: {
				base: '2px',
				md: 0
			},
			borderTopColor: {
				base: 'gray.500',
				md: 'none'
			},
			zIndex: 2
		},
		'& > div': {
			backgroundColor: 'gray.500',
			zIndex: 3
		},
		_hover: {
			_before: {
				// Desktop
				borderLeftColor: {
					base: 'none',
					md: 'primary'
				},
				// Mobile
				borderTopColor: {
					base: 'primary',
					md: 'none'
				}
			},
			'& > div': {
				backgroundColor: 'primary'
			}
		}
	},
	variants: {
		isInRange: {
			true: {}
		},
		isEndOfRange: {
			true: {
				_before: {
					// Desktop
					borderLeftColor: {
						base: 'none',
						md: 'primary'
					},
					borderLeftStyle: {
						base: 'none',
						md: 'solid'
					},
					// Mobile
					borderTopColor: {
						base: 'primary',
						md: 'none'
					},
					borderTopStyle: {
						base: 'solid',
						md: 'none'
					}
				},
				'& > div': {
					backgroundColor: 'primary'
				}
			}
		}
	},
	compoundVariants: [
		{
			isInRange: true,
			isEndOfRange: false,
			css: {
				background: '#f3eaff',
				_after: {
					content: '""',
					position: 'absolute',
					top: {
						base: '-6px',
						md: 0
					},
					left: {
						base: 0,
						md: '-6px'
					},
					right: {
						base: 0,
						md: '-6px'
					},
					bottom: {
						base: '-6px',
						md: 0
					},
					display: 'block',
					background: '#f3eaff',
					zIndex: 1
				}
			}
		}
	],
	defaultVariants: {
		isInRange: false,
		isEndOfRange: false
	}
});

const SplitIcon = styled('div', {
	base: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '24px',
		height: '24px',
		marginInline: 'auto',
		padding: '5px',
		borderRadius: 'full',
		zIndex: 1,
		'& svg': {
			width: '100%',
			height: '100%'
		}
	}
});

type CutterProps = {
	isInRange: boolean;
	index: number;
	isEndOfRange: boolean;
	className?: string;
	onToggleCut: (id: number, value: boolean) => void;
};

export const Cutter = ({ isInRange, index, isEndOfRange, className, onToggleCut }: CutterProps) => (
	<CutterContainer
		isEndOfRange={isEndOfRange}
		isInRange={isInRange}
		className={className}
		onClick={() => onToggleCut(index, !isEndOfRange)}>
		<SplitIcon>
			<Split />
		</SplitIcon>
	</CutterContainer>
);
