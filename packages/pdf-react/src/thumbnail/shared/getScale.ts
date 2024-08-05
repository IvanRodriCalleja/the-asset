export const isVertical = (width: number, height: number, rotation: 0 | 90 | 180 | 270) => {
	if (rotation === 0 || rotation === 180) {
		return width < height;
	}

	return width > height;
};

export const getRatio = (width: number, height: number, rotation: 0 | 90 | 180 | 270) => {
	if (rotation === 0 || rotation === 180) {
		return height / width;
	}

	return width / height;
};

export const getScale = (width: number, height: number, rotation: 0 | 90 | 180 | 270) => {
	const isDefaultVerticalImage = isVertical(width, height, 0);
	const isVerticalImage = isVertical(width, height, rotation);

	if (isDefaultVerticalImage === isVerticalImage) return 'none';

	if (isDefaultVerticalImage && !isVerticalImage) return 'horizontal';

	return 'vertical';
};
