import { cloneElement } from 'react';

import { useAgModal } from '../Modal';

type TriggerProps = {
	children: JSX.Element;
};

export const Trigger = ({ children }: TriggerProps) => {
	const { triggerProps } = useAgModal();

	return <>{cloneElement(children, triggerProps)}</>;
};
