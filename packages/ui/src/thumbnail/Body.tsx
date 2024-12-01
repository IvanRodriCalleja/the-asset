import { styled } from '@theasset/style-system/jsx';

export const Body = styled('div', {
	base: {
		display: 'flex',
		gap: {
			base: '10px',
			md: 2
		},
		flexDirection: {
			base: 'row',
			md: 'column'
		}
	}
});
