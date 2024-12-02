import { createWorkerImplementationProxy } from './createWorkerImplementationProxy';

class MockedClass {
	public count: number;

	constructor() {
		this.count = 0;
	}

	public fnOne = () => {};
	public fnTwo = () => {};
}

describe('WorkerProxy', () => {
	it('should create a WorkerProxy', () => {
		const b = createWorkerImplementationProxy(new MockedClass());
		console.log({ b });
	});
});
