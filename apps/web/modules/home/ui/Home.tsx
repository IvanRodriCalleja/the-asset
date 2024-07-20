import { useLocale } from '@theasset/internationalization/hooks';

import { Grid } from '@theasset/style-system/jsx';

import Merge from 'assets/tools/merge.svg';
import { ToolCard } from './home/ToolCard';
import { Tool } from '../domain/Tool';
import { Section } from 'modules/shared/ui/Section';
import { SectionGradient } from 'modules/shared/ui/SectionGradient';
import { MainSection } from 'modules/shared/ui/MainSection';

const tools: Tool[] = [
	{
		icon: Merge,
		name: 'Merge PDF',
		description: 'Merge multiple PDF files into one PDF file',
		href: '/[lang]/merge-pdf'
	}
];

export const Home = () => {
	const { home } = useLocale();

	return (
		<Section>
			<SectionGradient />

			<MainSection title={home.title} description={home.description} />
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
