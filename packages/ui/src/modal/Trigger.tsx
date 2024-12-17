import { ReactElement, cloneElement } from 'react';

import { useAgModal } from '../Modal';

type TriggerProps = {
	children: ReactElement;
};

export const Trigger = ({ children }: TriggerProps) => {
	const { triggerProps } = useAgModal();

	return <>{cloneElement(children, triggerProps)}</>;
};
