import { useState } from 'react';

import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons';

import { Box, HStack, styled } from '@theasset/style-system/jsx';

import { Button } from '../../Button';
import { Input, InputProps } from './Input';

export type PasswordProps = InputProps;

const PasswordInput = styled(Input, {
	base: {
		'&[type="password"]': {
			textStyle: 'xl'
		}
	}
});

export const Password = (props: PasswordProps) => {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => setIsVisible(prev => !prev);

	return (
		<HStack position="relative">
			<PasswordInput {...props} type={isVisible ? 'text' : 'password'} />
			<Box position="absolute" right={'2px'}>
				<Button type="button" variant="ghost" size="sm" onPress={toggleVisibility}>
					{isVisible ? <EyeOpenIcon /> : <EyeNoneIcon />}
				</Button>
			</Box>
		</HStack>
	);
};
