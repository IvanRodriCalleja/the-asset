import { RefObject, useRef } from 'react';

import { PdfThumbnail, PdfThumbnailSkeleton } from '@theasset/pdf-react/ui/pdf-thumbnail';
import { sva } from '@theasset/style-system/css';
import { styled } from '@theasset/style-system/jsx';
import { useIntersectionObserver } from '@theasset/ui/utils/use-intersection-observer';

import { SplitRange, isFileInRange } from 'modules/pdf-split/domain/SplitRange';
import { SplitFile, useSplitPdfStore } from 'modules/pdf-split/store/SplitPdfStore';

import { Cutter } from './splitPdfFilePreview/Cutter';

// TODO: Use more powerful decrypt pdf library
// TODO: Add preview image globally
// TODO: Add rotate, delete page

// TODO: Unify with merge FilePreview
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
					borderRadius: '0 !important'
				}
			}
		}
	]
});

export const SplitPdfFilePreview = () => {
	const { files, ranges, onFileChange, toggleCut } = useSplitPdfStore();
	const rootRef = useRef<HTMLDivElement>(null!);

	return (
		<FilePreviewList>
			{files.map((file, index) => (
				<SplitPdfThumbnail
					key={file.id}
					file={file}
					index={index}
					ranges={ranges}
					rootRef={rootRef}
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
	rootRef: RefObject<HTMLDivElement>;
	onFileChange: (id: number, newFile: SplitFile) => void;
	onToggleCut: (id: number, value: boolean) => void;
};

const SplitPdfThumbnail = ({
	file,
	index,
	ranges,
	rootRef,
	onFileChange,
	onToggleCut
}: SplitPdfThumbnailProps) => {
	const [ref, isInViewPort] = useIntersectionObserver(
		{
			rootMargin: '100px 0px 100px 0px',
			threshold: 0
		},
		{ initialInView: index < 20 },
		rootRef
	);

	const [isInRange, range] = isFileInRange(ranges, index);

	const { isFocused = false, from, to } = range || {};
	const isStartOfRange = from === index;
	const isEndOfRange = to === index;

	const styles = rangeFocus({ isFocused, isStartOfRange, isEndOfRange });

	return (
		<SplitContainer ref={ref} id={`file-${index}`} key={file.id}>
			{isInViewPort ? (
				<PdfThumbnail
					status={isInRange ? 'active' : 'default'}
					file={file}
					onFileChange={onFileChange}
					actions={() => null}
					shadow={false}
					pageText={file => file.page}
					className={styles.thumbnail}
				/>
			) : (
				<PdfThumbnailSkeleton file={file} />
			)}

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
