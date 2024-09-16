import Merge from 'assets/tools/merge.svg';

import { useLocale } from '@theasset/internationalization/hooks';
//import { sum } from '@theasset/pdfium';
import { Grid } from '@theasset/style-system/jsx';
import { Button } from '@theasset/ui/button';
import { HighlightColor, HighlightMaker } from '@theasset/ui/highlight-maker';

import { MainSection } from 'modules/shared/ui/MainSection';
import { Section } from 'modules/shared/ui/Section';
import { SectionGradient } from 'modules/shared/ui/SectionGradient';
import { mergePdfPath } from 'routes';

import { Tool } from '../domain/Tool';
import { ToolCard } from './home/ToolCard';

export const Home = () => {
	const { home } = useLocale();

	const tools = useTools();

	/*const onSum = () => {
		const result = sum(1, 2);
		console.log('Sum result:', result);
	};*/

	return (
		<Section>
			<SectionGradient />

			<MainSection
				title={home.title}
				description={
					<>
						{home.description}{' '}
						<HighlightMaker color={HighlightColor.Green}>
							{home.descriptionImportant}
						</HighlightMaker>
					</>
				}
			/>
			<Grid
				maxWidth="1200px"
				width="100%"
				columnGap="1.5rem"
				rowGap="1.5rem"
				columns={{
					base: 1,
					sm: 2,
					lg: 3
				}}>
				{tools.map(tool => (
					<ToolCard key={tool.href} tool={tool} />
				))}
			</Grid>
		</Section>
	);
};

const useTools = (): Tool[] => {
	const { mergePdf } = useLocale();

	return [
		{
			icon: Merge,
			name: mergePdf.title,
			description: mergePdf.card.description,
			href: mergePdfPath,
			color: '#e92a67'
		}
	];
};
