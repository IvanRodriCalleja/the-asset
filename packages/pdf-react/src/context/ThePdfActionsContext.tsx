'use client';

import { PropsWithChildren, createContext, use } from 'react';

import { PdfToolsImpl } from '@theasset/pdf-tools/types';
import { AsyncMethods } from '@theasset/utilities/infra';

type ThePdfActionsContextValue = {
	pdfTools: AsyncMethods<PdfToolsImpl>;
};

const ThePdfActionsContext = createContext<ThePdfActionsContextValue>({
	pdfTools: {} as AsyncMethods<PdfToolsImpl>
});

export const ThePdfActionsProvider = ({
	children,
	pdfTools
}: PropsWithChildren<ThePdfActionsContextValue>) => (
	<ThePdfActionsContext value={{ pdfTools }}>{children}</ThePdfActionsContext>
);

export const useThePdfTools = () => use(ThePdfActionsContext);
