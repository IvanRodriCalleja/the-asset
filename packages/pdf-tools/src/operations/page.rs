use pdfium_render::prelude::*;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn get_total_pages(buffer: Vec<u8>) -> u16 {
  let pdfium = Pdfium::default();
  let document = pdfium.load_pdf_from_byte_vec(buffer, None).unwrap();

  document.pages().len()
}
