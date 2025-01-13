import { PdfThumbnail } from '@theasset/pdf-react/ui/pdf-thumbnail';
import { sva } from '@theasset/style-system/css';
import { styled } from '@theasset/style-system/jsx';

import { SplitRange, isFileInRange } from 'modules/pdf-split/domain/SplitRange';
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
		justifyContent: 'flex-start',
		height: '100%',
		overflow: 'auto',
		width: '100%',
		maxWidth: '100%',
		padding: {
			base: 4,
			md: 8
		}
	}
});

const SplitContainer = styled('div', {
	base: {
		display: 'flex',
		borderStyle: 'solid',
		borderBlockColor: 'transparent',
		flexDirection: {
			base: 'column',
			md: 'row'
		}
	}
});

// TODO: Add mobile responsive
const rangeFocus = sva({
	slots: ['thumbnail', 'cutter'],
	base: {
		thumbnail: {
			borderWidth: '2px',
			borderColor: 'transparent'
		},
		cutter: {
			_after: {
				borderBlockWidth: '2px',
				borderBlockColor: 'transparent'
			}
		}
	},
	variants: {
		isFocused: {
			true: {
				thumbnail: {
					borderBlockColor: 'primary !important'
				},
				cutter: {
					_after: {
						borderColor: 'primary'
					}
				}
			}
		},
		isStartOfRange: {
			true: {}
		},
		isEndOfRange: {
			true: {}
		}
	},
	compoundVariants: [
		{
			isFocused: true,
			isStartOfRange: true,
			css: {
				thumbnail: {
					borderLeftWidth: '2px',
					borderLeftColor: 'primary',
					borderRightRadius: 0
				}
			}
		},
		{
			isFocused: true,
			isEndOfRange: true,
			css: {
				thumbnail: {
					borderRightWidth: '2px',
					borderRightColor: 'primary',
					borderLeftRadius: 0
				},
				cutter: {
					_after: {
						borderColor: 'transparent'
					}
				}
			}
		},
		{
			isFocused: true,
			isStartOfRange: false,
			isEndOfRange: false,
			css: {
				thumbnail: {
					borderRadius: 0
				}
			}
		}
	]
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
	onFileChange: (id: number, newFile: SplitFile) => void;
	onToggleCut: (id: number, value: boolean) => void;
};

const SplitPdfThumbnail = ({
	file,
	index,
	ranges,
	onFileChange,
	onToggleCut
}: SplitPdfThumbnailProps) => {
	const [isInRange, range] = isFileInRange(ranges, index);

	const { isFocused = false, from, to } = range || {};
	const isStartOfRange = from === index;
	const isEndOfRange = to === index;

	const styles = rangeFocus({ isFocused, isStartOfRange, isEndOfRange });

	return (
		<SplitContainer id={`file-${index}`} key={file.id}>
			<PdfThumbnail
				status={isInRange ? 'active' : 'default'}
				file={file}
				onFileChange={onFileChange}
				actions={() => null}
				shadow={false}
				pageText={file => file.page}
				className={styles.thumbnail}
			/>

			<Cutter
				isInRange={isInRange}
				isEndOfRange={isEndOfRange}
				index={index}
				onToggleCut={onToggleCut}
				className={styles.cutter}
			/>
		</SplitContainer>
	);
};
