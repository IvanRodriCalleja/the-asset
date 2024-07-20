'use client';

import { PropsWithChildren, ReactNode } from 'react';

import { Accept, useDropzone } from 'react-dropzone';
import { Box, Stack, styled } from '@theasset/style-system/jsx';
import { Button } from '../Button';
import { useFilePickerState } from './filePicker/useFilePickerState';

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

export type TheAssetFileItem<T> = {
	id: string;
	buffer: Uint8Array;
	name: string;
	kbSize: string;
	metadata: T;
};

type FilePickerChildrenProps<T> = {
	files: TheAssetFileItem<T>[];
};

interface FilePickerProps<T extends FileMetadata = FileMetadata> {
	buttonText: string;
	accept?: Accept;
	metadata: T;
	preview(props: FilePickerChildrenProps<T>): ReactNode;
}

export type FileMetadata = Record<string, unknown>;

export const FilePicker = <T extends FileMetadata>({
	accept,
	buttonText,
	children,
	metadata,
	preview
}: PropsWithChildren<FilePickerProps>) => {
	const { files, onChange } = useFilePickerState<T>(metadata as T);

	const { getRootProps, getInputProps, open, isDragAccept, isDragReject } = useDropzone({
		accept,
		noClick: true,
		onDropAccepted: onChange
	});

	return (
		<DropZoneArea {...getRootProps()}>
			{(isDragAccept || isDragReject) && <DragOverlay />}
			<Stack>
				{children}
				{files.length === 0 && (
					<Box display="flex" justifyContent="center">
						<Button size="lg" onPress={open}>
							{buttonText}
						</Button>
					</Box>
				)}
				{files.length > 0 && preview({ files })}
			</Stack>
			<input {...getInputProps()} />
		</DropZoneArea>
	);
};
