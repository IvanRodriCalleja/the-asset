'use client';

import { Dispatch, PropsWithChildren, ReactNode, SetStateAction } from 'react';

import { UploadIcon } from '@radix-ui/react-icons';
import { Accept, useDropzone } from 'react-dropzone';

import { TheAssetFile } from '@theasset/file/domain/the-asset-file';
import { css } from '@theasset/style-system/css';
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

type FilePickerPreviewProps<T> = {
	files: TheAssetFile<T>[];
	setFiles: Dispatch<SetStateAction<TheAssetFile<T>[]>>;
};

interface FilePickerProps<T extends FileMetadata = FileMetadata> {
	buttonText: string;
	accept?: Accept;
	metadata: T;
	preview(props: FilePickerPreviewProps<T>): ReactNode;
}

export type FileMetadata = Record<string, unknown>;

export const FilePicker = <T extends FileMetadata>({
	accept,
	buttonText,
	children,
	metadata,
	preview
}: PropsWithChildren<FilePickerProps<T>>) => {
	const { files, onChange, setFiles } = useFilePickerState<T>(metadata as T);

	const { getRootProps, getInputProps, open, isDragAccept, isDragReject } = useDropzone({
		accept,
		noClick: true,
		onDropAccepted: onChange
	});

	const hasFiles = files.length > 0;

	return (
		<DropZoneArea {...getRootProps()}>
			{(isDragAccept || isDragReject) && <DragOverlay />}
			<Stack>
				{!hasFiles && children}
				{files.length === 0 && (
					<Box padding={4} marginInline="auto" width="full" maxWidth="500px">
						<Button size="2xl" onPress={open} className={css({ width: 'full' })}>
							<UploadIcon /> {buttonText}
						</Button>
					</Box>
				)}
				{files.length > 0 && preview({ files, setFiles })}
			</Stack>
			<input {...getInputProps()} />
		</DropZoneArea>
	);
};
