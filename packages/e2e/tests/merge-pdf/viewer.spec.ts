import { expect } from '@playwright/test';

import { theAssetTest } from '../../fixtures/theAssetFixture';

theAssetTest.describe('Merge PDF -> Viewer', () => {
	theAssetTest.describe.configure({ mode: 'serial' });

	theAssetTest.describe('Page navigation', () => {
		theAssetTest(
			'Should allow magnify pdf and see all pages one by one',
			async ({ page, mergePdfPage }) => {
				await mergePdfPage.goToMergeTool();

				await mergePdfPage.uploadFiles(['tema1.pdf']);

				await mergePdfPage.magnifyPdf('tema1.pdf', 1);

				await expect(mergePdfPage.viewer.getGoToFirstPageButton()).toBeDisabled();
				await expect(mergePdfPage.viewer.getGoToPreviousPageButton()).toBeDisabled();

				await expect(mergePdfPage.viewer.getTotalPages('25')).toBeVisible();
				await expect(mergePdfPage.viewer.getCurrentPage()).toHaveValue('1');

				await expect(mergePdfPage.viewer.getGoToNextPageButton()).not.toBeDisabled();
				await expect(mergePdfPage.viewer.getGoToLastPageButton()).not.toBeDisabled();

				await mergePdfPage.viewer.waitForViewer('tema1.pdf', 1);

				await expect(page).toHaveScreenshot();
				await mergePdfPage.viewer.goToNextPage();

				await expect(mergePdfPage.viewer.getGoToFirstPageButton()).not.toBeDisabled();
				await expect(mergePdfPage.viewer.getGoToPreviousPageButton()).not.toBeDisabled();

				await expect(mergePdfPage.viewer.getTotalPages('25')).toBeVisible();
				await expect(mergePdfPage.viewer.getCurrentPage()).toHaveValue('2');

				await expect(mergePdfPage.viewer.getGoToNextPageButton()).not.toBeDisabled();
				await expect(mergePdfPage.viewer.getGoToLastPageButton()).not.toBeDisabled();

				await mergePdfPage.viewer.waitForViewer('tema1.pdf', 2);

				await expect(page).toHaveScreenshot();
				await mergePdfPage.viewer.goToLastPage();

				await expect(mergePdfPage.viewer.getGoToFirstPageButton()).not.toBeDisabled();
				await expect(mergePdfPage.viewer.getGoToPreviousPageButton()).not.toBeDisabled();

				await expect(mergePdfPage.viewer.getTotalPages('25')).toBeVisible();
				await expect(mergePdfPage.viewer.getCurrentPage()).toHaveValue('25');

				await expect(mergePdfPage.viewer.getGoToNextPageButton()).toBeDisabled();
				await expect(mergePdfPage.viewer.getGoToLastPageButton()).toBeDisabled();

				await mergePdfPage.viewer.waitForViewer('tema1.pdf', 25);

				await expect(page).toHaveScreenshot();
				await mergePdfPage.viewer.goToPreviousPage();

				await expect(mergePdfPage.viewer.getGoToFirstPageButton()).not.toBeDisabled();
				await expect(mergePdfPage.viewer.getGoToPreviousPageButton()).not.toBeDisabled();

				await expect(mergePdfPage.viewer.getTotalPages('25')).toBeVisible();
				await expect(mergePdfPage.viewer.getCurrentPage()).toHaveValue('24');

				await expect(mergePdfPage.viewer.getGoToNextPageButton()).not.toBeDisabled();
				await expect(mergePdfPage.viewer.getGoToLastPageButton()).not.toBeDisabled();

				await mergePdfPage.viewer.waitForViewer('tema1.pdf', 24);

				await expect(page).toHaveScreenshot();
				await mergePdfPage.viewer.goToFirstPage();

				await expect(mergePdfPage.viewer.getGoToFirstPageButton()).toBeDisabled();
				await expect(mergePdfPage.viewer.getGoToPreviousPageButton()).toBeDisabled();

				await expect(mergePdfPage.viewer.getTotalPages('25')).toBeVisible();
				await expect(mergePdfPage.viewer.getCurrentPage()).toHaveValue('1');

				await expect(mergePdfPage.viewer.getGoToNextPageButton()).not.toBeDisabled();
				await expect(mergePdfPage.viewer.getGoToLastPageButton()).not.toBeDisabled();

				await mergePdfPage.viewer.waitForViewer('tema1.pdf', 1);

				await expect(page).toHaveScreenshot();

				await mergePdfPage.viewer.closeModal();

				await expect(page).toHaveScreenshot();
			}
		);

		theAssetTest('Should allow setting page number', async ({ page, mergePdfPage }) => {
			await mergePdfPage.goToMergeTool();

			await mergePdfPage.uploadFiles(['tema3.pdf', 'tema4.pdf', 'tema5.pdf', 'tema6.pdf']);

			await mergePdfPage.magnifyPdf('tema3.pdf', 1);

			await mergePdfPage.viewer.goToPage(10, 'tema3.pdf');

			await expect(mergePdfPage.viewer.getCurrentPage()).toHaveValue('10');

			await expect(page).toHaveScreenshot();

			await mergePdfPage.viewer.goToPage(345, 'tema3.pdf', 10);

			await expect(mergePdfPage.viewer.getCurrentPage()).toHaveValue('10');
		});
	});

	theAssetTest.describe('Remove pdf page', () => {
		theAssetTest('Should remove pdf page', async ({ page, mergePdfPage }) => {
			await mergePdfPage.goToMergeTool();

			await mergePdfPage.uploadFiles(['tema7.pdf']);

			await mergePdfPage.magnifyPdf('tema7.pdf', 1);

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

			await expect(mergePdfPage.viewer.getTotalPages('11')).toBeVisible();
			await expect(mergePdfPage.viewer.getCurrentPage()).toHaveValue('2');

			await expect(page).toHaveScreenshot();
		});

		theAssetTest(
			'Should remove last pdf page and move pages back of current',
			async ({ page, mergePdfPage }) => {
				await mergePdfPage.goToMergeTool();

				await mergePdfPage.uploadFiles(['tema7.pdf']);

				await mergePdfPage.magnifyPdf('tema7.pdf', 1);

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
				await mergePdfPage.goToMergeTool();

				await mergePdfPage.uploadFiles(['tema7.pdf']);

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
				await expect(mergePdfPage.getUploadButton()).toBeVisible();

				await expect(page).toHaveScreenshot();
			}
		);

		theAssetTest('Should remove pages and merge pdfs', async ({ page, mergePdfPage }) => {
			await mergePdfPage.goToMergeTool();

			await mergePdfPage.uploadFiles(['tema7.pdf', 'tema8.pdf']);

			await expect(mergePdfPage.getPdfPagedBadge(14)).toBeInViewport();
			await expect(mergePdfPage.getPdfPagedBadge(28, 1)).toBeInViewport();

			await mergePdfPage.magnifyPdf('tema7.pdf', 1);
			await mergePdfPage.viewer.removePage();
			await expect(mergePdfPage.viewer.getTotalPages('13')).toBeVisible();

			await mergePdfPage.viewer.removePage();
			await expect(mergePdfPage.viewer.getTotalPages('13')).toBeVisible();

			await mergePdfPage.viewer.closeModal();
			await expect(mergePdfPage.getPdfPagedBadge(12)).toBeInViewport();

			await mergePdfPage.magnifyPdf('tema8.pdf', 1, 1);

			await mergePdfPage.viewer.removePage();
			await expect(mergePdfPage.viewer.getTotalPages('27')).toBeVisible();

			await mergePdfPage.viewer.removePage();
			await expect(mergePdfPage.viewer.getTotalPages('26')).toBeVisible();

			await mergePdfPage.viewer.closeModal();

			await expect(mergePdfPage.getPdfPagedBadge(26, 1)).toBeInViewport();

			await mergePdfPage.mergePdfs();

			await expect(page).toHaveURL('/en/merge-pdf/6445442867274753133');

			const pages = await mergePdfPage.getScrollViewerPages();
			await expect(pages).toHaveCount(38);
		});
	});

	theAssetTest.describe('Rotate pdf page right', () => {
		theAssetTest('Should rotate pdf page multiple times', async ({ page, mergePdfPage }) => {
			await mergePdfPage.goToMergeTool();

			await mergePdfPage.uploadFiles(['tema7.pdf']);

			await mergePdfPage.magnifyPdf('tema7.pdf', 1);

			await mergePdfPage.viewer.rotatePageRight(90);

			await expect(page).toHaveScreenshot();

			await mergePdfPage.viewer.closeModal();
			await expect(page).toHaveScreenshot();

			await mergePdfPage.magnifyPdf('tema7.pdf', 1);
			await mergePdfPage.viewer.rotatePageRight(180);
			await expect(page).toHaveScreenshot();

			await mergePdfPage.viewer.closeModal();
			await expect(page).toHaveScreenshot();
		});

		theAssetTest(
			'Should rotate pdf page to the right and merge',
			async ({ page, mergePdfPage }) => {
				await mergePdfPage.goToMergeTool();

				await mergePdfPage.uploadFiles(['tema7.pdf', 'tema8.pdf']);

				await mergePdfPage.magnifyPdf('tema7.pdf', 1);
				await mergePdfPage.viewer.rotatePageRight(90);
				await mergePdfPage.viewer.closeModal();

				await expect(page).toHaveScreenshot();

				await mergePdfPage.magnifyPdf('tema8.pdf', 1, 1);

				await mergePdfPage.viewer.rotatePageRight(90);
				await mergePdfPage.viewer.closeModal();

				await expect(page).toHaveScreenshot();

				await mergePdfPage.mergePdfs();

				await expect(page).toHaveURL('/en/merge-pdf/656211254552979471');

				const pages = await mergePdfPage.getScrollViewerPages();
				await expect(pages).toHaveCount(42);

				await mergePdfPage.waitResultPageToLoad(1);
				const firstPageRotation = await mergePdfPage.getResultPageRotation(1);
				await expect(firstPageRotation).toBe('90');

				await mergePdfPage.waitResultPageToLoad(2);
				const secondPageRotation = await mergePdfPage.getResultPageRotation(2);
				await expect(secondPageRotation).toBe('0');

				await expect(page).toHaveScreenshot();
			}
		);
	});

	theAssetTest.describe('Rotate pdf page left', () => {
		theAssetTest('Should rotate pdf page multiple times', async ({ page, mergePdfPage }) => {
			await mergePdfPage.goToMergeTool();

			await mergePdfPage.uploadFiles(['tema7.pdf']);

			await mergePdfPage.magnifyPdf('tema7.pdf', 1);

			await mergePdfPage.viewer.rotatePageLeft(270);

			await expect(page).toHaveScreenshot();

			await mergePdfPage.viewer.closeModal();
			await expect(page).toHaveScreenshot();

			await mergePdfPage.magnifyPdf('tema7.pdf', 1);
			await mergePdfPage.viewer.rotatePageLeft(180);
			await expect(page).toHaveScreenshot();

			await mergePdfPage.viewer.closeModal();
			await expect(page).toHaveScreenshot();
		});

		theAssetTest('Should rotate pdf page to the left and merge', async ({ page, mergePdfPage }) => {
			await mergePdfPage.goToMergeTool();

			await mergePdfPage.uploadFiles(['tema7.pdf', 'tema9.pdf']);

			await mergePdfPage.magnifyPdf('tema7.pdf', 1);

			await mergePdfPage.viewer.rotatePageLeft(270);
			await mergePdfPage.viewer.closeModal();

			await expect(page).toHaveScreenshot();

			await mergePdfPage.magnifyPdf('tema9.pdf', 1, 1);

			await mergePdfPage.viewer.rotatePageLeft(270);
			await mergePdfPage.viewer.closeModal();

			await expect(page).toHaveScreenshot();

			await mergePdfPage.mergePdfs();

			await expect(page).toHaveURL('/en/merge-pdf/14333617513308750762');

			const pages = await mergePdfPage.getScrollViewerPages();
			await expect(pages).toHaveCount(51);

			await mergePdfPage.waitResultPageToLoad(1);
			const firstPageRotation = await mergePdfPage.getResultPageRotation(1);
			await expect(firstPageRotation).toBe('270');

			await mergePdfPage.waitResultPageToLoad(2);
			const secondPageRotation = await mergePdfPage.getResultPageRotation(2);
			await expect(secondPageRotation).toBe('0');

			await expect(page).toHaveScreenshot();
		});
	});
});
