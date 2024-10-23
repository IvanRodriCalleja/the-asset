declare global {
	interface Window {
		resolveEvent: (data: string) => void;
	}
}

export class UtilsPage {
	sleep = async (ms: number) => {
		await new Promise(resolve => setTimeout(resolve, ms));
	};
}
