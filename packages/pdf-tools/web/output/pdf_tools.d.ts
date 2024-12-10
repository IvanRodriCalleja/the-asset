/* tslint:disable */
/* eslint-disable */
/**
* @param {Uint8Array} buffer
* @param {string} password
* @returns {PdfResult}
*/
export function decrypt_pdf(buffer: Uint8Array, password: string): PdfResult;
/**
* @param {Uint8Array} buffer
* @param {number} index
* @returns {PdfResult}
*/
export function remove_pdf_page(buffer: Uint8Array, index: number): PdfResult;
/**
* Establishes a binding between an external Pdfium WASM module and `pdfium-render`'s WASM module.
* This function should be called from Javascript once the external Pdfium WASM module has been loaded
* into the browser. It is essential that this function is called _before_ initializing
* `pdfium-render` from within Rust code. For an example, see:
* <https://github.com/ajrcarey/pdfium-render/blob/master/examples/index.html>
* @param {any} pdfium_wasm_module
* @param {any} local_wasm_module
* @param {boolean} debug
* @returns {boolean}
*/
export function initialize_pdfium_render(pdfium_wasm_module: any, local_wasm_module: any, debug: boolean): boolean;
/**
* A callback function that can be invoked by Pdfium's `FPDF_LoadCustomDocument()` function,
* wrapping around `crate::utils::files::read_block_from_callback()` to shuffle data buffers
* from our WASM memory heap to Pdfium's WASM memory heap as they are loaded.
* @param {number} param
* @param {number} position
* @param {number} pBuf
* @param {number} size
* @returns {number}
*/
export function read_block_from_callback_wasm(param: number, position: number, pBuf: number, size: number): number;
/**
* A callback function that can be invoked by Pdfium's `FPDF_SaveAsCopy()` and `FPDF_SaveWithVersion()`
* functions, wrapping around `crate::utils::files::write_block_from_callback()` to shuffle data buffers
* from Pdfium's WASM memory heap to our WASM memory heap as they are written.
* @param {number} param
* @param {number} buf
* @param {number} size
* @returns {number}
*/
export function write_block_from_callback_wasm(param: number, buf: number, size: number): number;
/**
* Chroma subsampling format
*/
export enum ChromaSampling {
/**
* Both vertically and horizontally subsampled.
*/
  Cs420 = 0,
/**
* Horizontally subsampled.
*/
  Cs422 = 1,
/**
* Not subsampled.
*/
  Cs444 = 2,
/**
* Monochrome.
*/
  Cs400 = 3,
}
/**
*/
export enum PdfToolsErrorCodes {
  Unknown = 0,
  PasswordError = 1,
  LoadError = 2,
  WrongPassword = 3,
  DecryptionError = 4,
  MalformedPdf = 5,
  FileNotFound = 6,
}
/**
*/
export enum Direction {
  Left = 0,
  Right = 1,
}
/**
*/
export class AddFileInput {
  free(): void;
/**
* @param {string} id
* @param {Uint8Array} buffer
* @param {string} name
*/
  constructor(id: string, buffer: Uint8Array, name: string);
/**
*/
  readonly buffer: Uint8Array;
/**
*/
  readonly id: string;
/**
*/
  readonly name: string;
}
/**
*/
export class FileOperationResult {
  free(): void;
/**
* @param {string} id
* @param {string} hash
*/
  constructor(id: string, hash: string);
/**
*/
  readonly hash: string;
/**
*/
  readonly id: string;
}
/**
*/
export class PdfResult {
  free(): void;
/**
* @param {Uint8Array} buffer
* @param {string} hash
*/
  constructor(buffer: Uint8Array, hash: string);
/**
*/
  readonly buffer: Uint8Array;
/**
*/
  readonly hash: string;
}
/**
*/
export class PdfTools {
  free(): void;
/**
*/
  constructor();
/**
* @param {AddFileInput} file
*/
  add_file(file: AddFileInput): void;
/**
* @param {string} id
* @param {number} page
* @returns {ThumbnailResult}
*/
  get_thumbnail(id: string, page: number): ThumbnailResult;
/**
* @param {string} id
*/
  remove_file(id: string): void;
/**
* @param {string} id
* @returns {number}
*/
  get_total_pages(id: string): number;
/**
* @param {string} id
* @param {Direction} direction
* @returns {FileOperationResult}
*/
  rotate_pdf(id: string, direction: Direction): FileOperationResult;
/**
* @param {string} id
* @param {number} page
* @param {Direction} direction
* @returns {FileOperationResult}
*/
  rotate_pdf_page(id: string, page: number, direction: Direction): FileOperationResult;
/**
* @param {string} id
* @param {number} page
* @returns {FileOperationResult}
*/
  remove_pdf_page(id: string, page: number): FileOperationResult;
/**
* @param {string} id
* @param {string} password
* @returns {FileOperationResult}
*/
  decrypt_pdf(id: string, password: string): FileOperationResult;
/**
* @param {(string)[]} ids
* @returns {PdfResult}
*/
  merge_files(ids: (string)[]): PdfResult;
/**
* @param {string} id
* @returns {string}
*/
  get_file_size(id: string): string;
/**
* @param {string} id
* @returns {Uint8Array}
*/
  get_file(id: string): Uint8Array;
}
/**
*/
export class PdfToolsError {
  free(): void;
/**
* @param {PdfToolsErrorCodes} code
*/
  constructor(code: PdfToolsErrorCodes);
/**
*/
  readonly code: PdfToolsErrorCodes;
}
/**
*/
export class ThumbnailResult {
  free(): void;
/**
* @param {string} src
* @param {number} width
* @param {number} height
* @param {number} rotation
*/
  constructor(src: string, width: number, height: number, rotation: number);
/**
*/
  readonly height: number;
/**
*/
  readonly rotation: number;
/**
*/
  readonly src: string;
/**
*/
  readonly width: number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_addfileinput_free: (a: number, b: number) => void;
  readonly addfileinput_new: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly addfileinput_id: (a: number, b: number) => void;
  readonly addfileinput_buffer: (a: number, b: number) => void;
  readonly addfileinput_name: (a: number, b: number) => void;
  readonly __wbg_fileoperationresult_free: (a: number, b: number) => void;
  readonly fileoperationresult_new: (a: number, b: number, c: number, d: number) => number;
  readonly fileoperationresult_id: (a: number, b: number) => void;
  readonly fileoperationresult_hash: (a: number, b: number) => void;
  readonly __wbg_pdfresult_free: (a: number, b: number) => void;
  readonly pdfresult_buffer: (a: number, b: number) => void;
  readonly pdfresult_hash: (a: number, b: number) => void;
  readonly __wbg_pdftoolserror_free: (a: number, b: number) => void;
  readonly pdftoolserror_new: (a: number) => number;
  readonly pdftoolserror_code: (a: number) => number;
  readonly __wbg_thumbnailresult_free: (a: number, b: number) => void;
  readonly thumbnailresult_new: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly thumbnailresult_src: (a: number, b: number) => void;
  readonly thumbnailresult_width: (a: number) => number;
  readonly thumbnailresult_height: (a: number) => number;
  readonly thumbnailresult_rotation: (a: number) => number;
  readonly decrypt_pdf: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly remove_pdf_page: (a: number, b: number, c: number) => number;
  readonly __wbg_pdftools_free: (a: number, b: number) => void;
  readonly pdftools_new: () => number;
  readonly pdftools_add_file: (a: number, b: number) => void;
  readonly pdftools_get_thumbnail: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly pdftools_remove_file: (a: number, b: number, c: number) => void;
  readonly pdftools_get_total_pages: (a: number, b: number, c: number, d: number) => void;
  readonly pdftools_rotate_pdf: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly pdftools_rotate_pdf_page: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly pdftools_remove_pdf_page: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly pdftools_decrypt_pdf: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly pdftools_merge_files: (a: number, b: number, c: number) => number;
  readonly pdftools_get_file_size: (a: number, b: number, c: number, d: number) => void;
  readonly pdftools_get_file: (a: number, b: number, c: number, d: number) => void;
  readonly initialize_pdfium_render: (a: number, b: number, c: number) => number;
  readonly read_block_from_callback_wasm: (a: number, b: number, c: number, d: number) => number;
  readonly write_block_from_callback_wasm: (a: number, b: number, c: number) => number;
  readonly pdfresult_new: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_0: (a: number, b: number) => number;
  readonly __wbindgen_export_1: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_export_2: (a: number, b: number, c: number) => void;
  readonly __wbindgen_export_3: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
