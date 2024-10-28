/* tslint:disable */
/* eslint-disable */
/**
* @param {Uint8Array} buffer
* @returns {PdfResult}
*/
export function compress_pdf(buffer: Uint8Array): PdfResult;
/**
* @param {Uint8Array} buffer
* @returns {string}
*/
export function get_pdf_hash(buffer: Uint8Array): string;
/**
* Fusión de múltiples PDFs en uno solo.
*
* `buffers` es un vector de `Uint8Array`, donde cada elemento es un PDF en formato binario.
* Devuelve un único PDF fusionado como un `Uint8Array`.
* @param {(Uint8Array)[]} buffers
* @returns {PdfResult}
*/
export function merge_pdfs(buffers: (Uint8Array)[]): PdfResult;
/**
* @param {Uint8Array} buffer
* @returns {number}
*/
export function get_total_pages(buffer: Uint8Array): number;
/**
* @param {Uint8Array} buffer
* @param {number} index
* @returns {PdfResult}
*/
export function remove_pdf_page(buffer: Uint8Array, index: number): PdfResult;
/**
* @param {Uint8Array} buffer
* @param {number} index
* @param {Direction} direction
* @returns {PdfResult}
*/
export function rotate_pdf_page(buffer: Uint8Array, index: number, direction: Direction): PdfResult;
/**
* @param {Uint8Array} buffer
* @param {Direction} direction
* @returns {PdfResult}
*/
export function rotate_pdf(buffer: Uint8Array, direction: Direction): PdfResult;
/**
* @param {Uint8Array} buffer
* @param {number} index
* @returns {GetThumbnailResult}
*/
export function get_thumbnail(buffer: Uint8Array, index: number): GetThumbnailResult;
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
*/
export enum Direction {
  Left = 0,
  Right = 1,
}
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
export class GetThumbnailResult {
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

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly compress_pdf: (a: number, b: number) => number;
  readonly get_pdf_hash: (a: number, b: number, c: number) => void;
  readonly merge_pdfs: (a: number, b: number) => number;
  readonly get_total_pages: (a: number, b: number) => number;
  readonly __wbg_pdfresult_free: (a: number, b: number) => void;
  readonly pdfresult_new: (a: number, b: number, c: number, d: number) => number;
  readonly pdfresult_buffer: (a: number, b: number) => void;
  readonly pdfresult_hash: (a: number, b: number) => void;
  readonly remove_pdf_page: (a: number, b: number, c: number) => number;
  readonly rotate_pdf_page: (a: number, b: number, c: number, d: number) => number;
  readonly rotate_pdf: (a: number, b: number, c: number) => number;
  readonly __wbg_getthumbnailresult_free: (a: number, b: number) => void;
  readonly getthumbnailresult_new: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly getthumbnailresult_src: (a: number, b: number) => void;
  readonly getthumbnailresult_width: (a: number) => number;
  readonly getthumbnailresult_height: (a: number) => number;
  readonly getthumbnailresult_rotation: (a: number) => number;
  readonly get_thumbnail: (a: number, b: number, c: number) => number;
  readonly initialize_pdfium_render: (a: number, b: number, c: number) => number;
  readonly read_block_from_callback_wasm: (a: number, b: number, c: number, d: number) => number;
  readonly write_block_from_callback_wasm: (a: number, b: number, c: number) => number;
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
