// Definiciones de funciones
declare module 'coherentpdf/dist/coherentpdf.browser.min.js' {
	type PdfDocument = number;
	type PageRange = number[];
	type Permission = number;
	type EncryptionMethod = number;

	function version(): string;
	function setFast(): void;
	function setSlow(): void;
	function deletePdf(pdf: PdfDocument): void;
	function onexit(): void;

	function fromFile(filename: string, userpw: string): PdfDocument;
	function fromFileLazy(filename: string, userpw: string): PdfDocument;
	function fromMemory(data: Uint8Array, userpw: string): PdfDocument;
	function fromMemoryLazy(data: Uint8Array, userpw: string): PdfDocument;

	function startEnumeratePDFs(): number;
	function enumeratePDFsKey(n: number): number;
	function enumeratePDFsInfo(n: number): number;
	function endEnumeratePDFs(): void;

	function ptOfCm(i: number): number;
	function ptOfMm(i: number): number;
	function ptOfIn(i: number): number;
	function cmOfPt(i: number): number;
	function mmOfPt(i: number): number;
	function inOfPt(i: number): number;

	function parsePagespec(pdf: PdfDocument, pagespec: string): PageRange;
	function validatePagespec(pagespec: string): boolean;
	function stringOfPagespec(pdf: PdfDocument, r: PageRange): string;

	function blankRange(): PageRange;
	function range(f: number, t: number): PageRange;
	function all(pdf: PdfDocument): PageRange;
	function even(r_in: PageRange): PageRange;
	function odd(r_in: PageRange): PageRange;
	function rangeUnion(a: PageRange, b: PageRange): PageRange;
	function difference(a: PageRange, b: PageRange): PageRange;
	function removeDuplicates(a: PageRange): PageRange;
	function rangeLength(r: PageRange): number;
	function rangeGet(r: PageRange, n: number): number;
	function rangeAdd(r: PageRange, page: number): void;
	function isInRange(r: PageRange, page: number): boolean;

	function pages(pdf: PdfDocument): number;
	function pagesFast(password: string, filename: string): number;
	function pagesFastMemory(password: string, data: Uint8Array): number;

	function toFile(pdf: PdfDocument, filename: string, linearize: boolean, make_id: boolean): void;
	function toFileExt(
		pdf: PdfDocument,
		filename: string,
		linearize: boolean,
		make_id: boolean,
		preserve_objstm: boolean,
		generate_objstm: boolean,
		compress_objstm: boolean
	): void;
	function toMemory(pdf: PdfDocument, linearize: boolean, make_id: boolean): Uint8Array;
	function toMemoryExt(
		pdf: PdfDocument,
		linearize: boolean,
		make_id: boolean,
		preserve_objstm: boolean,
		generate_objstm: boolean,
		compress_objstm: boolean
	): Uint8Array;

	function isEncrypted(pdf: PdfDocument): boolean;
	function decryptPdf(pdf: PdfDocument, userpw: string): void;
	function decryptPdfOwner(pdf: PdfDocument, ownerpw: string): void;

	// Permisos
	const noEdit: Permission;
	const noPrint: Permission;
	const noCopy: Permission;
	const noAnnot: Permission;
	const noForms: Permission;
	const noExtract: Permission;
	const noAssemble: Permission;
	const noHqPrint: Permission;

	// Métodos de encriptación
	const pdf40bit: EncryptionMethod;
	const pdf128bit: EncryptionMethod;
	const aes128bitfalse: EncryptionMethod;
	const aes128bittrue: EncryptionMethod;
	const aes256bitfalse: EncryptionMethod;
	const aes256bittrue: EncryptionMethod;
	const aes256bitisofalse: EncryptionMethod;
	const aes256bitisotrue: EncryptionMethod;

	function toFileEncrypted(
		pdf: PdfDocument,
		encryption_method: EncryptionMethod,
		permissions: Permission[],
		ownerpw: string,
		userpw: string,
		linearize: boolean,
		makeid: boolean,
		filename: string
	): void;
	function toMemoryEncrypted(
		pdf: PdfDocument,
		encryption_method: EncryptionMethod,
		permissions: Permission[],
		ownerpw: string,
		userpw: string,
		linearize: boolean,
		makeid: boolean
	): Uint8Array;
	function toFileEncryptedExt(
		pdf: PdfDocument,
		encryption_method: EncryptionMethod,
		permissions: Permission[],
		ownerpw: string,
		userpw: string,
		linearize: boolean,
		makeid: boolean,
		preserve_objstm: boolean,
		generate_objstm: boolean,
		compress_objstm: boolean,
		filename: string
	): void;
	function toMemoryEncryptedExt(
		pdf: PdfDocument,
		encryption_method: EncryptionMethod,
		permissions: Permission[],
		ownerpw: string,
		userpw: string,
		linearize: boolean,
		makeid: boolean,
		preserve_objstm: boolean,
		generate_objstm: boolean,
		compress_objstm: boolean
	): Uint8Array;

	function hasPermission(pdf: PdfDocument, permission: Permission): boolean;
	function encryptionKind(pdf: PdfDocument): EncryptionMethod;

	// Merging and Splitting
	function mergeSimple(pdfs: PdfDocument[]): PdfDocument;
	function merge(
		pdfs: PdfDocument[],
		retain_numbering: boolean,
		remove_duplicate_fonts: boolean
	): PdfDocument;
	function mergeSame(
		pdfs: PdfDocument[],
		retain_numbering: boolean,
		remove_duplicate_fonts: boolean,
		ranges: PageRange[]
	): PdfDocument;
	function selectPages(pdf: PdfDocument, r: PageRange): PdfDocument;
}
