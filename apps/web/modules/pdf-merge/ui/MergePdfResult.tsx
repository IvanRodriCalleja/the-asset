'use client';

import { Suspense, useState } from 'react';

import { ScrollViewer } from '@theasset/pdf-react/ui/scroll-viewer';
import { FileState } from '@theasset/pdf-tools';
import { Flex } from '@theasset/style-system/jsx';

import { InnerScrollSection } from 'modules/shared/ui/InnerScrollSection';

import { MergePdfResultFileContainer } from './mergePdfResult/MergePdfResultFileContainer';
import { MergePdfResultSidebar } from './mergePdfResult/MergePdfResultSidebar';
import { MergePdfResultSkeleton } from './mergePdfResult/MergePdfResultSkeleton';

type MergePdfResultProps = {
	file: FileState;
};

export const MergePdfResult = ({ file }: MergePdfResultProps) => {
	const [isOpen, setIsOpen] = useState(true);

	const toggleOpen = () => setIsOpen(isOpen => !isOpen);

	return (
		<InnerScrollSection>
			<Flex direction="row" height="100%">
				<MergePdfResultFileContainer>
					<Suspense fallback={<MergePdfResultSkeleton />}>
						<ScrollViewer file={file} />
					</Suspense>
				</MergePdfResultFileContainer>

				<MergePdfResultSidebar file={file} />
			</Flex>
		</InnerScrollSection>
	);
};
