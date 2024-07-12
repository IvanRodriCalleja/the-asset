import { FC, SVGProps } from 'react';

export type Tool = {
	name: string;
	description: string;
	href: string;
	icon: FC<SVGProps<SVGElement>>;
};
