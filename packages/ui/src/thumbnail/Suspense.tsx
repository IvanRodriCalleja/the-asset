import { Suspense as ReactSuspense, SuspenseProps, createContext, use, useState } from 'react';

type SuspenseContextValue = {
	onLoad: () => void;
};

const SuspenseContext = createContext<SuspenseContextValue>({ onLoad: () => {} });

export const useThumbnailSuspense = () => {
	const { onLoad } = use(SuspenseContext);

	return { onLoad };
};

type ThumbnailSuspenseProps = {
	isLoaded?: boolean;
} & SuspenseProps;

export const Suspense = ({ children, fallback, isLoaded = false }: ThumbnailSuspenseProps) => {
	const [loaded, setIsLoaded] = useState(isLoaded);
	const onLoad = () => setIsLoaded(true);

	if (loaded) {
		return children;
	}

	return (
		<ReactSuspense fallback={fallback}>
			<SuspenseContext.Provider value={{ onLoad }}>{children}</SuspenseContext.Provider>
		</ReactSuspense>
	);
};
