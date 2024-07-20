import { styled } from '@theasset/style-system/jsx';

export const UploadSectionSection = styled('section', {
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
