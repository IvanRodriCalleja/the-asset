export type FileState = {
	id: string;
	hash: string;
	isEncrypted: boolean;
	name: string;
};

export type UpdatedFileState = Pick<FileState, 'hash' | 'id'> | Partial<FileState>;
