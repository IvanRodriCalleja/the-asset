export type SplitRange = {
	name: string;
	from: number;
	to: number;
	isFocused: boolean;
};

let rangeId = 1;

export const resetRangeId = () => {
	rangeId = 1;
};

export const addRange = (ranges: SplitRange[], index: number): SplitRange[] => {
	if (ranges.length === 0) {
		const newRange: SplitRange[] = [
			{ from: 0, to: index, name: `range ${rangeId}`, isFocused: false }
		];
		rangeId++;
		return newRange;
	} else {
		const [isInRange] = isFileInRange(ranges, index);

		if (isInRange) {
			const newRange = ranges.reduce((acc, range) => {
				if (range.from <= index && range.to >= index) {
					const a: SplitRange = {
						from: range.from,
						to: index,
						name: range.name,
						isFocused: range.isFocused
					};
					const b: SplitRange = {
						from: index + 1,
						to: range.to,
						name: `range ${rangeId}`,
						isFocused: false
					};

					rangeId++;

					return [...acc, a, b];
				}

				return [...acc, range];
			}, [] as SplitRange[]);

			return newRange;
		} else {
			// Should generate a new range from nearest range (close .to) when index is out of any existing range

			const rangeIndex = getClosestRangeIndex(ranges, index);

			if (rangeIndex === -1) {
				const newRange: SplitRange = {
					from: 0,
					to: index,
					name: `range ${rangeId}`,
					isFocused: false
				};
				rangeId++;
				return [newRange, ...ranges];
			}

			const newRange = [...ranges];
			const newRangeIndex = rangeIndex + 1;

			newRange.splice(newRangeIndex, 0, {
				from: ranges[rangeIndex]!.to + 1,
				to: index,
				name: `range ${rangeId}`,
				isFocused: false
			});

			rangeId++;

			return newRange;
		}
	}
};

export const removeRangeByIndex = (ranges: SplitRange[], index: number): SplitRange[] => {
	const rangeIndex = ranges.findIndex(range => range.to === index);
	const newRange = [...ranges];

	newRange.splice(rangeIndex, 1);
	return newRange;
};

const getClosestRangeIndex = (ranges: SplitRange[], index: number): number => {
	let closestIndex = -1;
	let closestTo = -Infinity;

	ranges.forEach((range, i) => {
		if (range.to < index && range.to > closestTo) {
			closestIndex = i;
			closestTo = range.to;
		}
	});

	return closestIndex;
};

export const isFileInRange = (
	ranges: SplitRange[],
	fileIndex: number
): [boolean, SplitRange | undefined] => {
	const range = ranges.find(range => range.from <= fileIndex && range.to >= fileIndex);

	return [range !== undefined, range];
};

export const isFileEndOfRange = (ranges: SplitRange[], fileIndex: number): boolean =>
	ranges.some(range => range.to === fileIndex);
