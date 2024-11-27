import { PropsWithChildren, createContext, use } from 'react';

import { GetThumbnailResult } from '@theasset/pdf-tools/types';

type ThePdfActionsContextValue = {
	getTotalPages: (id: string) => Promise<number>;
	getThumbnail: (id: string, page: number) => Promise<GetThumbnailResult>;
};

const ThePdfActionsContext = createContext<ThePdfActionsContextValue>({
	getTotalPages: () => {
		throw new Error('ThePdfActionsContext is not provided');
	},
	getThumbnail: () => {
		throw new Error('ThePdfActionsContext is not provided');
	}
});

export const ThePdfActionsProvider = ({
	children,
	getThumbnail,
	getTotalPages
}: PropsWithChildren<ThePdfActionsContextValue>) => (
	<ThePdfActionsContext.Provider value={{ getThumbnail, getTotalPages }}>
		{children}
	</ThePdfActionsContext.Provider>
);

export const useThePdfActions = () => use(ThePdfActionsContext);
