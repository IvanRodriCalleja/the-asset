import PDFiumModule from '../pdfium/pdfium.js';
import init, { initialize_pdfium_render } from './output/pdf_tools.js';

export const loadTools = async () => {
	const pdfiumModule = await PDFiumModule();

	const tools = await init(new URL('./output/pdf_tools_bg.wasm', import.meta.url));

	initialize_pdfium_render(
		pdfiumModule, // Emscripten-wrapped Pdfium WASM module
		tools, // wasm_bindgen-wrapped WASM module built from our Rust application
		false // Debugging flag; set this to true to get tracing information logged to the Javascript console
	);
};
