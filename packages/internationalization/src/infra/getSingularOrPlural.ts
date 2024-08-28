type Pluralizable = {
	singular: string;
	plural: string;
};

export const getSingularOrPlural = <T extends Pluralizable>(obj: T, count: number): string => {
	return count === 1 ? obj.singular : obj.plural;
};
