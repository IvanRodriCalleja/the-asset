'use client';

import { Suspense, useState } from 'react';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { ScrollViewer } from '@theasset/pdf-react/ui/scroll-viewer';
import { Flex } from '@theasset/style-system/jsx';

import { InnerScrollSection } from 'modules/shared/ui/InnerScrollSection';

import { MergePdfResultConfig } from './mergePdfResult/MergePdfResultConfig';
import { MergePdfResultFileContainer } from './mergePdfResult/MergePdfResultFileContainer';
import { MergePdfResultSidebar } from './mergePdfResult/MergePdfResultSidebar';
import { MergePdfResultSkeleton } from './mergePdfResult/MergePdfResultSkeleton';

type MergePdfResultProps = {
	file: TheAssetFile;
};

// TODO: Add go back button

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

				<MergePdfResultSidebar isOpen={isOpen}>
					<MergePdfResultConfig file={file} isOpen={isOpen} toggleOpen={toggleOpen} />
				</MergePdfResultSidebar>
			</Flex>
		</InnerScrollSection>
	);
};
