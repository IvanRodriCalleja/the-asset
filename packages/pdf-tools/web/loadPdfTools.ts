import init, { initialize_pdfium_render } from '../build/web/pdf_tools.js';
import PDFiumModule from '../pdfium/pdfium.js';

export const loadTools = async () => {
	const pdfiumModule = await PDFiumModule();

	const tools = await init(new URL('../build/web/pdf_tools_bg.wasm', import.meta.url));

	initialize_pdfium_render(
		pdfiumModule, // Emscripten-wrapped Pdfium WASM module
		tools, // wasm_bindgen-wrapped WASM module built from our Rust application
		false // Debugging flag; set this to true to get tracing information logged to the Javascript console
	);
};

export * from '../build/web/pdf_tools.js';
