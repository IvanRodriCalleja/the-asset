import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { getSingularOrPlural } from '@theasset/internationalization/infra/get-singular-or-plural';
import { usePages } from '@theasset/pdf-react/hooks/use-pages';
import { PdfThumbnail } from '@theasset/pdf-react/ui/pdf-thumbnail';
import { FileState } from '@theasset/pdf-tools';
import { breakpoints } from '@theasset/style-system/breakpoints';
import { styled } from '@theasset/style-system/jsx';
import { SortableItem, SortableRoot } from '@theasset/ui/sortable';
import { useMediaQuery } from '@theasset/utilities-react/use-media-query';

import { useMergePdfState } from '../../store/MergePdfStateContext';
import { MergePdfThumbnailActions } from './filePreview/MergePdfThumbnailActions';

const FilePreviewList = styled('div', {
	base: {
		display: 'flex',
		flexDirection: {
			base: 'column',
			md: 'row'
		},
		marginInline: 'auto',
		flexWrap: 'wrap',
		justifyContent: 'center',
		width: '100%',
		maxWidth: '100%',
		padding: {
			base: 4,
			md: 16
		},
		gap: 4
	}
});

const DraggableItem = styled('div', {
	base: {
		width: {
			base: '100%',
			md: 'unset'
		}
	}
});

export const FilePreview = () => {
	const isDesktop = useMediaQuery(`(min-width: ${breakpoints.md})`);

	const { files, onSortFiles, onFileChange } = useMergePdfState();

	return (
		<SortableRoot
			orientation={isDesktop ? 'mixed' : 'vertical'}
			value={files}
			onValueChange={onSortFiles}>
			<FilePreviewList>
				{files.map(file => (
					<SortableItem key={file.id} value={file.id} asTrigger={isDesktop} asChild>
						<DraggableItem>
							<PdfThumbnail
								file={file}
								onFileChange={onFileChange}
								actions={MergePdfThumbnailActions}
								pageText={MergePage}
							/>
						</DraggableItem>
					</SortableItem>
				))}
			</FilePreviewList>
		</SortableRoot>
	);
};

const MergePage = (file: FileState) => <MergePageText file={file} />;

type MergePageTextProps = {
	file: FileState;
};

const MergePageText = ({ file }: MergePageTextProps) => {
	const { shared } = useLocale();
	const pages = usePages(file);

	return (
		<>
			{pages} {getSingularOrPlural(shared.page, pages)}
		</>
	);
};
