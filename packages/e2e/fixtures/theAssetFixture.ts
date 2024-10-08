import { test as base } from '@playwright/test';

import { MergePdfPage } from './extensions/MergePDFPage';

type TheAssetTest = {
	mergePdfPage: MergePdfPage;
};

export const theAssetTest = base.extend<TheAssetTest>({
	mergePdfPage: async ({ page }, use) => {
		const agentPage = new MergePdfPage({ page });
		await use(agentPage);
	}
});
