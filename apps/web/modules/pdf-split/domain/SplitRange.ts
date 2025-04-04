export type SplitRange = {
	id: number;
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
			{ id: rangeId, from: 0, to: index, name: `range ${rangeId}.pdf`, isFocused: false }
		];
		rangeId++;
		return newRange;
	} else {
		const [isInRange] = isFileInRange(ranges, index);

		if (isInRange) {
			const newRange = ranges.reduce((acc, range) => {
				if (range.from <= index && range.to >= index) {
					const a: SplitRange = {
						id: range.id,
						from: range.from,
						to: index,
						name: range.name,
						isFocused: range.isFocused
					};
					const b: SplitRange = {
						id: rangeId,
						from: index + 1,
						to: range.to,
						name: `range ${rangeId}.pdf`,
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
					id: rangeId,
					from: 0,
					to: index,
					name: `range ${rangeId}.pdf`,
					isFocused: false
				};
				rangeId++;
				return [newRange, ...ranges];
			}

			const newRange = [...ranges];
			const newRangeIndex = rangeIndex + 1;

			newRange.splice(newRangeIndex, 0, {
				id: rangeId,
				from: ranges[rangeIndex]!.to + 1,
				to: index,
				name: `range ${rangeId}.pdf`,
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

export const changeRangeFrom = (
	ranges: SplitRange[],
	index: number,
	value: number
): SplitRange[] => {
	if (value < 0) {
		return ranges;
	}

	if (value > ranges[index]!.to) {
		return ranges;
	}

	const prevIndex = index - 1;
	const prevRange = ranges[prevIndex];
	const newRanges = [...ranges];

	if (prevRange && value <= prevRange.to) {
		const newPrevToValue = value - 1;

		newRanges[prevIndex] = {
			...newRanges[prevIndex]!,
			to: newPrevToValue
		};

		newRanges[index] = {
			...newRanges[index]!,
			from: value
		};

		if (newPrevToValue < newRanges[prevIndex].from) {
			newRanges.splice(prevIndex, 1);
		}

		return newRanges;
	}

	return ranges.map((range, i) => ({
		...range,
		from: i === index ? value : range.from
	}));
};

export const changeRangeTo = (
	ranges: SplitRange[],
	index: number,
	value: number,
	filesLength: number
) => {
	if (value >= filesLength) {
		return ranges;
	}

	if (value < ranges[index]!.from) {
		return ranges;
	}

	const nextIndex = index + 1;
	const nextRange = ranges[nextIndex];
	const newRanges = [...ranges];

	if (nextRange && value >= nextRange.from) {
		const newNextFromValue = value + 1;

		newRanges[nextIndex] = {
			...newRanges[nextIndex]!,
			from: newNextFromValue
		};

		newRanges[index] = {
			...newRanges[index]!,
			to: value
		};

		if (newNextFromValue > newRanges[nextIndex].to) {
			newRanges.splice(nextIndex, 1);
		}

		return newRanges;
	}

	return ranges.map((range, i) => ({
		...range,
		to: i === index ? value : range.to
	}));
};

export const splitInEqualRanges = (totalPages: number, splitAfterNPages: number): SplitRange[] => {
	const totalRanges = Math.ceil(totalPages / splitAfterNPages);

	const ranges = [...Array(totalRanges)].map((_, i) => {
		const from = i * splitAfterNPages;
		const to = Math.min(from + splitAfterNPages - 1, totalPages - 1);

		rangeId++;
		return {
			id: rangeId,
			from,
			to,
			name: `range ${rangeId}.pdf`,
			isFocused: false
		} as SplitRange;
	});

	rangeId++;

	return ranges;
};
