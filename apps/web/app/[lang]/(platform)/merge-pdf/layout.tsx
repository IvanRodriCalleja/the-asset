'use client';

import { PropsWithChildren } from 'react';

import { ThePdfActionsProvider } from '@theasset/pdf-react/context/the-pdf-actions-context';
import { createPdfTools } from '@theasset/pdf-tools';

const pdfTools = createPdfTools();

const MergePdfLayout = ({ children }: PropsWithChildren) => (
	<ThePdfActionsProvider pdfTools={pdfTools}>{children}</ThePdfActionsProvider>
);

export default MergePdfLayout;
