import { RefObject, useEffect, useRef, useState } from 'react';

type IntersectionObserverHook = (
	options: IntersectionObserverInit,
	config?: { initialInView?: boolean },
	rootRef?: RefObject<HTMLDivElement>
) => [RefObject<HTMLDivElement>, boolean];

export const useIntersectionObserver: IntersectionObserverHook = (
	options,
	config = {},
	rootRef
) => {
	const targetRef = useRef<HTMLDivElement>(null);
	const [isInView, setIsInView] = useState(config.initialInView ?? false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					setIsInView(entry.isIntersecting);
				});
			},
			{
				...options,
				root: rootRef?.current
			}
		);

		const currentTarget = targetRef.current;
		if (currentTarget) {
			observer.observe(currentTarget);
		}

		return () => {
			if (currentTarget) {
				observer.unobserve(currentTarget);
			}
		};
	}, [options, rootRef]);

	return [targetRef, isInView];
};
