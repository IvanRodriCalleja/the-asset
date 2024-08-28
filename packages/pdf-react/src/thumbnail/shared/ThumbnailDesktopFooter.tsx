import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { useLocale } from '@theasset/internationalization/hooks';
import { getSingularOrPlural } from '@theasset/internationalization/infra';
import { Box } from '@theasset/style-system/jsx';
import { Badge } from '@theasset/ui/badge';
import { Thumbnail } from '@theasset/ui/thumbnail';

import { usePages } from '../../infra/usePages';
import { FileName } from './FileName';

type ThumbnailDesktopFooterProps = {
	file: TheAssetFile;
};

export const ThumbnailDesktopFooter = ({ file }: ThumbnailDesktopFooterProps) => {
	const { shared } = useLocale();
	const pages = usePages(file);

	return (
		<Thumbnail.Footer>
			<FileName>{file.name}</FileName>
			<Box display="flex" justifyContent="center">
				<Badge size="sm" capitalize>
					{pages} {getSingularOrPlural(shared.page, pages)}
				</Badge>
			</Box>
		</Thumbnail.Footer>
	);
};
