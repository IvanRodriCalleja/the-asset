import { expect } from '@playwright/test';

import { theAssetTest } from '../fixtures/theAssetFixture';

theAssetTest.describe('Merge PDF', () => {
	theAssetTest('Has title', async ({ page }) => {
		await page.goto('/merge-pdf');

		await expect(page).toHaveTitle(/Merge PDF Online - Combine PDF Files Privately for Free/);
	});

	theAssetTest('Should merge multiple PDFs with upload button', async ({ page, mergePdfPage }) => {
		await page.goto('/merge-pdf');
		await mergePdfPage.uploadFiles(page, ['tema3.pdf', 'tema4.pdf', 'tema5.pdf', 'tema6.pdf']);

		const mergeButton = await mergePdfPage.getMergePdfsButton();
		await mergeButton.click();

		const pages = await mergePdfPage.getScrollViewerPages();

		await expect(pages).toHaveCount(95);
		await expect(page).toHaveURL('/en/merge-pdf/10426654538942558433');
	});

	//TODO: Add test for "Add more files" button

	theAssetTest('Should merge multiple PDFs with drag & drop', async ({ page, mergePdfPage }) => {
		await page.goto('/merge-pdf');

		await mergePdfPage.dragAndDropFile('[data-testid="file-drop"]', [
			'tema3.pdf',
			'tema4.pdf',
			'tema5.pdf',
			'tema6.pdf'
		]);

		const mergeButton = await mergePdfPage.getMergePdfsButton();
		await mergeButton.click();

		const pages = await mergePdfPage.getScrollViewerPages();

		await expect(pages).toHaveCount(95);
		await expect(page).toHaveURL('/en/merge-pdf/10426654538942558433');
	});

	theAssetTest('Should allow drag & drop PDFs multiple times', async ({ page, mergePdfPage }) => {
		await page.goto('/merge-pdf');

		await mergePdfPage.dragAndDropFile('[data-testid="file-drop"]', ['tema3.pdf', 'tema4.pdf']);
		await mergePdfPage.dragAndDropFile('[data-testid="file-drop"]', ['tema5.pdf', 'tema6.pdf']);

		const mergeButton = await mergePdfPage.getMergePdfsButton();
		await mergeButton.click();

		const pages = await mergePdfPage.getScrollViewerPages();

		await expect(pages).toHaveCount(95);
		await expect(page).toHaveURL('/en/merge-pdf/10426654538942558433');
	});

	theAssetTest(
		'Should allow magnify pdf and see all pages one by one',
		async ({ page, mergePdfPage }) => {
			await page.goto('/merge-pdf');

			await mergePdfPage.uploadFiles(page, ['tema1.pdf']);

			const magnifyButton = await mergePdfPage.getMagnifierButton();
			await magnifyButton.click();
		}
	);
});

/*

		const element = await mergePdfPage.getSortableElementAt(0);

		await mergePdfPage.mouseMoveBy(page, element, 100, 0);

*/
