use pdfium_render::prelude::*;

use crate::models::pdf_result::PdfResult;

use super::hash::get_hash;

pub fn remove_pdf_page(buffer: &[u8], index: PdfPageIndex) -> PdfResult {
  let pdfium = Pdfium::default();
  let document = pdfium
    .load_pdf_from_byte_vec(buffer.to_vec(), None)
    .unwrap();

  let total_pages = document.pages().len();
  if index >= total_pages {
    panic!("The index is out of bounds");
  }

  let page = document.pages().get(index).unwrap();
  page.delete().unwrap();

  PdfResult::new(
    document.save_to_bytes().unwrap(),
    get_hash(&document).unwrap(),
  )
}
