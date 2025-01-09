import { PdfThumbnail } from '@theasset/pdf-react/ui/pdf-thumbnail';
import { styled } from '@theasset/style-system/jsx';

import { useSplitPdfStore } from 'modules/pdf-split/store/SplitPdfStore';

import { Cutter } from './splitPdfFilePreview/Cutter';

// TODO: Unify with merge FilePreview
// TODO: Use more powerful decrypt pdf library

const FilePreviewList = styled('div', {
	base: {
		display: 'flex',
		rowGap: {
			base: 0,
			md: 6
		},
		flexDirection: {
			base: 'column',
			md: 'row'
		},
		marginInline: 'auto',
		flexWrap: 'wrap',
		//justifyContent: 'center', // NOTE: We need to align to the right as the cutter disaligns the thumbnails
		justifyContent: 'flex-start',
		height: '100%',
		overflow: 'auto',
		width: '100%',
		maxWidth: '100%',
		padding: {
			base: 4,
			md: 8
		}
		//gap: 4 //NOTE: No gap needed here as we need to have cutter between the thumbnails
	}
});

const SplitContainer = styled('div', {
	base: {
		display: 'flex',
		flexDirection: {
			base: 'column',
			md: 'row'
		}
	}
});

export const SplitPdfFilePreview = () => {
	const { files, onFileChange } = useSplitPdfStore();

	const isAnyFileCut = files.some(file => file.isCut);

	return (
		<FilePreviewList>
			{files.map((file, index) => (
				<SplitContainer key={file.id}>
					<PdfThumbnail
						status={isAnyFileCut ? 'active' : 'default'}
						file={file}
						onFileChange={onFileChange}
						actions={() => null}
						shadow={false}
						pageText={file => file.page}
					/>
					{index < files.length - 1 && <Cutter file={file} isAnyFileCut={isAnyFileCut} />}
				</SplitContainer>
			))}
		</FilePreviewList>
	);
};
