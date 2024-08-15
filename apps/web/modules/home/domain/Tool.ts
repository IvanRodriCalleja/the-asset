import { FC, SVGProps } from 'react';

export type Tool = {
	name: string;
	description: string;
	href: string;
	icon: FC<SVGProps<SVGElement>>;
	color: '#e92a67' | '#a853ba' | '#2a8af6' | 'rgba(42,138,246,0)';
};
