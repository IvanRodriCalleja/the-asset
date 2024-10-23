import { ElementHandle, Page, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { UtilsPage } from './UtilsPage';
import { ViewerPage } from './shared/ViewerPage';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type BuildMergePdfPage = {
	page: Page;
};

export class MergePdfPage {
	private page: Page;
	public viewer: ViewerPage;
	public utils: UtilsPage;

	constructor({ page }: BuildMergePdfPage) {
		this.page = page;
		this.viewer = new ViewerPage({ page });
		this.utils = new UtilsPage({ page });
	}

	goToMergeTool = async () => {
		await this.page.goto('/merge-pdf');
		await this.waitForWasmFiles();
	};

	waitForWasmFiles = async () => {
		const pdfiumWasmRegex = /pdfium.[a-f0-9]{8,}\.wasm$/;
		await this.page.waitForResponse(
			response => pdfiumWasmRegex.test(response.url()) && response.status() === 200
		);

		const pdfToolsWasmRegex = /pdf_tools_bg.[a-f0-9]{8,}\.wasm$/;

		await this.page.waitForResponse(
			response => pdfToolsWasmRegex.test(response.url()) && response.status() === 200
		);
	};

	uploadFiles = async (files: string[]) => {
		const fileChooserPromise = this.page.waitForEvent('filechooser');
		const uploadButton = this.getUploadButton();
		await uploadButton.click();
		const fileChooser = await fileChooserPromise;

		const pdfFiles = files.map(file => path.join(__dirname, '../../files/pdf', file));

		await fileChooser.setFiles(pdfFiles);
	};

	getUploadButton = () => this.page.getByText('Upload PDF');
	getMergePdfsButton = () => this.page.getByText('Merge PDFs');

	getMagnifierButton = (index = 0) => this.page.getByLabel(/magnify/i).nth(index);
	getRotateLeftButton = (index = 0) => this.page.getByLabel(/rotate PDF left/i).nth(index);
	getRotateRightButton = (index = 0) => this.page.getByLabel(/rotate PDF right/i).nth(index);
	getRemovePdfButton = (index = 0) => this.page.getByLabel(/remove PDF/i).nth(index);

	getPdfItems = () => this.page.getByTestId('pdf-thumbnail');

	getPdfNameOrder = async (fakeAssertCount: number) => {
		const pdfNames = await this.page.getByTestId('pdf-name');

		await expect(pdfNames).toHaveCount(fakeAssertCount);

		const count = await await pdfNames.count();

		const pdfNamesPromises = [...new Array(count)].map(
			async (_, index) => (await pdfNames.nth(index).textContent()) as string
		);

		return Promise.all(pdfNamesPromises);
	};

	getSortableElementAt = (index: number) =>
		this.page
			.locator('[aria-roledescription="sortable"]')
			.nth(index)
			.elementHandle() as unknown as ElementHandle<HTMLElement>;

	getScrollViewerPages = () => this.page.getByTestId('scroll-viewer-page');

	getPdfPagedBadge = (pages: number, index = 0) =>
		this.page
			.getByTestId('pdf-thumbnail')
			.nth(index)
			.getByText(`${pages} ${pages > 1 ? 'pages' : 'page'}`);

	mouseMoveBy = async (
		element: ElementHandle<HTMLElement> | null,
		x: number,
		y: number,
		options?: { delay: number }
	) => {
		if (!element) return;

		const boundingBox = await element.boundingBox();
		if (!boundingBox) {
			throw new Error('No se pudo obtener el bounding box del elemento.');
		}

		const { x: initialX, y: initialY, width, height } = boundingBox;

		const startX = Math.floor(initialX + width / 2);
		const startY = Math.floor(initialY + height / 2);

		// Simular 'mousedown' en la posición inicial
		await this.page.mouse.move(startX, startY);
		await this.page.mouse.down();

		// Esperar el tiempo especificado si se proporciona
		if (options?.delay) {
			await this.page.waitForTimeout(options.delay);
		}

		// Simular 'mousemove' al punto intermedio
		await this.page.mouse.move(startX + x / 2, startY + y / 2);

		// Simular 'mousemove' al punto final
		await this.page.mouse.move(startX + x, startY + y);

		// Esperar 100ms
		await this.page.waitForTimeout(100);

		// Simular 'mouseup'
		await this.page.mouse.up();

		// Esperar 250ms adicionales
		await this.page.waitForTimeout(250);

		// Obtener la posición final del elemento
		const finalBoundingBox = await element.boundingBox();
		if (!finalBoundingBox) {
			throw new Error('No se pudo obtener el bounding box final del elemento.');
		}

		const deltaX = Math.round(finalBoundingBox.x - initialX);
		const deltaY = Math.round(finalBoundingBox.y - initialY);

		return {
			initialRect: boundingBox,
			finalRect: finalBoundingBox,
			delta: { x: deltaX, y: deltaY }
		};
	};

	dragAndDropFile = async (selector: string, files: string[]) => {
		const buffers = files.map(file => {
			const filePath = path.join(__dirname, '../../files/pdf', file);
			return readFileSync(filePath).toString('base64');
		});

		const dataTransfer = await this.page.evaluateHandle(
			async ({ files }) => {
				const dt = new DataTransfer();

				for (let i = 0; i < files.length; i++) {
					const blobData = await fetch(
						`data:application/octet-stream;base64,${files[i]?.buffer}`
					).then(res => res.blob());

					const file = new File([blobData], files[i]!.name, { type: 'application/pdf' });
					dt.items.add(file);
				}

				return dt;
			},
			{
				files: files.map((file, index) => ({
					name: file,
					buffer: buffers[index]
				}))
			}
		);

		await this.page.dispatchEvent(selector, 'drop', { dataTransfer });
	};

	mergePdfs = async () => {
		const mergeButton = this.getMergePdfsButton();
		await mergeButton.click();
	};

	rotatePdfRight = async (index = 0) => {
		const rotateRightButton = this.getRotateRightButton(index);
		await rotateRightButton.click();

		await this.utils.waitForAction('rotate-pdf-end');
	};

	rotatePdfLeft = async (index = 0) => {
		const rotateLeftButton = this.getRotateLeftButton(index);
		await rotateLeftButton.click();

		await this.utils.waitForAction('rotate-pdf-end');
	};

	magnifyPdf = async (pdfName: string, currentPage: number, index = 0) => {
		const magnifyButton = this.getMagnifierButton(index);
		await magnifyButton.click();

		await this.viewer.waitForViewer(pdfName, currentPage);
	};

	waitResultPageToLoad = (page: number) =>
		this.page.waitForSelector(`img[alt="${page === 1 ? 'page' : 'pages'} ${page}"]`);
}
