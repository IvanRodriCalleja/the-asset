import { Button } from '@theasset/ui/button';
import { useLanguage, useLocale } from '@theasset/internationalization/hooks';

const Page = () => {
	const { name } = useLocale();
	const language = useLanguage();

	return (
		<div>
			{name} - {language} <Button>Botón</Button>
		</div>
	);
};

export default Page;
