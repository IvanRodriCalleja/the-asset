import { RefObject, useRef } from 'react';

import { PdfThumbnail, PdfThumbnailSkeleton } from '@theasset/pdf-react/ui/pdf-thumbnail';
import { sva } from '@theasset/style-system/css';
import { styled } from '@theasset/style-system/jsx';
import { useIntersectionObserver } from '@theasset/ui/utils/use-intersection-observer';

import { SplitRange, isFileInRange } from 'modules/pdf-split/domain/SplitRange';
import { SplitFile, useSplitPdfStore } from 'modules/pdf-split/store/SplitPdfStore';

import { Cutter } from './splitPdfFilePreview/Cutter';

// TODO: Review why the app compile thousands of modules and IDE is very slow
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
		flexDirection: 'row',
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
		},
		width: {
			base: '100%',
			md: 'unset'
		}
	}
});

const rangeFocus = sva({
	slots: ['thumbnail', 'cutter'],
	base: {
		thumbnail: {
			borderWidth: '2px',
			borderColor: 'transparent'
		},
		cutter: {
			_after: {
				borderBlockWidth: {
					base: 0,
					md: '2px'
				},
				borderInlineWidth: {
					base: '2px',
					md: 0
				},
				borderColor: 'transparent'
			}
		}
	},
	variants: {
		isFocused: {
			true: {
				thumbnail: {
					borderTopColor: {
						base: 'transparent',
						md: 'primary'
					},
					borderBottomColor: {
						base: 'transparent',
						md: 'primary'
					},
					borderLeftColor: {
						base: 'primary',
						md: 'transparent'
					},
					borderRightColor: {
						base: 'primary',
						md: 'transparent'
					}
				},
				cutter: {
					_after: {
						borderLeftColor: {
							base: 'primary',
							md: 'transparent'
						},
						borderRightColor: {
							base: 'primary',
							md: 'transparent'
						},
						borderTopColor: {
							base: 'transparent',
							md: 'primary'
						},
						borderBottomColor: {
							base: 'transparent',
							md: 'primary'
						}
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
					borderLeftColor: 'primary',
					borderTopColor: 'primary',
					borderRightRadius: {
						base: 'md',
						md: 0
					},
					borderBottomRadius: {
						base: 0,
						md: 'md'
					}
				}
			}
		},
		{
			isFocused: true,
			isEndOfRange: true,
			css: {
				thumbnail: {
					borderRightColor: 'primary',
					borderBottomColor: 'primary',
					borderLeftRadius: {
						base: 'md',
						md: 0
					},
					borderTopRadius: {
						base: 0,
						md: 'md'
					}
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
