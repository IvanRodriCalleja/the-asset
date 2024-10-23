// getByLabel('Go to first page')
import { Page } from '@playwright/test';

type BuildViewerPage = {
	page: Page;
};

export class ViewerPage {
	private page: Page;

	constructor({ page }: BuildViewerPage) {
		this.page = page;
	}

	getGoToFirstPageButton = () => this.page.getByRole('alertdialog').getByLabel('Go to first page');
	getGoToLastPageButton = () => this.page.getByRole('alertdialog').getByLabel('Go to last page');
	getGoToNextPageButton = () => this.page.getByRole('alertdialog').getByLabel('Go to next page');
	getGoToPreviousPageButton = () =>
		this.page.getByRole('alertdialog').getByLabel('Go to previous page');

	getCurrentPage = () => this.page.getByRole('alertdialog').getByLabel('Current page');
	getTotalPages = (totalPages: string) =>
		this.page.getByRole('alertdialog').getByText(totalPages, { exact: true });
	getRemoveButton = () => this.page.getByRole('alertdialog').getByLabel('Remove page');

	getRotateRightButton = () => this.page.getByRole('alertdialog').getByLabel('Rotate page right');
	getRotateLeftButton = () => this.page.getByRole('alertdialog').getByLabel('Rotate page left');

	rotatePageRight = async () => {
		const button = this.getRotateRightButton();
		await button.click();
	};

	rotatePageLeft = async () => {
		const button = this.getRotateLeftButton();
		await button.click();
	};

	goToFirstPage = async () => {
		const button = this.getGoToFirstPageButton();
		await button.click();
	};

	goToLastPage = async () => {
		const button = this.getGoToLastPageButton();
		await button.click();
	};

	goToNextPage = async () => {
		const button = this.getGoToNextPageButton();
		await button.click();
	};

	goToPreviousPage = async () => {
		const button = this.getGoToPreviousPageButton();
		await button.click();
	};

	goToPage = async (page: number, pdfName: string, rollbackPage?: number) => {
		const input = this.getCurrentPage();
		await input.fill(String(page));
		await input.press('Enter');

		await this.waitForViewer(pdfName, rollbackPage || page);
	};

	removePage = async () => {
		const button = this.getRemoveButton();
		await button.click();
	};

	closeModal = async () => {
		const button = this.page.getByRole('alertdialog').getByLabel('Close modal');
		await button.click();

		// NOTE: Wait for the modal to close
	};

	waitForViewer = async (pdfName: string, currentPage: number) =>
		await this.page
			.getByRole('alertdialog')
			.getByRole('img', { name: `${pdfName} - ${currentPage}` });
}
