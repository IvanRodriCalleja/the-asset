'use client';

import { PropsWithChildren, createContext, use } from 'react';

import { Accept, DropzoneState, useDropzone } from 'react-dropzone';

import { css } from '@theasset/style-system/css';
import { styled } from '@theasset/style-system/jsx';

import { ButtonProps, Button as TheButton } from './Button';

const DropZoneArea = styled('div', {
	base: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		width: 'full',
		height: 'full'
	}
});

const DragOverlay = styled('div', {
	base: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: 'full',
		height: 'full',
		background: 'rgba(0, 0, 0, .8)',
		zIndex: 1
	}
});

type DropzoneProps = {
	accept?: Accept | undefined;
	onChange: (files: File[]) => void;
};

const DropzoneContext = createContext<DropzoneState>({
	isFocused: false,
	isDragActive: false,
	isDragAccept: false,
	isDragReject: false,
	isFileDialogActive: false,
	acceptedFiles: [],
	fileRejections: [],
	rootRef: {
		current: null as unknown as HTMLElement
	},
	inputRef: {
		current: null as unknown as HTMLInputElement
	},
	getRootProps: () => {
		throw new Error('Dropzone.Root must be used as a parent of Dropzone.Area');
	},
	getInputProps: () => {
		throw new Error('Dropzone.Root must be used as a parent of Dropzone.Area');
	},
	open: () => {
		throw new Error('Dropzone.Root must be used as a parent of Dropzone.Area');
	}
});

export const Root = ({ accept, children, onChange }: PropsWithChildren<DropzoneProps>) => {
	const dropzoneState = useDropzone({
		accept,
		noClick: true,
		useFsAccessApi: false,
		onDropAccepted: onChange
	});

	return <DropzoneContext.Provider value={dropzoneState}>{children}</DropzoneContext.Provider>;
};

const useDropzoneContext = () => use(DropzoneContext);

export const Area = ({ children }: PropsWithChildren) => {
	const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzoneContext();

	return (
		<DropZoneArea data-testid="file-drop" {...getRootProps()}>
			{(isDragAccept || isDragReject) && <DragOverlay />}
			{children}
			<input {...getInputProps()} />
		</DropZoneArea>
	);
};

export const Button = ({ children, ...props }: PropsWithChildren<ButtonProps>) => {
	const { open } = useDropzoneContext();

	return (
		<TheButton {...props} onPress={open} className={css({ width: 'full' })}>
			{children}
		</TheButton>
	);
};
