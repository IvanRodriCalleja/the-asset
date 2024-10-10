import { Cross2Icon } from '@radix-ui/react-icons';

import { useLocale } from '@theasset/internationalization/hooks/use-locale';
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
	const { components } = useLocale();

	return (
		<CloseButton
			size="icon"
			variant="secondary"
			onPress={state.close}
			aria-label={components.modal.close}>
			<Cross2Icon />
		</CloseButton>
	);
};
