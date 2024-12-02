/*type WorkerProxyMessage<T> = {
	id: string;
	args: T;
};

export const createWorkerImplementationProxy = <T extends object>(impl: T) => {
	const names = Object.getOwnPropertyNames(impl);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const fnNames = names.filter(name => typeof (impl as any)[name] === 'function');

	self.onmessage = async (event: MessageEvent<WorkerProxyMessage>) => {};
};*/

type WorkerProxyMessage<T> = {
	id: string;
	args: T extends (...args: unknown[]) => unknown ? Parameters<T> : never;
	methodName: keyof T;
};

export const createWorkerImplementationProxy = <T extends object>(impl: T) => {
	const fnNames = Object.getOwnPropertyNames(impl).filter(
		name => typeof impl[name as keyof T] === 'function'
	) as (keyof T)[];

	self.onmessage = async (event: MessageEvent<WorkerProxyMessage<T>>) => {
		const { methodName, args, id } = event.data;

		if (fnNames.includes(methodName)) {
			try {
				// eslint-disable-next-line @typescript-eslint/ban-types
				const result = await (impl[methodName] as Function).apply(impl, args);

				self.postMessage({ id, result });
			} catch (error) {
				self.postMessage({ id, error: error instanceof Error ? error.message : error });
			}
		} else {
			self.postMessage({ id, error: `Method ${String(methodName)} not found` });
		}
	};
};
