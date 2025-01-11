import { PdfThumbnail } from '@theasset/pdf-react/ui/pdf-thumbnail';
import { styled } from '@theasset/style-system/jsx';

import { SplitRange, isFileEndOfRange, isFileInRange } from 'modules/pdf-split/domain/SplitRange';
import { SplitFile, useSplitPdfStore } from 'modules/pdf-split/store/SplitPdfStore';

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
	const { files, ranges, onFileChange, toggleCut } = useSplitPdfStore();

	return (
		<FilePreviewList>
			{files.map((file, index) => (
				<SplitPdfThumbnail
					key={file.id}
					file={file}
					index={index}
					ranges={ranges}
					hasCutter={index < files.length - 1}
					onFileChange={onFileChange}
					onToggleCut={toggleCut}
				/>
			))}
		</FilePreviewList>
	);
};

type SplitPdfThumbnailProps = {
	file: SplitFile;
	index: number;
	ranges: SplitRange[];
	hasCutter: boolean;
	onFileChange: (id: number, newFile: SplitFile) => void;
	onToggleCut: (id: number, value: boolean) => void;
};

const SplitPdfThumbnail = ({
	file,
	index,
	ranges,
	hasCutter,
	onFileChange,
	onToggleCut
}: SplitPdfThumbnailProps) => {
	// TODO: Do it just in one operation
	const isInRange = isFileInRange(ranges, index);
	const isEndOfRange = isFileEndOfRange(ranges, index);

	return (
		<SplitContainer key={file.id}>
			<PdfThumbnail
				status={isInRange ? 'active' : 'default'}
				file={file}
				onFileChange={onFileChange}
				actions={() => null}
				shadow={false}
				pageText={file => file.page}
			/>
			{hasCutter && (
				<Cutter
					isInRange={isInRange}
					isEndOfRange={isEndOfRange}
					index={index}
					onToggleCut={onToggleCut}
				/>
			)}
		</SplitContainer>
	);
};
