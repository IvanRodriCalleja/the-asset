'use client';

import { PropsWithChildren, forwardRef } from 'react';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';

import { styled } from '@theasset/style-system/jsx';

import { useDynamicSegments } from '../utils/useDynamicSegments';
import { type ButtonVariant, button } from './Button';

const TheAssetLink = styled(NextLink, button);

export type LinkProps = NextLinkProps &
	Omit<ButtonVariant, 'variant'> & {
		className?: string;
		variant: NonNullable<ButtonVariant>['variant'] | 'none';
		size?: NonNullable<ButtonVariant>['size'];
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
