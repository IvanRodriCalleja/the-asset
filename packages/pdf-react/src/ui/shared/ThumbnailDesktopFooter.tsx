import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { useLocale } from '@theasset/internationalization/hooks/use-locale';
import { getSingularOrPlural } from '@theasset/internationalization/infra/get-singular-or-plural';
import { Box } from '@theasset/style-system/jsx';
import { Badge } from '@theasset/ui/badge';
import { ThumbnailFooter } from '@theasset/ui/thumbnail';

import { usePages } from '../../hooks/usePages';
import { FileName } from './FileName';

type ThumbnailDesktopFooterProps = {
	file: TheAssetFile;
};

export const ThumbnailDesktopFooter = ({ file }: ThumbnailDesktopFooterProps) => {
	const { shared } = useLocale();
	const pages = usePages(file);

	return (
		<ThumbnailFooter>
			<FileName>{file.name}</FileName>
			<Box display="flex" justifyContent="center">
				<Badge size="sm" capitalize>
					{pages} {getSingularOrPlural(shared.page, pages)}
				</Badge>
			</Box>
		</ThumbnailFooter>
	);
};
