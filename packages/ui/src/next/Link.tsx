'use client';

import { PropsWithChildren, forwardRef } from 'react';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';

import { styled } from '@theasset/style-system/jsx';

import { useDynamicSegments } from '../../utils/useDynamicSegments';
import { ButtonVariant, type ButtonVariants, button } from '../Button';

const TheAssetLink = styled(NextLink, button);

export type LinkProps = NextLinkProps &
	Omit<ButtonVariants, 'variant'> & {
		className?: string;
		variant: ButtonVariant | 'none';
		size?: NonNullable<ButtonVariants>['size'];
	};

export const Link = forwardRef<HTMLAnchorElement, PropsWithChildren<LinkProps>>(
	({ variant = 'link', ...props }, ref) => {
		const href = useDynamicSegments(props.href.toString());

		if (variant === 'none') {
			return <NextLink {...props} ref={ref} href={href} />;
		}

		return <TheAssetLink {...props} ref={ref} href={href} variant={variant} />;
	}
);

Link.displayName = 'Link';
