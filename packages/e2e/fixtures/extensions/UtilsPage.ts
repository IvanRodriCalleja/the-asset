import { Page } from '@playwright/test';

declare global {
	interface Window {
		resolveEvent: (data: string) => void;
	}
}

type BuildUtilsPage = {
	page: Page;
};

export class UtilsPage {
	private page: Page;
	private eventPromises: Map<string, () => void>;
	private isListening: boolean;

	constructor({ page }: BuildUtilsPage) {
		this.page = page;
		this.eventPromises = new Map();
		this.isListening = false;
	}

	sleep = async (ms: number) => {
		await new Promise(resolve => setTimeout(resolve, ms));
	};

	async waitForAction(eventName: string): Promise<void> {
		if (!this.isListening) {
			await this.page.exposeFunction('resolveEvent', (data: string) => {
				const resolver = this.eventPromises.get(data);
				if (resolver) {
					resolver();
					this.eventPromises.delete(data);
				}
			});

			this.page.evaluate(eventName => {
				const listener = (event: MessageEvent) => {
					if (event.data === eventName) {
						window.removeEventListener('message', listener);
						window.resolveEvent(event.data);
					}
				};
				window.addEventListener('message', listener);
			}, eventName);

			this.isListening = true;
		}

		if (this.eventPromises.has(eventName)) {
			return this.eventPromises.get(eventName);
		}

		return new Promise<void>(resolve => {
			const notify = async () => {
				await this.sleep(100);
				resolve();
			};

			this.eventPromises.set(eventName, notify);
		});
	}
}
