import { expect } from '@playwright/test';

import { theAssetTest } from '../fixtures/theAssetFixture';

theAssetTest.describe('Merge PDF', () => {
	theAssetTest('Has title', async ({ page }) => {
		await page.goto('/merge-pdf');

		await expect(page).toHaveTitle(/Merge PDF Online - Combine PDF Files Privately for Free/);
	});

	theAssetTest.describe('Upload button', () => {
		theAssetTest(
			'Should merge multiple PDFs with upload button',
			async ({ page, mergePdfPage }) => {
				await page.goto('/merge-pdf');
				await mergePdfPage.uploadFiles(['tema3.pdf', 'tema4.pdf', 'tema5.pdf', 'tema6.pdf']);

				const mergeButton = await mergePdfPage.getMergePdfsButton();
				await mergeButton.click();

				const pages = await mergePdfPage.getScrollViewerPages();

				await expect(pages).toHaveCount(95);
				await expect(page).toHaveURL('/en/merge-pdf/10426654538942558433');
			}
		);

		//TODO: Add test for "Add more files" button
	});

	theAssetTest.describe('Drag & drop files', () => {
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
	});

	theAssetTest.describe('Thumbnail rotate left', () => {
		theAssetTest('Should rotate left the full pdf', async ({ mergePdfPage, page }) => {
			await page.goto('/merge-pdf');
			await mergePdfPage.uploadFiles(['tema3.pdf', 'tema4.pdf']);

			const rotateLeftButton = await mergePdfPage.getRotateLeftButton();
			await rotateLeftButton.click();

			await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });

			const mergeButton = await mergePdfPage.getMagnifierButton();
			await mergeButton.click();

			await mergePdfPage.viewer.goToPage(20);

			await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });

			await mergePdfPage.viewer.closeModal();

			await mergePdfPage.getMergePdfsButton().click();

			await expect(page).toHaveURL('/en/merge-pdf/14644883602472423972');

			await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
		});
	});

	theAssetTest.describe('Thumbnail rotate right', () => {
		theAssetTest('Should rotate right the full pdf', async ({ mergePdfPage, page }) => {
			await page.goto('/merge-pdf');
			await mergePdfPage.uploadFiles(['tema3.pdf', 'tema4.pdf']);

			const rotateLeftButton = await mergePdfPage.getRotateRightButton();
			await rotateLeftButton.click();

			await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });

			const mergeButton = await mergePdfPage.getMagnifierButton();
			await mergeButton.click();

			await mergePdfPage.viewer.goToPage(20);

			await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });

			await mergePdfPage.viewer.closeModal();

			await mergePdfPage.getMergePdfsButton().click();

			await expect(page).toHaveURL('/en/merge-pdf/1364348172398970979');

			await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
		});
	});

	theAssetTest.describe('Thumbnail remove pdf', () => {
		theAssetTest('Should remove uploaded pdf', async ({ mergePdfPage, page }) => {
			await page.goto('/merge-pdf');
			await mergePdfPage.uploadFiles(['tema3.pdf', 'tema4.pdf', 'tema5.pdf', 'tema6.pdf']);

			await expect(mergePdfPage.getPdfItems()).toHaveCount(4);

			await mergePdfPage.getRemovePdfButton().click();

			await expect(mergePdfPage.getPdfItems()).toHaveCount(3);

			await mergePdfPage.getRemovePdfButton(1).click();

			await expect(mergePdfPage.getPdfItems()).toHaveCount(2);

			await expect(page).toHaveScreenshot();

			await mergePdfPage.getMergePdfsButton().click();

			await expect(page).toHaveURL('/en/merge-pdf/11755661196596781456');
		});
	});

	theAssetTest.describe('Thumbnail drag & drop (Desktop)', () => {
		// TODO: Skip on mobile

		theAssetTest('Should drag & drop pdfs to change order', async ({ mergePdfPage, page }) => {
			await page.goto('/merge-pdf');
			await mergePdfPage.uploadFiles(['tema3.pdf', 'tema4.pdf', 'tema5.pdf', 'tema6.pdf']);

			await expect(await mergePdfPage.getPdfNameOrder(4)).toEqual([
				'tema3.pdf',
				'tema4.pdf',
				'tema5.pdf',
				'tema6.pdf'
			]);

			await mergePdfPage.mouseMoveBy(await mergePdfPage.getSortableElementAt(0), 100, 0);

			await expect(await mergePdfPage.getPdfNameOrder(4)).toEqual([
				'tema4.pdf',
				'tema3.pdf',
				'tema5.pdf',
				'tema6.pdf'
			]);

			await mergePdfPage.mouseMoveBy(await mergePdfPage.getSortableElementAt(3), -400, 0);

			await expect(await mergePdfPage.getPdfNameOrder(4)).toEqual([
				'tema4.pdf',
				'tema6.pdf',
				'tema3.pdf',
				'tema5.pdf'
			]);

			await mergePdfPage.getMergePdfsButton().click();

			await expect(page).toHaveURL('/en/merge-pdf/4138935953279872066');
		});
	});
});
