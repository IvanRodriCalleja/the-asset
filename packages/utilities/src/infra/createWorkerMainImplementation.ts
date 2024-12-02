type WorkerResult = {
	id: number;
	result?: unknown;
	error?: string;
};

type AsyncMethods<T> = {
	[K in keyof T]: T[K] extends (...args: infer Args) => infer R
		? R extends Promise<unknown>
			? T[K]
			: (...args: Args) => Promise<R>
		: T[K];
};

export const createWorkerMainImplementation = <T extends object>(worker: Worker) => {
	let messageId = 0;
	const pendingResponses = new Map<number, (result: unknown) => void>();

	worker.onmessage = (event: MessageEvent<WorkerResult>) => {
		const { id, result, error } = event.data;
		const resolve = pendingResponses.get(id);

		if (resolve) {
			pendingResponses.delete(id);
			if (error) {
				console.error(`Error from worker method: ${error}`);
				throw new Error(error);
			} else {
				resolve(result);
			}
		}
	};

	return new Proxy({} as AsyncMethods<T>, {
		get(_, prop) {
			return (...args: unknown[]) => {
				return new Promise(resolve => {
					const id = ++messageId;
					pendingResponses.set(id, resolve);

					worker.postMessage({ methodName: prop as string, args, id });
				});
			};
		}
	});
};
