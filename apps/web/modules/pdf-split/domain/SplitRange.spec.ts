import { describe } from 'node:test';

import { SplitRange, addRange, removeRangeByIndex, resetRangeId } from './SplitRange';

describe('SplitRange', () => {
	beforeEach(() => {
		resetRangeId();
	});

	describe('addRange', () => {
		it('Should add a range from 0 to N when ranges is empty', () => {
			// Given
			const ranges: SplitRange[] = [];
			const index = 3;

			// When
			const result = addRange(ranges, index);

			// Then
			expect(result).toEqual([{ from: 0, to: 3, name: 'range 1' }]);
		});

		it('Should add a range from 0 to 0 when index is 0', () => {
			// Given
			const ranges: SplitRange[] = [];
			const index = 0;

			// When
			const result = addRange(ranges, index);

			// Then
			expect(result).toEqual([{ from: 0, to: 0, name: 'range 1' }]);
		});

		it('Should split a range in two when index is in the middle of the range', () => {
			// Given
			const ranges: SplitRange[] = [{ from: 0, to: 4, name: 'custom range' }];
			const index = 2;

			// When
			const result = addRange(ranges, index);

			// Then
			expect(result).toEqual([
				{ from: 0, to: 2, name: 'custom range' },
				{ from: 3, to: 4, name: 'range 1' }
			]);
		});

		it('Should split a range in two when index is in the middle of the range when multiple ranges', () => {
			// Given
			const ranges: SplitRange[] = [
				{ from: 0, to: 4, name: 'custom range 1' },
				{ from: 5, to: 8, name: 'custom range 2' },
				{ from: 9, to: 12, name: 'custom range 3' }
			];
			const index = 7;

			// When
			const result = addRange(ranges, index);

			// Then
			expect(result).toEqual([
				{ from: 0, to: 4, name: 'custom range 1' },
				{ from: 5, to: 7, name: 'custom range 2' },
				{ from: 8, to: 8, name: 'range 1' },
				{ from: 9, to: 12, name: 'custom range 3' }
			]);
		});

		it('Should generate a new range from nearest range when index is out of any existing range', () => {
			// Given
			const ranges: SplitRange[] = [{ from: 0, to: 4, name: 'custom range' }];
			const index = 8;

			// When
			const result = addRange(ranges, index);

			// Then
			expect(result).toEqual([
				{ from: 0, to: 4, name: 'custom range' },
				{ from: 5, to: 8, name: 'range 1' }
			]);
		});

		it('Should generate a new range  at the beginning when no nearest range (it means is for position 0)', () => {
			// Given
			const ranges: SplitRange[] = [{ from: 5, to: 8, name: 'custom range' }];
			const index = 3;

			// When
			const result = addRange(ranges, index);

			// Then
			expect(result).toEqual([
				{ from: 0, to: 3, name: 'range 1' },
				{ from: 5, to: 8, name: 'custom range' }
			]);
		});
	});

	describe('removeRangeByIndex', () => {
		it('Should remove a range by index', () => {
			// Given
			const ranges: SplitRange[] = [
				{ from: 0, to: 4, name: 'custom range 1' },
				{ from: 5, to: 8, name: 'custom range 2' },
				{ from: 9, to: 12, name: 'custom range 3' }
			];
			const index = 8;

			// When
			const result = removeRangeByIndex(ranges, index);

			// Then
			expect(result).toEqual([
				{ from: 0, to: 4, name: 'custom range 1' },
				{ from: 9, to: 12, name: 'custom range 3' }
			]);
		});
	});
});
