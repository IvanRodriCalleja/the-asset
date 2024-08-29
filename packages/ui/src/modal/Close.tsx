import { Cross2Icon } from '@radix-ui/react-icons';

import { styled } from '@theasset/style-system/jsx';

import { Button } from '../Button';
import { useAgModal } from '../Modal';

const CloseButton = styled(Button, {
	base: {
		position: 'absolute',
		top: '1rem',
		right: '1rem',
		zIndex: 2
	}
});

export const Close = () => {
	const { state } = useAgModal();

	return (
		<CloseButton size="icon" variant="secondary" onPress={state.close}>
			<Cross2Icon />
		</CloseButton>
	);
};
