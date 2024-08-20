'use client';

import { PropsWithChildren, forwardRef } from 'react';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';

import { styled } from '@theasset/style-system/jsx';

import { useDynamicSegments } from '../utils/useDynamicSegments';
import { type ButtonVariant, buttonRecipe } from './Button';

const TheAssetLink = styled(NextLink, buttonRecipe);

export type LinkProps = NextLinkProps &
	Omit<ButtonVariant, 'variant'> & {
		className?: string;
		variant: ButtonVariant['variant'] | 'none';
	};

export const TheLink = forwardRef<HTMLAnchorElement, PropsWithChildren<LinkProps>>(
	({ variant = 'link', ...props }, ref) => {
		const href = useDynamicSegments(props.href.toString());

		if (variant === 'none') {
			return <NextLink {...props} ref={ref} href={href} />;
		}

		return <TheAssetLink {...props} ref={ref} href={href} variant={variant} />;
	}
);

TheLink.displayName = 'Link';
