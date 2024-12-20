type WorkerResult = {
	id: number;
	result?: unknown;
	error?: string;
};

export type AsyncMethods<T> = {
	[K in keyof T]: T[K] extends (...args: infer Args) => infer R
		? R extends Promise<unknown>
			? T[K]
			: (...args: Args) => Promise<R>
		: T[K];
};

export const createWorkerMainImplementation = <T extends object, E>(
	worker: Worker,
	onError: (error: E) => {}
) => {
	let messageId = 0;
	const pendingResponses = new Map<
		number,
		{ resolve: (result: unknown) => void; reject: (error: unknown) => void }
	>();

	worker.onmessage = (event: MessageEvent<WorkerResult>) => {
		const { id, result, error } = event.data;
		const response = pendingResponses.get(id);

		if (response) {
			const { resolve, reject } = response;
			pendingResponses.delete(id);
			if (error) {
				reject(onError(error as E));
				//console.error(`Error from worker method: ${error}`);
			} else {
				resolve(result);
			}
		}
	};

	return new Proxy({} as AsyncMethods<T>, {
		get(_, prop) {
			return (...args: unknown[]) => {
				return new Promise((resolve, reject) => {
					const id = ++messageId;
					pendingResponses.set(id, { resolve, reject });

					worker.postMessage({ methodName: prop as string, args, id });
				});
			};
		}
	});
};
