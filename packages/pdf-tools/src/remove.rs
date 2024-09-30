use pdfium_render::prelude::*;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn remove_pdf_page(buffer: Vec<u8>, index: PdfPageIndex) -> Vec<u8> {
  let pdfium = Pdfium::default();
  let document = pdfium.load_pdf_from_byte_vec(buffer, None).unwrap();

  let total_pages = document.pages().len();
  if index >= total_pages {
    panic!("The index is out of bounds");
  }

  let page = document.pages().get(index).unwrap();
  page.delete().unwrap();

  document.save_to_bytes().unwrap()
}
