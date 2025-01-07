import { PropsWithChildren } from 'react';

import { Box, styled } from '@theasset/style-system/jsx';

const MergePdfResultSidebarContainer = styled(Box, {
	base: {
		display: 'flex',
		position: {
			base: 'absolute',
			md: 'relative'
		},
		top: {
			base: 0,
			md: 'auto'
		},
		bottom: {
			base: 0,
			md: 'auto'
		},
		left: {
			base: 0,
			md: 'auto'
		},
		right: {
			base: 0,
			md: 'auto'
		},
		background: 'white',
		padding: {
			base: 6,
			sm: 8,
			lg: 12
		},
		borderLeftStyle: {
			base: 'none',
			md: 'solid'
		},
		borderLeftWidth: {
			base: 0,
			md: '1px'
		},
		borderColor: 'border',
		borderTopStyle: {
			base: 'solid',
			md: 'none'
		},
		borderTopWidth: {
			base: '1px',
			md: 0
		},
		width: {
			base: 'full',
			md: '400px',
			lg: '480px'
		},
		transitionProperty: 'top',
		transitionDuration: 'slow',
		transitionTimingFunction: 'ease-out'
	},
	variants: {
		isOpen: {
			true: {
				top: {
					base: '30%',
					md: 0
				},
				boxShadow: {
					base: '0px -1px 20px 1px rgba(0,0,0,0.8)',
					md: 'none'
				}
			},
			false: {
				top: {
					base: 'calc(100% - 2.75rem - 2.75rem - 3rem - 10px - 1px)',
					md: 0
				}
			}
		}
	}
});

type MergePdfResultSidebarProps = {
	isOpen: boolean;
};

export const MergePdfResultSidebar = ({
	children,
	isOpen
}: PropsWithChildren<MergePdfResultSidebarProps>) => (
	<MergePdfResultSidebarContainer isOpen={isOpen}>{children}</MergePdfResultSidebarContainer>
);
