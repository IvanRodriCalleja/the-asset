import { expect } from '@playwright/test';

import { theAssetTest } from '../../fixtures/theAssetFixture';

theAssetTest.describe('Merge PDF -> Viewer', () => {
	theAssetTest(
		'Should allow magnify pdf and see all pages one by one',
		async ({ page, mergePdfPage }) => {
			await page.goto('/merge-pdf');

			await mergePdfPage.uploadFiles(page, ['tema1.pdf']);

			const magnifyButton = await mergePdfPage.getMagnifierButton();
			await magnifyButton.click();

			await expect(mergePdfPage.viewer.getGoToFirstPageButton()).toBeDisabled();
			await expect(mergePdfPage.viewer.getGoToPreviousPageButton()).toBeDisabled();

			await expect(mergePdfPage.viewer.getTotalPages('25')).toBeVisible();
			await expect(mergePdfPage.viewer.getCurrentPage()).toHaveValue('1');

			await expect(mergePdfPage.viewer.getGoToNextPageButton()).not.toBeDisabled();
			await expect(mergePdfPage.viewer.getGoToLastPageButton()).not.toBeDisabled();

			await expect(page).toHaveScreenshot();
			await mergePdfPage.viewer.goToNextPage();

			await expect(mergePdfPage.viewer.getGoToFirstPageButton()).not.toBeDisabled();
			await expect(mergePdfPage.viewer.getGoToPreviousPageButton()).not.toBeDisabled();

			await expect(mergePdfPage.viewer.getTotalPages('25')).toBeVisible();
			await expect(mergePdfPage.viewer.getCurrentPage()).toHaveValue('2');

			await expect(mergePdfPage.viewer.getGoToNextPageButton()).not.toBeDisabled();
			await expect(mergePdfPage.viewer.getGoToLastPageButton()).not.toBeDisabled();

			await expect(page).toHaveScreenshot();
			await mergePdfPage.viewer.goToLastPage();

			await expect(mergePdfPage.viewer.getGoToFirstPageButton()).not.toBeDisabled();
			await expect(mergePdfPage.viewer.getGoToPreviousPageButton()).not.toBeDisabled();

			await expect(mergePdfPage.viewer.getTotalPages('25')).toBeVisible();
			await expect(mergePdfPage.viewer.getCurrentPage()).toHaveValue('25');

			await expect(mergePdfPage.viewer.getGoToNextPageButton()).toBeDisabled();
			await expect(mergePdfPage.viewer.getGoToLastPageButton()).toBeDisabled();

			await expect(page).toHaveScreenshot();
			await mergePdfPage.viewer.goToPreviousPage();

			await expect(mergePdfPage.viewer.getGoToFirstPageButton()).not.toBeDisabled();
			await expect(mergePdfPage.viewer.getGoToPreviousPageButton()).not.toBeDisabled();

			await expect(mergePdfPage.viewer.getTotalPages('25')).toBeVisible();
			await expect(mergePdfPage.viewer.getCurrentPage()).toHaveValue('24');

			await expect(mergePdfPage.viewer.getGoToNextPageButton()).not.toBeDisabled();
			await expect(mergePdfPage.viewer.getGoToLastPageButton()).not.toBeDisabled();

			await expect(page).toHaveScreenshot();
			await mergePdfPage.viewer.goToFirstPage();

			await expect(mergePdfPage.viewer.getGoToFirstPageButton()).toBeDisabled();
			await expect(mergePdfPage.viewer.getGoToPreviousPageButton()).toBeDisabled();

			await expect(mergePdfPage.viewer.getTotalPages('25')).toBeVisible();
			await expect(mergePdfPage.viewer.getCurrentPage()).toHaveValue('1');

			await expect(mergePdfPage.viewer.getGoToNextPageButton()).not.toBeDisabled();
			await expect(mergePdfPage.viewer.getGoToLastPageButton()).not.toBeDisabled();

			await expect(page).toHaveScreenshot();

			await mergePdfPage.viewer.closeModal();

			await expect(page).toHaveScreenshot();
		}
	);

	theAssetTest.describe('Remove pdf page', () => {
		theAssetTest('Should remove pdf page', async ({ page, mergePdfPage }) => {
			await page.goto('/merge-pdf');

			await mergePdfPage.uploadFiles(page, ['tema7.pdf']);

			const magnifyButton = await mergePdfPage.getMagnifierButton();
			await magnifyButton.click();

			await expect(mergePdfPage.viewer.getTotalPages('14')).toBeVisible();
			await expect(mergePdfPage.viewer.getCurrentPage()).toHaveValue('1');

			await expect(page).toHaveScreenshot();

			await mergePdfPage.viewer.removePage();

			await expect(mergePdfPage.viewer.getTotalPages('13')).toBeVisible();
			await expect(mergePdfPage.viewer.getCurrentPage()).toHaveValue('1');

			await expect(page).toHaveScreenshot();

			await mergePdfPage.viewer.removePage();

			await expect(mergePdfPage.viewer.getTotalPages('12')).toBeVisible();
			await expect(mergePdfPage.viewer.getCurrentPage()).toHaveValue('1');

			await expect(page).toHaveScreenshot();

			await mergePdfPage.viewer.goToNextPage();

			await expect(mergePdfPage.viewer.getCurrentPage()).toHaveValue('2');

			await mergePdfPage.viewer.removePage();

			await expect(page).toHaveScreenshot();

			await expect(mergePdfPage.viewer.getCurrentPage()).toHaveValue('2');
		});

		theAssetTest(
			'Should remove last pdf page and move pages back of current',
			async ({ page, mergePdfPage }) => {
				await page.goto('/merge-pdf');

				await mergePdfPage.uploadFiles(page, ['tema7.pdf']);

				const magnifyButton = await mergePdfPage.getMagnifierButton();
				await magnifyButton.click();

				await mergePdfPage.viewer.goToLastPage();

				await expect(mergePdfPage.viewer.getTotalPages('14')).toBeVisible();
				await expect(mergePdfPage.viewer.getCurrentPage()).toHaveValue('14');

				await expect(page).toHaveScreenshot();

				await mergePdfPage.viewer.removePage();

				await expect(mergePdfPage.viewer.getTotalPages('13')).toBeVisible();
				await expect(mergePdfPage.viewer.getCurrentPage()).toHaveValue('13');

				await expect(page).toHaveScreenshot();
			}
		);

		theAssetTest(
			'Should remove all pages and remove full document',
			async ({ page, mergePdfPage }) => {
				await page.goto('/merge-pdf');

				await mergePdfPage.uploadFiles(page, ['tema7.pdf']);

				const magnifyButton = await mergePdfPage.getMagnifierButton();
				await magnifyButton.click();

				await expect(mergePdfPage.viewer.getTotalPages('14')).toBeVisible();
				await mergePdfPage.viewer.removePage();

				await expect(mergePdfPage.viewer.getTotalPages('13')).toBeVisible();
				await mergePdfPage.viewer.removePage();

				await expect(mergePdfPage.viewer.getTotalPages('12')).toBeVisible();
				await mergePdfPage.viewer.removePage();

				await expect(mergePdfPage.viewer.getTotalPages('11')).toBeVisible();
				await mergePdfPage.viewer.removePage();

				await expect(mergePdfPage.viewer.getTotalPages('10')).toBeVisible();
				await mergePdfPage.viewer.removePage();

				await expect(mergePdfPage.viewer.getTotalPages('9')).toBeVisible();
				await mergePdfPage.viewer.removePage();

				await expect(mergePdfPage.viewer.getTotalPages('8')).toBeVisible();
				await mergePdfPage.viewer.removePage();

				await expect(mergePdfPage.viewer.getTotalPages('7')).toBeVisible();
				await mergePdfPage.viewer.removePage();

				await expect(mergePdfPage.viewer.getTotalPages('6')).toBeVisible();
				await mergePdfPage.viewer.removePage();

				await expect(mergePdfPage.viewer.getTotalPages('5')).toBeVisible();
				await mergePdfPage.viewer.removePage();

				await expect(mergePdfPage.viewer.getTotalPages('4')).toBeVisible();
				await mergePdfPage.viewer.removePage();

				await expect(mergePdfPage.viewer.getTotalPages('3')).toBeVisible();
				await mergePdfPage.viewer.removePage();

				await expect(mergePdfPage.viewer.getTotalPages('2')).toBeVisible();
				await mergePdfPage.viewer.removePage();

				await expect(mergePdfPage.viewer.getTotalPages('1')).toBeVisible();
				await expect(page).toHaveScreenshot();

				await mergePdfPage.viewer.removePage();

				await expect(page).toHaveScreenshot();
			}
		);

		theAssetTest(
			'Should remove pages and merge pdfs',
			async ({ page, mergePdfPage, utilsPage }) => {
				await page.goto('/merge-pdf');

				await mergePdfPage.uploadFiles(page, ['tema7.pdf', 'tema8.pdf']);

				await expect(mergePdfPage.getPdfPagedBadge(14)).toBeInViewport();
				await expect(mergePdfPage.getPdfPagedBadge(28, 1)).toBeInViewport();

				await mergePdfPage.getMagnifierButton().click();
				await mergePdfPage.viewer.removePage();
				await utilsPage.sleep(200);
				await mergePdfPage.viewer.removePage();
				await mergePdfPage.viewer.closeModal();

				await expect(mergePdfPage.getPdfPagedBadge(12)).toBeInViewport();

				await mergePdfPage.getMagnifierButton(1).click();
				await mergePdfPage.viewer.removePage();
				await utilsPage.sleep(200);
				await mergePdfPage.viewer.removePage();
				await mergePdfPage.viewer.closeModal();

				await expect(mergePdfPage.getPdfPagedBadge(26, 1)).toBeInViewport();

				const mergeButton = await mergePdfPage.getMergePdfsButton();
				await mergeButton.click();

				await expect(page).toHaveURL('/en/merge-pdf/6445442867274753133');

				const pages = await mergePdfPage.getScrollViewerPages();
				await expect(pages).toHaveCount(38);
			}
		);
	});

	theAssetTest.describe('Rotate pdf page right', () => {
		theAssetTest('Should rotate pdf page multiple times', async ({ page, mergePdfPage }) => {
			await page.goto('/merge-pdf');

			await mergePdfPage.uploadFiles(page, ['tema7.pdf']);

			const magnifyButton = await mergePdfPage.getMagnifierButton();
			await magnifyButton.click();

			await mergePdfPage.viewer.rotatePageRight();

			await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });

			await mergePdfPage.viewer.closeModal();
			await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });

			await magnifyButton.click();
			await mergePdfPage.viewer.rotatePageRight();
			await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });

			await mergePdfPage.viewer.closeModal();
			await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
		});

		theAssetTest(
			'Should rotate pdf page to the right and merge',
			async ({ page, mergePdfPage }) => {
				await page.goto('/merge-pdf');

				await mergePdfPage.uploadFiles(page, ['tema7.pdf', 'tema8.pdf']);

				const magnifyButton = await mergePdfPage.getMagnifierButton();
				await magnifyButton.click();

				await mergePdfPage.viewer.rotatePageRight();
				await mergePdfPage.viewer.closeModal();

				await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });

				await mergePdfPage.getMagnifierButton(1).click();

				await mergePdfPage.viewer.rotatePageRight();
				await mergePdfPage.viewer.closeModal();

				await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });

				const mergeButton = await mergePdfPage.getMergePdfsButton();
				await mergeButton.click();

				await expect(page).toHaveURL('/en/merge-pdf/656211254552979471');

				const pages = await mergePdfPage.getScrollViewerPages();
				await expect(pages).toHaveCount(42);

				await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
			}
		);
	});

	theAssetTest.describe('Rotate pdf page left', () => {
		theAssetTest('Should rotate pdf page multiple times', async ({ page, mergePdfPage }) => {
			await page.goto('/merge-pdf');

			await mergePdfPage.uploadFiles(page, ['tema7.pdf']);

			const magnifyButton = await mergePdfPage.getMagnifierButton();
			await magnifyButton.click();

			await mergePdfPage.viewer.rotatePageLeft();

			await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });

			await mergePdfPage.viewer.closeModal();
			await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });

			await magnifyButton.click();
			await mergePdfPage.viewer.rotatePageLeft();
			await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });

			await mergePdfPage.viewer.closeModal();
			await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
		});

		theAssetTest('Should rotate pdf page to the left and merge', async ({ page, mergePdfPage }) => {
			await page.goto('/merge-pdf');

			await mergePdfPage.uploadFiles(page, ['tema7.pdf', 'tema9.pdf']);

			const magnifyButton = await mergePdfPage.getMagnifierButton();
			await magnifyButton.click();

			await mergePdfPage.viewer.rotatePageLeft();
			await mergePdfPage.viewer.closeModal();

			await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });

			await mergePdfPage.getMagnifierButton(1).click();

			await mergePdfPage.viewer.rotatePageLeft();
			await mergePdfPage.viewer.closeModal();

			await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });

			const mergeButton = await mergePdfPage.getMergePdfsButton();
			await mergeButton.click();

			await expect(page).toHaveURL('/en/merge-pdf/14333617513308750762');

			const pages = await mergePdfPage.getScrollViewerPages();
			await expect(pages).toHaveCount(51);

			await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
		});
	});
});
