import { ElementHandle, Page } from '@playwright/test';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type BuildMergePdfPage = {
	page: Page;
};

export class MergePdfPage {
	private page: Page;

	constructor({ page }: BuildMergePdfPage) {
		this.page = page;
	}

	uploadFiles = async (page: Page, files: string[]) => {
		const fileChooserPromise = page.waitForEvent('filechooser');
		const uploadButton = this.getUploadButton();
		await uploadButton.click();
		const fileChooser = await fileChooserPromise;

		const pdfFiles = files.map(file => path.join(__dirname, '../../files/pdf', file));

		await fileChooser.setFiles(pdfFiles);
	};

	getUploadButton = () => this.page.getByText('Upload PDF');
	getMergePdfsButton = () => this.page.getByText('Merge PDFs');

	getMagnifierButton = (index = 0) => this.page.getByLabel(/magnify/i).nth(index);

	getSortableElementAt = (index: number) =>
		this.page
			.locator('[aria-roledescription="sortable"]')
			.nth(index)
			.elementHandle() as unknown as ElementHandle<HTMLElement>;

	getScrollViewerPages = () => this.page.getByTestId('scroll-viewer-page');

	mouseMoveBy = async (
		page: Page,
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
		await page.mouse.move(startX, startY);
		await page.mouse.down();

		// Esperar el tiempo especificado si se proporciona
		if (options?.delay) {
			await page.waitForTimeout(options.delay);
		}

		// Simular 'mousemove' al punto intermedio
		await page.mouse.move(startX + x / 2, startY + y / 2);

		// Simular 'mousemove' al punto final
		await page.mouse.move(startX + x, startY + y);

		// Esperar 100ms
		await page.waitForTimeout(100);

		// Simular 'mouseup'
		await page.mouse.up();

		// Esperar 250ms adicionales
		await page.waitForTimeout(250);

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
}
