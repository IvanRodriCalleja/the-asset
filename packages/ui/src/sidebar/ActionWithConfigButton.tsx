import { PropsWithChildren } from 'react';

import { ChevronDownIcon } from '@radix-ui/react-icons';
import { PressEvent } from 'react-aria-components';

import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { Stack, styled } from '@theasset/style-system/jsx';

import { Button } from '../Button';
import { useSidebar } from './root/SidebarContext';

const ActionButton = styled(Button, {
	base: {
		flex: '1',
		borderRightRadius: {
			base: '0 !important',
			md: 'md'
		}
	}
});

const OpenPanelButton = styled(Button, {
	base: {
		display: {
			base: 'flex',
			md: 'none'
		},
		borderLeftRadius: '0 !important'
	}
});

type OpenPanelButtonProps = {
	isDisabled?: boolean;
	onPress?: (e: PressEvent) => void;
};

export const ActionWithConfigButton = ({
	children,
	isDisabled,
	onPress
}: PropsWithChildren<OpenPanelButtonProps>) => {
	const { isOpen, toggleOpen } = useSidebar();
	const { shared } = useLocale();

	return (
		<Stack direction="row" gap="1px">
			<ActionButton size="lg" onPress={onPress} isDisabled={isDisabled}>
				{children}
			</ActionButton>
			<OpenPanelButton
				size="icon-lg"
				onPress={toggleOpen}
				aria-label={isOpen ? shared.closePanel : shared.openPanel}>
				<ChevronDownIcon
					style={{ rotate: isOpen ? '0deg' : '180deg', transition: 'rotate 0.3s ease-out' }}
				/>
			</OpenPanelButton>
		</Stack>
	);
};
