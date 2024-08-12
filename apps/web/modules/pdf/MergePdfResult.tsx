import { Suspense, useState } from 'react';

import { ScrollViewer } from '@theasset/pdf-react/scroll-viewer';
import { Flex } from '@theasset/style-system/jsx';

import { InnerScrollSection } from 'modules/shared/ui/InnerScrollSection';

import { MergeResultFile } from './domain/MergeResultFile';
import { MergePdfResultConfig } from './mergePdfResult/MergePdfResultConfig';
import { MergePdfResultFileContainer } from './mergePdfResult/MergePdfResultFileContainer';
import { MergePdfResultSidebar } from './mergePdfResult/MergePdfResultSidebar';
import { MergePdfResultSkeleton } from './mergePdfResult/MergePdfResultSkeleton';

type MergePdfResultProps = {
	file: MergeResultFile;
};

export const MergePdfResult = ({ file }: MergePdfResultProps) => {
	const [isOpen, setIsOpen] = useState(true);

	const toggleOpen = () => setIsOpen(isOpen => !isOpen);

	return (
		<InnerScrollSection>
			<Flex direction="row" height="100%">
				<MergePdfResultFileContainer>
					<Suspense fallback={<MergePdfResultSkeleton />}>
						<ScrollViewer hash={file.hash} buffer={file.buffer} />
					</Suspense>
				</MergePdfResultFileContainer>

				<MergePdfResultSidebar isOpen={isOpen}>
					<MergePdfResultConfig file={file} isOpen={isOpen} toggleOpen={toggleOpen} />
				</MergePdfResultSidebar>
			</Flex>
		</InnerScrollSection>
	);
};
