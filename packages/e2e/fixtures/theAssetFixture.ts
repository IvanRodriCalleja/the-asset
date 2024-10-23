import { test as base } from '@playwright/test';

import { MergePdfPage } from './extensions/MergePdfPage';
import { UtilsPage } from './extensions/UtilsPage';

type TheAssetTest = {
	mergePdfPage: MergePdfPage;
	utilsPage: UtilsPage;
};

export const theAssetTest = base.extend<TheAssetTest>({
	mergePdfPage: async ({ page }, use) => {
		const agentPage = new MergePdfPage({ page });
		await use(agentPage);
	},
	utilsPage: async ({ page }, use) => {
		const utils = new UtilsPage({ page });
		await use(utils);
	}
});
