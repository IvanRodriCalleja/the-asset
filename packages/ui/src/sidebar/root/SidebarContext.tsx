import { PropsWithChildren, RefObject, createContext, use, useRef, useState } from 'react';

type SidebarContextValue = {
	isOpen: boolean;
	footerRef: RefObject<HTMLDivElement | null>;
	toggleOpen: () => void;
};

const SidebarContext = createContext<SidebarContextValue>({
	isOpen: false,
	footerRef: { current: null },
	toggleOpen: () => {}
});

type SidebarProviderProps = {
	defaultOpen?: boolean;
};

export const SidebarProvider = ({
	children,
	defaultOpen = true
}: PropsWithChildren<SidebarProviderProps>) => {
	const [isOpen, setIsOpen] = useState(defaultOpen);
	const footerRef = useRef<HTMLDivElement>(null);

	const toggleOpen = () => setIsOpen(isOpen => !isOpen);

	return <SidebarContext value={{ isOpen, footerRef, toggleOpen }}>{children}</SidebarContext>;
};

export const useSidebar = () => use(SidebarContext);
