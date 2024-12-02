import { createWorkerMainImplementation } from './createWorkerMainImplementation';

class MockedClass {
	public count: number;

	constructor() {
		this.count = 0;
	}

	public fnOne = () => {};
	public fnTwo = () => {};
}

describe('A', () => {
	it('B', () => {
		const b = createWorkerMainImplementation<MockedClass>(new Worker(''));

		b.count;
	});
});
